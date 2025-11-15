import re
import youtube_transcript_api as yta

"""
Extracts YouTube video ID from any format of URL.
"""
def extract_video_id(url: str) -> str:
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


"""
Converts seconds to HH:MM:SS format.
"""
def format_timestamp(seconds: float) -> str:
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
    preferred_lang="en",
    include_timestamps: bool = True
) -> str:
    """
    Returns a formatted transcript.
    If include_timestamps=False → returns plain text transcript.
    """

    video_id = extract_video_id(url)
    if not video_id:
        return "Error: Could not extract video ID from URL."

    try:
        listings = yta.YouTubeTranscriptApi.list_transcripts(video_id)

        try:
            transcript_obj = listings.find_transcript([preferred_lang])
        except yta._errors.NoTranscriptFound:
            transcript_obj = listings.find_generated_transcript([preferred_lang])
        except Exception:
            transcript_obj = next(iter(listings))

        transcript = transcript_obj.fetch()

        lines = []
        for entry in transcript:
            text = entry["text"].replace("\n", " ")

            if include_timestamps:
                t = format_timestamp(entry["start"])
                lines.append(f"[{t}] {text}")
            else:
                lines.append(text)

        return "\n".join(lines)

    except yta._errors.TranscriptsDisabled:
        return "Error: Transcripts are disabled for this video."
    except yta._errors.NoTranscriptFound:
        return "Error: No transcript available for this video."
    except yta._errors.VideoUnavailable:
        return "Error: This video is unavailable."
    except Exception as e:
        return f"Error: {str(e)}"
