var database = require("../database/config");

function validarSeEMaiorPontuacao(idUsuario) {
    var instrucaoSql = `
    SELECT MAX(maiorPontuacao) as maiorPontuacao FROM genius WHERE fkUsuario = ${idUsuario};
`;
    console.log("Executando a instrução SQL para cadastrar o usuário: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
        .catch(erro => {
            console.error("Erro ao registrar partida de blackjack do usuário:", erro);
            throw erro;
        });
}

function registro(idUsuario, pontuacao) {
    var instrucaoSql = `
        UPDATE genius SET maiorPontuacao = ${pontuacao} WHERE fkUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL para cadastrar o usuário: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
        .catch(erro => {
            console.error("Erro ao registrar partida de blackjack do usuário:", erro);
            throw erro;
        });
}

module.exports = {
    validarSeEMaiorPontuacao,
    registro
};
