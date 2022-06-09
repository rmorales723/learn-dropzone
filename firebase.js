// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCM08WlR07ox5T9g3Mh7-4Zh9Qwn49EHws",
  authDomain: "learn-dropzone-d4a79.firebaseapp.com",
  projectId: "learn-dropzone-d4a79",
  storageBucket: "learn-dropzone-d4a79.appspot.com",
  messagingSenderId: "98776204570",
  appId: "1:98776204570:web:27cf5d0d50e5ecf09d98a3"
};

// Initialize Firebase
const app = !getApps().length ?  initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export {app,db,storage}