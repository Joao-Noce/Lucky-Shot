var dashModel = require("../models/dashModel");

function porcentagem(req, res) {
    idUsuario = req.params.idUsuario;

    dashModel.porcentagem(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado da primeira pergunta!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as respostas: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function lucro(req, res) {
    idUsuario = req.params.idUsuario;

    dashModel.lucro(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado da segunda pergunta!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as respostas: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function total_rodadas(req, res) {
    idUsuario = req.params.idUsuario;

    dashModel.total_rodadas(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado da segunda pergunta!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as respostas: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function total_sete(req, res) {
    idUsuario = req.params.idUsuario;

    dashModel.total_sete(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado da segunda pergunta!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as respostas: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    porcentagem,
    lucro,
    total_rodadas,
    total_sete
}