import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🔥 CONFIG FIREBASE
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// =========================
// ENVIO DO FORMULÁRIO
// =========================
document.getElementById("formAgendamento").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;
  const responsavel = document.getElementById("responsavel").value;
  const data = document.getElementById("data").value;
  const hora = document.getElementById("hora").value;
  const mensagem = document.getElementById("mensagem").value;

  // 🔥 SALVAR NO FIREBASE
  await addDoc(collection(db, "agendamentos"), {
    nome,
    email,
    telefone,
    responsavel,
    data,
    hora,
    mensagem,
    status: "pendente"
  });

  // 📲 WHATSAPP AUTOMÁTICO
  const texto = `
📸 Novo Agendamento - LS Fotostory

👤 Nome: ${nome}
📧 Email: ${email}
📞 Telefone: ${telefone}
📅 Data: ${data}
⏰ Hora: ${hora}
📷 Responsável: ${responsavel}
📝 Mensagem: ${mensagem}
`;

  let numero = "";

  if (responsavel === "Sarah") {
    numero = "5542988641120";
  } else {
    numero = "5542984393172";
  }

  const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

  window.open(url, "_blank");

  alert("Agendamento enviado com sucesso!");

  document.getElementById("formAgendamento").reset();
});
