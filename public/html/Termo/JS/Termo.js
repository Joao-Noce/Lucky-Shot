const idUsuario = sessionStorage.ID_USUARIO;

let palavraGlobal;
let totalLinhas = 6;
buscarPalavraAleatoria();
let linhaValue = 1;

async function buscarPalavraAleatoria() {
    if (sessionStorage.ID_USUARIO == undefined && sessionStorage.JOGOU_TERMO == undefined) sessionStorage.JOGOU_TERMO = true;
    else if (sessionStorage.ID_USUARIO == undefined && sessionStorage.JOGOU_TERMO != undefined) {
        Swal.fire({
            position: "center",
            icon: "question",
            title: "E aí, gostou?",
            text: `Para jogar mais, basta se cadastrar!`,
            confirmButtonText: "Cadastrar",
            confirmButtonColor: "#2C6B91",
            denyButtonColor: "#EE675C",
            showDenyButton: true,
            denyButtonText: "Sair"
        }).then(function (resposta) {
            let destino;
            if (resposta.isConfirmed) destino = "../../../login.html";
            else destino = "../../../index.html"
            setTimeout(() => {
                window.location.href = destino;
            }, 1000);

        })
    }
    try {
        const resposta = await fetch("/termo/palavraAleatoria");
        const dado = await resposta.json();
        palavraGlobal = dado;
    } catch (erro) {
        console.error('Erro ao buscar palavra aleatória:', erro);
    }
    linhaValue = 1;
    criarTabuleiro();
}


function criarTabuleiro() {
    container.innerHTML = "";
    for (let i = 0; i < totalLinhas; i++) container.innerHTML += `<div class="linha" name="linha"></div>`;
    const linhas = document.getElementsByName("linha");
    let numeroLinha = 1;
    linhas.forEach(linha => {
        for (let coluna = 1; coluna <= 5; coluna++) {
            if (numeroLinha == linhaValue) linha.innerHTML += `<input type="text" maxlength="1" class="caixa" name="caixa${numeroLinha}" id="caixa${numeroLinha}${coluna}" onkeydown="voltarFoco(event, ${numeroLinha}${coluna})" oninput="moverFoco(${numeroLinha}${coluna})" onfocus="sobrepor('caixa${numeroLinha}${coluna}')" onclick="sobrepor('caixa${numeroLinha}${coluna}')">`;
            else linha.innerHTML += `<input type="text" maxlength="1" class="caixa" name="caixa${numeroLinha}" id="caixa${numeroLinha}${coluna}" disabled onkeydown="voltarFoco(event, ${numeroLinha}${coluna})" oninput="moverFoco(${numeroLinha}${coluna})" onfocus="sobrepor('caixa${numeroLinha}${coluna}')" onclick="sobrepor('caixa${numeroLinha}${coluna}')">`;
        }
        numeroLinha++;
    });
    document.getElementById("caixa11").focus();
}

async function validarSeEPalavra() {
    const caixas = document.getElementsByName(`caixa${linhaValue}`);
    let palavra = "";
    caixas.forEach(caixa => {
        palavra += caixa.value;
    });

    try {
        const envio = await fetch(`/termo/validarSeEPalavra/${palavra}`);
        const result = await envio.json();
        if (result) enviar(palavra);
        else balancar(caixas);
    } catch (erro) {
        console.error('Erro ao validar palavra:', erro);
    }
}

function balancar(caixas) {

    caixas.forEach(caixa => {
        caixa.classList.add('balancar');
        caixa.addEventListener('animationend', () => {
            caixa.classList.remove('balancar');
        }, { once: true });
    });
}

async function enviar(valor) {
    let i = 0;
    let minusculo = valor.toLowerCase();
    let maiusculo = valor.toUpperCase();

    const caixas = document.getElementsByName(`caixa${linhaValue}`);
    caixas.forEach(caixa => {
        if (palavraGlobal[i] === minusculo[i]) {
            caixa.style = "background-color: #7FBF60";
            document.getElementById(`tecla${maiusculo[i]}`).style = "background-color: #7FBF60";
        } else if (palavraGlobal.includes(minusculo[i])) {
            caixa.style = "background-color: #F8D571";
            document.getElementById(`tecla${maiusculo[i]}`).style = "background-color: #F8D571";
        } else document.getElementById(`tecla${maiusculo[i]}`).style = "background-color: transparent  ; color: transparent";
        i++;
    });
    if (palavraGlobal == minusculo) ganhou();
    validarLinha();
}

