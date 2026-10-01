import { auth, database } from "./firebaseConfig.js";

import {
    ref,
    push,
    set,
    get,
    update,
    remove
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";

const musicasRef = ref(database, "musicas");

async function criarMusica(titulo, artista, album, estilo, capaURL, audioURL) {
    const novaMusica = push(musicasRef);

    await set(novaMusica, {
        titulo,
        artista,
        album,
        estilo,
        capaURL,
        audioURL
    });
}

const botaoCriar = document.getElementById("novaMusica")
const fundoTransparente = document.getElementById("fundoTransparente")

botaoCriar.addEventListener("click", () => {
    fundoTransparente.style.display = "flex";
});

const snapshot = await get(musicasRef);

if (snapshot.exists()) {
    const musicas = snapshot.val();

}

