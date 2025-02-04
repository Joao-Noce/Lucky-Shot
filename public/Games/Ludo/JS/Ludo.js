const idUsuario = sessionStorage.ID_USUARIO;
let jogadores = ["Azul", "Vermelho", "Verde", "Amarelo"]
let rodada = 0;
let valorDado;
let jogadorAtual = jogadores[rodada];
const pinos = [];
const caixas = [];
const cores = [
    { cor: "Azul", hex: "#28ACFE" },
    { cor: "Vermelho", hex: "#EA1D22" },
    { cor: "Verde", hex: "#039F4B" },
    { cor: "Amarelo", hex: "#FFDE15" },
]
const tamanhoCaixa = 550 / 15;
const ordemAzul = ["esquerdaAzul", "baixoVermelho", "esquerdaVermelho", "cimaVermelho", "esquerdaVerde", "cimaVerde", "direitaVerde", "cimaAmarelo", "direitaAmarelo", "baixoAmarelo", "direitaAzul", "finalAzul"];
const ordemVermelho = ["cimaVermelho", "esquerdaVerde", "cimaVerde", "direitaVerde", "cimaAmarelo", "direitaAmarelo", "baixoAmarelo", "direitaAzul", "baixoAzul", "esquerdaAzul", "baixoVermelho", "finalVermelho"];
const ordemVerde = ["direitaVerde", "cimaAmarelo", "direitaAmarelo", "baixoAmarelo", "direitaAzul", "baixoAzul", "esquerdaAzul", "baixoVermelho", "esquerdaVermelho", "cimaVermelho", "esquerdaVerde", "finalVerde"];
const ordemAmarelo = ["baixoAmarelo", "direitaAzul", "baixoAzul", "esquerdaAzul", "baixoVermelho", "esquerdaVermelho", "cimaVermelho", "esquerdaVerde", "cimaVerde", "direitaVerde", "cimaAmarelo", "finalAmarelo"];
const movimentos = {
    esquerdaAzul: (caminho) => {
        for (let i = 14; i >= 10; i--) { //(linha diminui, coluna fixa)
            caminho.push({ id: `coluna${i}_${7}`, top: tamanhoCaixa * i, left: tamanhoCaixa * 7 });
        }
    },
    baixoVermelho: (caminho) => {
        for (let i = 6; i >= 1; i--) { //(linha fixa, coluna diminui)
            caminho.push({ id: `coluna${9}_${i}`, top: tamanhoCaixa * 9, left: tamanhoCaixa * i });
        }
    },
    esquerdaVermelho: (caminho) => {
        for (let i = 8; i >= 7; i--) { //(linha diminiu, coluna fixa)
            caminho.push({ id: `coluna${i}_${1}`, top: tamanhoCaixa * i, left: tamanhoCaixa * 1 });
        }
    },
    cimaVermelho: (caminho) => {
        for (let i = 2; i <= 6; i++) { //(linha fixa, coluna aumenta)
            caminho.push({ id: `coluna${7}_${i}`, top: tamanhoCaixa * 7, left: tamanhoCaixa * i });
        }
    },
    esquerdaVerde: (caminho) => {
        for (let i = 6; i >= 1; i--) { //(linha diminiu, coluna fixa)
            caminho.push({ id: `coluna${i}_${7}`, top: tamanhoCaixa * i, left: tamanhoCaixa * 7 });
        }
    },
    cimaVerde: (caminho) => {
        for (let i = 8; i <= 9; i++) { //(linha fixa, coluna aumenta)
            caminho.push({ id: `coluna${1}_${i}`, top: tamanhoCaixa * 1, left: tamanhoCaixa * i });
        }
    },
    direitaVerde: (caminho) => {
        for (let i = 2; i <= 6; i++) { //(linha aumenta, coluna fixa)
            caminho.push({ id: `coluna${i}_${9}`, top: tamanhoCaixa * i, left: tamanhoCaixa * 9 });
        }
    },
    cimaAmarelo: (caminho) => {
        for (let i = 10; i <= 15; i++) { //(linha fixa, coluna aumenta)
            caminho.push({ id: `coluna${7}_${i}`, top: tamanhoCaixa * 7, left: tamanhoCaixa * i });
        }
    },
    direitaAmarelo: (caminho) => {
        for (let i = 8; i <= 9; i++) { //(linha aumenta, coluna fixa)
            caminho.push({ id: `coluna${i}_${15}`, top: tamanhoCaixa * i, left: tamanhoCaixa * 15 });
        }
    },
    baixoAmarelo: (caminho) => {
        for (let i = 14; i >= 10; i--) { //(linha fixa, coluna diminiu)
            caminho.push({ id: `coluna${9}_${i}`, top: tamanhoCaixa * 9, left: tamanhoCaixa * i });
        }
    },
    direitaAzul: (caminho) => {
        for (let i = 10; i <= 14; i++) { //(linha aumenta, coluna fixa)
            caminho.push({ id: `coluna${i}_${9}`, top: tamanhoCaixa * i, left: tamanhoCaixa * 9 });
        }
    },
    baixoAzul: (caminho) => {
        for (let i = 9; i >= 7; i--) { //(linha aumenta, coluna fixa)
            caminho.push({ id: `coluna${15}_${i}`, top: tamanhoCaixa * 15, left: tamanhoCaixa * i });
        }
    },
    finalAzul: (caminho) => {
        for (let i = 9; i >= 8; i--) { //(linha aumenta, coluna fixa)
            caminho.push({ id: `coluna${15}_${i}`, top: tamanhoCaixa * 15, left: tamanhoCaixa * i });
        }

        for (let i = 14; i >= 9; i--) { //(linha diminiu, coluna fixa)
            caminho.push({ id: `coluna${i}_${8}`, top: tamanhoCaixa * i, left: tamanhoCaixa * 8 });
        }
    },
    finalVermelho: (caminho) => {
        caminho.push({ id: `coluna${8}_${1}`, top: tamanhoCaixa * 8, left: tamanhoCaixa * 1 });

        for (let i = 2; i <= 7; i++) { //(linha fixa, coluna aumenta)
            caminho.push({ id: `coluna${8}_${i}`, top: tamanhoCaixa * 8, left: tamanhoCaixa * i });
        }
    },
    finalVerde: (caminho) => {
        caminho.push({ id: `coluna${1}_${8}`, top: tamanhoCaixa * 1, left: tamanhoCaixa * 8 });

        for (let i = 2; i <= 7; i++) { //(linha aumenta, coluna fixa)
            caminho.push({ id: `coluna${i}_${8}`, top: tamanhoCaixa * i, left: tamanhoCaixa * 8 });
        }
    },
    finalAmarelo: (caminho) => {
        caminho.push({ id: `coluna${8}_${15}`, top: tamanhoCaixa * 8, left: tamanhoCaixa * 15 });

        for (let i = 14; i >= 9; i--) { //(linha fixa, coluna diminui)
            caminho.push({ id: `coluna${8}_${i}`, top: tamanhoCaixa * 8, left: tamanhoCaixa * i });
        }
    },
}
const primeiraCoordenada = [
    { id: `iframe0`, top: tamanhoCaixa * 11.5, left: tamanhoCaixa * 2.5, cor: "Azul" },
    { id: `iframe1`, top: tamanhoCaixa * 11.5, left: tamanhoCaixa * 4.5, cor: "Azul" },
    { id: `iframe2`, top: tamanhoCaixa * 13.5, left: tamanhoCaixa * 2.5, cor: "Azul" },
    { id: `iframe3`, top: tamanhoCaixa * 13.5, left: tamanhoCaixa * 4.5, cor: "Azul" },
    { id: `iframe4`, top: tamanhoCaixa * 2.5, left: tamanhoCaixa * 2.5, cor: "Vermelho" },
    { id: `iframe5`, top: tamanhoCaixa * 2.5, left: tamanhoCaixa * 4.5, cor: "Vermelho" },
    { id: `iframe6`, top: tamanhoCaixa * 4.5, left: tamanhoCaixa * 2.5, cor: "Vermelho" },
    { id: `iframe7`, top: tamanhoCaixa * 4.5, left: tamanhoCaixa * 4.5, cor: "Vermelho" },
    { id: `iframe8`, top: tamanhoCaixa * 2.5, left: tamanhoCaixa * 11.5, cor: "Verde" },
    { id: `iframe9`, top: tamanhoCaixa * 2.5, left: tamanhoCaixa * 13.5, cor: "Verde" },
    { id: `iframe10`, top: tamanhoCaixa * 4.5, left: tamanhoCaixa * 11.5, cor: "Verde" },
    { id: `iframe11`, top: tamanhoCaixa * 4.5, left: tamanhoCaixa * 13.5, cor: "Verde" },
    { id: `iframe12`, top: tamanhoCaixa * 11.5, left: tamanhoCaixa * 11.5, cor: "Amarelo" },
    { id: `iframe13`, top: tamanhoCaixa * 11.5, left: tamanhoCaixa * 13.5, cor: "Amarelo" },
    { id: `iframe14`, top: tamanhoCaixa * 13.5, left: tamanhoCaixa * 11.5, cor: "Amarelo" },
    { id: `iframe15`, top: tamanhoCaixa * 13.5, left: tamanhoCaixa * 13.5, cor: "Amarelo" },
]
const caminhoAzul = gerarCaminho(ordemAzul);
const caminhoVermelho = gerarCaminho(ordemVermelho);
const caminhoVerde = gerarCaminho(ordemVerde);
const caminhoAmarelo = gerarCaminho(ordemAmarelo);
function gerarCaminho(ordemMovimentos) {
    let caminho = [];
    ordemMovimentos.forEach((movimento) => {
        if (movimentos[movimento]) movimentos[movimento](caminho);
    });

    return caminho;
}
setTabuleiro();

