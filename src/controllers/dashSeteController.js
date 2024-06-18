var dashSeteModel = require("../models/dashSeteModel");

function porcentagem(req, res) {
    idUsuario = req.params.idUsuario;

    dashSeteModel.porcentagem(idUsuario)
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

    dashSeteModel.lucro(idUsuario)
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

    dashSeteModel.total_rodadas(idUsuario)
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

    dashSeteModel.total_sete(idUsuario)
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