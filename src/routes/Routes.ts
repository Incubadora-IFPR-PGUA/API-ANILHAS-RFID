import { Router } from "express";
import cors from "cors";

import * as AnilhaCadastroController from "../controllers/anilhaController/anilhaCadastroController";
import * as AnilhaPendenteController from "../controllers/anilhaController/anilhaPendenteController";
import * as AnilhaRegistroController from "../controllers/anilhaController/anilhaRegistroController";
import * as EspMacAdressController from "../controllers/macAdressController/espMacAdressController";
import * as MacsCapturadosController from "../controllers/macAdressController/macsCapturadosController";
import * as HortaController from "../controllers/smartHortaController/hortaController";
import * as PhMetroController from "../controllers/phMetroController/phMetroController";

const router = Router();

//ANILHAS (CADASTRO)
router.get("/listarAnilhasCadastradas", AnilhaCadastroController.listarAnilhasCadastradas);
router.get("/obterAnilhaCadastradaPorId/:id", AnilhaCadastroController.obterAnilhaCadastradaPorId);
router.put("/atualizarAnilhaCadastrada/:id", AnilhaCadastroController.atualizarAnilhaCadastrada);
router.delete("/deletarAnilhaCadastrada/:id", AnilhaCadastroController.deletarAnilhaCadastrada);

//ANILHAS (PENDENTES)
router.post("/inserirAnilha", AnilhaPendenteController.inserirAnilha);
router.post("/aceitarPendente/:id", AnilhaPendenteController.aceitarPendente);
router.get("/listarAnilhasPendentes", AnilhaPendenteController.listarAnilhasPendentes);
router.get("/obterAnilhaPendentePorId/:id", AnilhaPendenteController.obterAnilhaPendentePorId);
router.put("/atualizarAnilhaPendente/:id", AnilhaPendenteController.atualizarAnilhaPendente);
router.delete("/deletarAnilhaPendente/:id", AnilhaPendenteController.deletarAnilhaPendente);

//ANILHAS (REGISTROS)
router.get("/obterAnilhaRegistroPorId/:id", AnilhaRegistroController.obterAnilhaRegistroPorId);
router.get("/listarAnilhaRegistros", AnilhaRegistroController.listarAnilhaRegistros);

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

// PHMETRO
router.post("/inserirPh", PhMetroController.criarPh);
router.put("/atualizarPh/:id", PhMetroController.atualizarPh);
router.get("/listarPh", PhMetroController.listarPhs);
router.get("/obterPhPorId/:id", PhMetroController.buscarPhPorId);
router.delete("/deletarPh/:id", PhMetroController.deletarPh);

export default router;
