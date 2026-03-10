import { io, Socket } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

let socket: Socket | null = null;

export const initSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, { transports: ["websocket"], autoConnect: false });
  }
  return socket;
};

export const connectSocket = () => socket?.connect();
export const disconnectSocket = () => socket?.disconnect();

export const joinRoom = (roomId: string) => socket?.emit("join_room", roomId);
export const sendMessage = (roomId: string, message: any) =>
  socket?.emit("send_message", { roomId, message });
export const onMessage = (callback: (message: any) => void) =>
  socket?.on("receive_message", callback);
export const onTyping = (callback: (data: any) => void) =>
  socket?.on("typing", callback);
export const typing = (roomId: string, userId: string) =>
  socket?.emit("typing", { roomId, userId });
export const onMessageRead = (callback: (data: any) => void) =>
  socket?.on("message_read", callback);
export const messageRead = (roomId: string, messageId: string) =>
  socket?.emit("message_read", { roomId, messageId });