var usuarioModel = require("../models/usuarioModel");
let usuarioGlobal;
function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        res.status(200).json(resultadoAutenticar[0]); // Supondo que você queira enviar apenas o primeiro usuário encontrado
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(function (erro) {
                console.log(erro);
                const errorMessage = erro.sqlMessage ? erro.sqlMessage : "Houve um erro ao realizar o login!";
                console.log("\nHouve um erro ao realizar o login! Erro: ", errorMessage);
                res.status(500).json(errorMessage);
            }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var avatar = req.body.avatarServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (avatar == undefined) {
        res.status(400).send("Seu avatar está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha, avatar)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function atualizar_caixa(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo Site_Quiz.html
    let idUsuario = req.body.idUsuario;
    let caixa_atual = req.body.caixa_atual;
    usuarioGlobal = idUsuario;

    // Faça as validações dos valores
    if (idUsuario == undefined) {
        res.status(400).send("Sem idUsuario!");
    } else if (caixa_atual == undefined) {
        res.status(400).send("Sem caixa!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.atualizar_caixa(idUsuario, caixa_atual)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o Questionário! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function registro(req, res) {
    let idUsuario = req.body.idUsuario;
    let aposta = req.body.aposta;
    let ganhou = req.body.ganhou;
    let deumaximo = req.body.deumaximo;

    if (idUsuario == undefined) {
        res.status(400).send("Sem idUsuario!");
    } else if (aposta == undefined) {
        res.status(400).send("Sem aposta!");
    } else if (ganhou == undefined) {
        res.status(400).send("Sem final de partida!");
    } else if (deumaximo == undefined) {
        res.status(400).send("Nada de 7.5 aqui!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.registro(idUsuario, aposta, ganhou, deumaximo)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o Questionário! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrar,
    atualizar_caixa,
    registro
}