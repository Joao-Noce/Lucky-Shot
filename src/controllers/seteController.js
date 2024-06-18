var seteModel = require("../models/seteModel");

function atualizar_caixa(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo Site_Quiz.html
    let idUsuario = req.body.idUsuario;
    let caixa_atual = req.body.caixa_atual;

    // Faça as validações dos valores
    if (idUsuario == undefined) {
        res.status(400).send("Sem idUsuario!");
    } else if (caixa_atual == undefined) {
        res.status(400).send("Sem caixa!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo seteModel.js
        seteModel.atualizar_caixa(idUsuario, caixa_atual)
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

        // Passe os valores como parâmetro e vá para o arquivo seteModel.js
        seteModel.registro(idUsuario, aposta, ganhou, deumaximo)
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
    atualizar_caixa,
    registro
}