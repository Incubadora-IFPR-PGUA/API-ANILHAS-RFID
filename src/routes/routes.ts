import { Router } from "express";

import * as AnilhaController from "../controllers/AnilhaController";

const router = Router();

//CLIENTES
router.get("/anilhas", AnilhaController.listarAnilhas);
router.post("/incluirAnilha", AnilhaController.incluirAnilha);
// router.get("/clientes/:idCliente", ClienteController.getClienteById); //Testada
// router.delete("/excluirCliente/:idCliente", ClienteController.excluirCliente); //Testada
// router.put("/atualizarCliente/:idCliente", ClienteController.atualizarCliente); //Testada

export default router;