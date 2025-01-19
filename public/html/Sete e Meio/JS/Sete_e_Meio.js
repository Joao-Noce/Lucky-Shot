const cartas = [
    { nome: 'Às', nipe: 'Paus', ponto: 1, imagem: "https://deckofcardsapi.com/static/img/AC.png" },
    { nome: 'Às', nipe: 'Ouros', ponto: 1, imagem: "https://deckofcardsapi.com/static/img/AD.png" },
    { nome: 'Às', nipe: 'Espadas', ponto: 1, imagem: "https://deckofcardsapi.com/static/img/AS.png" },
    { nome: 'Às', nipe: 'Copas', ponto: 1, imagem: "https://deckofcardsapi.com/static/img/AH.png" },

    { nome: '2', nipe: 'Paus', ponto: 2, imagem: "https://deckofcardsapi.com/static/img/2C.png" },
    { nome: '2', nipe: 'Ouros', ponto: 2, imagem: "https://deckofcardsapi.com/static/img/2D.png" },
    { nome: '2', nipe: 'Espadas', ponto: 2, imagem: "https://deckofcardsapi.com/static/img/2S.png" },
    { nome: '2', nipe: 'Copas', ponto: 2, imagem: "https://deckofcardsapi.com/static/img/2H.png" },

    { nome: '3', nipe: 'Paus', ponto: 3, imagem: "https://deckofcardsapi.com/static/img/3C.png" },
    { nome: '3', nipe: 'Ouros', ponto: 3, imagem: "https://deckofcardsapi.com/static/img/3D.png" },
    { nome: '3', nipe: 'Espadas', ponto: 3, imagem: "https://deckofcardsapi.com/static/img/3S.png" },
    { nome: '3', nipe: 'Copas', ponto: 3, imagem: "https://deckofcardsapi.com/static/img/3H.png" },

    { nome: '4', nipe: 'Paus', ponto: 4, imagem: "https://deckofcardsapi.com/static/img/4C.png" },
    { nome: '4', nipe: 'Ouros', ponto: 4, imagem: "https://deckofcardsapi.com/static/img/4D.png" },
    { nome: '4', nipe: 'Espadas', ponto: 4, imagem: "https://deckofcardsapi.com/static/img/4S.png" },
    { nome: '4', nipe: 'Copas', ponto: 4, imagem: "https://deckofcardsapi.com/static/img/4H.png" },

    { nome: '5', nipe: 'Paus', ponto: 5, imagem: "https://deckofcardsapi.com/static/img/5C.png" },
    { nome: '5', nipe: 'Ouros', ponto: 5, imagem: "https://deckofcardsapi.com/static/img/5D.png" },
    { nome: '5', nipe: 'Espadas', ponto: 5, imagem: "https://deckofcardsapi.com/static/img/5S.png" },
    { nome: '5', nipe: 'Copas', ponto: 5, imagem: "https://deckofcardsapi.com/static/img/5H.png" },

    { nome: '6', nipe: 'Paus', ponto: 6, imagem: "https://deckofcardsapi.com/static/img/6C.png" },
    { nome: '6', nipe: 'Ouros', ponto: 6, imagem: "https://deckofcardsapi.com/static/img/6D.png" },
    { nome: '6', nipe: 'Espadas', ponto: 6, imagem: "https://deckofcardsapi.com/static/img/6S.png" },
    { nome: '6', nipe: 'Copas', ponto: 6, imagem: "https://deckofcardsapi.com/static/img/6H.png" },

    { nome: '7', nipe: 'Paus', ponto: 7, imagem: "https://deckofcardsapi.com/static/img/7C.png" },
    { nome: '7', nipe: 'Ouros', ponto: 7, imagem: "https://deckofcardsapi.com/static/img/7D.png" },
    { nome: '7', nipe: 'Espadas', ponto: 7, imagem: "https://deckofcardsapi.com/static/img/7S.png" },
    { nome: '7', nipe: 'Copas', ponto: 7, imagem: "https://deckofcardsapi.com/static/img/7H.png" },

    { nome: 'Valete', nipe: 'Paus', ponto: 0.5, imagem: "https://deckofcardsapi.com/static/img/JC.png" },
    { nome: 'Valete', nipe: 'Ouros', ponto: 0.5, imagem: "https://deckofcardsapi.com/static/img/JD.png" },
    { nome: 'Valete', nipe: 'Espadas', ponto: 0.5, imagem: "https://deckofcardsapi.com/static/img/JS.png" },
    { nome: 'Valete', nipe: 'Copas', ponto: 0.5, imagem: "https://deckofcardsapi.com/static/img/JH.png" },

    { nome: 'Rainha', nipe: 'Paus', ponto: 0.5, imagem: "https://deckofcardsapi.com/static/img/QC.png" },
    { nome: 'Rainha', nipe: 'Ouros', ponto: 0.5, imagem: "https://deckofcardsapi.com/static/img/QD.png" },
    { nome: 'Rainha', nipe: 'Espadas', ponto: 0.5, imagem: "https://deckofcardsapi.com/static/img/QS.png" },
    { nome: 'Rainha', nipe: 'Copas', ponto: 0.5, imagem: "https://deckofcardsapi.com/static/img/QH.png" },

    { nome: 'Rei', nipe: 'Paus', ponto: 0.5, imagem: "https://deckofcardsapi.com/static/img/KC.png" },
    { nome: 'Rei', nipe: 'Ouros', ponto: 0.5, imagem: "https://deckofcardsapi.com/static/img/KD.png" },
    { nome: 'Rei', nipe: 'Espadas', ponto: 0.5, imagem: "https://deckofcardsapi.com/static/img/KS.png" },
    { nome: 'Rei', nipe: 'Copas', ponto: 0.5, imagem: "https://deckofcardsapi.com/static/img/KH.png" },
]

