var database = require("../database/config");

function autenticar(email_log, senha_log) {
    console.log("Autenticando usuário:", email_log);
    var instrucaoSql = `
        SELECT idUsuario, nomeUsuario, emailUsuario, avatarUsuario, caixaUsuario FROM usuario WHERE emailUsuario = '${email_log}' AND senhaUsuario = '${senha_log}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(name, email_cadastro, senha_cadastro, avatar) {
    console.log("Cadastrando usuário:", name, email_cadastro);
    var instrucaoSql = `
        INSERT INTO usuario (nomeUsuario, emailUsuario, senhaUsuario, avatarUsuario, caixaUsuario) VALUES ('${name}', '${email_cadastro}', '${senha_cadastro}', '${avatar}', 100);
    `;
    console.log("Executando a instrução SQL para cadastrar o usuário: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
        .catch(erro => {
            console.error("Erro ao cadastrar usuário:", erro);
            throw erro;
        });
}

function atualizar_caixa(idUsuario, caixa_atual) {
    var instrucaoSql = `
        UPDATE usuario SET caixaUsuario = ${caixa_atual} where idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL para cadastrar o usuário: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
        .catch(erro => {
            console.error("Erro ao cadastrar usuário:", erro);
            throw erro;
        });
}

function registro(idUsuario, aposta, ganhou, deumaximo) {
    var instrucaoSql = `
        INSERT INTO registro (fkUsuario, aposta, ganhou, deu_maximo) VALUES (${idUsuario}, ${aposta}, ${ganhou}, ${deumaximo});
    `;
    console.log("Executando a instrução SQL para cadastrar o usuário: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
        .catch(erro => {
            console.error("Erro ao cadastrar usuário:", erro);
            throw erro;
        });
}

module.exports = {
    autenticar,
    cadastrar,
    atualizar_caixa,
    registro
};
