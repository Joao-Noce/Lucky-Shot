var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/buscarSenha/:idUsuario", function (req, res) {
    usuarioController.buscarSenha(req, res);
});

router.put("/atualizarPerfil", function (req, res) {
    usuarioController.atualizarPerfil(req, res);
});

module.exports = router;