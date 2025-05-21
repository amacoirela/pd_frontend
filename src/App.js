import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);

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
          { text: "To jest odpowiedź chatbota.", sender: "bot" },
        ]);
      }, 1000);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`chat-container ${darkMode ? "dark" : "light"}`}>
      <div className="header">
        <h2>Asystent SQL</h2>
        <button className="mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? "Tryb Jasny" : "Tryb Ciemny"}
        </button>
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
          </div>
        ))}
      </div>
      <div className={`input-container ${darkMode ? "dark" : "light"}`}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Napisz wiadomość..."
          className={darkMode ? "dark" : "light"}
        />
        <button
  onClick={sendMessage}
  className={darkMode ? "dark" : "light"}
>
  Wyślij
</button>
      </div>
    </div>
  );
}

export default App;