function andar(pino) {
    const cor = getPinoCorById(pino);
    const iframe = getPinoIframeById(pino);
    const pinoId = document.getElementById(pino);
    let indice = updatePinoIndiceById(pino);
    const caminho = getCaminho(cor);

    let destino = indice + valorDado;
    let tempoTotal = 0;

    if (indice != -1) {
        for (let i = indice; i <= destino && i < caminho.length; i++) {
            let delay = 250 * (i - indice);
            tempoTotal = delay;

            setTimeout(() => {
                pinoId.style.top = `${(Math.round(caminho[i].top / tamanhoCaixa) * tamanhoCaixa) - (tamanhoCaixa / 2)}px`;
                pinoId.style.left = `${(Math.round(caminho[i].left / tamanhoCaixa) * tamanhoCaixa) - (tamanhoCaixa / 2)}px`;
            }, delay);
        }
    } else {
        pinoId.style.top = `${(Math.round(caminho[0].top / tamanhoCaixa) * tamanhoCaixa) - (tamanhoCaixa / 2)}px`;
        pinoId.style.left = `${(Math.round(caminho[0].left / tamanhoCaixa) * tamanhoCaixa) - (tamanhoCaixa / 2)}px`;
        destino = 0;
    }

    if (destino == 56) {
        if (rodada == 0) rodada = 3;
        else rodada--;
        jogadorAtual = jogadores[rodada];
    }
   
    setTimeout(() => {
        validarSeguranca(caminho, destino, indice, cor, pinoId, iframe);
        dado.disabled = false;
        passarVez(cor);
    }, tempoTotal);
}

