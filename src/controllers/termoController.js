var termoModel = require("../models/termoModel");
var dicionario = require('@andsfonseca/palavras-pt-br').Word;

function registro(req, res) {
    const { idUsuario, ganhou } = req.body;

    if (idUsuario == undefined) {
        res.status(400).send("Sem idUsuario!");
    } else if (ganhou == undefined) {
        res.status(400).send("Sem final de partida!");
    } else {
        termoModel.registro(idUsuario, ganhou)
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

async function palavraAleatoria(req, res) {
    const palavra = dicionario.getRandomWord(5, true, false);
    console.log(palavra);

    res.json(palavra);
}

async function validarSeEPalavra(req, res) {
    const palavra = req.params.palavra;
    if (dicionario.checkValid(palavra, 5, true, false)) res.json(true);
    else res.json(false);
}

module.exports = {
    registro,
    palavraAleatoria,
    validarSeEPalavra
}