import { default as express } from "express";
export const router = express.Router();

/* GET home page. */
router.get("/",async function (req, res, next) {
  res.render("index", { title: "" });
  res.send({ cuerṕo:  "" });
});

 
