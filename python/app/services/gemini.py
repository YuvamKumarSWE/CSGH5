import os
from dotenv import load_dotenv
import google.generativeai as genai
from pathlib import Path

project_root = Path(__file__).resolve().parents[2]

# Load the .env file
load_dotenv(dotenv_path=project_root / ".env")

# Retrieve the API key
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY not found in environment variables!")

# Configure Gemini
genai.configure(api_key=api_key)

def generate_content(prompt, model_name='gemini-2.0-flash-exp', temperature=0.7):
    """
    Generic function to call Gemini and return text.
    """
    model = genai.GenerativeModel(model_name)
    response = model.generate_content(
        prompt=prompt,
        temperature=temperature
    )
    return response.text

def identify_topics(text_chunk):
    """
    Ask Gemini to extract main topics from a text chunk.
    """
    prompt = f"""
    You are a study guide assistant.
    Here is the text:
    {text_chunk}

    Task: Identify 5-10 main topics in the text.
    Return them as a JSON array of strings.
    """
    response = generate_content(prompt)
    
    # Attempt to parse JSON
    import json
    try:
        topics = json.loads(response)
    except json.JSONDecodeError:
        # fallback if JSON parsing fails
        topics = [line.strip("- ").strip() for line in response.splitlines() if line.strip()]
    return topics

def synthesize_topic(topic, relevant_text):
    """
    Ask Gemini to generate a study guide section for one topic.
    """
    prompt = f"""
    You are a study guide creator.
    Topic: {topic}
    Relevant text: {relevant_text}

    Task: Write a detailed study guide section in Markdown.
    Include headings, examples, and explanations.
    """
    return generate_content(prompt)

def compile_study_guide(text_chunks):
    all_topics = set()
    topic_sections = {}

    # Stage 1: Identify topics
    for chunk in text_chunks:
        topics = identify_topics(chunk)
        all_topics.update(topics)

    # Stage 2: Generate sections
    for topic in all_topics:
        # Gather relevant text (simple approach: concatenate all chunks)
        relevant_text = " ".join(text_chunks)
        section_text = synthesize_topic(topic, relevant_text)
        topic_sections[topic] = section_text

    # Stage 3: Compile final guide
    guide = "# Study Guide\n\n## Table of Contents\n"
    for i, topic in enumerate(topic_sections.keys(), 1):
        guide += f"{i}. {topic}\n"
    
    guide += "\n"
    for topic, section in topic_sections.items():
        guide += f"## {topic}\n{section}\n\n"

    return guide
