import { Request, Response } from "express";
import { AnilhaCadastrada } from "../../models/anilhasModels/AnilhaCadastrada";
import { AnilhaPendente } from "../../models/anilhasModels/AnilhaPendente";
import { AnilhaRegistro } from "../../models/anilhasModels/AnilhaRegistro";

export const inserirAnilha = async (req: Request, res: Response) => {
  try {
    const { numero_anilha, status } = req.body;

    const anilhaCadastrada = await AnilhaCadastrada.findOne({ where: { numero_anilha } });

    if (anilhaCadastrada) {
      await AnilhaRegistro.create({
        id_fk_anilha_cadastrada: anilhaCadastrada.id,
      });

      await AnilhaCadastrada.update(
        { status: !anilhaCadastrada.status },
        { where: { numero_anilha } } 
      );

      return res.status(200).json({ message: "Entrada registrada com sucesso" });
    }

    const anilhaPendente = await AnilhaPendente.findOne({ where: { numero_anilha } });

    if (!anilhaPendente) {
      await AnilhaPendente.create({
        numero_anilha,
        nome: "ANILHA NÃO IDENTIFICADA",
      });
    }

    res.status(201).json({ message: "Anilha inserida na tabela de pendentes" });
  } catch (error) {
    console.error("Erro ao inserir anilha:", error);
    res.status(500).json({ message: "Erro ao inserir anilha" });
  }
};

export const aceitarPendente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body
    const pendente = await AnilhaPendente.findByPk(id);

    if (pendente) {
      const cadastro = await AnilhaCadastrada.create({
        nome: name,
        numero_anilha: pendente.numero_anilha,
      });

      await pendente.destroy();

      return res.status(200).json({ message: "Cadastro aceito e movido com sucesso." });
    } else {
      return res.status(404).json({ message: "Registro pendente não encontrado." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Erro ao processar a solicitação.", error });
  }
};

export const obterAnilhaPendentePorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const anilha = await AnilhaPendente.findByPk(id);
    if (!anilha) {
      return res.status(404).json({ message: "Anilha não encontrada" });
    }

    res.status(200).json(anilha);
  } catch (error) {
    console.error("Erro ao buscar anilha cadastrada pelo ID:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const listarAnilhasPendentes = async (req: Request, res: Response) => {
  try {
    const pendentes = await AnilhaPendente.findAll({
      order: [["updated_at", "DESC"]],
    });
    res.status(200).json(pendentes);
  } catch (error) {
    console.error("Erro ao listar anilhas pendentes:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const atualizarAnilhaPendente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const anilha = await AnilhaPendente.findByPk(id);
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

export const deletarAnilhaPendente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const anilha = await AnilhaPendente.findByPk(id);
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