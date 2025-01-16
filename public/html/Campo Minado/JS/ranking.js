obterDadosRanking();
function obterDadosRanking() {
    fetch(`/ranking/ranking_minefield`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (dados) {
                    console.table(dados);
                    for (i = 0; i < dados.length; i++) {
                        var registro = dados[i];
                        vitoria_numero.innerHTML += `${i + 1}° <br><br>`;
                        vitoria_nome.innerHTML += `${registro.nomeUsuario} <br><br>`;
                        vitoria_contagem.innerHTML += `${registro.Quantidade} <br><br>`;
                    }
                })
            } else {
                console.error('Nenhum dado encontrado do ranking de vitórias ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}