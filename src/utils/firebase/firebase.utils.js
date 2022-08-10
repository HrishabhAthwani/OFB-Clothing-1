import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithPopup,
    signInWithRedirect ,
    GoogleAuthProvider
} from 'firebase/auth';

import { getFirestore, doc,getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyASaN_VG99nz6cLlxTVNEhAvrMl_gR-Mw8",
    authDomain: "ofb-clothing-db.firebaseapp.com",
    projectId: "ofb-clothing-db",
    storageBucket: "ofb-clothing-db.appspot.com",
    messagingSenderId: "980844865257",
    appId: "1:980844865257:web:f9ee58138549137911b278"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect= () =>signInWithRedirect(auth, googleProvider)

export const db = getFirestore();

export const createUserDocumentWithAuth = async(userAuth)=>{
    const userDocRef = doc(db,'users',userAuth.uid)
    const userSnapshot = await getDoc(userDocRef)

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt
            })
        } catch (error) {
            console.log('Error creating user',error);
        }
    }

    return userDocRef;
}