function setPinos() {
    for (let i = 0; i < 16; i++) {
        let color;
        let topValue;
        let leftValue;
        if (i < 4) {
            topValue = primeiraCoordenada[i].top;
            leftValue = primeiraCoordenada[i].left;
            color = cores[0];
        }
        else if (i < 8) {
            topValue = primeiraCoordenada[i].top;
            leftValue = primeiraCoordenada[i].left;
            color = cores[1];
        }
        else if (i < 12) {
            topValue = primeiraCoordenada[i].top;
            leftValue = primeiraCoordenada[i].left;
            color = cores[2];
        }
        else {
            topValue = primeiraCoordenada[i].top;
            leftValue = primeiraCoordenada[i].left;
            color = cores[3];
        }

        pinos.push({ id: `pino${i}`, iframe: `iframe${i}`, cor: primeiraCoordenada[i].cor, indice: -1 });
        container.innerHTML += `
        <button disabled onclick="andar('pino${i}')" id="pino${i}" class="pino" style="top: ${((topValue / tamanhoCaixa) * tamanhoCaixa) - (tamanhoCaixa / 2)}px; left: ${((leftValue / tamanhoCaixa) * tamanhoCaixa) - (tamanhoCaixa / 2)}px">
        <i id="iframe${i}" class="fa-solid fa-location-pin" style="color: ${color.hex};"></i>
        <div class="aureula"></div>
    </button>`;
    }
}

