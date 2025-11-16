import os
import json
from dotenv import load_dotenv
from google import genai
from pathlib import Path

project_root = Path(__file__).resolve().parents[2]

def _get_api_key():
    """Get the Gemini API key from environment variables."""
    load_dotenv(dotenv_path=project_root / ".env")
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY not found in environment variables!")
    return api_key

def extract_unique_topics_with_text(text):
    """
    Extract main topics from large text using the Gemini 2.5-pro model.
    Returns a JSON object where each topic maps to its unique corresponding text.
    Removes duplicate/similar content to ensure uniqueness.

    Args:
        text (str): The large text to process

    Returns:
        dict: JSON object with topics as keys and unique text snippets as values
    """
    prompt = f"""You are a study guide assistant specialized in content deduplication and topic extraction.

Analyze the following text and:
1. Identify all main topics covered
2. Extract ALL unique text content related to each topic (be comprehensive)
3. Remove ONLY exact duplicates or near-identical phrases
4. Keep different explanations of the same concept if they provide unique value
5. Consolidate related information under the most appropriate topic

Return ONLY a valid JSON object where:
- Keys are the main topics (clear, concise topic names)
- Values are the consolidated unique text content (combine related sentences, avoid redundancy)

TEXT TO ANALYZE:
{text}

Return ONLY the JSON object, no other text."""

    client = genai.Client(api_key=_get_api_key())
    response = client.models.generate_content(
        model="gemini-2.5-pro",
        contents=prompt
    )

    # Extract the JSON from the response
    response_text = response.text.strip()

    # Try to parse the JSON response
    try:
        topics_data = json.loads(response_text)
        return topics_data
    except json.JSONDecodeError:
        # If the response contains Markdown code blocks, extract the JSON
        if "```json" in response_text:
            json_str = response_text.split("```json")[1].split("```")[0].strip()
            topics_data = json.loads(json_str)
            return topics_data
        elif "```" in response_text:
            json_str = response_text.split("```")[1].split("```")[0].strip()
            topics_data = json.loads(json_str)
            return topics_data
        else:
            raise ValueError(f"Failed to parse JSON from Gemini response: {response_text}")
