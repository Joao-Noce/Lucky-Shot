var database = require("../database/config");

function autenticar(email_log, senha_log) {
    console.log("Autenticando usuário:", email_log);
    var instrucaoSql = `
        SELECT idUsuario, nomeUsuario, emailUsuario, avatarUsuario, DATE_FORMAT(inicio, '%d/%m/%Y') AS inicio, caixaBlackjack, caixaSete FROM usuario WHERE emailUsuario = '${email_log}' AND senhaUsuario = '${senha_log}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

async function cadastrar(name, email_cadastro, senha_cadastro, avatar) {
    console.log("Cadastrando usuário:", name, email_cadastro);

    try {
        const queryUsuario = `
            INSERT INTO usuario (nomeUsuario, emailUsuario, senhaUsuario, avatarUsuario, caixaBlackjack, caixaSete) 
            VALUES ('${name}', '${email_cadastro}', '${senha_cadastro}', '${avatar}', 100, 100);
        `;
        console.log("Executando instrução SQL para o usuário: \n" + queryUsuario);

        const resultadoUsuario = await database.executar(queryUsuario);
        const idUsuario = resultadoUsuario.insertId;

        const queryGenius = `
            INSERT INTO genius (fkUsuario, maiorPontuacao) VALUES (${idUsuario}, 0);
        `;

        console.log("Executando instrução SQL para Genius: \n" + queryGenius);
        await database.executar(queryGenius);

        console.log("Usuário cadastrado com sucesso!");
    } catch (erro) {
        console.error("Erro ao cadastrar usuário:", erro);
        throw erro;
    }
}

function buscarSenha(idUsuario) {
    console.log("Buscando senha do usuário:", idUsuario);
    var instrucaoSql = `
        SELECT senhaUsuario FROM usuario WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarPerfil(idUsuario, nome, email, senha, avatar) {
    console.log("Atualizando usuário:", idUsuario);
    var instrucaoSql = `
        UPDATE usuario SET nomeUsuario = "${nome}", emailusuario = "${email}", senhaUsuario = "${senha}", avatarUsuario = "${avatar}" WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

async function encerrarConta(idUsuario) {
    console.log("Excluindo usuário: " + idUsuario);
    try { 
        const queryTermo = `
            DELETE FROM termo WHERE fkUsuario = ${idUsuario};
        `;
        console.log("Executando instrução SQL para Termo: \n" + queryTermo);
        await database.executar(queryTermo);
        console.log("Dados de Termo apagado com sucesso!");

        const queryMinefield = `
            DELETE FROM minefield WHERE fkUsuario = ${idUsuario};
        `;
        console.log("Executando instrução SQL para Minefield: \n" + queryMinefield);
        await database.executar(queryMinefield);
        console.log("Dados de Minefield apagado com sucesso!");

        const queryGenius = `
            DELETE FROM genius WHERE fkUsuario = ${idUsuario};
        `;
        console.log("Executando instrução SQL para Genius: \n" + queryGenius);
        await database.executar(queryGenius);
        console.log("Dados de genius apagado com sucesso!");

        const queryUsuario = `
            DELETE FROM usuario WHERE fkUsuario = ${idUsuario};
        `;
        console.log("Executando instrução SQL para Usuario: \n" + queryUsuario);
        await database.executar(queryUsuario);
        console.log("Dados de Usuario apagado com sucesso!");
    } catch (erro) {
        console.error("Erro ao cadastrar usuário:", erro);
        throw erro;
    }
}

module.exports = {
    autenticar,
    cadastrar,
    buscarSenha,
    atualizarPerfil,
    encerrarConta
};
