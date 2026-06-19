// IMPORTAÇÕES FIREBASE

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getAuth,
GoogleAuthProvider,
signInWithPopup,
signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// CONFIGURAÇÃO DO FIREBASE

const firebaseConfig = {

apiKey: "SUA_API_KEY",

authDomain: "SEU_PROJETO.firebaseapp.com",

projectId: "SEU_PROJETO",

storageBucket: "SEU_PROJETO.appspot.com",

messagingSenderId: "000000000000",

appId: "SEU_APP_ID"

};


// INICIALIZAÇÃO

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();


// LOGIN GOOGLE

window.loginGoogle = async function(){

try{

const result = await signInWithPopup(
auth,
provider
);

const user = result.user;

alert(
"Bem-vindo, " + user.displayName
);

window.location.href =
"inicio.html";

}catch(error){

console.error(error);

alert(
"Erro ao entrar."
);

}

}


// LOGOUT

window.logout = async function(){

await signOut(auth);

window.location.href =
"index.html";

}
