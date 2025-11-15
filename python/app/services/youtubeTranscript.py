import youtube_transcript_api as yta
import re

def get_youtube_transcript(video_path):
    match = re.search(r"v=([A-Za-z0-9_\-]{11})", video_path)
    if not match:
        return ''
    video_id = match.group(1)
    return video_id