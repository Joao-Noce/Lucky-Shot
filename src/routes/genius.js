var express = require("express");
var router = express.Router();

var geniusController = require("../controllers/geniusController");

//Recebendo os dados do html e direcionando para a função cadastrar de seteController.js

router.put("/registro", function (req, res) {
    geniusController.registro(req, res);
});

module.exports = router;