function setTabuleiro() {
    let i = 0;
    for (let linha = 1; linha <= 15; linha++) {
        container.innerHTML += `<div class="linha" id="linha${linha}"></div>`;
        for (let coluna = 1; coluna <= 15; coluna++) {
            const linhaAtual = document.getElementById(`linha${linha}`);
            linhaAtual.innerHTML += `<div class="coluna" id="coluna${linha}_${coluna}"></div>`;
            caixaAtual = document.getElementById(`coluna${linha}_${coluna}`);
            const cor = getCor(linha, coluna, caixaAtual);
            caixas.push({ id: `coluna${linha}_${coluna}`, cor: cor, pinosAtuais: [], corPino: undefined, estrela: setEstrela(linha, coluna, caixaAtual) });
        }
    }
    setPinos();
}

function getCor(linha, coluna, caixaAtual) {
    if ((linha <= 6 && coluna <= 6) || (linha <= 6 && coluna >= 10) ||
        (linha >= 10 && coluna <= 6) || (linha >= 10 && coluna >= 10)) caixaAtual.style = "border: solid rgba(64, 64, 64, 0) 1px;";
    if (linha == 7 && coluna == 7) caixaAtual.style = "background: linear-gradient(45deg, #ea1d22 50%, #039f4b 50%); border: none; outline: 1px solid transparent;";
    if (linha == 7 && coluna == 9) caixaAtual.style = "background: linear-gradient(135deg, #039f4b 50%, #ffde15 50%); border: none; outline: 1px solid transparent;";
    if (linha == 9 && coluna == 7) caixaAtual.style = "background: linear-gradient(135deg, #ea1d22 50%, #28acfe 50%); border: none; outline: 1px solid transparent;";
    if (linha == 9 && coluna == 9) caixaAtual.style = "background: linear-gradient(45deg, #28acfe 50%, #ffde15 50%); border: none; outline: 1px solid transparent;";
    if (linha == 8 && coluna == 8) caixaAtual.style = "background: conic-gradient( #039f4b 0deg 45deg, #ffde15 45deg 135deg, #28acfe 135deg 225deg, #ea1d22 225deg 315deg, #039f4b 315deg 360deg); border: none; outline: 1px solid transparent;"

    if ((linha == 1 && coluna <= 6) || (linha <= 6 && coluna == 1) || (linha <= 6 && coluna == 6) || (linha == 6 && coluna <= 6) ||
        (linha == 8 && coluna >= 2 && coluna <= 7) || (linha == 7 && coluna == 2)) {
        let border = "0.7";
        if (linha <= 6 || (linha == 8 && coluna == 7)) border = "0";
        caixaAtual.style = `background-color: #ea1d22; border: solid rgba(64, 64, 64, ${border}) 1px;`;
        return "#ea1d22";
    }
    if ((linha == 1 && coluna >= 10) || (linha <= 6 && coluna == 10) || (linha <= 6 && coluna == 15) || (linha == 6 && coluna >= 10) ||
        (linha >= 2 && linha <= 7 && coluna == 8) || (linha == 2 && coluna == 9)) {
        let border = "0.7";
        if (coluna >= 10 || (linha == 9 && coluna == 9) || (linha == 7 && coluna == 8)) border = "0";
        caixaAtual.style = `background-color: #039f4b; border: solid rgba(64, 64, 64, ${border}) 1px;`;
        return "#039f4b";
    }
    if ((linha == 10 && coluna <= 6) || (linha >= 10 && coluna == 1) || (linha >= 10 && coluna == 6) || (linha == 15 && coluna <= 6) ||
        (linha >= 9 && linha <= 14 && coluna == 8) || (linha == 14 && coluna == 7)) {
        let border = "0.7";
        if (coluna <= 6 || (linha == 9 && coluna == 7) || (linha == 9 && coluna == 8)) border = "0";
        caixaAtual.style = `background-color: #28acfe; border: solid rgba(64, 64, 64, ${border}) 1px;`;
        return "#28acfe";
    }
    if ((linha == 10 && coluna >= 10) || (linha >= 10 && coluna == 10) || (linha >= 10 && coluna == 15) || (linha == 15 && coluna >= 10) ||
        (linha == 8 && coluna >= 9 && coluna <= 14) || (linha == 9 && coluna == 14)) {
        let border = "0.7";
        if (linha >= 10 || (linha == 8 && coluna == 9)) border = "0";
        caixaAtual.style = `background-color: #ffde15; border: solid rgba(64, 64, 64, ${border}) 1px;`;
        return "#ffde15";
    }
    setSetas(linha, coluna, caixaAtual);
}
function getCaminho(cor) {
    if (cor === "Azul") return caminhoAzul;
    else if (cor === "Vermelho") return caminhoVermelho;
    else if (cor === "Verde") return caminhoVerde;
    else return caminhoAmarelo;
}
function setSetas(linha, coluna, caixaAtual) {
    if (linha == 1 && coluna == 8) caixaAtual.innerHTML = `<i class="fa-solid fa-arrow-down" style="color: #039f4b; font-size: 20px"></i>`
    if (linha == 8 && coluna == 1) caixaAtual.innerHTML = `<i class="fa-solid fa-arrow-right" style="color: #ea1d22; font-size: 20px"></i>`
    if (linha == 8 && coluna == 15) caixaAtual.innerHTML = `<i class="fa-solid fa-arrow-left" style="color: #ffde15; font-size: 20px"></i>`
    if (linha == 15 && coluna == 8) caixaAtual.innerHTML = `<i class="fa-solid fa-arrow-up" style="color: #28acfe; font-size: 20px"></i>`
}

