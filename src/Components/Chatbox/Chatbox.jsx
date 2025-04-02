import { useState } from "react";
import { FiSearch, FiPaperclip, FiSend, FiChevronLeft } from "react-icons/fi";

const chatPlatforms = {
    Facebook: [
        { name: "John Doe", lastMessage: "Let's catch up!", time: "3:00 PM", unread: 1, avatar: "https://randomuser.me/api/portraits/men/7.jpg" },
        { name: "Alice Smith", lastMessage: "See you tomorrow!", time: "9:15 AM", unread: 0, avatar: "https://randomuser.me/api/portraits/women/8.jpg" }
    ],
    WhatsApp: [
        { name: "Mark Messer", lastMessage: "Images", time: "10:30 AM", unread: 2, avatar: "https://randomuser.me/api/portraits/men/2.jpg" }
    ],
    Telegram: [
        { name: "Doris Brown", lastMessage: "typing...", time: "10:05 PM", unread: 0, avatar: "https://randomuser.me/api/portraits/women/4.jpg" }
    ]
};

const Chatbox = () => {
    const [selectedPlatform, setSelectedPlatform] = useState("Facebook");
    const [selectedChat, setSelectedChat] = useState(null); // Initially no chat selected
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isMobileView, setIsMobileView] = useState(false); // Track if in mobile view

    const sendMessage = () => {
        if (!input.trim()) return;
        setMessages([...messages, { sender: "You", text: input }]);
        setInput("");
    };

    const handleContactClick = (contact) => {
        setSelectedChat(contact);
        if (window.innerWidth <= 768) {
            setIsMobileView(true); // Switch to mobile chat view
        }
    };

    const handleBackClick = () => {
        setSelectedChat(null);
        if (window.innerWidth <= 768) {
            setIsMobileView(false); // Switch back to contact list on mobile
        }
    };

    return (
        <div className="flex  bg-gray-100 flex-col md:flex-row min-h-[calc(100vh-64px)]">
            {/* Sidebar / Contact List */}
            <div className={`w-full md:w-1/4 bg-white shadow-md p-4 space-y-4 border-r border-gray-200 ${isMobileView && "hidden"}`}>
                <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg">
                    <FiSearch className="text-gray-500" />
                    <input type="text" placeholder="Search messages or users" className="bg-transparent outline-none w-full" />
                </div>
                <div className="flex space-x-4 py-2">
                    {Object.keys(chatPlatforms).map((platform) => (
                        <button key={platform} className={`px-3 py-1 rounded-lg ${selectedPlatform === platform ? "bg-blue-500 text-white" : "bg-gray-200"}`} onClick={() => setSelectedPlatform(platform)}>
                            {platform}
                        </button>
                    ))}
                </div>
                <h2 className="text-lg font-semibold">Chats</h2>
                <div className="space-y-2">
                    {chatPlatforms[selectedPlatform].map((contact) => (
                        <button
                            key={contact.name}
                            className={`w-full flex items-center p-2 rounded-lg ${selectedChat && selectedChat.name === contact.name ? "bg-blue-100" : "hover:bg-gray-200"}`}
                            onClick={() => handleContactClick(contact)}
                        >
                            <img src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-full mr-2" />
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <span className="font-semibold">{contact.name}</span>
                                    <span className="text-xs text-gray-500">{contact.time}</span>
                                </div>
                                <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                            </div>
                            {contact.unread > 0 && <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{contact.unread}</span>}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chatbox */}
            {selectedChat ? (
                <div className="flex flex-col flex-1 bg-white shadow-lg rounded-xl border border-gray-300">
                    <div className="bg-blue-500 text-white p-4 flex items-center justify-between rounded-t-xl">
                        {isMobileView && (
                            <button onClick={handleBackClick} className="text-white">
                                <FiChevronLeft size={24} />
                            </button>
                        )}
                        <div className="flex items-center">
                            <img src={selectedChat.avatar} alt={selectedChat.name} className="w-10 h-10 rounded-full mr-2" />
                            <span className="font-semibold">{selectedChat.name}</span>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
                                <div className={`p-3 rounded-lg max-w-xs ${msg.sender === "You" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                                    <span className="text-sm font-semibold block">{msg.sender}</span>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 flex items-center border-t bg-gray-100">
                        <button className="text-gray-500 p-2">
                            <FiPaperclip size={20} />
                        </button>
                        <input 
                            type="text" 
                            className="flex-1 p-2 border rounded-lg" 
                            placeholder="Enter Message..." 
                            value={input} 
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={sendMessage}>
                            <FiSend size={20} />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                    <span>Select a contact to start chatting</span>
                </div>
            )}
        </div>
    );
};

export default Chatbox;
