import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// CONFIGURAÇÃO FIREBASE

const firebaseConfig = {
  apiKey: "AIzaSyBkLBbm6gwbRfW16vA4YucU9MWQP9rtfCg",
  authDomain: "ls-fotostory.firebaseapp.com",
  projectId: "ls-fotostory",
  storageBucket: "ls-fotostory.firebasestorage.app",
  messagingSenderId: "281416299489",
  appId: "1:281416299489:web:c011bf6af5f463a7dd8a0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// FUNÇÃO DE AGENDAMENTO

window.enviarAgendamento = async function () {

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;
  const data = document.getElementById("data").value;
  const hora = document.getElementById("hora").value;
  const responsavel = document.getElementById("responsavel").value;
  const mensagem = document.getElementById("mensagem").value;

  if (!nome || !email || !telefone || !data || !hora) {
    alert("Preencha todos os campos.");
    return;
  }

  try {

    await addDoc(collection(db, "agendamentos"), {

      nome: nome,
      email: email,
      telefone: telefone,
      data: data,
      hora: hora,
      responsavel: responsavel,
      mensagem: mensagem,
      status: "pendente",
      criadoEm: new Date()

    });

    alert("Agendamento enviado com sucesso! 📸");

    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("data").value = "";
    document.getElementById("hora").value = "";
    document.getElementById("mensagem").value = "";

  } catch (error) {

    console.error(error);
    alert("Erro ao enviar agendamento: " + error.message);

  }

};