function setEstrela(linha, coluna, caixaAtual) {
    if ((linha == 2 && coluna == 9) || (linha == 3 && coluna == 7) || (linha == 7 && coluna == 2) || (linha == 7 && coluna == 13) || (linha == 9 && coluna == 3) || (linha == 9 && coluna == 14) || (linha == 13 && coluna == 9) || (linha == 14 && coluna == 7)) {
        if ((linha == 3 && coluna == 7) || (linha == 7 && coluna == 13) || (linha == 9 && coluna == 3) || (linha == 13 && coluna == 9)) {
            caixaAtual.innerHTML = `<i class="fa-regular fa-star" style="color: black; font-size: 20px"></i>`;
        }
        return true;
    }
    return false;
}

function getPinoCorById(pino) {
    let cor;
    pinos.forEach(pinoAtual => {
        if (pino == pinoAtual.id) {
            cor = pinoAtual.cor;
        }
    });
    return cor;
}
function getPinoIframeById(pino) {
    let iframe;
    pinos.forEach(pinoAtual => {
        if (pino == pinoAtual.id) {
            iframe = pinoAtual.iframe;
        }
    });
    return iframe;
}
function updatePinoIndiceById(pinoAtual) {
    let indiceValue;
    pinos.forEach(pino => {
        if (pinoAtual == pino.id) {
            if (pino.indice != -1) {
                indiceValue = pino.indice;
                pino.indice += valorDado;
            } else if (valorDado == 6 && pino.indice == -1) {
                indiceValue = pino.indice;
                pino.indice = 0;
            }
        }
    });
    return indiceValue;
}

