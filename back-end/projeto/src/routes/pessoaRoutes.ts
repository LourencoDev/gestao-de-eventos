import { Router } from "express";
import PessoaController from "../controllers/PessoaController";

const router = Router();

router.post("/cadastrar", PessoaController.cadastrar);
router.post("/login", PessoaController.login);

export default router;