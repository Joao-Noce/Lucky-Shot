var express = require("express");
var router = express.Router();

var dashController = require("../controllers/dashController");

router.get("/porcentagem/:idUsuario", function (req, res) {
    dashController.porcentagem(req, res);
});

router.get("/lucro/:idUsuario", function (req, res) {
    dashController.lucro(req, res);
});

module.exports = router;