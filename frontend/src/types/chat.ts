export interface ChatRequest {
    question: string;
    user_name: string;
}

export interface ChatResponse {
    user_name: string;
    question: string;
    answer: string
}

export interface Message {
  role: 'user' | 'assistant',
  content: string
}
