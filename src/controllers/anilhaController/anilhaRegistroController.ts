import { Request, Response } from "express";
import { AnilhaCadastrada } from "../../models/anilhasModels/AnilhaCadastrada";
import { AnilhaPendente } from "../../models/anilhasModels/AnilhaPendente";
import { AnilhaRegistro } from "../../models/anilhasModels/AnilhaRegistro";

export const listarAnilhaRegistros = async (req: Request, res: Response) => {
  try {
    const registros = await AnilhaRegistro.findAll({
      order: [["updated_at", "DESC"]],
      include: [{ model: AnilhaCadastrada, as: "anilha_cadastrada" }],
    });
    res.status(200).json(registros);
  } catch (error) {
    console.error("Erro ao listar registros de anilhas:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const obterAnilhaRegistroPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const anilha = await AnilhaRegistro.findByPk(id);
    if (!anilha) {
      return res.status(404).json({ message: "Anilha não encontrada" });
    }

    res.status(200).json(anilha);
  } catch (error) {
    console.error("Erro ao buscar anilha cadastrada pelo ID:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};