var express = require("express");
var router = express.Router();

var minefieldController = require("../controllers/minefieldController");

router.post("/registro", function (req, res) {
    minefieldController.registro(req, res);
});

module.exports = router;