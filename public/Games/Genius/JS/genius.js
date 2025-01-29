const cores = ["btnGreen", "btnRed", "btnBlue", "btnOrange"];
const sons = [440, 523, 587, 494];
let partida;
let jogadas;
let rodada;
let pontuacao;
const idUsuario = sessionStorage.ID_USUARIO;

function iniciarJogo() {
    if (sessionStorage.ID_USUARIO == undefined && sessionStorage.JOGOU_GENIUS == undefined) {
        sessionStorage.JOGOU_GENIUS = true;
        partida = [cores[Math.floor(Math.random() * 4)]];
        jogadas = [];
        rodada = 0;
        pontuacao = 0;
        mostrarSequencia(partida);
    } else if (sessionStorage.ID_USUARIO == undefined && sessionStorage.JOGOU_GENIUS != undefined) {
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
        partida = [cores[Math.floor(Math.random() * 4)]];
        jogadas = [];
        rodada = 0;
        pontuacao = 0;
        mostrarSequencia(partida);
    }
}

function jogar(escolha) {
    let acertou = true;
    jogadas.push(escolha);

    const indiceSom = cores.indexOf(escolha);
    if (indiceSom !== -1) playTone(sons[indiceSom], 300);

    if (jogadas[rodada] === partida[rodada]) {
        rodada++;
    } else {
        acertou = false;
    }

    if (rodada === partida.length || !acertou) {
        if (acertou) {
            partida.push(cores[Math.floor(Math.random() * 4)]);
            jogadas = [];
            rodada = 0;
            pontuacao++;
            pontuacaoSpan.innerHTML = `Pontuação: ${pontuacao}`;
            mostrarSequencia(partida);
        } else {
            if (sessionStorage.ID_USUARIO != undefined) {
                fetch("/genius/registro", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        idUsuario,
                        pontuacao
                    }),
                }).then(function (resposta) {
                    if (!resposta.ok) console.log("Não foi possível enviar a pontuação para o banco de dados.");
                    else console.log("Pontuação enviada com sucesso!");
                });
            }
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Perdeeeu!",
                text: `Você obteve uma pontuação de ${pontuacao}!`,
                showConfirmButton: false,
                timer: 2000
            })
            setTimeout(() => {
                iniciarJogo();
            }, 2500);
        }
    }
}

function mostrarSequencia(sequencia) {
    let i = 0;
    let interval = setInterval(() => {
        const corAtual = document.getElementById(sequencia[i]);

        corAtual.classList.add('shine');


        const indiceSom = cores.indexOf(sequencia[i]);
        if (indiceSom !== -1) playTone(sons[indiceSom], 300);

        setTimeout(() => {
            corAtual.classList.remove('shine');
        }, 500);

        i++;

        if (i === sequencia.length) {
            clearInterval(interval);
        }
    }, 1000);
}

function playTone(frequency, duration) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    const oscillator = audioContext.createOscillator();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

    oscillator.connect(audioContext.destination);

    oscillator.start();

    setTimeout(() => {
        oscillator.stop();
    }, duration);
}
iniciarJogo();