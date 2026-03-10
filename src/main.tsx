import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Initialize Socket
import { initSocket, connectSocket } from "@/services/socket";
const socket = initSocket();
connectSocket();

// Initialize Firebase (push notifications)
import "@/firebase";

// Render React App
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);