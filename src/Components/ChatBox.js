import { useEffect, useState } from "react";
import { createChat, getUserChats, sendMessageToChat } from "../api/chatApi";
import { BsRobot, BsPerson } from "react-icons/bs";
import { Tooltip } from "react-tooltip";

const userId = sessionStorage.getItem("userId");

const ChatBox = () => {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const fetchChats = async () => {
      const data = await getUserChats(userId);
      setChats(data);
      if (data.length > 0) setActiveChat(data[0]);
    };
    console.log("Fetching chats...");
    fetchChats();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    setIsTyping(true);

    if (!activeChat) {
      const newChat = await createChat(userId, input);
      setActiveChat(newChat);
      setChats([newChat, ...chats]);
    } else {
      const updatedChat = await sendMessageToChat(activeChat._id, input);
      setActiveChat(updatedChat);
      setChats((prev) =>
        prev.map((c) => (c._id === updatedChat._id ? updatedChat : c))
      );
    }

    setInput("");
    setTimeout(() => setIsTyping(false), 1500); // Simulated typing delay
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp || Date.now());
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 border border-gray-200 rounded-2xl shadow-xl bg-gradient-to-br from-white via-blue-50 to-white p-6">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-blue-700">💬 Medical Assistant</h2>
        <p className="text-sm text-gray-500">Ask your health questions!</p>
      </div>

      <div className="h-[400px] overflow-y-auto border rounded-xl bg-white shadow-inner p-4 space-y-3 mb-4 scroll-smooth">
        {activeChat?.chat?.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-end gap-2 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role !== "user" && (
              <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center">
                <BsRobot className="text-blue-800" />
              </div>
            )}
            <div
              className={`max-w-xs px-4 py-2 rounded-lg relative group ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
              data-tooltip-id={`tooltip-${idx}`}
              data-tooltip-content={msg.content.length > 20 ? msg.content : ""}
            >
              <p className="text-sm font-semibold">
                {msg.role === "user" ? "You" : "Gemini"}
              </p>
              <p className="mt-1">{msg.content}</p>
              <span className="absolute text-[10px] right-1 bottom-[-18px] text-gray-400 group-hover:opacity-100 opacity-0 transition-opacity">
                {formatTime(msg.timestamp)}
              </span>
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
                <BsPerson />
              </div>
            )}
            <Tooltip id={`tooltip-${idx}`} place="top" />
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-sm text-gray-500 animate-pulse">
            <BsRobot className="text-blue-500" />
            Gemini is typing...
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded-full shadow-md font-medium"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
