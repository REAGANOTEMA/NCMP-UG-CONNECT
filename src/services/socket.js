import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

let socket = null;

export const initSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, { transports: ["websocket"], autoConnect: false });
  }
  return socket;
};

export const connectSocket = () => socket?.connect();
export const disconnectSocket = () => socket?.disconnect();

export const joinRoom = (roomId) => socket?.emit("join_room", roomId);
export const sendMessage = (roomId, message) => socket?.emit("send_message", { roomId, message });
export const onMessage = (callback) => socket?.on("receive_message", callback);
export const typing = (roomId, userId) => socket?.emit("typing", { roomId, userId });
export const onMessageRead = (callback) => socket?.on("message_read", callback);
export const messageRead = (roomId, messageId) => socket?.emit("message_read", { roomId, messageId });