import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

import {
  getAuth,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// 🔥 SUA CONFIG FIREBASE
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_SENDER",
  appId: "SEU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// ======================
// UPLOAD DE FOTOS
// ======================
window.uploadFotos = async function () {

  const album = document.getElementById("album").value;
  const files = document.getElementById("files").files;

  if (!album || files.length === 0) {
    alert("Preencha tudo!");
    return;
  }

  for (let file of files) {

    const storageRef = ref(storage, `albuns/${album}/${file.name}`);

    await uploadBytes(storageRef, file);

    const url = await getDownloadURL(storageRef);

    await addDoc(collection(db, "fotos"), {
      album: album,
      url: url,
      nome: file.name,
      data: new Date()
    });
  }

  alert("Fotos enviadas com sucesso!");
  carregarAlbuns();
};

// ======================
// LISTAR ÁLBUNS
// ======================
async function carregarAlbuns() {

  const snap = await getDocs(collection(db, "fotos"));

  const lista = document.getElementById("listaAlbuns");

  lista.innerHTML = "";

  snap.forEach(doc => {

    const data = doc.data();

    lista.innerHTML += `
      <div class="album">
        <img src="${data.url}">
        <h3>${data.album}</h3>
      </div>
    `;
  });
}

carregarAlbuns();

// ======================
// LOGOUT
// ======================
window.logout = async function () {
  await signOut(auth);
  window.location.href = "index.html";
};
