import { PhMetroModel } from "../../models/phMetro/phMetroModel";
import { Request, Response } from "express";

// Criar um novo registro de pH
export const criarPh = async (req: Request, res: Response) => {
  try {
    let { ph } = req.body;

    // Converter o valor de pH para número, caso seja enviado como string
    ph = parseFloat(ph);

    // Verificar se o pH é um número válido
    if (isNaN(ph)) {
      return res.status(400).json({ message: "Valor de pH inválido." });
    }

    // Definir a escala com base no valor de pH
    let escala;
    if (ph < 7) {
      escala = "Ácido";
    } else if (ph === 7) {
      escala = "Neutro";
    } else if (ph > 7) {
      escala = "Alcalino";
    }

    // Definir a data/hora de atualização como o momento atual
    const data_hora_atualizacao = new Date();

    const novoPh = await PhMetroModel.create({
      ph,
      escala, // Escala definida automaticamente
      data_hora_atualizacao // Hora de atualização definida no backend
    });

    return res.status(201).json(novoPh);
  } catch (error) {
    console.error("Erro ao criar registro de pH:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

// Listar todos os registros de pH
export const listarPhs = async (req: Request, res: Response) => {
  try {
    const phs = await PhMetroModel.findAll({
      order: [["updated_at", "DESC"]],
    });
    return res.status(200).json(phs);
  } catch (error) {
    console.error("Erro ao listar registros de pH:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

// Buscar um registro de pH por ID
export const buscarPhPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const ph = await PhMetroModel.findByPk(id);

    if (!ph) {
      return res.status(404).json({ message: "Registro de pH não encontrado." });
    }

    return res.status(200).json(ph);
  } catch (error) {
    console.error("Erro ao buscar registro de pH:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

// Atualizar um registro de pH por ID
export const atualizarPh = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { ph, escala, data_hora_atualizacao } = req.body;

    const phExistente = await PhMetroModel.findByPk(id);

    if (!phExistente) {
      return res.status(404).json({ message: "Registro de pH não encontrado." });
    }

    phExistente.ph = ph;
    phExistente.escala = escala;
    phExistente.data_hora_atualizacao = data_hora_atualizacao;

    await phExistente.save();

    return res.status(200).json(phExistente);
  } catch (error) {
    console.error("Erro ao atualizar registro de pH:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

// Deletar um registro de pH por ID
export const deletarPh = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const phExistente = await PhMetroModel.findByPk(id);

    if (!phExistente) {
      return res.status(404).json({ message: "Registro de pH não encontrado." });
    }

    await phExistente.destroy();

    return res.status(200).json({ message: "Registro de pH deletado com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar registro de pH:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};
