obterDadosRanking();
function obterDadosRanking() {
    fetch(`/ranking/ranking_genius`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (dados) {
                    console.table(dados);
                    for (i = 0; i < dados.length; i++) {
                        var registro = dados[i];
                        caixa_numero.innerHTML += `${i + 1}° <br><br>`;
                        caixa_nome.innerHTML += `${registro.nomeUsuario} <br><br>`;
                        maiorPontuacao.innerHTML += `${registro.maiorPontuacao} <br><br>`;
                    }
                });
            } else {
                console.error('Nenhum dado encontrado do ranking de caixa ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}