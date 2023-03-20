import { default as express} from "express";
export const router = express.Router();
var respuestaGenerada;
/* GET home page. */
router.get("/",async function (req, res, next) {
  res.render("index", { coderbot: "CoderBot" });
   
});
/* POST openai api. */
  
