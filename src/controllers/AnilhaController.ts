import { Request, Response } from 'express';
import { Anilha } from '../models/Anilha';

export const inserirAnilha = async (req: Request, res: Response) => {
  try {
    const { nome, codigo, entrada, saida } = req.body;
    const codigoExistente = await Anilha.findOne({ where: { codigo } });

    if (codigoExistente) {
      return res.status(400).json({ message: "Anilha já cadastrada!!" });
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

