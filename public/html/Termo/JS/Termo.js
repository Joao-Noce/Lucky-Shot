const idUsuario = sessionStorage.ID_USUARIO;

let palavraGlobal;
let totalLinhas = 5;
buscarPalavraAleatoria();
let linha = 1;

async function buscarPalavraAleatoria() {
    try {
        const resposta = await fetch("/termo/palavraAleatoria");
        const dado = await resposta.json();
        palavraGlobal = dado;
        // console.log('Palavra aleatória recebida:', palavraGlobal);
    } catch (erro) {
        console.error('Erro ao buscar palavra aleatória:', erro);
    }
    input.value = "";
    linha = 1;
    criarTabuleiro();
}


function criarTabuleiro() {
    container.innerHTML = "";
    for (let i = 0; i < totalLinhas; i++) container.innerHTML += `<div class="linha" name="linha"></div>`;
    const linhas = document.getElementsByName("linha");
    let i = 1;
    linhas.forEach(linha => {
        for (let coluna = 0; coluna < totalLinhas; coluna++) linha.innerHTML += `<div class="caixa" name="caixa${i}"></div>`;
        i++;
    });
}

async function validarSeEPalavra(palavra) {
    try {
        const envio = await fetch(`/termo/validarSeEPalavra/${palavra}`);
        const result = await envio.json();
        if (result) enviar(palavra);
        else alert("Não é uma palavra válida");
    } catch (erro) {
        console.error('Erro ao validar palavra:', erro);
    }
}


async function enviar(valor) {
    let i = 0;
    const caixas = document.getElementsByName(`caixa${linha}`);
    caixas.forEach(caixa => {
        if (palavraGlobal[i] === valor[i]) {
            caixa.style = "background-color: #7FBF60";
        } else if (palavraGlobal.includes(valor[i])) {
            caixa.style = "background-color: #F8D571";
        }
        caixa.innerHTML = valor[i].toUpperCase();
        i++;
    });
    if (palavraGlobal == valor) ganhou();
    validarLinha();
}

function validarLinha() {
    if (linha == totalLinhas) {
        registrar(false);
        Swal.fire({
            title: "Perdeeeu",
            text: `A palavra era '${palavraGlobal}'!`,
            icon: "error"
        });
    } else linha++;
}

function ganhou() {
    registrar(true);
    const caixas = document.getElementsByName(`caixa${linha}`);
    caixas.forEach(caixa => {
        caixa.style = "background-color: #7FBF60";
    });
    setTimeout(() => {
        Swal.fire({
            title: "Você ganhou!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000
        });
    }, 1500);
}

function registrar(ganhou) {
    fetch("/termo/registro", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idUsuario, ganhou
        })
    }).then(function (resposta) {
        if (!resposta.ok) console.log("Não foi possível enviar o registro para o banco de dados.");
        else console.log("Registro enviado com sucesso!");
    });
    setTimeout(() => {
        buscarPalavraAleatoria();
    }, 2000);
}

