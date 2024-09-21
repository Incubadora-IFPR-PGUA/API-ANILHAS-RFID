import { Request, Response } from "express";
import { EspMacAdress } from "../../models/macAdressModels/espMacAdressModel";

// Inserir um novo ESP
export const inserirEsp = async (req: Request, res: Response) => {
  try {
    const { latitude, longitude } = req.body;

    const novoEsp = await EspMacAdress.create({
      latitude,
      longitude,
    });

    res.status(201).json({ message: "ESP inserido com sucesso", esp: novoEsp });
  } catch (error) {
    console.error("Erro ao inserir ESP:", error);
    res.status(500).json({ message: "Erro ao inserir ESP" });
  }
};

// Obter todos os ESPs
export const listarEsp = async (req: Request, res: Response) => {
  try {
    const esps = await EspMacAdress.findAll();
    res.status(200).json(esps);
  } catch (error) {
    console.error("Erro ao listar ESPs:", error);
    res.status(500).json({ message: "Erro ao listar ESPs" });
  }
};

// Obter ESP por ID
export const obterEspPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const esp = await EspMacAdress.findByPk(id);

    if (!esp) {
      return res.status(404).json({ message: "ESP não encontrado" });
    }

    res.status(200).json(esp);
  } catch (error) {
    console.error("Erro ao obter ESP:", error);
    res.status(500).json({ message: "Erro ao obter ESP" });
  }
};

// Atualizar ESP por ID
export const atualizarEsp = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { latitude, longitude } = req.body;

    const esp = await EspMacAdress.findByPk(id);

    if (!esp) {
      return res.status(404).json({ message: "ESP não encontrado" });
    }

    esp.latitude = latitude;
    esp.longitude = longitude;
    await esp.save();

    res.status(200).json({ message: "ESP atualizado com sucesso", esp });
  } catch (error) {
    console.error("Erro ao atualizar ESP:", error);
    res.status(500).json({ message: "Erro ao atualizar ESP" });
  }
};

// Deletar ESP por ID
export const deletarEsp = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const esp = await EspMacAdress.findByPk(id);

    if (!esp) {
      return res.status(404).json({ message: "ESP não encontrado" });
    }

    await esp.destroy();
    res.status(200).json({ message: "ESP deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar ESP:", error);
    res.status(500).json({ message: "Erro ao deletar ESP" });
  }
};
