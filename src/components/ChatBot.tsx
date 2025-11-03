import React, { useState } from 'react';

interface Message {
    from: 'user' | 'bot';
    text: string;
    time: string;
}

const ChatBot: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');

    const now = () => {
        return new Date().toLocaleTimeString();
    };

    const handleSend = () => {
        const text = input.trim();
        if (!text) return;

        const userMessage: Message = {
            from: 'user',
            text,
            time: now()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');

        // Simulate bot response
        setTimeout(() => {
            const botMessage: Message = {
                from: 'bot',
                text: `(Simulated bot) I got: "${text}"`,
                time: now()
            };
            setMessages(prev => [...prev, botMessage]);
        }, 700);
    };

    return (
        <div className="chat-container">
            <div className="chat-window">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.from}`}>
                        <div className={`bubble ${msg.from}`}>
                            <div className="meta">{msg.from} · {msg.time}</div>
                            <div>{msg.text}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="composer">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type a message..."
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default ChatBot;