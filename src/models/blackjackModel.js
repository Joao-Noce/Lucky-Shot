var database = require("../database/config");

function atualizar_caixa(idUsuario, caixa_atual) {
    var instrucaoSql = `
        UPDATE usuario SET caixaBlackjack = ${caixa_atual} where idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL para cadastrar o usuário: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
        .catch(erro => {
            console.error("Erro ao atualizar caixaBlackjack do usuário:", erro);
            throw erro;
        });
}

function registro(idUsuario, aposta, ganhou, deumaximo) {
    var instrucaoSql = `
        INSERT INTO blackjack (fkUsuario, aposta, ganhou, deu_maximo) VALUES (${idUsuario}, ${aposta}, ${ganhou}, ${deumaximo});
    `;
    console.log("Executando a instrução SQL para cadastrar o usuário: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
        .catch(erro => {
            console.error("Erro ao registrar partida de blackjack do usuário:", erro);
            throw erro;
        });
}

module.exports = {
    atualizar_caixa,
    registro
};
