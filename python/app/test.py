import sys
import os

# Add the parent directory to sys.path so 'app' can be imported
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.services.pdfExtraction import extract_pdf_text

def main():
    pdf_path = sys.argv[1] if len(sys.argv) > 1 else "sample.pdf"
    print(f"Calling extract_pdf_text('{pdf_path}')")
    extracted_text = extract_pdf_text(pdf_path)
    print(f"Extracted {len(extracted_text)} characters from PDF")
    print("\nFirst 500 characters of extracted text:")
    print(extracted_text[:500])


if __name__ == "__main__":
    main()