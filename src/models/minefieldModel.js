var database = require("../database/config");

function registro(idUsuario, ganhou) {
    var instrucaoSql = `
        INSERT INTO minefield (fkUsuario, ganhou) VALUES (${idUsuario}, ${ganhou});
    `;
    console.log("Executando a instrução SQL para cadastrar o usuário: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
        .catch(erro => {
            console.error("Erro ao registrar partida de minefield e meio do usuário:", erro);
            throw erro;
        });
}

module.exports = {
    registro
};
