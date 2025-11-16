from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import List
import json
import time
import os
from dotenv import load_dotenv
from app.services.pdfExtraction import extract_pdf_text
from app.services.webArticleExtraction import extract_web_article
from app.services.youtubeTranscript import get_youtube_transcript
from app.services.gemini import extract_unique_topics_with_text, make_study_guide, format_study_guide_as_markdown
from app.utils.logger import setup_logger
from app.models.schemas import PasswordRequest, PasswordResponse

# Load environment variables
load_dotenv()

logger = setup_logger(__name__)
router = APIRouter()

@router.get("/api/health")
def health_check():
    """Health check endpoint to verify API is running."""
    logger.info("Health check requested")
    return {"status": "healthy"}

@router.post("/api/verify-password", response_model=PasswordResponse)
def verify_password(request: PasswordRequest):
    """Verify the access password."""
    logger.info("Password verification requested")
    
    # Get password from environment variable
    correct_password = os.getenv("ACCESS_PASSWORD", "your_secure_password_here")
    
    if request.password == correct_password:
        logger.info("Password verification successful")
        return PasswordResponse(success=True, message="Access granted")
    else:
        logger.warning("Password verification failed")
        return PasswordResponse(success=False, message="Invalid password")

@router.post("/api/get-output")
async def get_output(
    pdfs: List[UploadFile] = File(default=[]),
    sources: str = Form(default="{}"),
    api_key: str = Form(default=None)
):
    """
    Process multiple input sources (PDFs, URLs, videos, text) and generate a study guide.
    
    Args:
        pdfs: List of PDF files to extract text from
        sources: JSON string containing URLs, video links, and text inputs
        api_key: Optional Gemini API key provided by the user
    
    Returns:
        Study guide markdown as a string
    """
    start_time = time.time()
    request_id = f"{int(start_time * 1000)}"  # Simple request ID based on timestamp
    
    logger.info(f"[Request {request_id}] Starting get_output request")
    
    try:
        # Parse sources JSON
        try:
            other_sources = json.loads(sources)
            logger.debug(f"[Request {request_id}] Parsed sources JSON successfully")
        except json.JSONDecodeError as e:
            logger.error(f"[Request {request_id}] Failed to parse sources JSON: {str(e)}")
            raise HTTPException(status_code=400, detail=f"Invalid JSON in sources parameter: {str(e)}")

        urls = other_sources.get("urls", [])
        videos = other_sources.get("videos", [])
        text_inputs = other_sources.get("text", [])

        # Log input summary
        num_pdfs = len(pdfs)
        num_urls = len(urls)
        num_videos = len(videos)
        num_texts = len(text_inputs)
        logger.info(f"[Request {request_id}] Processing {num_pdfs} PDFs, {num_urls} URLs, {num_videos} videos, {num_texts} text inputs")

        combined_output = []
        successful_sources = 0
        failed_sources = 0

        # ============================
        # 1. 📄 Extract PDF content
        # ============================
        logger.info(f"[Request {request_id}] Starting PDF extraction ({num_pdfs} files)")
        pdf_results = []
        for idx, pdf in enumerate(pdfs, 1):
            try:
                logger.info(f"[Request {request_id}] Processing PDF {idx}/{num_pdfs}: {pdf.filename}")
                content = await extract_pdf_text(pdf)
                pdf_results.append({
                    "filename": pdf.filename,
                    "content": content
                })
                combined_output.append(content)
                successful_sources += 1
                logger.info(f"[Request {request_id}] Successfully processed PDF: {pdf.filename}")
            except Exception as e:
                failed_sources += 1
                error_msg = str(e)
                logger.error(f"[Request {request_id}] Failed to process PDF {pdf.filename}: {error_msg}")
                pdf_results.append({
                    "filename": pdf.filename,
                    "error": error_msg
                })


        # ============================
        # 2. 🌐 Extract URL article content
        # ============================
        logger.info(f"[Request {request_id}] Starting URL extraction ({num_urls} URLs)")
        url_results = []
        for idx, url in enumerate(urls, 1):
            try:
                logger.info(f"[Request {request_id}] Processing URL {idx}/{num_urls}: {url}")
                article = extract_web_article(url)
                url_results.append(article)
                combined_output.append(article["text"])
                successful_sources += 1
                logger.info(f"[Request {request_id}] Successfully processed URL: {url}")
            except Exception as e:
                failed_sources += 1
                error_msg = str(e)
                logger.error(f"[Request {request_id}] Failed to process URL {url}: {error_msg}")
                url_results.append({"url": url, "error": error_msg})


        # ============================
        # 3. ▶️ Extract YouTube transcripts
        # ============================
        logger.info(f"[Request {request_id}] Starting video transcript extraction ({num_videos} videos)")
        video_results = []
        for idx, url in enumerate(videos, 1):
            try:
                logger.info(f"[Request {request_id}] Processing video {idx}/{num_videos}: {url}")
                transcript = get_youtube_transcript(url)
                video_results.append({"url": url, "transcript": transcript})
                combined_output.append(transcript)
                successful_sources += 1
                logger.info(f"[Request {request_id}] Successfully processed video: {url}")
            except Exception as e:
                failed_sources += 1
                error_msg = str(e)
                logger.error(f"[Request {request_id}] Failed to process video {url}: {error_msg}")
                video_results.append({"url": url, "error": error_msg})


        # ============================
        # 4. 📝 Raw text input
        # ============================
        logger.info(f"[Request {request_id}] Processing text inputs ({num_texts} entries)")
        text_results = []
        for idx, t in enumerate(text_inputs, 1):
            try:
                if t and isinstance(t, str) and len(t.strip()) > 0:
                    text_results.append(t)
                    combined_output.append(t)
                    successful_sources += 1
                    logger.debug(f"[Request {request_id}] Added text input {idx}/{num_texts}")
                else:
                    logger.warning(f"[Request {request_id}] Skipping empty or invalid text input {idx}/{num_texts}")
            except Exception as e:
                failed_sources += 1
                logger.error(f"[Request {request_id}] Error processing text input {idx}: {str(e)}")

        # Log extraction summary
        total_sources = successful_sources + failed_sources
        logger.info(f"[Request {request_id}] Source extraction complete: {successful_sources}/{total_sources} successful, {failed_sources} failed")

        # Check if we have any content to process
        if not combined_output:
            logger.error(f"[Request {request_id}] No content extracted from any sources")
            raise HTTPException(
                status_code=400, 
                detail="No content could be extracted from the provided sources. Please check your inputs and try again."
            )

        # ============================
        # 5. FINAL OUTPUT GENERATION
        # ============================
        logger.info(f"[Request {request_id}] Starting final study guide generation")
        final_output_text = "\n\n".join(combined_output)
        combined_length = len(final_output_text)
        logger.info(f"[Request {request_id}] Combined content length: {combined_length} characters")

        # Extract topics
        try:
            logger.info(f"[Request {request_id}] Extracting topics from combined content")
            topics_data = extract_unique_topics_with_text(final_output_text, api_key=api_key)
            logger.info(f"[Request {request_id}] Successfully extracted topics")
        except Exception as e:
            logger.error(f"[Request {request_id}] Failed to extract topics: {str(e)}", exc_info=True)
            raise HTTPException(
                status_code=500,
                detail=f"Failed to extract topics from content: {str(e)}"
            )

        # Generate study guide
        try:
            logger.info(f"[Request {request_id}] Generating study guide from topics")
            guide = make_study_guide(topics_data, include_summary=True, include_key_points=True, api_key=api_key)
            
            if "error" in guide:
                logger.error(f"[Request {request_id}] Study guide generation returned error: {guide['error']}")
                raise HTTPException(status_code=500, detail=f"Failed to generate study guide: {guide['error']}")
            
            logger.info(f"[Request {request_id}] Successfully generated study guide")
        except HTTPException:
            raise
        except Exception as e:
            logger.error(f"[Request {request_id}] Failed to generate study guide: {str(e)}", exc_info=True)
            raise HTTPException(
                status_code=500,
                detail=f"Failed to generate study guide: {str(e)}"
            )

        # Format as markdown
        try:
            logger.info(f"[Request {request_id}] Formatting study guide as markdown")
            final_output_text = format_study_guide_as_markdown(guide)
            
            if final_output_text.startswith("# Error"):
                logger.error(f"[Request {request_id}] Markdown formatting returned error")
                raise HTTPException(status_code=500, detail="Failed to format study guide as markdown")
            
            logger.info(f"[Request {request_id}] Successfully formatted study guide as markdown")
        except HTTPException:
            raise
        except Exception as e:
            logger.error(f"[Request {request_id}] Failed to format markdown: {str(e)}", exc_info=True)
            raise HTTPException(
                status_code=500,
                detail=f"Failed to format study guide as markdown: {str(e)}"
            )

        # Log completion
        end_time = time.time()
        duration = end_time - start_time
        logger.info(f"[Request {request_id}] Request completed successfully in {duration:.2f} seconds")
        logger.info(f"[Request {request_id}] Final output length: {len(final_output_text)} characters")

        return {
            "study_guide": final_output_text
        }
    
    except HTTPException:
        # Re-raise HTTP exceptions as-is
        raise
    except Exception as e:
        # Catch any unexpected errors
        end_time = time.time()
        duration = end_time - start_time
        logger.error(f"[Request {request_id}] Unexpected error after {duration:.2f} seconds: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail=f"An unexpected error occurred while processing your request: {str(e)}"
        )