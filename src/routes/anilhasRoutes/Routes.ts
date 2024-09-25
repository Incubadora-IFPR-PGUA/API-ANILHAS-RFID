import { Router } from "express";
import cors from "cors";

import * as AnilhaController from "../../controllers/anilhaController/AnilhaController";
import * as EspMacAdressController from "../../controllers/macAdressController/espMacAdressController";
import * as MacsCapturadosController from "../../controllers/macAdressController/macsCapturadosController";
import * as HortaController from "../../controllers/smartHortaController/hortaController";

const router = Router();

//ANILHAS
router.post("/  ", AnilhaController.inserirAnilha);
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
router.post("/inserirMacCapturado", MacsCapturadosController.inserirMacCapturado); // Rota para inserir um MAC capturado
router.get("/listarMacsCapturados", MacsCapturadosController.listarMacsCapturados); // Rota para listar todos os MACs capturados
router.get("/getMacCapturadoById/:id", MacsCapturadosController.obterMacPorId); // Rota para obter um MAC capturado por ID
router.put("/atualizarMacCapturado/:id", MacsCapturadosController.atualizarMacCapturado); // Rota para atualizar um MAC capturado por ID
router.delete("/excluirMacCapturado/:id", MacsCapturadosController.deletarMacCapturado); // Rota para excluir um MAC capturado por ID

// Rotas para a horta inteligente (ESP32)
router.post("/inserirHorta", HortaController.inserirHorta); // Inserir um novo registro da horta
router.put("/atualizarHorta/:id", HortaController.atualizarHorta); // Atualizar um registro da horta pelo ID
router.get("/listarHorta", HortaController.listarHorta); // Listar todos os registros da horta
router.get("/getHortaById/:id", HortaController.obterHortaPorId); // Obter um registro específico da horta pelo ID
router.delete("/excluirHorta/:id", HortaController.deletarHorta); // Excluir um registro da horta pelo ID

export default router;
