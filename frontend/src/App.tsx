import { useState, useEffect, useRef  } from 'react'
import './App.css'
import { sendChatMessage } from "./services/chatService";
import type {Message} from "./types/chat"

function App() {
  const [question, setQuestion] = useState<string>("")
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  function handleClearChat() {
    const confirmed = window.confirm(
        "Are you sure you want to clear this conversation?"
    );

    if (!confirmed) return;

    setMessages([]);
    setQuestion("");
    setError("");
  }

  async function handleSend() {
    if (!question.trim() || loading) return;

    setLoading(true);
    setError("");

    const userMessage: Message = {
        role: "user",
        content: question
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setQuestion("");

    try {

        const data = await sendChatMessage(updatedMessages);

        const assistantMessage: Message = {
            role: "assistant",
            content: data.answer
        };

        setMessages((previousMessages) => [
            ...previousMessages,
            assistantMessage
        ]);

    } catch (error) {
        if (error instanceof Error) {
            setError(error.message);
        } else {
            setError("An unexpected error occurred.");
        }
    } finally {
        setLoading(false);
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
        behavior: "smooth"
    });
  }, [messages]);

  return (
    <div className="chat-container">
      <h1>AI Chat Assistant</h1>
      <div className="chat-box">
          <button
              onClick={handleClearChat}
              disabled={loading || messages.length === 0}
          >
              Clear Chat
          </button>
          {/* Scrollable conversation history */}
          <div className="messages">
              {messages.length === 0 ? (
                  <div className="empty-chat">
                      <h3>Welcome!</h3>
                      <p>Ask me anything to get started.</p>
                  </div>
              ) : (
                  messages.map((message, index) => (
                      <div
                          key={index}
                          className={`message-row ${message.role}`}
                      >
                          <div className="message-bubble">
                              {message.content}
                          </div>
                      </div>
                  ))
              )}
              {loading && (
                  <div className="message-row assistant">
                      <div className="message-bubble">
                          Thinking...
                      </div>
                  </div>
              )}
              <div ref={messagesEndRef} />
          </div>

          {/* Message input area */}
          <div className="chat-input">
              <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                      }
                  }}
                  placeholder="Ask me anything..."
              />

              <button
                  onClick={handleSend}
                  disabled={loading || !question.trim()}
              >
                  {loading ? "Thinking..." : "Send"}
              </button>
          </div>

          {error && <p className="error">{error}</p>}

      </div>

    </div>
  )
}

export default App