let aposta = 0;

function ficha_vermelha() {
    aposta += 5;
    input_aposta.innerHTML = `${aposta}£`;
}
function ficha_azul() {
    aposta += 10;
    input_aposta.innerHTML = `${aposta}£`;
}
function ficha_verde() {
    aposta += 25;
    input_aposta.innerHTML = `${aposta}£`;
}
function ficha_preta() {
    aposta += 100;
    input_aposta.innerHTML = `${aposta}£`;
}

function limpar_aposta() {
    aposta = 0;
    input_aposta.innerHTML = `${aposta}£`;
}

let soma_pontos_jogador = 0;
let soma_pontos_banca = 0;
let ganhou;
let deumaximo;
let caixa_atual = Number(sessionStorage.CAIXA_SETE);
let idUsuario = sessionStorage.ID_USUARIO;
let nomeUsuario = sessionStorage.NOME_USUARIO;

let avatar = sessionStorage.AVATAR;

switch (avatar) {
    case "copas":
        console.log(avatar);
        imagem_usuario.innerHTML = `<img src = "../../Assets/copas_icon.png">`;
        break;
        case "espadas":
        imagem_usuario.innerHTML = `<img src = "../../Assets/espadas_icon.png">`;
        break;
    case "ouros":
        imagem_usuario.innerHTML = `<img src = "../../Assets/ouros_icon.png">`;
        break;
    case "paus":
        imagem_usuario.innerHTML = `<img src = "../../Assets/paus_icon.png">`;
        break;
}

