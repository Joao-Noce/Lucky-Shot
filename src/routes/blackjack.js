var express = require("express");
var router = express.Router();

var blackjackController = require("../controllers/blackjackController");

//Recebendo os dados do html e direcionando para a função cadastrar de blackjackController.js

router.put("/atualizar_caixa", function (req, res) {
    blackjackController.atualizar_caixa(req, res);
});

router.post("/registro", function (req, res) {
    blackjackController.registro(req, res);
});

module.exports = router;