from services.pdfExtraction import extract_pdf

result = extract_pdf("python/app/test/sample.pdf")  # use any PDF you have

print("=== METADATA ===")
print(result["metadata"])

print("\n=== TEXT PREVIEW ===")
print(result["text"][:500])  # print first 500 chars