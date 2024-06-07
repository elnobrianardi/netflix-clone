import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyC1YW7q5S0E7uBiacrDW04pK0RQ7wJjvNw",
  authDomain: "netflix-clone-5153f.firebaseapp.com",
  projectId: "netflix-clone-5153f",
  storageBucket: "netflix-clone-5153f.appspot.com",
  messagingSenderId: "964934746704",
  appId: "1:964934746704:web:0d6d8e5833d2276aa70755",
  measurementId: "G-JWB9LWKNQY",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error)
    toast.error(error.code.split('/')[1].split('-').join(' '))
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error)
    toast.error(error.code.split('/')[1].split('-').join(' '))
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, signup, login, logout };