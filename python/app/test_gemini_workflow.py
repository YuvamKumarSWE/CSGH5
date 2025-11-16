import os
from pathlib import Path
from dotenv import load_dotenv

# Determine the project root (2 levels up from this file)
project_root = Path(__file__).resolve().parents[2]

# Load the .env file
load_dotenv(dotenv_path=project_root / ".env")
api_key = os.getenv("GEMINI_API_KEY")

import google.generativeai as genai
genai.configure(api_key=api_key)

# Import your module
from services.gemini import generate_content, identify_topics, synthesize_topic, compile_study_guide

# --- MOCK TEXT ---
sample_text = [
    "Distributed systems are systems where components located on networked computers communicate and coordinate their actions by passing messages.",
    "Remote Procedure Call (RPC) allows a program to cause a procedure to execute on another address space.",
    "Logical clocks help to order events in distributed systems without using a global clock."
]

# --- TESTS ---
def test_generate_content_returns_text():
    prompt = "Write a short sentence about testing."
    text = generate_content(prompt)
    assert isinstance(text, str)
    assert len(text) > 0

def test_identify_topics_returns_list():
    topics = identify_topics("Python is a programming language. It supports OOP and functional programming.")
    assert isinstance(topics, (list, tuple))
    assert all(isinstance(t, str) for t in topics)
    assert len(topics) > 0

def test_synthesize_topic_returns_text():
    section = synthesize_topic("Distributed Systems", "Distributed systems involve multiple computers working together.")
    assert isinstance(section, str)
    assert len(section) > 0

def test_compile_study_guide_creates_markdown():
    guide = compile_study_guide(sample_text)
    assert isinstance(guide, str)
    assert guide.startswith("# Study Guide")
    # Check if at least one topic section exists
    assert "## " in guide
