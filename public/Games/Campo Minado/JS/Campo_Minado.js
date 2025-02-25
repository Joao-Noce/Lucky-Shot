let colunas = [];
let bombas = [];
let qtdColunas;
let qtdBombas;
let marcarBomba = false;
let tamanhoTabuleiro;
let qtdColunasSemBomba;
let dificuldadeEscolhida;
let qtdBombasValidadas = 0;
let qtdCaixasValidadas = 0;

const idUsuario = sessionStorage.ID_USUARIO;

const dificuldades = [{ dificuldade: "facil", qtdColunas: 9, qtdBombas: 10 }, { dificuldade: "media", qtdColunas: 16, qtdBombas: 40 }];
abrirJogo();

function abrirJogo() {
    if (sessionStorage.ID_USUARIO == undefined && sessionStorage.JOGOU_MINEFIELD == undefined) {
        sessionStorage.JOGOU_MINEFIELD = true;
        Swal.fire({
            title: 'Escolha a Dificuldade',
            html:
                '<button id="facil" style="width: 100px; margin: 10px;">Fácil</button>' +
                '<button id="medio" style="width: 100px; margin: 10px;">Médio</button>',
            width: 300,
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: 'Jogar',
        }).then((result) => {
            if (result.isConfirmed) {
                montarTabuleiro(dificuldadeEscolhida);
            }
        });

        document.getElementById('facil').addEventListener('click', () => mudarSwal('facil'));
        document.getElementById('medio').addEventListener('click', () => mudarSwal('medio'));
    } else if (sessionStorage.ID_USUARIO == undefined && sessionStorage.JOGOU_MINEFIELD != undefined) {
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

    if (sessionStorage.ID_USUARIO != undefined) {
        Swal.fire({
            title: 'Escolha a Dificuldade',
            html:
                '<button id="facil" style="width: 100px; margin: 10px;">Fácil</button>' +
                '<button id="medio" style="width: 100px; margin: 10px;">Médio</button>',
            width: 300,
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: 'Jogar',
        }).then((result) => {
            if (result.isConfirmed) {
                montarTabuleiro(dificuldadeEscolhida);
            }
        });

        document.getElementById('facil').addEventListener('click', () => mudarSwal('facil'));
        document.getElementById('medio').addEventListener('click', () => mudarSwal('medio'));
    }
}

function mudarSwal(dificuldade) {
    if (dificuldade == "facil") {
        dificuldadeEscolhida = "Facil";
        Swal.showValidationMessage(`Tamanho: ${dificuldades[0].qtdColunas}x${dificuldades[0].qtdColunas} | Bombas: ${dificuldades[0].qtdBombas}`);
        qtdColunas = dificuldades[0].qtdColunas;
        qtdBombas = dificuldades[0].qtdBombas;
    } else {
        dificuldadeEscolhida = "Medio";
        Swal.showValidationMessage(`Tamanho: ${dificuldades[1].qtdColunas}x${dificuldades[1].qtdColunas} | Bombas: ${dificuldades[1].qtdBombas}`);
        qtdColunas = dificuldades[1].qtdColunas;
        qtdBombas = dificuldades[1].qtdBombas;
    }
    tamanhoTabuleiro = qtdColunas ** 2;
    qtdColunasSemBomba = tamanhoTabuleiro - qtdBombas;
}

function montarTabuleiro(dificuldade) {
    containerInfo.innerHTML = `<p>Bombas restantes: ${qtdBombas - qtdBombasValidadas}</p>`;
    for (let linha = 1; linha <= qtdColunas; linha++) {
        container.innerHTML += `<div class="linha${dificuldade}" id="linha${linha}">`;
        for (let coluna = 1; coluna <= qtdColunas; coluna++) {
            let linhaAtual = document.getElementById(`linha${linha}`);
            linhaAtual.innerHTML += `<button class="coluna${dificuldade}" id="coluna_${linha}_${coluna}" onclick="validar(coluna_${linha}_${coluna})"></button>`;
        }
    }
    criarColunas();
}

function criarColunas() {
    for (let linha = 1; linha <= qtdColunas; linha++) {
        for (let coluna = 1; coluna <= qtdColunas; coluna++) {
            let caixaAtual = document.getElementById(`coluna_${linha}_${coluna}`);
            colunas.push({ caixa: caixaAtual, linha: linha, coluna: coluna, numero: 0, flag: false });
        }
    }
    criarBombas();
}

function criarBombas() {
    while (bombas.length < qtdBombas) {
        let indice = Math.floor(Math.random() * tamanhoTabuleiro);
        let colunaAtual = colunas[indice];
        if (!bombas.some(coluna => coluna === indice)) {
            bombas.push(indice);
            colunaAtual.numero = "bomba";
            numerarColunas(colunaAtual.linha, colunaAtual.coluna);
        }
    }
}

function numerarColunas(linha, coluna) {
    if (linha > 1) {
        if (coluna > 1) aplicarFuncao(linha - 1, coluna - 1);
        aplicarFuncao(linha - 1, coluna);
        if (coluna < qtdColunas) aplicarFuncao(linha - 1, coluna + 1);
    }

    if (coluna > 1) aplicarFuncao(linha, coluna - 1);
    if (coluna < qtdColunas) aplicarFuncao(linha, coluna + 1);

    if (linha < qtdColunas) {
        if (coluna > 1) aplicarFuncao(linha + 1, coluna - 1);
        aplicarFuncao(linha + 1, coluna);
        if (coluna < qtdColunas) aplicarFuncao(linha + 1, coluna + 1);
    }
}

function aplicarFuncao(linha, coluna) {
    colunas.forEach(caixaAtual => {
        if (caixaAtual.linha == linha && caixaAtual.coluna == coluna && caixaAtual.numero !== "bomba") caixaAtual.numero++;
    });
}

containerInfo.innerHTML = `<p>Total de bombas: ${qtdBombas}</p>`;
function validar(caixa) {
    for (let i = 0; i < colunas.length; i++) {
        const caixaAtual = colunas[i];
        if (caixaAtual.caixa == caixa) {
            if (marcarBomba) {
                if (caixaAtual.numero == "bomba") {
                    qtdBombasValidadas++;
                }
                console.log(caixaAtual.flag);

                if (caixaAtual.flag) {
                    caixa.innerHTML = "";
                    caixaAtual.flag = false;
                } else {
                    caixa.innerHTML = `<i class="fa-regular fa-font-awesome" style="color: #7FBF60"></i>`;
                    caixaAtual.flag = true;
                }

            } else {
                if (caixaAtual.numero === "bomba") {
                    mostrarTodasAsBombas(caixa);
                    setTimeout(() => {
                        reiniciar(false);
                    }, 2000);
                }
                else if (caixaAtual.numero === 0) {
                    caixa.disabled = true;
                    caixaAtual.caixa.style = "background-color: rgba(50, 50, 50, 0)";
                    abrirEspacos(caixaAtual.linha, caixaAtual.coluna);
                } else {
                    qtdCaixasValidadas++;
                    caixa.innerHTML = caixaAtual.numero;
                    caixaAtual.caixa.style = "background-color: rgba(50, 50, 50, 0)";
                    caixa.disabled = true;
                }
            }
            if (qtdBombasValidadas == qtdBombas || qtdCaixasValidadas == qtdColunasSemBomba) reiniciar(true);
        }
    }
}

function abrirEspacos(linha, coluna) {
    colunas.forEach(caixaAtual => {
        if (
            Math.abs(caixaAtual.linha - linha) <= 1 &&
            Math.abs(caixaAtual.coluna - coluna) <= 1 &&
            !caixaAtual.caixa.disabled &&
            !(caixaAtual.linha === linha && caixaAtual.coluna === coluna)
        ) {
            caixaAtual.caixa.innerHTML = caixaAtual.numero === 0 ? "" : caixaAtual.numero;
            caixaAtual.caixa.disabled = true;
            caixaAtual.caixa.style = "background-color: rgba(50, 50, 50, 0)";
            qtdCaixasValidadas++;
           
            if (caixaAtual.numero === 0) {
                abrirEspacos(caixaAtual.linha, caixaAtual.coluna);
            }
        }
    });
}


function statusMarcarBomba() {
    if (marcarBomba) {
        statusMostrarBomba.innerHTML = "Marcando caixa";
        marcarBomba = false;
        containerBotao.style = "background-color: rgba(244, 67, 54, 1);";
    }
    else {
        statusMostrarBomba.innerHTML = "Marcando bomba";
        marcarBomba = true;
        containerBotao.style = "background-color: rgba(76, 175, 80, 1);";
    }
}

function reiniciar(ganhou) {
    enviarVitoriaOuDerrota(ganhou);
    if (ganhou) {
        Swal.fire({
            title: "Parabéns!",
            icon: "sucess",
            showConfirmButton: false,
        })
    } else {
        Swal.fire({
            title: "Você perdeeeu!",
            icon: "error",
            showConfirmButton: false,
            timer: 1500
        })
    }
    colunas = [];
    bombas = [];
    qtdColunas;
    qtdBombas;
    marcarBomba = false;
    tamanhoTabuleiro;
    qtdColunasSemBomba;
    dificuldadeEscolhida;
    qtdBombasValidadas = 0;
    qtdCaixasValidadas = 0;
    container.innerHTML = "";
    abrirJogo();
}

function mostrarTodasAsBombas(caixa) {
    colunas.forEach(colunaAtual => {
        if (colunaAtual.numero == "bomba") colunaAtual.caixa.innerHTML = `<i class="fa-solid fa-bomb" style="color: #FFC107"></i>`;
    });
    caixa.innerHTML = `<i class="fa-solid fa-fire" style="color: #dc3232;"></i>`;
}

function enviarVitoriaOuDerrota(ganhou) {
    if (sessionStorage.ID_USUARIO != undefined) {
        fetch("/minefield/registro/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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
}