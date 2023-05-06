import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyD3AWgmlWhnTbpr5yeAJbkM86PRuw7W2CE",
    authDomain: "summarization-fyp.firebaseapp.com",
    projectId: "summarization-fyp",
    storageBucket: "summarization-fyp.appspot.com",
    messagingSenderId: "179708193569",
    appId: "1:179708193569:web:252bb647eb9a47bd582c60",
    measurementId: "G-F5Y298QQRM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);



export { app, auth, db };
