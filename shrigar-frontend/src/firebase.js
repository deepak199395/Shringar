import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC7JrcOX3F_EuAmf2__gK26IeSBDFYme8M",
  authDomain: "shringaars.firebaseapp.com",
  projectId: "shringaars",
  appId: "1:120819403786:web:8edc0094ae5f449f1263f3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);