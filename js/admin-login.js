import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
 getAuth,
 signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const admins = [
 "sarah@email.com",
 "laryssa@email.com"
];

window.loginAdmin = async function() {

 const email = document.getElementById("email").value;
 const senha = document.getElementById("senha").value;

 try {

   const cred = await signInWithEmailAndPassword(auth,email,senha);

   if(admins.includes(cred.user.email)){

      window.location.href = "admin-painel.html";

   } else {

      alert("Acesso negado.");

   }

 } catch(error){

   alert(error.message);

 }

}
