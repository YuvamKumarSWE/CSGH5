import pymupdf as fitz  # PyMuPDF

def extract_pdf(pdf_path):

    try:
        # Open PDF
        doc = fitz.open(pdf_path)
        
        all_text = []
        
        # Extract metadata
        metadata = doc.metadata
        
        # Iterate through pages
        for page_num, page in enumerate(doc, start=1):
            all_text.append(f"---------- Page {page_num} ----------\n")
            all_text.append("=" * 60 + "\n\n")
            
            # Extract text from this page
            text = page.get_text()
            all_text.append(text if text.strip() else "[No extractable text]\n")
        
        doc.close()
        
        # Return structured result
        return {
            "metadata": metadata,
            "text": "".join(all_text)
        }
    
    except FileNotFoundError:
        raise FileNotFoundError(f"PDF not found: {pdf_path}")
    
    except PermissionError:
        raise PermissionError(f"Permission denied when accessing: {pdf_path}")
    
    except Exception as e:
        raise ValueError(f"Failed to extract PDF content: {str(e)}")
