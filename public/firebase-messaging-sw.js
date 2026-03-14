importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAWuqmL_8034b3nymBm5DgR9_A0y8S5uog",
  authDomain: "ncmp-uganda-connect.firebaseapp.com",
  projectId: "ncmp-uganda-connect",
  storageBucket: "ncmp-uganda-connect.appspot.com",
  messagingSenderId: "330187094477",
  appId: "1:330187094477:web:b882a96819c08c1eff2c84"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("📩 Background message:", payload);

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/ncmp-logo.png"
  });
});