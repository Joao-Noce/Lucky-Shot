var express = require("express");
var router = express.Router();

var rankingBlackjackController = require("../controllers/rankingBlackjackController");

router.get("/ranking_caixa/", function (req, res) {
    rankingBlackjackController.ranking_caixa(req, res);
});

router.get("/ranking_vitoria/", function (req, res) {
    rankingBlackjackController.ranking_vitoria(req, res);
});

module.exports = router;