import { Router } from "express";
import cors from 'cors';

import * as AnilhaController from "../controllers/AnilhaController";

const router = Router();

router.post("/inserirAnilha", AnilhaController.inserirAnilha);
router.post('/pendente/:id', AnilhaController.acceptRequest);

router.get("/listarAnilhaCadastradas", AnilhaController.listarAnilhaCadastradas);
router.get("/listarAnilhaPendentes", AnilhaController.listarAnilhaPendentes);
router.get("/listarAnilhaRegistros", AnilhaController.listarAnilhaRegistros);
router.put("/atualizarAnilhaCadastrada/:id", AnilhaController.atualizarAnilhaCadastrada);
router.put("/atualizarAnilhaPendente/:id", AnilhaController.atualizarAnilhaPendente);
router.get("/getAnilhaCadastradaById/:id", AnilhaController.getAnilhaCadastradaById); 
router.get("/getAnilhaPendenteById/:id", AnilhaController.getAnilhaPendenteById); 
router.get("/getAnilhaRegistroById/:id", AnilhaController.getAnilhaRegistroById); 
router.delete("/excluirAnilhaCadastrada/:id", AnilhaController.excluirAnilhaCadastrada);
router.delete("/excluirAnilhaPendente/:id", AnilhaController.excluirAnilhaPendente);

export default router;