import { auth, database } from "./firebaseConfig.js";
import { ref, push, set, get } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";

const musicasRef = ref(database, "musicas");

async function criarMusica(titulo, artista, estilo, capaURL, audioURL) {
    const novaMusica = push(musicasRef);
    await set(novaMusica, { titulo, artista, estilo, capaURL, audioURL});
};

// CREATE

const botaoCriar = document.getElementById("novaMusica");
const fundoTransparente = document.getElementById("fundoTransparente");

botaoCriar.addEventListener("click", () => {
    fundoTransparente.style.display = "flex";
});

const botaoVoltar = document.getElementById("voltar")

botaoVoltar.addEventListener("click", () => {
    fundoTransparente.style.display = "none";
});

const titulo = document.getElementById("titulo");
const artista = document.getElementById("artista");
const estilo = document.getElementById("estilo");
const capaURL = document.getElementById("capaURL");
const audioURL = document.getElementById("audioURL");

const salvarMusica = document.getElementById("salvarMusica");

async function enviarImagemCloudinary(arquivo) {
    const formData = new FormData();

    formData.append("file", arquivo);
    formData.append("upload_preset", "pvmsaygd");

    const resposta = await fetch(
        "https://api.cloudinary.com/v1_1/kbraoyzh/image/upload",
        {
            method: "POST",
            body: formData
        }
    );

    const dados = await resposta.json();

    return dados.secure_url;
}

salvarMusica.addEventListener("click", async () => {

    const arquivoImagem = capaURL.files[0];
    const urlImagem = await enviarImagemCloudinary(arquivoImagem);
    if (
        titulo.value === "" || artista.value === "" || estilo.value === "" || arquivoImagem === undefined || audioURL.value === "") {
        return alert("Preencha todos os campos!!!")
    }

    await criarMusica(
        titulo.value,
        artista.value,
        estilo.value,
        urlImagem,
        audioURL.value
    );
    fundoTransparente.style.display = "none";

    titulo.value = "";
    artista.value = "";
    estilo.value = "";
    capaURL.value = "";
    audioURL.value = "";
});

// READ

const listarMusicas = document.getElementById("listaMusicas")
const descricao = document.querySelector(".descricao");

async function listarMusica() {
    const snapshot = await get(musicasRef);

    if (snapshot.exists()) {
        const musicas = snapshot.val()
        for (const id in musicas) {
            const musica = musicas[id];
            const li = document.createElement("li");
            const img = document.createElement("img");
            img.src = musica.capaURL;
            li.appendChild(img);
            const texto = document.createElement("span");
            texto.textContent = `${musica.titulo} | ${musica.artista}`;
            li.appendChild(texto);
            li.addEventListener("click", () => {
                descricao.innerHTML = `
                <img src="${musica.capaURL}"> 
                <h2>${musica.titulo}</h2>
                <p>${musica.artista}</p>
                <p>${musica.estilo}</p>`;
            });
            listarMusicas.appendChild(li);
        }
    }
}
listarMusica()



