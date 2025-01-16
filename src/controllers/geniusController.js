var geniusModel = require("../models/geniusModel");

async function registro(req, res) {
    let idUsuario = req.body.idUsuario;
    let pontuacao = req.body.pontuacao;

    if (idUsuario == undefined) {
        res.status(400).send("Sem idUsuario!");
    } else if (pontuacao == undefined) {
        res.status(400).send("Sem pontuacao!");
    } else {
        let resultado = await geniusModel.validarSeEMaiorPontuacao(idUsuario);
        console.log("Pontuação já registrada: " + resultado[0].maiorPontuacao);
        console.log("Pontuação: " + pontuacao);


        if (resultado[0].maiorPontuacao < pontuacao) {
            geniusModel.registro(idUsuario, pontuacao)
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
}

module.exports = {
    registro
}