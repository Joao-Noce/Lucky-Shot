const idUsuario = sessionStorage.ID_USUARIO;
let qtdColunas = 9;
let qtdMostrar = 25;
let erros = 0;
let opcoes = [
    { valor: 1, qtd: 9 },
    { valor: 2, qtd: 9 },
    { valor: 3, qtd: 9 },
    { valor: 4, qtd: 9 },
    { valor: 5, qtd: 9 },
    { valor: 6, qtd: 9 },
    { valor: 7, qtd: 9 },
    { valor: 8, qtd: 9 },
    { valor: 9, qtd: 9 },
];
let celulas = [];
let botaoPressionado = null;
let numeroSelecionado = null;
let botoesValidados = {};

criarTabuleiro();

function criarTabuleiro() {
    for (let linha = 1; linha <= qtdColunas; linha++) {
        container.innerHTML += `<div class="linha" id="linha${linha}">`;
        for (let coluna = 1; coluna <= qtdColunas; coluna++) {
            let linhaAtual = document.getElementById(`linha${linha}`);
            celulas.push({ id: `coluna${linha}${coluna}`, coluna: coluna, linha: linha, valor: 0, validada: false });
            linhaAtual.innerHTML += `<button name="caixa" class="coluna" id="coluna${linha}${coluna}" onclick="validar(${linha}, ${coluna})" onkeydown="moverFoco(event, ${linha}, ${coluna})"></button>`;
            let celulaAtual = document.getElementById(`coluna${linha}${coluna}`);
            if (linha % 3 == 0 && linha != 9) {
                celulaAtual.style = "border-bottom: solid white 2px;";
            }
            if (coluna % 3 == 0 && coluna != 9) {
                celulaAtual.style = "border-right: solid white 2px;";
            }
            if (linha % 3 == 0 && linha != 9 && coluna % 3 == 0 && coluna != 9) {
                celulaAtual.style = "border-right: solid white 2px; border-bottom: solid white 2px;";
            }
        }
    }
    preencherTabuleiro(0);
}

function preencherTabuleiro(indice) {
    if (indice >= celulas.length) {
        mostrarNumeros();
        return true;
    }

    let celula = celulas[indice];
    celula.disable = false;
    const numerosEmbaralhados = embaralharNumeros();

    for (let numero of numerosEmbaralhados) {
        if (
            !temNaLinha(celula.linha, numero) &&
            !temNaColuna(celula.coluna, numero) &&
            !temNoQuadrante(celula.linha, celula.coluna, numero)
        ) {
            celula.valor = numero;
            if (preencherTabuleiro(indice + 1)) {
                return true;
            }

            celula.valor = 0;
        }
    }
    return false;
}

function embaralharNumeros() {
    const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = numeros.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numeros[i], numeros[j]] = [numeros[j], numeros[i]];
    }
    return numeros;
}

function mostrarNumeros() {
    let numerosMostrados = [];
    while (numerosMostrados.length < qtdMostrar) {
        let numeroAleatorio = Math.floor(Math.random() * 81);
        if (!numerosMostrados.includes(numeroAleatorio)) {
            numerosMostrados.push(numeroAleatorio);
        }

    }
    numerosMostrados.forEach(indice => {
        celulas[indice].validada = true;
        document.getElementById(`coluna${celulas[indice].linha}${celulas[indice].coluna}`).disabled = true;
        document.getElementById(`coluna${celulas[indice].linha}${celulas[indice].coluna}`).innerHTML = celulas[indice].valor;

        opcoes[celulas[indice].valor - 1].qtd = opcoes[celulas[indice].valor - 1].qtd - 1;
        document.getElementById(`opcao${celulas[indice].valor}`).innerHTML = opcoes[celulas[indice].valor - 1].qtd;
    });
}

function temNaLinha(linha, valor) {
    return celulas.some(celula => celula.linha == linha && celula.valor == valor);
}

function temNaColuna(coluna, valor) {
    return celulas.some(celula => celula.coluna == coluna && celula.valor == valor);
}

function temNoQuadrante(linha, coluna, valor) {
    const inicioLinha = Math.floor((linha - 1) / 3) * 3 + 1;
    const inicioColuna = Math.floor((coluna - 1) / 3) * 3 + 1;

    for (let i = inicioLinha; i < inicioLinha + 3; i++) {
        for (let j = inicioColuna; j < inicioColuna + 3; j++) {
            if (celulas.some(celula => celula.linha == i && celula.coluna == j && celula.valor == valor)) {
                return true;
            }
        }
    }
    return false;
}

document.getElementsByName("caixa").forEach(botao => {
    botao.addEventListener("focus", () => {
        botaoPressionado = botao;
        if (!botoesValidados[botao.id]) {
            botao.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        }
    });

    botao.addEventListener("blur", () => {
        setTimeout(() => {
            if (document.activeElement !== botao) {
                botao.style.backgroundColor = "rgba(0, 0, 0, 0.25)";
            }
        }, 0);
    });

    botao.addEventListener("keydown", (event) => {
        if (event.key >= "1" && event.key <= "9") {
            botao.innerHTML = event.key;
            selecionarNumero(Number(event.key));
        }
    });
});

document.addEventListener("mousedown", (event) => {
    if (event.target.getAttribute("name") !== "caixa" && botaoPressionado) {
        event.preventDefault();
        botaoPressionado.focus();
        if (!botoesValidados[botaoPressionado.id]) {
            botaoPressionado.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        }
    }
});

