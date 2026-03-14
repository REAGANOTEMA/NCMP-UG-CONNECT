// src/services/firebase.ts
import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
  Messaging
} from "firebase/messaging";

// Firebase configuration from Vite environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

let messaging: Messaging | null = null;

/**
 * Initialize Firebase Cloud Messaging (only if supported)
 */
export const initMessaging = async (): Promise<void> => {
  const supported = await isSupported();
  if (supported) {
    messaging = getMessaging(app);
    console.log("✅ Firebase Messaging initialized");
  } else {
    console.warn("⚠️ Firebase Messaging not supported in this browser");
  }
};

/**
 * Request FCM token from user browser
 */
export const requestFirebaseToken = async (): Promise<string | null> => {
  if (!messaging) {
    console.warn("⚠️ Messaging not initialized");
    return null;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("⚠️ Notification permission denied");
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });

    if (token) {
      console.log("📩 FCM Token:", token);
      return token;
    }

    console.warn("⚠️ No FCM token received");
    return null;

  } catch (error) {
    console.error("❌ Firebase token error:", error);
    return null;
  }
};

/**
 * Listen for foreground messages
 */
export const onMessageListener = (callback: (payload: any) => void) => {
  if (!messaging) return;

  onMessage(messaging, (payload) => {
    console.log("📨 Foreground notification:", payload);
    callback(payload);
  });
};

// Default export (Firebase App instance)
export default app;