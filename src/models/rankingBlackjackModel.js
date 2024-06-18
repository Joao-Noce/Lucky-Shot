var database = require("../database/config");

function ranking_caixa() {
    console.log("ACESSEI O DASH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pergunta1()");
    var instrucaoSql1 = `
    SELECT nomeUsuario,
    caixaBlackjack
    FROM usuario
    ORDER BY caixaBlackjack DESC;`;

    console.log("Executando as instrução SQL: \n" + instrucaoSql1);
    return database.executar(instrucaoSql1);
}

function ranking_vitoria() {
    console.log("ACESSEI O DASH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pergunta1()");
    var instrucaoSql1 = `
    SELECT nomeUsuario,
    COUNT(ganhou) AS Quantidade
    FROM usuario
    JOIN blackjack ON idUsuario = fkUsuario
    WHERE ganhou = 1
    GROUP BY nomeUsuario
    ORDER BY Quantidade DESC;`;

    console.log("Executando as instrução SQL: \n" + instrucaoSql1);
    return database.executar(instrucaoSql1);
}

module.exports = {
 ranking_caixa,
 ranking_vitoria
}