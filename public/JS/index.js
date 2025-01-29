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

let gameStats = {
    "Sete e Meio": 1,
    "Blackjack": 1,
    "Genius": 1,
    "Campo Minado": 1,
    "Termo": 1,
    "Sudoku": 1
};
const respostaFetch = ["totalGenius", "totalBlackjack", "totalSete", "totalTermo", "totalCampoMinado", "totalSudoku"]

fetch("/ranking/totais").then(function (resposta) {
    if (resposta.ok) {
        resposta.json().then(function (dados) {
            gameStats["Genius"] = dados[0].totalGenius;
            gameStats["Blackjack"] = dados[0].totalBlackjack;
            gameStats["Sete e Meio"] = dados[0].totalSete;
            gameStats["Termo"] = dados[0].totalTermo;
            gameStats["Campo Minado"] = dados[0].totalCampoMinado;
            gameStats["Sudoku"] = dados[0].totalSudoku;
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
    const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(gameStats),
            datasets: [{
                label: 'Maior Pontuação',
                data: Object.values(gameStats),
                backgroundColor: ['#EE675C', '#B0CDDA', '#7FBF60', '#F8D571', '#A990D6', '#B0CDDA']
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'none',
                    position: 'bottom',
                    // position: 'right',
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
                        selectedDiv.querySelector('p').textContent = `${gameStats[selectedGame]} pontos no ${selectedGame}!`;
                    }
                }
            }
        }
    });
}