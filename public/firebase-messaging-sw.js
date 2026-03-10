// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAWuqmL_8034b3nymBm5DgR9_A0y8S5uog",
  authDomain: "ncmp-uganda-connect.firebaseapp.com",
  projectId: "ncmp-uganda-connect",
  storageBucket: "ncmp-uganda-connect.firebasestorage.app",
  messagingSenderId: "330187094477",
  appId: "1:330187094b3c08c1eff2c84",
  measurementId: "G-95GRJP9FTC"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification?.title || "NCMP Notification";
  const notificationOptions = {
    body: payload.notification?.body || '',
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});