import type { ChatResponse, Message } from "../types/chat";

const API_URL = "http://localhost:8000";

export async function sendChatMessage(messages: Message[]): Promise<ChatResponse> {
    const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({messages})
    })

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to send message");
    }

    const data: ChatResponse = await response.json()

    return data
}