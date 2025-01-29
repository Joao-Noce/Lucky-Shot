for (let i = sessionStorage.length - 1; i >= 0; i--) {
    const chave = sessionStorage.key(i);
    if (!chave.startsWith("JOGOU_")) sessionStorage.removeItem(chave);
}

document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.style.borderBottom = "solid white 2px";
        } else {
            header.style.borderBottom = "none";
        }
    });
});

let gameStats = [
    { nome: "Sete e Meio", maiorPontuacao: 1, qtdJogadores: 1, qtdPartidas: 1 },
    { nome: "Blackjack", maiorPontuacao: 1, qtdJogadores: 1, qtdPartidas: 1 },
    { nome: "Genius", maiorPontuacao: 1, qtdJogadores: 1, qtdPartidas: 1 },
    { nome: "Campo Minado", maiorPontuacao: 1, qtdJogadores: 1, qtdPartidas: 1 },
    { nome: "Termo", maiorPontuacao: 1, qtdJogadores: 1, qtdPartidas: 1 },
    { nome: "Sudoku", maiorPontuacao: 1, qtdJogadores: 1, qtdPartidas: 1 },
];

fetch("/ranking/totais").then(function (resposta) {
    if (resposta.ok) {
        resposta.json().then(function (dados) {
            console.log(dados);

            gameStats[0].maiorPontuacao = dados[0].totalSete;
            gameStats[1].maiorPontuacao = dados[0].totalBlackjack;
            gameStats[2].maiorPontuacao = dados[0].totalGenius;
            gameStats[3].maiorPontuacao = dados[0].totalCampoMinado;
            gameStats[4].maiorPontuacao = dados[0].totalTermo;
            gameStats[5].maiorPontuacao = dados[0].totalSudoku;
            gameStats[0].qtdJogadores = dados[0].totalJogadoresSete;
            gameStats[1].qtdJogadores = dados[0].totalJogadoresBlackjack;
            gameStats[2].qtdJogadores = dados[0].totalJogadoresGenius;
            gameStats[3].qtdJogadores = dados[0].totalJogadoresCampo;
            gameStats[4].qtdJogadores = dados[0].totalJogadoresTermo;
            gameStats[5].qtdJogadores = dados[0].totalJogadoresSudoku;
            gameStats[0].qtdPartidas = dados[0].totalJogadasSete;
            gameStats[1].qtdPartidas = dados[0].totalJogadasBlackjack;
            gameStats[2].qtdPartidas = dados[0].totalJogadasGenius;
            gameStats[3].qtdPartidas = dados[0].totalJogadasCampo;
            gameStats[4].qtdPartidas = dados[0].totalJogadasTermo;
            gameStats[5].qtdPartidas = dados[0].totalJogadasSudoku;

            criarChart();
        })
    } else {
        console.error('Nenhum dado encontrado do ranking de vitórias ou erro na API');
    }
})
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

function formatGameId(gameName) {
    return gameName
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/\s/g, '');
}

function criarChart() {
    const ctx = document.getElementById('statsChart').getContext('2d');
    const nomeJogo = gameStats.map(game => game.nome);
    const maiorPontuacao = gameStats.map(game => game.maiorPontuacao);
    const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: nomeJogo,
            datasets: [{
                label: 'Maior Pontuação',
                data: maiorPontuacao,
                backgroundColor: ['#EE675C', '#B0CDDA', '#7FBF60', '#F8D571', '#A990D6', '#2C6B91']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'none',
                    // position: 'bottom',
                    position: 'right',
                    labels: {
                        color: 'white',
                        font: {
                            size: 15,
                            family: 'Josefin Sans'
                        }
                    }
                }
            },
            onClick: (event, elements) => {
                if (elements.length > 0) {
                    const index = elements[0].index;
                    const selectedGame = chart.data.labels[index];
                    document.querySelectorAll('[name="game"]').forEach(div => div.style.display = 'none');
                    const gameId = formatGameId(selectedGame) + 'Div';
                    const selectedDiv = document.getElementById(gameId);
                    if (selectedDiv) {
                        selectedDiv.style.display = 'flex';
                        const qtdJogadores = gameStats.find(game => game.nome === selectedGame).qtdJogadores;
                        const qtdPartidas = gameStats.find(game => game.nome === selectedGame).qtdPartidas;
                        console.log(gameStats);

                        selectedDiv.querySelector('p').textContent = `${selectedGame} já foi jogado ${qtdPartidas} vezes por ${qtdJogadores} jogadores!`;
                    }
                }
            }
        }
    });
}