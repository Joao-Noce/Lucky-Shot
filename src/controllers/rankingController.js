var rankingModel = require("../models/rankingModel");

function ranking_caixa_blackjack(req, res) {

    rankingModel.ranking_caixa_blackjack()
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

function ranking_vitoria_blackjack(req, res) {

    rankingModel.ranking_vitoria_blackjack()
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

function ranking_caixa_sete(req, res) {

    rankingModel.ranking_caixa_sete()
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

function ranking_vitoria_sete(req, res) {

    rankingModel.ranking_vitoria_sete()
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

function ranking_genius(req, res) {

    rankingModel.ranking_genius()
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

function ranking_minefield(req, res) {
    rankingModel.ranking_minefield()
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

function ranking_sudoku(req, res) {
    rankingModel.ranking_sudoku()
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

function ranking_termo(req, res) {
    rankingModel.ranking_termo()
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

function totais(req, res) {
    rankingModel.totais()
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
    ranking_caixa_blackjack,
    ranking_vitoria_blackjack,
    ranking_caixa_sete,
    ranking_vitoria_sete,
    ranking_genius,
    ranking_minefield,
    ranking_sudoku,
    ranking_termo,
    totais
}