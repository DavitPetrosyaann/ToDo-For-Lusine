/**
 * Firebase client for ToDo For Lusine (shared prezento-am project, same public web config as
 * the other PreZento client projects). Only callable Functions are used — no Auth provider
 * changes and no direct Firestore access from the browser.
 */
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDwJEj0oXvx31yWeudw6C3t3BkrddQL2O4',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'prezento-am.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'prezento-am',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'prezento-am.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '256635255649',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:256635255649:web:04a17a03285b29fb5ee320',
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const functions = getFunctions(app, 'us-central1');
