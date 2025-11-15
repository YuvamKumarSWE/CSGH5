import pymupdf as pdf

def extract_pdf_text(pdf_path):
    doc = pdf.open(pdf_path)
    extracted_text = []
    
    for page_num, page in enumerate(doc, start=1):
        extracted_text.append(f"----------Page {page_num}----------\n")
        extracted_text.append("=" * 50 + "\n\n")
        # Extract page text with formatting preserved
        text = page.get_text()
        extracted_text.append(text)
    
    doc.close()
    return "".join(extracted_text)