function jogarDado() {
    const dado = document.getElementById("dado");
    valorDado = Math.floor(Math.random() * 6) + 1;
    
    const rotacoes = {
        1: "rotateX(0deg) rotateY(0deg)",
        2: "rotateY(180deg)",
        3: "rotateX(0deg) rotateY(-90deg)",
        4: "rotateX(0deg) rotateY(90deg)",
        5: "rotateX(-90deg) rotateY(0deg)",
        6: "rotateX(90deg) rotateY(00deg)"
    };

    const extraRotX = 360;
    const extraRotY = 360;

    dado.style.transition = "transform 0.75s ease-in-out";
    dado.style.transform = `rotateX(${extraRotX}deg) rotateY(${extraRotY}deg)`;
    const faces = document.getElementsByName("faces");
    faces.forEach(face => {
        face.style.backgroundColor = `${cores.find(cor => cor.cor == jogadorAtual).hex}`;
    });

    setTimeout(() => {
        dado.style.transform = rotacoes[valorDado];
        mostrarPinosDisponiveis(valorDado, jogadorAtual);
    }, 750);
}

function mostrarPinosDisponiveis(valorDado) {
    let qtdPinosGanhos = 0;
    let qtdPinosFora = 0;
    let pinoFora;
    pinos.forEach(pino => {
        if (pino.cor == jogadorAtual) {
            const pinoIframe = document.getElementById(pino.iframe);
            const pinoId = document.getElementById(pino.id);

            if (valorDado == 6 && (pino.indice + valorDado < caminhoAzul.length)) {
                dado.disabled = true;
                pinoId.disabled = false;
                pinoIframe.style = "color: black; font-size: 35px;";
            }
            else if (pino.indice != -1 && (pino.indice + valorDado < caminhoAzul.length)) {
                qtdPinosFora++;
                if (qtdPinosFora == 1) pinoFora = pino.id;
                dado.disabled = true;
                pinoId.disabled = false;
                pinoIframe.style = "color: black; font-size: 35px;";
            }
            if (pino.indice == 56) qtdPinosGanhos++;
        }
    });
    if (qtdPinosFora == 1) andar(pinoFora);

    if (valorDado != 6) {
        if (rodada <= 2) rodada++;
        else rodada = 0;
        jogadorAtual = jogadores[rodada];
    }
}

function passarVez(cor) {
    let qtdPinosGanhos = 0;
    pinos.forEach(pino => {
        const pinoIframe = document.getElementById(pino.iframe);
        const pinoId = document.getElementById(pino.id);
        pinoId.disabled = true;
        pinoIframe.style = `color: ${cores.find(cor => cor.cor == pino.cor).hex}; font-size: 30px;`;
        if (pino.indice == 56 && pino.cor == cor) qtdPinosGanhos++;
    });
    if (qtdPinosGanhos == 4) ganhou(cor);
}

