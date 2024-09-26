import { Request, Response } from "express";
import { EspMacAdress } from "../../models/macAdressModels/espMacAdressModel";
import { MacsCapturados } from "../../models/macAdressModels/macsCapturadosModel";
import axios from "axios";

export const inserirMacCapturado = async (req: Request, res: Response) => {
  try {
    const { MAC, data_hora_captura, id_esp_macAdress } = req.body; // id_esp_macAdress opcional

    if (!MAC) {
      return res.status(400).json({ message: "MAC address é obrigatório" });
    }

    const response = await axios.get(`https://api.macvendors.com/${MAC}`);
    const fabricante = response.data;

    const novoMac = await MacsCapturados.create({
      MAC,
      fabricante,
      data_hora_captura: data_hora_captura || new Date(),
      id_fk_esp_macAdress: id_esp_macAdress || null
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

export const listarMacsCapturados = async (req: Request, res: Response) => {
  try {
    const macs = await MacsCapturados.findAll({
      include: [
        {
          model: EspMacAdress,
          as: "esp_mac_adress"
          // attributes: ["id", "latitude", "longitude"] // Escolhe quais colunas trazer
        }
      ],
      order: [["created_at", "DESC"]]
    });

    res.status(200).json(macs);
  } catch (error) {
    console.error("Erro ao listar MACs capturados:", error);
    res.status(500).json({ message: "Erro ao listar MACs capturados" });
  }
};

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
