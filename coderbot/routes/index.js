var express = require('express');
var router = express.Router();
const voz = require("./../models/openai.js");
/* GET home page. */
router.get("/", function (req, res, next) {
 
  res.render("index", { title: `${voz.hola()}` });
  res.send({ cuerṕo: `${voz.hola()}` });
});

module.exports = router;
