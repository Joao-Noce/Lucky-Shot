var express = require("express");
var router = express.Router();

var rankingController = require("../controllers/rankingController");

router.get("/ranking_caixa_sete/", function (req, res) {
    rankingController.ranking_caixa_sete(req, res);
});

router.get("/ranking_vitoria_sete/", function (req, res) {
    rankingController.ranking_vitoria_sete(req, res);
});

router.get("/ranking_caixa_blackjack/", function (req, res) {
    rankingController.ranking_caixa_blackjack(req, res);
});

router.get("/ranking_vitoria_blackjack/", function (req, res) {
    rankingController.ranking_vitoria_blackjack(req, res);
});

router.get("/ranking_genius/", function (req, res) {
    rankingController.ranking_genius(req, res);
});

module.exports = router;