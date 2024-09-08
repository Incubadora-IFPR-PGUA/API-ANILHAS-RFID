import { Request, Response } from 'express';
import { AnilhaCadastrada } from '../models/AnilhaCadastrada';
import { AnilhaPendente } from '../models/AnilhaPendente';
import { AnilhaRegistro } from '../models/AnilhaRegistro';

export const inserirAnilha = async (req: Request, res: Response) => {
  try {
    const { codigo, name } = req.body;

    const anilhaCadastrada = await AnilhaCadastrada.findOne({ where: { codigo } });

    if (anilhaCadastrada) {
      await AnilhaRegistro.create({
        anilha_id: anilhaCadastrada.id,
      });
      return res.status(200).json({ message: "Entrada registrada com sucesso" });
    }

    const anilhaPendente = await AnilhaPendente.findOne({ where: { codigo } });

    if (!anilhaPendente) {
      await AnilhaPendente.create({ 
        codigo,
        name,
      });
    }

    res.status(201).json({ message: "Anilha inserida na tabela de pendentes" });
  } catch (error) {
    console.error("Erro ao inserir anilha:", error);
    res.status(500).json({ message: "Erro ao inserir anilha" });
  }
};

//#region Anilhas Cadastradas

export const listarAnilhaCadastradas = async (req: Request, res: Response) => {
  try {
    const anilhas = await AnilhaCadastrada.findAll();
    res.status(200).json(anilhas);
  } catch (error) {
    console.error('Erro ao listar anilhas cadastradas:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const atualizarAnilhaCadastrada = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, codigo } = req.body;

    console.log(id, name, codigo);

    const anilha = await AnilhaCadastrada.findByPk(id);
    if (!anilha) {
      return res.status(404).json({ message: 'Anilha não encontrada' });
    }

    anilha.name = name;
    anilha.codigo = codigo;

    await anilha.save();

    res.status(200).json({ message: 'Anilha atualizada com sucesso', anilha });
  } catch (error) {
    console.error('Erro ao atualizar anilha cadastrada:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const getAnilhaCadastradaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const anilha = await AnilhaCadastrada.findByPk(id);
    if (!anilha) {
      return res.status(404).json({ message: 'Anilha não encontrada' });
    }

    res.status(200).json(anilha);
  } catch (error) {
    console.error('Erro ao buscar anilha cadastrada pelo ID:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const excluirAnilhaCadastrada = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const anilha = await AnilhaCadastrada.findByPk(id);
    if (!anilha) {
      return res.status(404).json({ message: 'Anilha não encontrada' });
    }

    await anilha.destroy();

    res.status(200).json({ message: 'Anilha excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir anilha cadastrada:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

//#endregion

//#region Anilhas Pendentes

export const listarAnilhaPendentes = async (req: Request, res: Response) => {
  try {
    const pendentes = await AnilhaPendente.findAll({
      order: [['updated_at', 'DESC']],
    });
    res.status(200).json(pendentes);
  } catch (error) {
    console.error('Erro ao listar anilhas pendentes:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const atualizarAnilhaPendente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, codigo } = req.body;

    console.log(id, name, codigo);

    const anilha = await AnilhaPendente.findByPk(id);
    if (!anilha) {
      return res.status(404).json({ message: 'Anilha não encontrada' });
    }

    anilha.name = name;
    anilha.codigo = codigo;

    await anilha.save();

    res.status(200).json({ message: 'Anilha atualizada com sucesso', anilha });
  } catch (error) {
    console.error('Erro ao atualizar anilha cadastrada:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const getAnilhaPendenteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const anilha = await AnilhaPendente.findByPk(id);
    if (!anilha) {
      return res.status(404).json({ message: 'Anilha não encontrada' });
    }

    res.status(200).json(anilha);
  } catch (error) {
    console.error('Erro ao buscar anilha cadastrada pelo ID:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const excluirAnilhaPendente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const anilha = await AnilhaPendente.findByPk(id);
    if (!anilha) {
      return res.status(404).json({ message: 'Anilha não encontrada' });
    }

    await anilha.destroy();

    res.status(200).json({ message: 'Anilha excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir anilha cadastrada:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

//#endregion

//#region Anilhas Registros

export const listarAnilhaRegistros = async (req: Request, res: Response) => {
  try {
    const registros = await AnilhaRegistro.findAll({
      include: [{ model: AnilhaCadastrada, as: 'cadastro' }],
    });
    res.status(200).json(registros);
  } catch (error) {
    console.error('Erro ao listar registros de anilhas:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const getAnilhaRegistroById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const anilha = await AnilhaRegistro.findByPk(id);
    if (!anilha) {
      return res.status(404).json({ message: 'Anilha não encontrada' });
    }

    res.status(200).json(anilha);
  } catch (error) {
    console.error('Erro ao buscar anilha cadastrada pelo ID:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

//#endregion

