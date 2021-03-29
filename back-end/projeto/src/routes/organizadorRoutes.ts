import { Router } from "express";
import OrganizadorController from "../controllers/OrganizadorController";

const router = Router();

router.post("/cadastrar", OrganizadorController.cadastrar);
router.post("/login", OrganizadorController.login);

export default router;