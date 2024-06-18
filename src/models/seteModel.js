var database = require("../database/config");

function atualizar_caixa(idUsuario, caixa_atual) {
    var instrucaoSql = `
        UPDATE usuario SET caixaSete = ${caixa_atual} where idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL para cadastrar o usuário: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
        .catch(erro => {
            console.error("Erro ao atualizar caixaSete do usuário:", erro);
            throw erro;
        });
}

function registro(idUsuario, aposta, ganhou, deumaximo) {
    var instrucaoSql = `
        INSERT INTO sete (fkUsuario, aposta, ganhou, deu_maximo) VALUES (${idUsuario}, ${aposta}, ${ganhou}, ${deumaximo});
    `;
    console.log("Executando a instrução SQL para cadastrar o usuário: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
        .catch(erro => {
            console.error("Erro ao registrar partida de sete e meio do usuário:", erro);
            throw erro;
        });
}

module.exports = {
    atualizar_caixa,
    registro
};
