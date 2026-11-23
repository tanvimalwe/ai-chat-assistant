# AI Chat Assistant

A full-stack AI-powered chat application built using React, TypeScript, Python, FastAPI and OpenAI.

The application allows users to interact with an AI assistant through a clean chat interface, with conversation history maintained during the session.

## Features

- Interactive chat interface
- AI-generated responses using OpenAI
- Conversation history and contextual follow-up questions
- Loading indicators while waiting for responses
- Error handling for API failures
- Clear conversation functionality
- Responsive UI

## Tech Stack

**Frontend**
- React
- TypeScript
- CSS
- Vite

**Backend**
- Python
- FastAPI
- Pydantic
- OpenAI Python SDK

## Project Structure

```text
ai-chat-assistant/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js and npm
- OpenAI API key

### 1. Clone the repository

```bash
git clone https://github.com/tanvimalwe/ai-chat-assistant.git
cd ai-chat-assistant
```

### 2. Set up the backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Create a `.env` file inside the backend directory:

```env
OPENAI_API_KEY=your_openai_api_key
```

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

Backend API documentation:

http://127.0.0.1:8000/docs

### 3. Set up the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the application at:

http://localhost:5173

## Architecture

```text
React + TypeScript
       |
       | POST /chat
       v
Python + FastAPI
       |
       v
OpenAI API
       |
       v
AI-generated response
       |
       v
React UI
```

## Future Improvements

- Persistent conversation storage
- User authentication
- Streaming AI responses
- Document-based question answering (RAG)
- AI agent integration

## Author

Tanvi Malwe
