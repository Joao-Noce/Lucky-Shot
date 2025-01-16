obterDadosRanking();
function obterDadosRanking() {
    fetch(`/ranking/ranking_caixa_sete`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (dados) {
                    console.table(dados);
                    for (i = 0; i < dados.length; i++) {
                        var registro = dados[i];
                        caixa_numero.innerHTML += `${i + 1}° <br><br>`;
                        caixa_nome.innerHTML += `${registro.nomeUsuario} <br><br>`;
                        caixa_contagem.innerHTML += `${registro.caixaSete} <br><br>`;
                    }
                });
            } else {
                console.error('Nenhum dado encontrado do ranking de caixa ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

    fetch(`/ranking/ranking_vitoria_sete`)
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