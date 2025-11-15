from fastapi import APIRouter, UploadFile, File, Form
from typing import List
import json

from app.services.pdfExtraction import extract_pdf_text

router = APIRouter()

@router.get("/api/health")
def health_check():
    return {"status": "healthy"}

@router.post("/api/get-output")
async def get_output(
    pdfs: List[UploadFile] = File(default=[]),
    sources: str = Form(default="{}")
):
    # Parse the sources JSON string
    other_sources = json.loads(sources)
    print(f"Received sources JSON: {other_sources}")

    # Get PDF filenames
    pdf_filenames = [pdf.filename for pdf in pdfs]
    
    # Combine all sources
    # all_sources = {
    #     "pdfs": pdf_filenames,
    #     "urls": other_sources.get("urls", []),
    #     "videos": other_sources.get("videos", []),
    #     "text": other_sources.get("text", [])
    # }

    pdf_text = ''

    for pdf in pdfs:
        pdf_text += await extract_pdf_text(pdf)
    
    # return {
    #     "success": True,
    #     "sources": all_sources,
    #     "pdf_content": pdf_text,
    #     "pdf_lines": pdf_text.split("\n")  # Split into lines for easier frontend display
    # }

    return pdf_text
