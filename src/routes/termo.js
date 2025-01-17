var express = require("express");
var router = express.Router();

var termoController = require("../controllers/termoController");

router.post("/registro", function (req, res) {
    termoController.registro(req, res);
});

router.get("/palavraAleatoria", function (req, res) {
    termoController.palavraAleatoria(req, res);
});

router.get("/validarSeEPalavra/:palavra", function (req, res) {
    termoController.validarSeEPalavra(req, res);
});

module.exports = router;