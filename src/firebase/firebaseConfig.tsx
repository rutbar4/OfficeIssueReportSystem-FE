import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyAsOyVjUPGzYFMJG5cOEYZXdrMCFmfLaQk',
    authDomain: 'office-issue-registration-app.firebaseapp.com',
    projectId: 'office-issue-registration-app',
    storageBucket: 'office-issue-registration-app.appspot.com',
    messagingSenderId: '524972814565',
    appId: '1:524972814565:web:b1697553c1555aa42ba40c',
    measurementId: 'G-FPC1XZEVWS'
};


const firebase = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(firebase);
const  storage = getStorage(firebase);


export {firebase, db, storage};
