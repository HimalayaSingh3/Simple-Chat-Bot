import React, { useState } from "react";

// Define a simple rule-based chatbot
const responses = [
  { pattern: /hello|hi|hey/i, response: "Hello! How can I help you today?" },
  { pattern: /my name is (.*)/i, response: (name) => `Hello ${name}!` },
  { pattern: /how are you/i, response: "I'm just a bot, but I'm doing fine!" },
  { pattern: /bye|exit|quit/i, response: "Goodbye! Have a nice day!" },
  { pattern: /what's the weather like/i, response: "Sorry, I can't provide the weather yet, but you can check online!" },
  { pattern: /what is (\d+) \+ (\d+)/i, response: (a, b) => `${a} + ${b} is ${parseInt(a) + parseInt(b)}` },
  { pattern: /who created you/i, response: "I was created by Himalaya Singh" },
  { pattern: /tell me a joke/i, response: "Why don't scientists trust atoms? Because they make up everything!" },
  { pattern: /i am (sad|happy|angry|excited)/i, response: (emotion) => `I'm glad you're feeling ${emotion}! Is there anything you'd like to talk about?` },
  { pattern: /what's your favorite (color|food|movie)/i, response: (thing) => `I don't have preferences, but I've heard ${thing} is cool!` },
  { pattern: /do you have any advice/i, response: "Always stay positive and keep learning new things every day!" },
  { pattern: /can you help me/i, response: "Of course! How can I assist you today?" },
  { pattern: /what is the time/i, response: () => `The current time is ${new Date().toLocaleTimeString()}.` },
  { pattern: /tell me something interesting/i, response: "Did you know that honey never spoils? Archaeologists have found pots of honey over 3000 years old!" },
  { pattern: /default/, response: "Sorry, I don't understand that." },
];

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleUserInput = (e) => {
    setInput(e.target.value);
  };

  const getBotResponse = (userMessage) => {
    for (let rule of responses) {
      const match = userMessage.match(rule.pattern);
      if (match) {
        return typeof rule.response === "function" ? rule.response(match[1]) : rule.response;
      }
    }
    return "Sorry, I don't understand that.";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessage = input.trim();
      setMessages((prevMessages) => [...prevMessages, { sender: "user", text: userMessage }]);
      const botResponse = getBotResponse(userMessage);
      setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: botResponse }]);
      setInput("");
    }
  };

  return (
    <div className="chatbot">
      <div className="chatbot-window">
        {messages.map((message, index) => (
          <div key={index} className={message.sender === "user" ? "user-message" : "bot-message"}>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={handleUserInput} placeholder="Type a message..." />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;
