import { Router} from "express";
import InscricaoController from "../controllers/InscricaoController";
import autenticacao from "../middlewares/autenticacao";

const router = Router();

// router.get("/", autenticacao.autorizarPessoaByToken, InscricaoController.listarEventosInscritos);
router.get("/eventos/:id", autenticacao.autorizarPessoaByToken, InscricaoController.inscrever);

export default router;