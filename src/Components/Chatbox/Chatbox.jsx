import { useState } from "react";

const Chatbox = () => {
    const [messages, setMessages] = useState({
        "Alice": [
            { sender: "Alice", text: "Hello!" },
            { sender: "You", text: "Hey Alice!" }
        ],
        "Bob": [
            { sender: "Bob", text: "What's up?" },
            { sender: "You", text: "Not much, you?" }
        ],
        "Charlie": [
            { sender: "Charlie", text: "How's it going?" }
        ]
    });
    const [input, setInput] = useState("");
    const [selectedChat, setSelectedChat] = useState("Alice");
    const contacts = Object.keys(messages);

    const sendMessage = () => {
        if (!input.trim()) return;
        setMessages({
            ...messages,
            [selectedChat]: [...messages[selectedChat], { sender: "You", text: input }]
        });
        setInput("");
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-1/4 bg-white shadow-md space-y-0">
                {/* <h2 className="text-xl font-semibold">Contacts</h2> */}
                {contacts.map((contact) => (
                    <button 
                        key={contact} 
                        className={`w-full border text-left p-2  ${selectedChat === contact ? "bg-blue-500 text-white" : "bg-gray-200"}`} 
                        onClick={() => setSelectedChat(contact)}
                    >
                        {contact}
                    </button>
                ))}
            </div>

            {/* Chatbox */}
            <div className="flex flex-col flex-1  mx-auto bg-white  border border-gray-300">
                <div className="bg-blue-500 text-white p-4 text-center font-semibold">
                    Chat with {selectedChat}
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {messages[selectedChat].map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
                            <div className={`p-3 rounded-lg max-w-xs ${msg.sender === "You" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                                <span className="text-sm font-semibold block">{msg.sender}</span>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-4 flex items-center border-t bg-gray-100">
                    <input 
                        type="text" 
                        className="flex-1 p-2 border rounded-lg" 
                        placeholder="Type a message..." 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button 
                        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg" 
                        onClick={sendMessage}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatbox;
