# Content extraction service
import trafilatura

def extract_web_article(url):
    # Step 1: Download
    downloaded = trafilatura.fetch_url(url)
    if downloaded is None:
        raise ValueError(f"Failed to download URL: {url}")

    # Step 2: Extract clean text
    text = trafilatura.extract(
        downloaded,
        include_comments=False,
        include_tables=True,
        no_fallback=False
    )
    if text is None:
        raise ValueError(f"Failed to extract content from: {url}")

    # Step 3: Extract metadata
    metadata = trafilatura.extract_metadata(downloaded)

    return {
        "title": metadata.title if metadata else None,
        "author": metadata.author if metadata else None,
        "date": metadata.date if metadata else None,
        "text": text,
        "raw_metadata": metadata.as_dict() if metadata else {}
    }
