var express = require("express");
var router = express.Router();

var sudokuController = require("../controllers/sudokuController");

router.post("/registro", function (req, res) {
    sudokuController.registro(req, res);
});

module.exports = router;