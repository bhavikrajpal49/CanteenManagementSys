import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDZBWseT7cgz_H2Ajg5YyJxW6QzI-FDws4",
    authDomain: "canteenprj.firebaseapp.com",
    projectId: "canteenprj",
    storageBucket: "canteenprj.appspot.com",
    messagingSenderId: "338788462140",
    appId: "1:338788462140:web:14eafb95195dc2c8bddd39",
    measurementId: "G-QXFMYXP44Q"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);


export { app, firestore, storage};
