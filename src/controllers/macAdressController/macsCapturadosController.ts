import { Request, Response } from "express";
import { EspMacAdress } from "../../models/macAdressModels/espMacAdressModel";
import { MacsCapturados } from "../../models/macAdressModels/macsCapturadosModel";
import axios from "axios";

// Inserir um novo MAC capturado
export const inserirMacCapturado = async (req: Request, res: Response) => {
  try {
    const { MAC, data_hora_captura } = req.body;

    // Validar o MAC address
    if (!MAC) {
      return res.status(400).json({ message: "MAC address é obrigatório" });
    }

    // Buscar o fabricante usando a API externa
    const response = await axios.get(`https://api.macvendors.com/${MAC}`);
    const fabricante = response.data;

    // Inserir o novo MAC capturado no banco de dados
    const novoMac = await MacsCapturados.create({
      MAC,
      fabricante, // Salva o fabricante obtido
      data_hora_captura: data_hora_captura || new Date(), // Usa a data/hora atual se não for fornecida
    });

    res.status(201).json({ message: "MAC capturado inserido com sucesso", mac: novoMac });
  } catch (error) {
    console.error("Erro ao inserir MAC capturado:", error);

    if (axios.isAxiosError(error) && error.response?.status === 404) {
      res.status(404).json({ message: "Fabricante não encontrado para o MAC fornecido" });
    } else {
      res.status(500).json({ message: "Erro ao inserir MAC capturado" });
    }
  }
};
// Listar todos os MACs capturados
export const listarMacsCapturados = async (req: Request, res: Response) => {
  try {
    const macs = await MacsCapturados.findAll({
      order: [["created_at", "DESC"]],
    });
    res.status(200).json(macs);
  } catch (error) {
    console.error("Erro ao listar MACs capturados:", error);
    res.status(500).json({ message: "Erro ao listar MACs capturados" });
  }
};

// Obter MAC capturado por ID
export const obterMacPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const mac = await MacsCapturados.findByPk(id);

    if (!mac) {
      return res.status(404).json({ message: "MAC capturado não encontrado" });
    }

    res.status(200).json(mac);
  } catch (error) {
    console.error("Erro ao obter MAC capturado:", error);
    res.status(500).json({ message: "Erro ao obter MAC capturado" });
  }
};

// Atualizar MAC capturado por ID
export const atualizarMacCapturado = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { MAC, fabricante, data_hora_captura } = req.body;

    const mac = await MacsCapturados.findByPk(id);

    if (!mac) {
      return res.status(404).json({ message: "MAC capturado não encontrado" });
    }

    mac.MAC = MAC || mac.MAC;
    mac.fabricante = fabricante || mac.fabricante;
    mac.data_hora_captura = data_hora_captura || mac.data_hora_captura;

    await mac.save();

    res.status(200).json({ message: "MAC capturado atualizado com sucesso", mac });
  } catch (error) {
    console.error("Erro ao atualizar MAC capturado:", error);
    res.status(500).json({ message: "Erro ao atualizar MAC capturado" });
  }
};

// Deletar MAC capturado por ID
export const deletarMacCapturado = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const mac = await MacsCapturados.findByPk(id);

    if (!mac) {
      return res.status(404).json({ message: "MAC capturado não encontrado" });
    }

    await mac.destroy();
    res.status(200).json({ message: "MAC capturado deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar MAC capturado:", error);
    res.status(500).json({ message: "Erro ao deletar MAC capturado" });
  }
};
