import pymupdf as pdf
from fastapi import UploadFile
from io import BytesIO

async def extract_pdf_text(pdf_file):
    """
    Extract text from a PDF file.
    
    Args:
        pdf_file: Can be either a file path (str) or an UploadFile object
    
    Returns:
        str: Extracted text from all pages
    """
    try:
        # Handle file path string vs UploadFile object
        if isinstance(pdf_file, str):
            # Handle file path string
            doc = pdf.open(pdf_file)
        else:
            # Handle UploadFile object from FastAPI
            # Read the file content
            content = await pdf_file.read()
            # Seek back to the beginning in case it's read again
            await pdf_file.seek(0)
            # Open PDF from bytes
            doc = pdf.open(stream=content, filetype="pdf")

        extracted_text = []
        
        for page_num, page in enumerate(doc, start=1):
            extracted_text.append(f"----------Page {page_num}----------")
            extracted_text.append("\n")
            extracted_text.append("=" * 50)
            extracted_text.append("\n\n")
            # Extract page text with formatting preserved
            text = page.get_text()
            extracted_text.append(text)
            extracted_text.append("\n")

        doc.close()
        return "".join(extracted_text)
    except FileNotFoundError:
        raise FileNotFoundError(f"PDF file not found: {pdf_file}")
    except PermissionError:
        raise PermissionError(f"Permission denied when accessing PDF file: {pdf_file}")
    except Exception as e:
        raise ValueError(f"Failed to extract text from PDF: {str(e)}")