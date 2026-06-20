import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBkLBbm6gwbRfW16vA4YucU9MWQP9rtfCg",
  authDomain: "ls-fotostory.firebaseapp.com",
  projectId: "ls-fotostory",
  storageBucket: "ls-fotostory.firebasestorage.app",
  messagingSenderId: "281416299489",
  appId: "1:281416299489:web:c011bf6af5f463a7dd8a0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// LOGIN COM GOOGLE
window.loginGoogle = async function () {
  try {
    await signInWithPopup(auth, provider);
    window.location.href = "inicio.html";
  } catch (error) {
    alert(error.message);
  }
};

// CRIAR CONTA
window.cadastrar = async function () {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    await createUserWithEmailAndPassword(auth, email, senha);
    alert("Conta criada com sucesso!");
  } catch (error) {
    alert(error.message);
  }
};

// LOGIN COM E-MAIL
window.loginEmail = async function () {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    await signInWithEmailAndPassword(auth, email, senha);
    window.location.href = "inicio.html";
  } catch (error) {
    alert(error.message);
  }
};
