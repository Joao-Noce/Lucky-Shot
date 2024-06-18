var express = require("express");
var router = express.Router();

var dashSeteController = require("../controllers/dashSeteController");

router.get("/porcentagem/:idUsuario", function (req, res) {
    dashSeteController.porcentagem(req, res);
});

router.get("/lucro/:idUsuario", function (req, res) {
    dashSeteController.lucro(req, res);
});

router.get("/total_rodadas/:idUsuario", function (req, res) {
    dashSeteController.total_rodadas(req, res);
});

router.get("/total_sete/:idUsuario", function (req, res) {
    dashSeteController.total_sete(req, res);
});

module.exports = router;