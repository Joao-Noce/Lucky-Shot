var minefieldModel = require("../models/minefieldModel");

function registro(req, res) {
    let idUsuario = req.body.idUsuario;
    let ganhou = req.body.ganhou;

    if (idUsuario == undefined) {
        res.status(400).send("Sem idUsuario!");
    } else if (ganhou == undefined) {
        res.status(400).send("Sem final de partida!");
    } else {
        minefieldModel.registro(idUsuario, ganhou)
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
    registro
}