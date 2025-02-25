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

router.get("/ranking_minefield/", function (req, res) {
    rankingController.ranking_minefield(req, res);
});

router.get("/ranking_termo/", function (req, res) {
    rankingController.ranking_termo(req, res);
});

router.get("/ranking_sudoku/", function (req, res) {
    rankingController.ranking_sudoku(req, res);
});

router.get("/totais/", function (req, res) {
    rankingController.totais(req, res);
});

module.exports = router;