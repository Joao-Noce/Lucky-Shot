var express = require("express");
var router = express.Router();

var seteController = require("../controllers/seteController");

//Recebendo os dados do html e direcionando para a função cadastrar de seteController.js

router.put("/atualizar_caixa", function (req, res) {
    seteController.atualizar_caixa(req, res);
});

router.post("/registro", function (req, res) {
    seteController.registro(req, res);
});

module.exports = router;