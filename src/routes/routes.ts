import { Router } from "express";
import cors from 'cors';

import * as AnilhaController from "../controllers/AnilhaController";

const router = Router();

router.post("/inserirAnilha", AnilhaController.inserirAnilha);
router.get("/listarAnilhaCadastradas", AnilhaController.listarAnilhaCadastradas);
router.get("/listarAnilhaPendentes", AnilhaController.listarAnilhaPendentes);
router.get("/listarAnilhaRegistros", AnilhaController.listarAnilhaRegistros);
router.put("/atualizarAnilhaCadastrada/:idAnilha", AnilhaController.atualizarAnilhaCadastrada);
router.put("/atualizarAnilhaPendente/:idAnilha", AnilhaController.atualizarAnilhaPendente);
router.get("/listarAnilhaCadastradas/:idAnilha", AnilhaController.getAnilhaCadastradaById); 
router.get("/listarAnilhaPendentes/:idAnilha", AnilhaController.getAnilhaPendenteById); 
router.get("/listarAnilhaRegistros/:idAnilha", AnilhaController.getAnilhaRegistroById); 
router.delete("/excluirAnilhaCadastrada/:idAnilha", AnilhaController.excluirAnilhaCadastrada);
router.delete("/excluirAnilhaPendente/:idAnilha", AnilhaController.excluirAnilhaPendente);
router.delete("/excluirAnilhaRegistro/:idAnilha", AnilhaController.excluirAnilhaRegistro);

export default router;