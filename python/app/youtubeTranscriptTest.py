import sys
import os

# Add the parent directory to sys.path so 'app' can be imported
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.services.pdfExtraction import extract_pdf_text
from app.services.youtubeTranscript import get_youtube_transcript

def main():
    # pdf_path = "sample.pdf"
    # extracted_text = extract_pdf_text(pdf_path)
    # print(f"Extracted {len(extracted_text)} characters from PDF")

    sample_url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    video_id = get_youtube_transcript(sample_url)
    print("Video ID:", video_id)


if __name__ == "__main__":
    main()