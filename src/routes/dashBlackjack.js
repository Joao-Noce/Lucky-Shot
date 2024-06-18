var express = require("express");
var router = express.Router();

var dashBlackjackController = require("../controllers/dashBlackjackController");

router.get("/porcentagem/:idUsuario", function (req, res) {
    dashBlackjackController.porcentagem(req, res);
});

router.get("/lucro/:idUsuario", function (req, res) {
    dashBlackjackController.lucro(req, res);
});

router.get("/total_rodadas/:idUsuario", function (req, res) {
    dashBlackjackController.total_rodadas(req, res);
});

router.get("/total_blackjack/:idUsuario", function (req, res) {
    dashBlackjackController.total_blackjack(req, res);
});

module.exports = router;