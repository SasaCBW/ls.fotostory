import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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
const auth = getAuth(app);

// 🔐 LOGIN ADMIN
onAuthStateChanged(auth, (user) => {

  if (!user) {
    window.location.href = "index.html";
  } else {
    carregarAgendamentos();
  }

});

// 📋 LISTAR AGENDAMENTOS
async function carregarAgendamentos() {

  const snap = await getDocs(collection(db, "agendamentos"));

  const lista = document.getElementById("listaAgendamentos");

  lista.innerHTML = "";

  snap.forEach((item) => {

    const data = item.data();

    lista.innerHTML += `
      <div class="album">

        <h3>${data.nome}</h3>

        <p>📧 ${data.email}</p>
        <p>📞 ${data.telefone}</p>
        <p>📅 ${data.data} - ${data.hora}</p>
        <p>📷 ${data.responsavel}</p>
        <p>📝 ${data.mensagem}</p>

        <p><b>Status:</b> ${data.status}</p>

        <button onclick="atualizarStatus('${item.id}', 'confirmado')">Confirmar</button>
        <button onclick="atualizarStatus('${item.id}', 'cancelado')">Cancelar</button>

      </div>
    `;
  });
}

// 🔄 ATUALIZAR STATUS
window.atualizarStatus = async function (id, status) {

  const refDoc = doc(db, "agendamentos", id);

  await updateDoc(refDoc, {
    status: status
  });

  alert("Status atualizado!");

  location.reload();
};

// 🚪 LOGOUT
window.logout = async function () {
  await signOut(auth);
  window.location.href = "index.html";
};
