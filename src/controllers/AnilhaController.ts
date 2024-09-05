import { Request, Response } from 'express';
import { Anilha } from '../models/Anilha';

export const inserirAnilha = async (req: Request, res: Response) => {
  try {
    const { nome, codigo, entrada, saida } = req.body;
    const codigoExistente = await Anilha.findOne({ where: { codigo } });

    if (codigoExistente) {
      alertAnilhaExistente(req, res);
      return res.status(400).json({ message: "Anilha já cadastrada!!", codigoExistente});
    }

    const novaAnilha = await Anilha.create({ nome, codigo, entrada, saida });

    res.status(201).json(novaAnilha);
  } catch (error) {
    console.error("Erro ao incluir anilha:", error);
    res.status(500).json({ message: "Erro ao incluir anilha" });
  }
};



export const listarAnilha = async (req: Request, res: Response) => {
  try {
    const anilhas = await Anilha.findAll();

    if (isNaN(anilhas.length)){
      res.status(404).json({error: "Não existem anilhas cadastradas!"});
    }

    res.status(200).json(anilhas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar anilhas"});
    console.error("erro: ", error);
  }
};

export const getAnilhaById = async (req: Request, res: Response) => {
  try {
    const anilhaId = parseInt(req.params.idAnilha, 10);
    const anilha = await Anilha.findByPk(anilhaId);

    if (anilha) {
      res.json(anilha);
    } else {
      res.status(404).json({ message: "Anilha não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao buscar anilha:", error);
    res.status(500).json({ message: "Erro ao buscar anilha" });
  }
};

export const atualizarAnilha = async (req: Request, res: Response) => {
  try {
    const anilhaId = parseInt(req.params.idAnilha, 10);
    const { nome, entrada, saida } = req.body; // Remove 'codigo' da desestruturação

    const anilha = await Anilha.findByPk(anilhaId);

    if (anilha) {
      await anilha.update({ nome, entrada, saida }); // Não inclui 'codigo' aqui
      res.json(anilha);
    } else {
      res.status(404).json({ message: "Anilha não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao atualizar anilha:", error);
    res.status(500).json({ message: "Erro ao atualizar anilha" });
  }
};

export const excluirAnilha = async (req: Request, res: Response) => {
  try {
    const anilhaId = parseInt(req.params.idAnilha, 10);
    const anilha = await Anilha.findByPk(anilhaId);

    if (!anilha) {
      return res.status(404).json({ message: "Anilha não encontrada!" });
    }

    await anilha.destroy();
    res.json({ message: "Anilha excluída com sucesso" });
    
  } catch (error) {
    console.error("Erro ao excluir anilha:", error);
    res.status(500).json({ message: "Erro ao excluir anilha" });
  }
};

export const alertAnilhaExistente = async (req: Request, res: Response) => {
  
};