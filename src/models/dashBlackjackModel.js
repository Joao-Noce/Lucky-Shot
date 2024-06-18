var database = require("../database/config");

function porcentagem(idUsuario) {
    console.log("ACESSEI O DASH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pergunta1()");
    var instrucaoSql1 = `
    SELECT COUNT(CASE WHEN ganhou = 0 THEN 1 END) AS 'Derrotas',
    COUNT(CASE WHEN ganhou = 1 THEN 1 END) AS 'Vitórias'
    FROM blackjack WHERE fkUsuario = ${idUsuario};`;

    console.log("Executando as instrução SQL: \n" + instrucaoSql1);
    return database.executar(instrucaoSql1);
}

function lucro(idUsuario) {
    console.log("ACESSEI O DASH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pergunta1()");
    var instrucaoSql1 = `
    SELECT SUM(CASE WHEN ganhou = 0 THEN aposta END) AS Perdas,
    SUM(CASE WHEN ganhou = 1 THEN aposta END) AS Ganhos FROM blackjack WHERE fkUsuario = ${idUsuario};`;

    console.log("Executando as instrução SQL: \n" + instrucaoSql1);
    return database.executar(instrucaoSql1);
}

function total_rodadas(idUsuario) {
    console.log("ACESSEI O DASH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pergunta1()");
    var instrucaoSql1 = `
    SELECT COUNT(idBlackjack) as total_rodadas FROM blackjack WHERE fkUsuario = ${idUsuario};`;

    console.log("Executando as instrução SQL: \n" + instrucaoSql1);
    return database.executar(instrucaoSql1);
}

function total_blackjack(idUsuario) {
    console.log("ACESSEI O DASH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pergunta1()");
    var instrucaoSql1 = `
    SELECT COUNT(deu_maximo) AS total_blackjack FROM blackjack WHERE fkUsuario = ${idUsuario} AND deu_maximo = 1;`;

    console.log("Executando as instrução SQL: \n" + instrucaoSql1);
    return database.executar(instrucaoSql1);
}

module.exports = {
    porcentagem,
    lucro,
    total_rodadas,
    total_blackjack
}