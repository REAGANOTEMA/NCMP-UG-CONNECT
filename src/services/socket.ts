// src/services/socket.ts
import { io, Socket } from "socket.io-client";

// Environment variable for the socket server URL
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

// Types
export interface IMessage {
  id: string | number;
  sender: string;
  text: string;
  time: string;
  roomId: string;
}

export interface ITyping {
  roomId: string;
  userId: string;
}

// Singleton Socket instance
let socket: Socket | null = null;

/**
 * Initialize socket connection (singleton)
 */
export const initSocket = (): Socket => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ["websocket"],
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      forceNew: true,
    });

    socket.on("connect", () => console.log("✅ Socket connected:", socket?.id));
    socket.on("disconnect", (reason) => console.log("⚠️ Socket disconnected:", reason));
    socket.on("connect_error", (err) => console.error("❌ Socket connection error:", err));
  }
  return socket;
};

/**
 * Connect socket
 */
export const connectSocket = () => {
  if (!socket) {
    console.error("❌ Socket is not initialized.");
    return;
  }
  if (!socket.connected) socket.connect();
};

/**
 * Disconnect socket
 */
export const disconnectSocket = () => {
  if (!socket) {
    console.error("❌ Socket is not initialized.");
    return;
  }
  socket.disconnect();
};

/**
 * Join a specific room
 */
export const joinRoom = (roomId: string) => {
  if (!socket) return console.error("❌ Socket is not initialized.");
  socket.emit("join_room", roomId);
};

/**
 * Send a message to a room
 */
export const sendMessage = (roomId: string, message: IMessage) => {
  if (!socket) return console.error("❌ Socket is not initialized.");
  socket.emit("send_message", message);
};

/**
 * Listen for incoming messages
 */
export const onMessage = (callback: (message: IMessage) => void) => {
  if (!socket) return console.error("❌ Socket is not initialized.");
  socket.on("receive_message", callback);
};

/**
 * Typing notifications
 */
export const typing = ({ roomId, userId }: ITyping) => {
  if (!socket) return console.error("❌ Socket is not initialized.");
  socket.emit("typing", { roomId, userId });
};

/**
 * Listen for typing notifications
 */
export const onTyping = (callback: (data: ITyping) => void) => {
  if (!socket) return console.error("❌ Socket is not initialized.");
  socket.on("typing", callback);
};

/**
 * Message read events
 */
export const messageRead = (roomId: string, messageId: string | number) => {
  if (!socket) return console.error("❌ Socket is not initialized.");
  socket.emit("message_read", { roomId, messageId });
};

/**
 * Listen for read messages
 */
export const onMessageRead = (callback: (messageId: string | number) => void) => {
  if (!socket) return console.error("❌ Socket is not initialized.");
  socket.on("message_read", callback);
};

/**
 * Leave a room
 */
export const leaveRoom = (roomId: string) => {
  if (!socket) return console.error("❌ Socket is not initialized.");
  socket.emit("leave_room", roomId);
};