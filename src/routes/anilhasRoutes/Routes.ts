import { Router } from "express";
import cors from "cors";

import * as AnilhaController from "../../controllers/anilhaController/AnilhaController";
import * as EspMacAdressController from "../../controllers/macAdressController/espMacAdressController";
import * as MacsCapturadosController from "../../controllers/macAdressController/macsCapturadosController";
import * as HortaController from "../../controllers/smartHortaController/hortaController";

const router = Router();

//ANILHAS
router.post("/inserirAnilha", AnilhaController.inserirAnilha);
router.post("/pendente/:id", AnilhaController.acceptRequest);
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

// MAC ADRESS (ESP)
router.post("/inserirEsp", EspMacAdressController.inserirEsp); // Criar novo ESP
router.get("/listarEsp", EspMacAdressController.listarEsp); // Listar todos os ESPs
router.get("/obterEspPorId/:id", EspMacAdressController.obterEspPorId); // Obter ESP por ID
router.put("/atualizarEsp/:id", EspMacAdressController.atualizarEsp); // Atualizar ESP por ID
router.delete("/deletarEsp/:id", EspMacAdressController.deletarEsp); // Deletar ESP por ID

//MAC ADRESS (MAC)
router.post("/inserirMacCapturado", MacsCapturadosController.inserirMacCapturado);
router.get("/listarMacsCapturados", MacsCapturadosController.listarMacsCapturados);
router.get("/obterMacPorId/:id", MacsCapturadosController.obterMacPorId);
router.put("/atualizarMacCapturado/:id", MacsCapturadosController.atualizarMacCapturado);
router.delete("/deletarMacCapturado/:id", MacsCapturadosController.deletarMacCapturado);

// HORTA INTELIGENTE
router.post("/inserirHorta", HortaController.inserirHorta);
router.put("/atualizarHorta/:id", HortaController.atualizarHorta);
router.get("/listarHorta", HortaController.listarHorta);
router.get("/obterHortaPorId/:id", HortaController.obterHortaPorId); 
router.delete("/deletarHorta/:id", HortaController.deletarHorta);

export default router;
