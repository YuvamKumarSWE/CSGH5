import pymupdf as pdf
import re
from app.utils.logger import setup_logger

logger = setup_logger(__name__)

async def extract_pdf_text(pdf_file):
    """
    Extract text from a PDF file.
    
    Args:
        pdf_file: Can be either a file path (str) or an UploadFile object
    
    Returns:
        str: Extracted text from all pages
    """
    filename = pdf_file if isinstance(pdf_file, str) else getattr(pdf_file, 'filename', 'unknown')
    logger.info(f"Starting PDF text extraction for: {filename}")
    
    try:
        # Handle file path string vs UploadFile object
        if isinstance(pdf_file, str):
            # Handle file path string
            logger.debug(f"Processing PDF from file path: {pdf_file}")
            try:
                doc = pdf.open(pdf_file)
                logger.info(f"Successfully opened PDF file: {pdf_file}")
            except FileNotFoundError:
                logger.error(f"PDF file not found: {pdf_file}")
                raise FileNotFoundError(f"PDF file not found: {pdf_file}")
            except PermissionError:
                logger.error(f"Permission denied when accessing PDF file: {pdf_file}")
                raise PermissionError(f"Permission denied when accessing PDF file: {pdf_file}")
        else:
            # Handle UploadFile object from FastAPI
            logger.debug(f"Processing uploaded PDF file: {filename}")
            try:
                # Read file contents as bytes
                content = await pdf_file.read()
                content_size = len(content)
                logger.info(f"Read {content_size} bytes from uploaded file: {filename}")
                
                if content_size == 0:
                    logger.error(f"Uploaded PDF file is empty: {filename}")
                    raise ValueError(f"Uploaded PDF file is empty: {filename}")
                
                # Open PDF from bytes
                doc = pdf.open(stream=content, filetype="pdf")
                logger.info(f"Successfully opened uploaded PDF: {filename}")
            except (IOError, OSError) as e:
                logger.error(f"Failed to read uploaded PDF file {filename}: {str(e)}")
                raise ValueError(f"Failed to read uploaded PDF file: {str(e)}")

        # Check if PDF has any pages
        page_count = len(doc)
        if page_count == 0:
            logger.warning(f"PDF file has no pages: {filename}")
            doc.close()
            return ""
        
        logger.info(f"PDF has {page_count} pages: {filename}")
        extracted_text = []
        
        for page_num, page in enumerate(doc, start=1):
            logger.debug(f"Extracting text from page {page_num}/{page_count} of {filename}")
            
            try:
                # Extract page text with formatting preserved
                text = page.get_text()
                if text.strip():  # Only add non-empty pages
                    extracted_text.append(f"\n{'='*60}\n")
                    extracted_text.append(f"Page {page_num}\n")
                    extracted_text.append(f"{'='*60}\n\n")
                    # Clean up excessive whitespace while preserving paragraphs
                    cleaned_text = re.sub(r'\n\s*\n', '\n\n', text)
                    extracted_text.append(cleaned_text)
                    extracted_text.append("\n")
            except Exception as e:
                logger.error(f"Error extracting text from page {page_num} of {filename}: {str(e)}")
                extracted_text.append(f"[Error extracting text from this page: {str(e)}]\n")

        doc.close()
        final_text = "".join(extracted_text)
        text_length = len(final_text)
        logger.info(f"Successfully extracted {text_length} characters from {page_count} pages of {filename}")
        return final_text
        
    except FileNotFoundError:
        raise
    except PermissionError:
        raise
    except ValueError:
        raise
    except Exception as e:
        logger.error(f"Unexpected error extracting text from PDF {filename}: {str(e)}", exc_info=True)
        raise ValueError(f"Failed to extract text from PDF: {str(e)}")