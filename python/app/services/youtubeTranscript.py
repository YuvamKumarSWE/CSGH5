import re
import youtube_transcript_api as yta
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api._errors import (
    TranscriptsDisabled, 
    NoTranscriptFound, 
    VideoUnavailable
)

def extract_video_id(url: str) -> str:
    """
    Extracts YouTube video ID from any format of URL.
    """
    patterns = [
        r"v=([A-Za-z0-9_\-]{11})",
        r"youtu\.be/([A-Za-z0-9_\-]{11})",
        r"embed/([A-Za-z0-9_\-]{11})",
        r"shorts/([A-Za-z0-9_\-]{11})",
    ]

    for p in patterns:
        match = re.search(p, url)
        if match:
            return match.group(1)
    return ""

def format_timestamp(seconds: float) -> str:
    """
    Converts seconds to HH:MM:SS format.
    """
    seconds = int(seconds)
    h = seconds // 3600
    m = (seconds % 3600) // 60
    s = seconds % 60

    if h > 0:
        return f"{h:02}:{m:02}:{s:02}"
    else:
        return f"{m:02}:{s:02}"


def get_youtube_transcript(
    url: str,
    preferred_lang: str = "en"
) -> str:
    video_id = extract_video_id(url)
    if not video_id:
        return "Error: Could not extract video ID from URL."

    try:
        ytt_api = yta.YouTubeTranscriptApi()
        listings = ytt_api.list(video_id)

        try:
            transcript_obj = listings.find_transcript([preferred_lang])
        except yta._errors.NoTranscriptFound:
            try:
                transcript_obj = listings.find_generated_transcript([preferred_lang])
            except yta._errors.NoTranscriptFound:
                try:
                    transcript_obj = next(iter(listings))
                except StopIteration:
                    raise ValueError("Could not extract video ID from URL.")

        transcript = transcript_obj.fetch()

        lines = []
        for entry in transcript:
            text = entry.text.replace("\n", " ")

            lines.append(text)

        return "\n".join(lines)
    
    except yta._errors.TranscriptsDisabled:
        raise ValueError("Transcripts are disabled for this video.")
    except yta._errors.NoTranscriptFound:
        raise ValueError("No transcript available for this video.")
    except yta._errors.VideoUnavailable:
        raise ValueError("This video is unavailable.")
    except Exception as e:
        raise ValueError(f"Failed to fetch transcript: {str(e)}")
