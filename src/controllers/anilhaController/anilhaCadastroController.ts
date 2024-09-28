import { Request, Response } from "express";
import { AnilhaCadastrada } from "../../models/anilhasModels/AnilhaCadastrada";

export const listarAnilhasCadastradas = async (req: Request, res: Response) => {
  try {
    const anilhas = await AnilhaCadastrada.findAll({
      order: [["nome", "ASC"]],
    });
    res.status(200).json(anilhas);
  } catch (error) {
    console.error("Erro ao listar anilhas cadastradas:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const obterAnilhaCadastradaPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const anilha = await AnilhaCadastrada.findByPk(id);
    if (!anilha) {
      return res.status(404).json({ message: "Anilha não encontrada" });
    }

    res.status(200).json(anilha);
  } catch (error) {
    console.error("Erro ao buscar anilha cadastrada pelo ID:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const atualizarAnilhaCadastrada = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const anilha = await AnilhaCadastrada.findByPk(id);
    if (!anilha) {
      return res.status(404).json({ message: "Anilha não encontrada" });
    }

    anilha.nome = name;

    await anilha.save();

    res.status(200).json({ message: "Anilha atualizada com sucesso", anilha });
  } catch (error) {
    console.error("Erro ao atualizar anilha cadastrada:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const deletarAnilhaCadastrada = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const anilha = await AnilhaCadastrada.findByPk(id);
    if (!anilha) {
      return res.status(404).json({ message: "Anilha não encontrada" });
    }

    await anilha.destroy();

    res.status(200).json({ message: "Anilha excluída com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir anilha cadastrada:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};