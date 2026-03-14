import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

/*
====================================
Initialize Services
====================================
*/

// Socket
import { initSocket, connectSocket } from "@/services/socket";

// Firebase Messaging
import { initMessaging } from "@/services/firebase";

/*
====================================
Start Services
====================================
*/

async function initializeServices() {
  try {
    // Initialize Socket
    initSocket();
    connectSocket();

    // Initialize Firebase messaging
    await initMessaging();
  } catch (error) {
    console.error("❌ Service initialization failed:", error);
  }
}

initializeServices();

/*
====================================
Render React App
====================================
*/

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("❌ Root element not found");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);