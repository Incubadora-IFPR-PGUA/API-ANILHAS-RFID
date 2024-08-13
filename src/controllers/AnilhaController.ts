import { Request, Response } from 'express';
import { Anilha } from '../models/Anilha';

export const listarAnilhas = async (req: Request, res: Response) => {
  try {
    const anilhas = await Anilha.findAll();
    res.status(200).json(anilhas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar anilhas"});
    console.error("erro: ", error);
  }
};

export const incluirAnilha = async (req: Request, res: Response) => {
  try {
    const { nome, codigo, entrada, saida } = req.body;
    const anilhaExistente = await Anilha.findOne({ where: { codigo } });

    if (anilhaExistente) {
      return res.status(400).json({ message: "Anilha já cadastrada!!" });
    }

    const novaAnilha = await Anilha.create({ nome, codigo, entrada, saida });

    res.status(201).json(novaAnilha);
  } catch (error) {
    console.error("Erro ao incluir anilha:", error);
    res.status(500).json({ message: "Erro ao incluir anilha" });
  }
};