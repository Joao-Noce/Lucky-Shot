var express = require("express");
var router = express.Router();

var rankingSeteController = require("../controllers/rankingSeteController");

router.get("/ranking_caixa/", function (req, res) {
    rankingSeteController.ranking_caixa(req, res);
});

router.get("/ranking_vitoria/", function (req, res) {
    rankingSeteController.ranking_vitoria(req, res);
});

module.exports = router;