caixa_aposta.innerHTML = `${caixa_atual}£`;
nomeUsuarioH2.innerHTML = nomeUsuario;
let cartas_jogadas = [];
let cartas_jogadas_banca = [];
let ja_tem = false;
function pedir_outra() {
    if (aposta <= caixa_atual && aposta > 0) {
        let carta_escolhida = (Number((Math.random() * 39).toFixed(0)));
        for (cont = 0; cont < cartas_jogadas.length; cont++) {
            if (carta_escolhida == cartas_jogadas[cont]) {
                ja_tem = true;
            }
        }
        if (!ja_tem) {
            cartas_jogadas.push(carta_escolhida);
        } else {
            carta_escolhida = (Number((Math.random() * 39).toFixed(0)));
        }
        if (soma_pontos_jogador <= 7.5) {

            soma_pontos_jogador += cartas[carta_escolhida].ponto;
            console.table(cartas[carta_escolhida]);
            console.log(soma_pontos_jogador);
            div_jogador.innerHTML += `
            <div class="flip-container">
                <div class="flipper">
                    <div class="front">
                        <img src="https://deckofcardsapi.com/static/img/back.png">
                    </div>
                    <div class="back">
                        <img src="${cartas[carta_escolhida].imagem}">
                    </div>
                </div>
            </div>
            `;
            setTimeout(() => {
                const flippers = document.querySelectorAll('.flipper');
                const lastFlipper = flippers[flippers.length - 1];
                lastFlipper.style.transform = 'rotateY(180deg)';
                total_soma.innerHTML = soma_pontos_jogador;
            }, 200);

            setTimeout(() => {
                if (soma_pontos_jogador == 7.5) {
                    ganhou = 1;
                    deumaximo = 1;
                    caixa_atual += aposta;
                    sessionStorage.CAIXA_SETE = caixa_atual;

                    fetch("/sete/registro", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            idUsuario,
                            aposta,
                            ganhou,
                            deumaximo
                        }),
                    })
                        .then(function (resposta) {
                            if (resposta.ok) {
                                console.table(resposta);
                            }
                        });

                    fetch("/sete/atualizar_caixa", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            idUsuario,
                            caixa_atual
                        }),
                    })
                        .then(function (resposta) {
                            if (resposta.ok) {
                                Swal.fire({
                                    title: "SETE E MEIO!",
                                    text: "Será que consegue essa proeza de novo",
                                    background: '#1D1D1D',
                                    icon: "success",
                                    color: '#FFF',
                                    showCancelButton: false,
                                    showConfirmButton: false,
                                    timer: 1500
                                }).then((result) => {
                                    soma_pontos_banca = 0;
                                    soma_pontos_jogador = 0;
                                    div_jogador.innerHTML = '';
                                    total_soma.innerHTML = '';
                                    div_banca.innerHTML = '';
                                    imagem_usuario.innerHTML = `<img src ="${avatar}">`;
                                    caixa_aposta.innerHTML = `${caixa_atual}£`;
                                    console.clear();
                                    aposta = 0;
                                    input_aposta.innerHTML = '0£';
                                })
                            }
                        })

                } else if (soma_pontos_jogador > 7.5) {
                    ganhou = 0;
                    deumaximo = 0;
                    caixa_atual -= aposta;
                    sessionStorage.CAIXA_SETE = caixa_atual;

                    fetch("/sete/registro", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            idUsuario,
                            aposta,
                            ganhou,
                            deumaximo
                        }),
                    })
                        .then(function (resposta) {
                            if (resposta.ok) {
                                console.table(resposta);
                            }
                        });

                    fetch("/sete/atualizar_caixa", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            idUsuario,
                            caixa_atual
                        }),
                    })
                        .then(function (resposta) {
                            if (resposta.ok) {
                                Swal.fire({
                                    title: `ESTOUROU COM ${soma_pontos_jogador} PONTOS!`,
                                    text: "Tá sem sorte, em?",
                                    icon: "error",
                                    background: '#1D1D1D',
                                    color: '#FFF',
                                    showCancelButton: false,
                                    showConfirmButton: false,
                                    timer: 1500
                                }).then((result) => {
                                    soma_pontos_banca = 0;
                                    soma_pontos_jogador = 0;
                                    div_jogador.innerHTML = '';
                                    total_soma.innerHTML = '';
                                    div_banca.innerHTML = '';
                                    imagem_usuario.innerHTML = `<img src ="${avatar}">`;
                                    caixa_aposta.innerHTML = `${caixa_atual}£`;
                                    console.clear();
                                    aposta = 0;
                                    input_aposta.innerHTML = '0£';
                                });
                            }
                        })
                }
            }, 1000)
        }
    } else {
        Swal.fire({
            title: `APOSTA INVÁLIDA!`,
            icon: "error",
            background: '#1D1D1D',
            color: '#FFF',
            showCancelButton: false,
            showConfirmButton: false,
            timer: 1500,
        });
    }
}


