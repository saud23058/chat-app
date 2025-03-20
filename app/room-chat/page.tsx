"use client";
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

interface Message {
  user: string;
  message: string;
}

const RoomChat = () => {
  const [createRoom, setCreateRoom] = useState<boolean>(true);
  const [room, setRoom] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on("receive-message", (data: Message) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, []);

  const handleJoinRoom = () => {
    if (room.trim() && username.trim()) {
      socket.emit("join-room", room);
      setCreateRoom(false);
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      socket.emit("send-message", { room, message, user: username });
      setMessage("");
    }
  };

  if (createRoom) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold my-4">Create / Join Group</h1>
        <div className="w-96 h-80 bg-white rounded-2xl text-black flex flex-col justify-center items-center p-5">
          <input
            type="text"
            className="bg-gray-200 w-72 my-4 py-2 px-2 text-black outline-none rounded-md"
            placeholder="Enter the group ID"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <input
            type="text"
            className="bg-gray-200 w-72 my-4 py-2 px-2 text-black outline-none rounded-md"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            className="bg-blue-500 py-2 px-5 rounded-md font-bold cursor-pointer text-white"
            onClick={handleJoinRoom}
          >
            Join Room
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center w-full mt-10">
        <h1 className="text-3xl font-bold my-4">Group Chat - {room}</h1>
        <div className="w-[590px] h-[400px] bg-white text-black rounded-lg p-4 overflow-auto border border-gray-300">
          {messages.map((msg, index) => (
            <p key={index} className="my-2 text-black font-medium">
              <strong>{msg.user}:</strong> {msg.message}
            </p>
          ))}
        </div>
        <div className="flex gap-3 mt-4">
          <input
            type="text"
            placeholder="Type your message"
            className="bg-white w-96 py-2 px-2 text-black outline-none rounded-md border border-gray-300"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="bg-blue-500 py-2 px-5 rounded-md font-bold cursor-pointer text-white"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    );
  }
};

export default RoomChat;