function validarSeguranca(caminho, destino, indice, cor, pinoId, iframe) {
    const caixaAtual = caminho[destino] ? caixas.find(caixa => caixa.id == caminho[destino].id) : null;
    let pegou = false;
    let pinosPegos = [];
    const positions = [
        { top: -15, left: -20 },
        { top: -15, left: 5 },
        { top: 15, left: -20 },
        { top: 15, left: 5 }
    ];

    if (indice == -1) {
        caixaAtual.pinosAtuais.push({ id: pinoId, iframe: iframe });
        caixaAtual.corPino = cor;

        if (caixaAtual.pinosAtuais.length > 1) {

            caixaAtual.pinosAtuais.forEach((pino, index) => {
                pinos.forEach(pinoAtual => {
                    if (pinoAtual.iframe === pino.iframe) {
                        const elemento = document.getElementById(pinoAtual.id);
                        if (elemento) {
                            const pos = positions[index % positions.length];
                            elemento.style.transform = "translate(0px, 0px)";
                            elemento.style.transform = `translate(${pos.left}px, ${pos.top}px)`;
                        }
                    }
                });
            });
        } else {
            caixaAtual.pinosAtuais.forEach((pino, index) => {
                pinos.forEach(pinoAtual => {
                    if (pinoAtual.iframe === pino.iframe) {
                        const elemento = document.getElementById(pinoAtual.id);
                        if (elemento) {
                            const pos = positions[index % positions.length];
                            elemento.style.transform = `translate(-8px, -2px)`;
                        }
                    }
                });
            });
        }
    } else {

        const caixaAnterior = caminho[destino - valorDado] ? caixas.find(caixa => caixa.id == caminho[destino - valorDado].id) : null;
        const index = caixaAnterior.pinosAtuais.findIndex(pino => pino.iframe == iframe);
        const caminhoAtual = getCaminho(cor);

        caixaAnterior.pinosAtuais.splice(index, 1);
        if (caixaAnterior.pinosAtuais.length === 0) {
            caixaAnterior.corPino = undefined;
        }

        if (caixaAtual.corPino != cor && caixaAtual.estrela == false && caixaAtual.pinosAtuais.length >= 1) {
            caixaAtual.pinosAtuais.forEach(pino => {
                const coordenada = primeiraCoordenada.find(coordenada => coordenada.id == pino.iframe);
                pinos.forEach(pinoAtual => {
                    if (pinoAtual.iframe == pino.iframe) {
                        pinoAtual.indice = -1;
                        document.getElementById(pinoAtual.id).style.top = `${((coordenada.top / tamanhoCaixa) * tamanhoCaixa) - (tamanhoCaixa / 2)}px`;
                        document.getElementById(pinoAtual.id).style.left = `${((coordenada.left / tamanhoCaixa) * tamanhoCaixa) - (tamanhoCaixa / 2)}px`;
                        pinosPegos.push(pino.id);
                    }
                });
            });
            pegou = true;
        }
        caixaAtual.pinosAtuais.push({ id: pinoId, iframe: iframe });

        caixaAtual.corPino = cor;

        if ((caixaAtual.estrela && caixaAtual.pinosAtuais.length > 1) || (caixaAtual.pinosAtuais.length > 1)) {
            caixaAtual.pinosAtuais.forEach((pino, index) => {
                pinos.forEach(pinoAtual => {
                    if (pinoAtual.iframe === pino.iframe) {
                        const elemento = document.getElementById(pinoAtual.id);
                        if (elemento) {
                            const pos = positions[index % positions.length];
                            elemento.style.transform = "translate(0px, 0px)";
                            elemento.style.transform = `translate(${pos.left}px, ${pos.top}px)`;
                        }
                    }
                });
            });
        }
        if (caixaAtual.pinosAtuais.length <= 1) {
            caixaAtual.pinosAtuais.forEach((pino, index) => {
                pinos.forEach(pinoAtual => {
                    if (pinoAtual.iframe === pino.iframe) {
                        const elemento = document.getElementById(pinoAtual.id);
                        if (elemento) {
                            const pos = positions[index % positions.length];
                            elemento.style.transform = `translate(-8px, -2px)`;
                        }
                    }
                });
            });
        }
        if (caixaAnterior.pinosAtuais.length <= 1) {
            caixaAnterior.pinosAtuais.forEach((pino, index) => {
                pinos.forEach(pinoAtual => {
                    if (pinoAtual.iframe === pino.iframe) {
                        const elemento = document.getElementById(pinoAtual.id);
                        if (elemento) {
                            const pos = positions[index % positions.length];
                            elemento.style.transform = `translate(-8px, -2px)`;
                        }
                    }
                });
            });
        }
    }
    if (pegou) {
        if (rodada == 0) rodada = 3;
        else rodada--;
        jogadorAtual = jogadores[rodada];
        caixaAtual.pinosAtuais = [];
        pinosPegos.forEach(pino => {
            pino.style.transform = "translate(-8px, -2px)";   
        });
        validarSeguranca(caminho, destino, indice, cor, pinoId, iframe);
    }
}

function ganhou(cor) {
    Swal.fire({
        title: `Parabéns ${cor}!`,
        text: "Você ganhou!",
        icon: "success",
        timer: 3000
    });
    pinos.forEach(pino => {
        pino.indice = -1;
    });
}