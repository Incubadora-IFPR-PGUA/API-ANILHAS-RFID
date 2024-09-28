import { Router } from "express";
import cors from "cors";

import * as AnilhaCadastroController from "../controllers/anilhaController/anilhaCadastroController";
import * as EspMacAdressController from "../controllers/macAdressController/espMacAdressController";
import * as MacsCapturadosController from "../controllers/macAdressController/macsCapturadosController";
import * as HortaController from "../controllers/smartHortaController/hortaController";

const router = Router();

//ANILHAS (CADASTRO)
router.get("/listarAnilhasCadastradas", AnilhaCadastroController.listarAnilhasCadastradas);
router.get("/obterAnilhaCadastradaPorId/:id", AnilhaCadastroController.obterAnilhaCadastradaPorId);
router.put("/atualizarAnilhaCadastrada/:id", AnilhaCadastroController.atualizarAnilhaCadastrada);
router.delete("/deletarAnilhaCadastrada/:id", AnilhaCadastroController.deletarAnilhaCadastrada);

//ANILHAS (PENDENTES)
router.post("/inserirAnilha", AnilhaPendenteController.inserirAnilha);
router.put("/atualizarAnilhaPendente/:id", AnilhaController.atualizarAnilhaPendente);
router.get("/listarAnilhaPendentes", AnilhaController.listarAnilhaPendentes);
router.delete("/excluirAnilhaPendente/:id", AnilhaController.excluirAnilhaPendente);
router.get("/getAnilhaPendenteById/:id", AnilhaController.getAnilhaPendenteById);
router.post("/pendente/:id", AnilhaController.acceptRequest);

//ANILHAS (REGISTROS)
router.get("/getAnilhaRegistroById/:id", AnilhaController.getAnilhaRegistroById);
router.get("/listarAnilhaRegistros", AnilhaController.listarAnilhaRegistros);

// MAC ADRESS (ESP)
router.post("/inserirEsp", EspMacAdressController.inserirEsp);
router.get("/listarEsp", EspMacAdressController.listarEsp);
router.get("/obterEspPorId/:id", EspMacAdressController.obterEspPorId);
router.put("/atualizarEsp/:id", EspMacAdressController.atualizarEsp);
router.delete("/deletarEsp/:id", EspMacAdressController.deletarEsp);

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