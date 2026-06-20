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

// ===================
// FIREBASE
// ===================

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
const auth = getAuth(app);

// ===================
// EMAILJS
// ===================

emailjs.init("Vq9GLoYjeoRzcCfx0");

// ===================
// PROTEÇÃO DO PAINEL
// ===================

onAuthStateChanged(auth, (user) => {

  if (!user) {
    window.location.href = "index.html";
  } else {
    carregarAgendamentos();
  }

});

// ===================
// CARREGAR AGENDAMENTOS
// ===================

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

        <p>📅 ${data.data}</p>

        <p>⏰ ${data.hora}</p>

        <p>📷 ${data.responsavel}</p>

        <p>📝 ${data.mensagem}</p>

        <p><strong>Status:</strong> ${data.status}</p>

        <button onclick="atualizarStatus(
          '${item.id}',
          'confirmado',
          '${data.email}',
          '${data.nome}',
          '${data.data}',
          '${data.hora}',
          '${data.responsavel}'
        )">

        Confirmar

        </button>

        <button onclick="atualizarStatus(
          '${item.id}',
          'cancelado',
          '${data.email}',
          '${data.nome}',
          '${data.data}',
          '${data.hora}',
          '${data.responsavel}'
        )">

        Cancelar

        </button>

      </div>

    `;
  });

}

// ===================
// ATUALIZAR STATUS
// ===================

window.atualizarStatus = async function (
  id,
  status,
  email,
  nome,
  dataEvento,
  hora,
  responsavel
) {

  const refDoc = doc(db, "agendamentos", id);

  await updateDoc(refDoc, {
    status: status
  });

  if (status === "confirmado") {

    emailjs.send(
      "service_kos1zv6",
      "template_fps1y8j",
      {
        nome: nome,
        data: dataEvento,
        hora: hora,
        responsavel: responsavel,
        email: email
      }
    )

    .then(() => {

      alert("Agendamento confirmado e e-mail enviado!");

      location.reload();

    })

    .catch((error) => {

      console.log(error);

      alert("Agendamento confirmado, mas ocorreu erro ao enviar o e-mail.");

      location.reload();

    });

  } else {

    alert("Agendamento cancelado.");

    location.reload();

  }

};

// ===================
// LOGOUT
// ===================

window.logout = async function () {

  await signOut(auth);

  window.location.href = "index.html";

};
