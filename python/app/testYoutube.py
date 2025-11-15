from services.youtubeTranscript import get_youtube_transcript

url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"

text2 = get_youtube_transcript(url)
print(text2[:500])
