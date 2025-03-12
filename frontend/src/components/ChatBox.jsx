import React, { useState, useEffect, useRef } from "react";
import { FaTimes, FaPaperclip, FaPaperPlane } from "react-icons/fa";
import io from "socket.io-client";

const socket = io("http://localhost:8000", {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  transports: ["websocket"],
});

const ChatBox = ({ isOpen, onClose, userId, recipientId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!userId || !recipientId || !isOpen) return;

    console.log("ChatBox initializing - User ID:", userId, "Recipient ID:", recipientId);

    socket.auth = { userId };
    socket.connect();

    socket.on("connect", () => {
      console.log("WebSocket connected for user:", userId);
      setError(null);
    });

    socket.on("newMessage", (message) => {
      console.log("Received newMessage:", message);
      setMessages((prev) => {
        const isDuplicate = prev.some(
          (m) => m.content === message.content && m.senderId === message.senderId && m.createdAt === message.createdAt
        );
        if (!isDuplicate) {
          const tempIndex = prev.findIndex((m) => m._id.startsWith("temp-") && m.content === message.content);
          if (tempIndex !== -1) {
            const updatedMessages = [...prev];
            updatedMessages[tempIndex] = message;
            return updatedMessages;
          }
          return [...prev, message];
        }
        return prev;
      });
    });

    socket.on("connect_error", (err) => {
      console.error("WebSocket connect_error:", err.message);
      setError("Connection error: " + err.message);
    });

    socket.on("disconnect", (reason) => console.log("WebSocket disconnected:", reason));

    return () => {
      socket.off("connect");
      socket.off("newMessage");
      socket.off("connect_error");
      socket.off("disconnect");
      socket.disconnect();
      console.log("Socket disconnected for user:", userId);
    };
  }, [userId, recipientId, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() && !selectedFile) return;

    let fileUrl = null;
    let fileType = null;

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      try {
        const response = await fetch("http://localhost:3000/chat/upload", {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`File upload failed: ${response.status} - ${errorText}`);
        }
        const data = await response.json();
        fileUrl = data.fileUrl;
        fileType = selectedFile.type;
        console.log("File uploaded successfully:", { fileUrl, fileType });
      } catch (error) {
        console.error("Error uploading file:", error.message);
        setError("Failed to upload file: " + error.message);
        return;
      }
    }

    const tempId = `temp-${Date.now()}`;
    const message = {
      senderId: userId,
      recipientId: recipientId,
      content: newMessage || "",
      fileUrl,
      fileType,
      createdAt: new Date().toISOString(),
    };

    console.log("Sending message:", message);
    setMessages((prev) => [...prev, { ...message, _id: tempId }]);
    socket.emit("sendMessage", message);

    setNewMessage("");
    setSelectedFile(null);
    setError(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type.startsWith("image/") || file.type === "application/pdf")) {
      setSelectedFile(file);
      console.log("File selected:", file.name, "Type:", file.type);
    } else {
      setError("Please select an image (.jpg, .png) or PDF file.");
      setSelectedFile(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-16 right-4 w-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl z-50 border border-gray-700 overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
      <div className="flex justify-between items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-t-2xl">
        <h3 className="text-lg font-semibold tracking-wide">ChatSphere</h3>
        <button onClick={onClose} className="text-white hover:text-gray-200 focus:outline-none transition-transform hover:scale-110">
          <FaTimes className="w-5 h-5" />
        </button>
      </div>
      <div className="h-72 overflow-y-auto p-4 bg-gray-800 space-y-4 scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-700">
        {error ? (
          <p className="text-red-400 text-center font-medium">{error}</p>
        ) : messages.length === 0 ? (
          <p className="text-gray-400 text-center italic">Start a cosmic conversation...</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`flex ${msg.senderId === userId ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-xl shadow-md transition-all duration-200 ${
                  msg.senderId === userId
                    ? "bg-indigo-500 text-white rounded-br-none hover:bg-indigo-600"
                    : "bg-gray-700 text-gray-100 rounded-bl-none hover:bg-gray-600"
                }`}
              >
                {msg.content && <p className="text-sm font-light">{msg.content}</p>}
                {msg.fileUrl ? (
                  <div className="mt-2">
                    {msg.fileType && msg.fileType.startsWith("image/") ? (
                      <img
                        src={`http://localhost:3000${msg.fileUrl}`}
                        alt="Sent image"
                        className="max-w-full h-auto rounded-lg border border-gray-600 hover:opacity-90 transition-opacity"
                        onError={(e) => console.error("Image load error:", msg.fileUrl)}
                      />
                    ) : msg.fileType === "application/pdf" ? (
                      <a
                        href={`http://localhost:3000${msg.fileUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 text-sm"
                      >
                        <FaPaperclip /> PDF Attachment
                      </a>
                    ) : (
                      <p className="text-red-400">Unsupported file type</p>
                    )}
                  </div>
                ) : null}
                <p className="text-xs text-gray-300 mt-1 opacity-75">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="p-4 bg-gray-900 border-t border-gray-700">
        <div className="flex items-center gap-3">
          <label className="cursor-pointer text-gray-400 hover:text-indigo-400 transition-colors">
            <FaPaperclip className="w-5 h-5" />
            <input
              type="file"
              accept="image/jpeg,image/png,application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Send a message..."
            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-100 placeholder-gray-500 transition-all duration-200"
          />
          <button
            type="submit"
            className="bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-600 focus:outline-none transition-all duration-200 hover:scale-105"
          >
            <FaPaperPlane className="w-5 h-5" />
          </button>
        </div>
        {selectedFile && (
          <p className="text-xs text-indigo-400 mt-2 truncate">Selected: {selectedFile.name}</p>
        )}
      </form>
    </div>
  );
};

export default ChatBox;