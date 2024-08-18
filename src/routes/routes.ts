import { Router } from "express";
import cors from 'cors';

import * as AnilhaController from "../controllers/AnilhaController";

const router = Router();

router.get("/listarAnilha", AnilhaController.listarAnilha);
router.post("/inserirAnilha", AnilhaController.inserirAnilha);
router.get("/listarAnilha/:idAnilha", AnilhaController.getAnilhaById); 
// router.delete("/excluirCliente/:idCliente", ClienteController.excluirCliente);
router.put("/atualizarAnilha/:idAnilha", AnilhaController.atualizarAnilha);

export default router;