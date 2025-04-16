import React, { useState, useEffect } from "react";
import { FaComments } from "react-icons/fa";
import io from "socket.io-client";

const socket = io("http://localhost:8000", {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  transports: ['websocket', 'polling'],
});

const ChatIcon = ({ onClick, userId }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!userId) return;

    socket.auth = { userId };
    socket.connect();

    socket.on("newMessage", (message) => {
      if (message.recipientId === userId && message.senderId !== userId) {
        setUnreadCount((prev) => prev + 1);
        // console.log("Unread message count incremented:", message);
      }
    });

    socket.on("connect_error", (err) => {
      // console.error("ChatIcon WebSocket error:", err.message);
    });

    return () => {
      socket.off("newMessage");
      socket.off("connect_error");
      socket.disconnect();
    };
  }, [userId]);

  const handleClick = () => {
    setUnreadCount(0);
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none z-50"
    >
      <FaComments className="w-6 h-6" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
          {unreadCount}
        </span>
      )}
    </button>
  );
};

export default ChatIcon;