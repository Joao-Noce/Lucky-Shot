var database = require("../database/config");

function ranking_caixa_sete() {
    console.log("ACESSEI O DASH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pergunta1()");
    var instrucaoSql1 = `
    SELECT nomeUsuario,
    caixaSete
    FROM usuario
    ORDER BY caixaSete DESC
    LIMIT 10;`;

    console.log("Executando as instrução SQL: \n" + instrucaoSql1);
    return database.executar(instrucaoSql1);
}

function ranking_vitoria_sete() {
    console.log("ACESSEI O DASH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pergunta1()");
    var instrucaoSql1 = `
    SELECT nomeUsuario,
    COUNT(ganhou) AS Quantidade
    FROM usuario
    JOIN sete ON idUsuario = fkUsuario
    WHERE ganhou = 1
    GROUP BY nomeUsuario
    ORDER BY Quantidade DESC
    LIMIT 10;`;

    console.log("Executando as instrução SQL: \n" + instrucaoSql1);
    return database.executar(instrucaoSql1);
}

function ranking_caixa_blackjack() {
    console.log("ACESSEI O DASH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pergunta1()");
    var instrucaoSql1 = `
    SELECT nomeUsuario,
    caixaBlackjack
    FROM usuario
    ORDER BY caixaBlackjack DESC
    LIMIT 10;`;

    console.log("Executando as instrução SQL: \n" + instrucaoSql1);
    return database.executar(instrucaoSql1);
}

function ranking_vitoria_blackjack() {
    console.log("ACESSEI O DASH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pergunta1()");
    var instrucaoSql1 = `
    SELECT nomeUsuario,
    COUNT(ganhou) AS Quantidade
    FROM usuario
    JOIN blackjack ON idUsuario = fkUsuario
    WHERE ganhou = 1
    GROUP BY nomeUsuario
    ORDER BY Quantidade DESC
    LIMIT 10;`;

    console.log("Executando as instrução SQL: \n" + instrucaoSql1);
    return database.executar(instrucaoSql1);
}

function ranking_genius() {
    console.log("ACESSEI O DASH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pergunta1()");
    var instrucaoSql1 = `
    SELECT nomeUsuario,
    MAX(maiorPontuacao) as maiorPontuacao
    FROM usuario
    JOIN genius ON idUsuario = fkUsuario
    GROUP BY nomeUsuario
    ORDER BY maiorPontuacao DESC
    LIMIT 10;`;

    console.log("Executando as instrução SQL: \n" + instrucaoSql1);
    return database.executar(instrucaoSql1);
}

function ranking_minefield() {
    console.log("ACESSEI O DASH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pergunta1()");
    var instrucaoSql1 = `
    SELECT nomeUsuario,
    COUNT(ganhou) AS Quantidade
    FROM usuario
    JOIN minefield ON idUsuario = fkUsuario
    WHERE ganhou = 1
    GROUP BY nomeUsuario
    ORDER BY Quantidade DESC
    LIMIT 10;`;

    console.log("Executando as instrução SQL: \n" + instrucaoSql1);
    return database.executar(instrucaoSql1);
}

function ranking_sudoku() {
    console.log("ACESSEI O DASH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pergunta1()");
    var instrucaoSql1 = `
    SELECT nomeUsuario,
    COUNT(ganhou) AS Quantidade
    FROM usuario
    JOIN sudoku ON idUsuario = fkUsuario
    WHERE ganhou = 1
    GROUP BY nomeUsuario
    ORDER BY Quantidade DESC
    LIMIT 10;`;

    console.log("Executando as instrução SQL: \n" + instrucaoSql1);
    return database.executar(instrucaoSql1);
}

function ranking_termo() {
    console.log("ACESSEI O DASH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pergunta1()");
    var instrucaoSql1 = `
    SELECT nomeUsuario,
    COUNT(ganhou) AS Quantidade
    FROM usuario
    JOIN termo ON idUsuario = fkUsuario
    WHERE ganhou = 1
    GROUP BY nomeUsuario
    ORDER BY Quantidade DESC
    LIMIT 10;`;

    console.log("Executando as instrução SQL: \n" + instrucaoSql1);
    return database.executar(instrucaoSql1);
}

function totais() {
    console.log("ACESSEI O DASH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function ranking_maior_pontuacao()");
    
    var instrucaoSql = `
    SELECT 
    (SELECT MAX(maiorPontuacao) FROM genius) AS totalGenius,
    (SELECT MAX(vitoria_count) FROM (SELECT COUNT(ganhou) AS vitoria_count FROM blackjack WHERE ganhou = 1 GROUP BY fkUsuario) AS subqueryBlackjack) AS totalBlackjack,
    (SELECT MAX(vitoria_count) FROM (SELECT COUNT(ganhou) AS vitoria_count FROM sete WHERE ganhou = 1 GROUP BY fkUsuario) AS subquerySete) AS totalSete,
    (SELECT MAX(vitoria_count) FROM (SELECT COUNT(ganhou) AS vitoria_count FROM termo WHERE ganhou = 1 GROUP BY fkUsuario) AS subqueryTermo) AS totalTermo,
    (SELECT MAX(vitoria_count) FROM (SELECT COUNT(ganhou) AS vitoria_count FROM minefield WHERE ganhou = 1 GROUP BY fkUsuario) AS subqueryMinefield) AS totalCampoMinado,
    (SELECT MAX(vitoria_count) FROM (SELECT COUNT(ganhou) AS vitoria_count FROM sudoku WHERE ganhou = 1 GROUP BY fkUsuario) AS subquerySudoku) AS totalSudoku;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
 ranking_caixa_sete,
 ranking_vitoria_sete,
 ranking_caixa_blackjack,
 ranking_vitoria_blackjack,
 ranking_genius,
 ranking_minefield,
 ranking_termo,
 ranking_sudoku,
 totais
}