function selecionarNumero(numero) {
    numeroSelecionado = numero;
    validar();
}

function validar() {
    if (numeroSelecionado != null && botaoPressionado) {
        celulas.forEach(celula => {
            let qtdValidadas = 0;
            if (celula.id == botaoPressionado.id) {
                if (celula.valor == numeroSelecionado) {
                    botaoPressionado.style.color = "rgba(127, 191, 96, 1)";
                    botoesValidados[botaoPressionado.id] = 'acertou';
                    botaoPressionado.innerHTML = numeroSelecionado;
                    celula.validada = true;
                    qtdValidadas++;
                    validarSeCompletouAlgo(celula.linha, celula.coluna);

                    opcoes[numeroSelecionado - 1].qtd--;
                    document.getElementById(`opcao${numeroSelecionado}`).innerHTML = opcoes[numeroSelecionado - 1].qtd;
                    let botao = document.getElementById(`btn${numeroSelecionado}`);
                    if (opcoes[numeroSelecionado - 1].qtd == 0) {
                        botao.style = "background-color: transparent; color: transparent;";
                        botao.disabled = true;
                    }
                    if (qtdValidadas == 81) {
                        if (sessionStorage.ID_USUARIO != undefined) {
                            enviarDados(true);
                            finalizar(true);
                        }
                    }
                } else {
                    botaoPressionado.style.color = "rgba(238, 103, 92, 1)";
                    botoesValidados[botaoPressionado.id] = 'errou';
                    botaoPressionado.innerHTML = numeroSelecionado;
                    erros++;
                    error.innerHTML = "Erros: " + erros + "/3";
                    if (erros >= 3) {
                        if (sessionStorage.ID_USUARIO != undefined) {
                            enviarDados(false);
                            finalizar(false);
                        }
                    }
                }
            }
        });
    }
    numeroSelecionado = null;
}

function validarSeCompletouAlgo(linha, coluna) {
    let linhaStatus = true;
    let colunaStatus = true;
    let quadranteStatus = true;

    celulas.forEach(celula => {
        if (celula.linha == linha && celula.validada == false) {
            linhaStatus = false;
        }
        if (celula.coluna == coluna && celula.validada == false) {
            colunaStatus = false;
        }
    });

    const inicioLinha = Math.floor((linha - 1) / 3) * 3 + 1;
    const inicioColuna = Math.floor((coluna - 1) / 3) * 3 + 1;

    for (let i = inicioLinha; i < inicioLinha + 3; i++) {
        for (let j = inicioColuna; j < inicioColuna + 3; j++) {
            if (celulas.some(celula => celula.linha == i && celula.coluna == j && celula.validada == false)) {
                quadranteStatus = false;
            }
        }
    }

    if (linhaStatus) {
        celulas.forEach(celula => {
            if (celula.linha == linha) {
                aplicarAnimacao(`coluna${celula.linha}${celula.coluna}`, 'brilhoHorizontal');
            }
        });
    }

    if (colunaStatus) {
        celulas.forEach(celula => {
            if (celula.coluna == coluna) {
                aplicarAnimacao(`coluna${celula.linha}${celula.coluna}`, 'brilhoVertical');
            }
        });
    }

    if (quadranteStatus) {
        for (let i = inicioLinha; i < inicioLinha + 3; i++) {
            for (let j = inicioColuna; j < inicioColuna + 3; j++) {
                aplicarAnimacao(`coluna${i}${j}`, 'brilhoQuadrante');
            }
        }
    }
}

function aplicarAnimacao(id, classeAnimacao) {
    const elemento = document.getElementById(id);
    if (elemento) {
        elemento.classList.add(classeAnimacao);

        elemento.addEventListener('animationend', () => {
            elemento.classList.remove(classeAnimacao);
        }, { once: true });
    }
}

function moverFoco(event, linhaAtual, colunaAtual) {
    const inputBaixo = document.getElementById(`coluna${linhaAtual + 1}${colunaAtual}`);
    const inputEsquerda = document.getElementById(`coluna${linhaAtual}${colunaAtual - 1}`);
    const inputDireita = document.getElementById(`coluna${linhaAtual}${colunaAtual + 1}`);
    const inputCima = document.getElementById(`coluna${linhaAtual - 1}${colunaAtual}`);

    switch (event.key) {
        case "ArrowDown":
            if (linhaAtual != 9) inputBaixo.focus();
            break;
        case "ArrowLeft":
            if (colunaAtual != 1) inputEsquerda.focus();
            break;
        case "ArrowUp":
            if (linhaAtual != 1) inputCima.focus();
            break;
        case "ArrowRight":
            if (colunaAtual != 9) inputDireita.focus();
            break;
    }
}

function finalizar(ganhou) {
    let icone = "error";
    let texto = "Você perdeu!";

    if (ganhou) {
        icone = "success";
        texto = "Você ganhou!";
    }
    Swal.fire({
        icon: icone,
        text: texto,
        timer: 1500,
        showConfirmButton: false
    })
    setTimeout(() => {
        window.location.reload();
    }, 1500);
}

function enviarDados(ganhou) {
    fetch("/sudoku/registro/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuario,
            ganhou
        })
    }).then(function (resposta) {
        if (!resposta.ok) console.log("Não foi possível enviar a pontuação para o banco de dados.");
        else console.log("Pontuação enviada com sucesso!");
    })
}