function validarLinha() {
    if (linhaValue == totalLinhas) {
        registrar(false);
        Swal.fire({
            title: "Perdeeeu",
            text: `A palavra era '${palavraGlobal}'!`,
            icon: "error"
        });
    } else {
        let caixas = document.getElementsByName(`caixa${linhaValue}`);
        caixas.forEach(caixa => {
            caixa.disabled = true;
            caixa.style.border = "none;";
        });
        linhaValue++;
        caixas = document.getElementsByName(`caixa${linhaValue}`);
        caixas.forEach(caixa => {
            caixa.disabled = false;
        });
        caixas[0].focus();
    }
}

function ganhou() {
    registrar(true);
    const caixas = document.getElementsByName(`caixa${linhaValue}`);
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
const teclas = document.getElementsByName("tecla");

function registrar(ganhou) {
    teclas.forEach(tecla => {
        tecla.style = "background-color: rgba(0, 0, 0, 0.5); color: #F1F1F1;";
    });

    if (sessionStorage.ID_USUARIO != undefined) {
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
    }
    setTimeout(() => {
        buscarPalavraAleatoria();
    }, 2000);
}

function sobrepor(id) {
    const caixaId = document.getElementById(id);
    const caixas = document.getElementsByName(`caixa${linhaValue}`);

    caixas.forEach(caixa => { caixa.style = "border: none"; });

    caixaId.style = "border-bottom: solid white 2px";
}

function moverFoco(colunaAtual) {
    const proximoInput = document.getElementById(`caixa${colunaAtual + 1}`);
    if (proximoInput && !proximoInput.disabled) proximoInput.focus();
}

function voltarFoco(event, colunaAtual) {
    const inputSucessor = document.getElementById(`caixa${colunaAtual + 1}`);
    const inputAtual = document.getElementById(`caixa${colunaAtual}`);
    const inputAnterior = document.getElementById(`caixa${colunaAtual - 1}`);

    if (event.key === "Backspace") {
        if (inputAtual.value !== "") inputAtual.value = "";
        else if (inputAnterior && !inputAnterior.disabled) {
            inputAnterior.value = "";
            setTimeout(() => {
                if (inputAnterior && !inputAnterior.disabled) inputAnterior.focus();
            }, 10);
        }
    }
    else if (event.key === "ArrowRight") inputSucessor.focus();
    else if (event.key === "ArrowLeft") inputAnterior.focus();
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        validarSeEPalavra();
    }
});

function digitar(key) {
    const caixas = document.getElementsByName(`caixa${linhaValue}`);
    let indiceAtual = -1;

    caixas.forEach((caixa, index) => {
        if (caixa === ultimaCaixaComFoco) {
            indiceAtual = index;
        }
    });

    if (indiceAtual === -1) {
        console.warn("Nenhuma caixa ativa encontrada.");
        return;
    }

    const inputAnterior = caixas[indiceAtual - 1];
    const inputAtual = caixas[indiceAtual];
    const inputSucessor = caixas[indiceAtual + 1];

    if (key === "Backspace") {
        if (inputAtual.value !== "") inputAtual.value = "";
        else if (inputAnterior && !inputAnterior.disabled) {
            inputAnterior.value = "";
            setTimeout(() => {
                if (inputAnterior && !inputAnterior.disabled) inputAnterior.focus();
            }, 10);
        }
    } else if (key === "Enter") {
        validarSeEPalavra();
    } else {
        inputAtual.value = key;
        if (inputSucessor && !inputSucessor.disabled) {
            setTimeout(() => {
                inputSucessor.focus();
            }, 10);
        }
    }
}

let ultimaCaixaComFoco = null;

document.addEventListener("focusin", (event) => {
    const input = event.target;
    if (input.tagName === "INPUT" && !input.disabled) {
        ultimaCaixaComFoco = input;
    }
});

document.addEventListener("click", (event) => {
    const alvo = event.target;

    if (
        !alvo.matches('input[type="text"]:not([disabled])')
    ) {
        if (ultimaCaixaComFoco) {
            ultimaCaixaComFoco.focus();
        }
    }
});