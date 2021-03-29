import { Router } from "express";
import EventoController from "../controllers/EventoController";
import autenticacao from "../middlewares/autenticacao";

const router = Router();

router.post("/criar", autenticacao.autorizarOrganizadorByToken, EventoController.criar);
router.delete("/remover/:id", autenticacao.autorizarOrganizadorByToken, EventoController.remover);
router.get("/organizador/listar", autenticacao.autorizarOrganizadorByToken, EventoController.listar);
router.get("/pessoa/listar", autenticacao.autorizarPessoaByToken, EventoController.listar);
router.get("/listagem", EventoController.listar); // Apenas para o front-end
router.get("/listarpororganizador", autenticacao.autorizarOrganizadorByToken, EventoController.listarPorOrganizador);
router.get("/listar/:id", autenticacao.autorizarOrganizadorByToken, EventoController.buscarPorId);

export default router;