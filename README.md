# CSGH5

This repository contains three main project folders:

## 📁 Project Structure

### 1. Frontend
A React application built with Vite and styled with Tailwind CSS.

**Tech Stack:**
- React (JavaScript)
- Vite
- Tailwind CSS v3
- PostCSS & Autoprefixer

**Getting Started:**
```bash
cd frontend
npm install
npm run dev     # Start development server
npm run build   # Build for production
```

### 2. Python
A FastAPI backend application with a modular API structure.

**Tech Stack:**
- FastAPI 0.104.1
- Uvicorn 0.24.0
- Pydantic 2.5.0

**Project Structure:**
```
python/
├── app.py              # Main FastAPI application
├── requirements.txt    # Python dependencies
└── api/
    ├── __init__.py
    └── controller.py   # API routes and endpoints
```

**Getting Started:**
```bash
cd python
pip install -r requirements.txt
python app.py           # Start the server on http://localhost:8000
```

**Available Endpoints:**
- `GET /` - Root endpoint
- `GET /api/health` - Health check endpoint
- `GET /api/items` - Get items endpoint

### 3. Backend
A placeholder folder for future backend implementation.

**Current Contents:**
- `notes.txt` - Placeholder file