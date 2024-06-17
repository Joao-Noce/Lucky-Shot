var express = require("express");
var router = express.Router();

var dashController = require("../controllers/dashController");

router.get("/porcentagem/:idUsuario", function (req, res) {
    dashController.porcentagem(req, res);
});

router.get("/lucro/:idUsuario", function (req, res) {
    dashController.lucro(req, res);
});

router.get("/total_rodadas/:idUsuario", function (req, res) {
    dashController.total_rodadas(req, res);
});

router.get("/total_sete/:idUsuario", function (req, res) {
    dashController.total_sete(req, res);
});

module.exports = router;