let ja_tem_banca = false;
function passar_vez() {

    while (soma_pontos_banca <= 7.5) {

        let carta_escolhida = (Number((Math.random() * 39).toFixed(0)));

        for (cont = 0; cont < cartas_jogadas_banca.length; cont++) {
            if (carta_escolhida == cartas_jogadas_banca[cont]) {
                ja_tem_banca = true;
            }
        }
        if (!ja_tem_banca) {
            cartas_jogadas_banca.push(carta_escolhida);
        } else {
            carta_escolhida = (Number((Math.random() * 39).toFixed(0)));
        }

        soma_pontos_banca += cartas[carta_escolhida].ponto;
        console.table(cartas[carta_escolhida]);
        console.log(soma_pontos_banca);
        div_banca.innerHTML += `<img src="${cartas[carta_escolhida].imagem}">`;

        if (soma_pontos_banca > soma_pontos_jogador && soma_pontos_banca > 6.5 && soma_pontos_banca <= 7.5 || soma_pontos_banca == 7.5) {
            ganhou = 0;
            deumaximo = 0;
            caixa_atual -= aposta;
            sessionStorage.CAIXA_SETE = caixa_atual;

            fetch("/sete/registro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idUsuario,
                    aposta,
                    ganhou,
                    deumaximo
                }),
            })
                .then(function (resposta) {
                    if (resposta.ok) {
                        console.table(resposta);
                    }
                });

            fetch("/sete/atualizar_caixa", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idUsuario,
                    caixa_atual
                }),
            })
                .then(function (resposta) {
                    if (resposta.ok) {
                        setTimeout(() => {
                            Swal.fire({
                                title: `A BANCA VENCEU COM ${soma_pontos_banca} PONTOS!`,
                                text: "Por poouco!",
                                icon: "error",
                                background: '#1D1D1D',
                                color: '#FFF',
                                showConfirmButton: false,
                                showCancelButton: false,
                                timer: 1500
                            }).then((result) => {
                                soma_pontos_banca = 0;
                                soma_pontos_jogador = 0;
                                div_jogador.innerHTML = '';
                                total_soma.innerHTML = '';
                                div_banca.innerHTML = '';
                                cartas_jogadas = [];
                                cartas_jogadas_banca = [];
                                console.clear();
                                aposta = 0;
                                input_aposta.innerHTML = '0£';
                            });
                        }, 800);
                        imagem_usuario.innerHTML = `<img src ="${avatar}">`;
                        caixa_aposta.innerHTML = `${caixa_atual}£`;
                    }
                })
            break;
        }

        if (soma_pontos_banca > 7.5) {
            ganhou = 1;
            deumaximo = 0;
            caixa_atual += aposta;
            sessionStorage.CAIXA_SETE = caixa_atual;

            fetch("/sete/registro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idUsuario,
                    aposta,
                    ganhou,
                    deumaximo
                }),
            })
                .then(function (resposta) {
                    if (resposta.ok) {
                        console.table(resposta);
                    }
                });

            fetch("/sete/atualizar_caixa", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idUsuario,
                    caixa_atual
                }),
            })
                .then(function (resposta) {
                    if (resposta.ok) {
                        setTimeout(() => {
                            Swal.fire({
                                title: `VOCÊ VENCEU COM ${soma_pontos_jogador} PONTOS!`,
                                text: "Ganhoou!!",
                                background: '#1D1D1D',
                                icon: "success",
                                color: '#FFF',
                                showCancelButton: false,
                                showConfirmButton: false,
                                timer: 1500
                            }).then((result) => {
                                soma_pontos_banca = 0;
                                soma_pontos_jogador = 0;
                                div_jogador.innerHTML = '';
                                total_soma.innerHTML = '';
                                div_banca.innerHTML = '';
                                cartas_jogadas = [];
                                cartas_jogadas_banca = [];
                                console.clear();
                                input_aposta.innerHTML = '0£'
                                input_aposta.innerHTML = '0£';
                            });
                        }, 800);
                        caixa_aposta.innerHTML = `${caixa_atual}£`;
                    } else {
                        console.log('ERRO');
                    }
                })
        }
    }
}