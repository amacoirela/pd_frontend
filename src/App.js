import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [feedback, setFeedback] = useState({}); // Przechowywanie ocen

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode]);

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "To jest odpowiedź chatbota.", sender: "bot", id: Date.now() },
        ]);
      }, 1000);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const resetChat = () => {
    setMessages([]);
    setFeedback({});
  };

  const handleFeedback = (id, type) => {
    setFeedback((prev) => ({ ...prev, [id]: type }));
  };

  return (
    <div className={`chat-container ${darkMode ? "dark" : "light"}`}>
      <div className={`header ${darkMode ? "dark" : "light"}`}>
        <h2>Asystent SQL</h2>
        <div className="button-container">
          <button className="mode-toggle" onClick={toggleDarkMode}>
            {darkMode ? "Tryb Jasny" : "Tryb Ciemny"}
          </button>
          <button className="reset-button" onClick={resetChat}>
            Resetuj czat
          </button>
        </div>
      </div>
      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === "user" ? "user" : "bot"}
            ${darkMode ? "dark" : "light"}
            `}
          >
            {msg.text}
            {msg.sender === "bot" && (
              <div className="feedback-buttons">
                <button
                  className={`thumb-button ${
                    feedback[msg.id] === "up" ? "active" : ""
                  }`}
                  onClick={() => handleFeedback(msg.id, "up")}
                >
                  👍
                </button>
                <button
                  className={`thumb-button ${
                    feedback[msg.id] === "down" ? "active" : ""
                  }`}
                  onClick={() => handleFeedback(msg.id, "down")}
                >
                  👎
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={`input-container ${darkMode ? "dark" : "light"}`}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          placeholder="Napisz wiadomość..."
          className={darkMode ? "dark" : "light"}
        />
        <button onClick={sendMessage} className={darkMode ? "dark" : "light"}>
          Wyślij
        </button>
      </div>
    </div>
  );
}

export default App;