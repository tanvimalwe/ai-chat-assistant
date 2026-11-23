from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from openai import OpenAI, AuthenticationError, RateLimitError, APIConnectionError, APIStatusError
from dotenv import load_dotenv
from typing import Literal

load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI()

class Message(BaseModel):
    role: Literal["user", "assistant"]
    content: str

class ChatRequest(BaseModel):
    messages: list[Message]

@app.post("/chat")
def chat(request: ChatRequest):
    try:
        messages = [
            {
                "role": message.role,
                "content": message.content
            }
            for message in request.messages
        ]
        
        response = client.responses.create(
            model="gpt-6-astra",
            input=messages
        )

        return {
            "answer": response.output_text
        }
    except AuthenticationError:
        raise HTTPException(
            status_code=401,
            detail="Invalid OpenAI API key"
        )
    except RateLimitError:
        raise HTTPException(
            status_code=429,
            detail="API rate limit exceeded"
        )

    except APIConnectionError:
        raise HTTPException(
            status_code=503,
            detail="Unable to connect to OpenAI"
        )

    except APIStatusError:
        raise HTTPException(
            status_code=502,
            detail="OpenAI API returned an error"
        )