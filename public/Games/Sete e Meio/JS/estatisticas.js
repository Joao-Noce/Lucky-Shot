let idUsuario = sessionStorage.ID_USUARIO;
avatar.innerHTML = `<img src="../..${sessionStorage.AVATAR}">`;
Nome.innerHTML = `${sessionStorage.NOME_USUARIO}`;
Caixa.innerHTML = `R$${sessionStorage.CAIXA_SETE}`;
Dia.innerHTML = `${sessionStorage.INICIO}`;

let avatarValue = sessionStorage.AVATAR;

switch (avatarValue) {
    case "copas":
        avatar.innerHTML = `<img src = "../../Assets/copas_icon.png">`;
        break;
    case "espadas":
        avatar.innerHTML = `<img src = "../../Assets/espadas_icon.png">`;
        break;
    case "ouros":
        avatar.innerHTML = `<img src = "../../Assets/ouros_icon.png">`;
        break;
    case "paus":
        avatar.innerHTML = `<img src = "../../Assets/paus_icon.png">`;
        break;
}

obterDadosGrafico();

function obterDadosGrafico() {
    fetch(`/dashSete/total_rodadas/${idUsuario}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (dados) {
                    console.table(dados);
                    total_rodadas.innerHTML = `${dados[0].total_rodadas} rodadas.`;
                });
            } else {
                console.error('Nenhum dado encontrado da porcentagem ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

    fetch(`/dashSete/total_sete/${idUsuario}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (dados) {
                    console.table(dados);
                    total_sete.innerHTML = `${dados[0].total_sete} vezes!`
                });
            } else {
                console.error('Nenhum dado encontrado da porcentagem ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

    fetch(`/dashSete/porcentagem/${idUsuario}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (dados) {
                    console.table(dados);
                    plotarGrafico_Porcentagem(dados);
                });
            } else {
                console.error('Nenhum dado encontrado da porcentagem ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

    fetch(`/dashSete/lucro/${idUsuario}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (dados) {

                    plotarGrafico_Lucro(dados);
                });
            } else {
                console.error('Nenhum dado encontrado da pergunta1 ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarGrafico_Porcentagem(dados) {

    // Criando estrutura para plotar gráfico - labels e data
    let labels = ['Vitórias', 'Derrotas'];

    Chart.defaults.color = '#ffffff';
    Chart.defaults.font.size = 15;

    let chartData = {
        labels: labels,
        datasets: [{
            label: '',
            data: [dados[0].Vitórias, dados[0].Derrotas],
            backgroundColor: ['#B0CDDA', '#EE675C'],
            borderWidth: 2,
            borderColor: 'transparent'
        }
        ]
    };

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'doughnut',
        data: chartData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: true,
                    text: 'Total de Vitórias e Derrotas'
                }
            }
        },
    };

    let myChart = new Chart(
        document.getElementById('myChartCanvasPorcentagem'),
        config
    );
}

function plotarGrafico_Lucro(dados) {
    console.log("Dados recebidos no plotar lucro:");
    console.table(dados);

    // Criando estrutura para plotar gráfico - labels e data
    let labels = [''];

    Chart.defaults.color = '#FFFFFF';
    Chart.defaults.font.size = 15;

    let chartData = {
        labels: labels,
        datasets: [{
            label: ['Ganhos'],
            data: [dados[0].Ganhos],
            borderWidth: 2,
            borderColor: '#B0CDDA',
        },
        {
            label: 'Perdas',
            data: [dados[0].Perdas],
            borderWidth: 2,
            borderColor: '#EE675C',
        }
        ]
    };

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'bar',
        data: chartData,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 5
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: true,
                    text: 'Controle de Ganhos e Perdas'
                }
            }
        }
    };

    // Adicionando gráfico criado em div na tela
    let myChart = new Chart(
        document.getElementById('myChartCanvasLucro'),
        config
    );
}