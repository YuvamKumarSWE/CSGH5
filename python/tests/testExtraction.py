from services.webArticleExtraction import extract_web_article

result = extract_web_article("https://en.wikipedia.org/wiki/Python_(programming_language)")
print(result["title"])
print(result["text"][:500])
