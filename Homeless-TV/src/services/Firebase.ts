import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../config/Firebase';

// init
export const getFirebaseConnection = () => {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    return db;
}
