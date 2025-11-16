from fastapi import APIRouter, UploadFile, File, Form
from typing import List
import json

from app.services.pdfExtraction import extract_pdf_text
from app.services.extraction import extract_web_article
from app.services.youtubeTranscript import get_youtube_transcript

router = APIRouter()

@router.get("/api/health")
def health_check():
    return {"status": "healthy"}


@router.post("/api/get-output")
async def get_output(
    pdfs: List[UploadFile] = File(default=[]),
    sources: str = Form(default="{}")
):
    """
    Combines extracted content from PDFs, URLs, videos, and raw text.
    """

    # Parse structured sources JSON
    other_sources = json.loads(sources)

    urls = other_sources.get("urls", [])
    videos = other_sources.get("videos", [])
    text_inputs = other_sources.get("text", [])

    combined_output = []

    # ============================
    # 1. 📄 Extract PDF content
    # ============================
    pdf_results = []
    for pdf in pdfs:
        try:
            content = await extract_pdf_text(pdf)
            pdf_results.append({
                "filename": pdf.filename,
                "content": content
            })
            combined_output.append(content)
        except Exception as e:
            pdf_results.append({
                "filename": pdf.filename,
                "error": str(e)
            })


    # ============================
    # 2. 🌐 Extract URL article content
    # ============================
    url_results = []
    for url in urls:
        try:
            article = extract_web_article(url)
            url_results.append(article)
            combined_output.append(article["text"])
        except Exception as e:
            url_results.append({"url": url, "error": str(e)})


    # ============================
    # 3. ▶️ Extract YouTube transcripts
    # ============================
    video_results = []
    for url in videos:
        try:
            transcript = get_youtube_transcript(url)
            video_results.append({"url": url, "transcript": transcript})
            combined_output.append(transcript)
        except Exception as e:
            video_results.append({"url": url, "error": str(e)})


    # ============================
    # 4. 📝 Raw text input
    # ============================
    text_results = []
    for t in text_inputs:
        text_results.append(t)
        combined_output.append(t)


    # ============================
    # 5. FINAL OUTPUT
    # ============================
    final_output_text = "\n\n".join(combined_output)

    return {
        "success": True,
        "combined_text": final_output_text
        # "sources": {
        #     "pdfs": pdf_results,
        #     "urls": url_results,
        #     "videos": video_results,
        #     "text": text_results,
        # }
    }
