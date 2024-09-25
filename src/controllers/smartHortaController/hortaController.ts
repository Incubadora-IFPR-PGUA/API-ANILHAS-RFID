import { Request, Response } from "express";
import { HortaModel } from "../../models/smartHortaModels/hortaModel";

// Inserir novo registro da horta
export const inserirHorta = async (req: Request, res: Response) => {
  try {
    const { umidade_solo, umidade_ar, temperatura_ar, luz_ambiente } = req.body;

    const novoRegistro = await HortaModel.create({
      umidade_solo,
      umidade_ar,
      temperatura_ar,
      luz_ambiente,
      hora_atualizacao: new Date(),
    });

    res.status(201).json({ message: "Registro inserido com sucesso", data: novoRegistro });
  } catch (error) {
    console.error("Erro ao inserir registro da horta:", error);
    res.status(500).json({ message: "Erro ao inserir registro da horta" });
  }
};

// Atualizar um registro da horta pelo ID
export const atualizarHorta = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { umidade_solo, umidade_ar, temperatura_ar, luz_ambiente } = req.body;

    const registro = await HortaModel.findByPk(id);

    if (registro) {
      registro.umidade_solo = umidade_solo;
      registro.umidade_ar = umidade_ar;
      registro.temperatura_ar = temperatura_ar;
      registro.luz_ambiente = luz_ambiente;
      registro.hora_atualizacao = new Date(); // Atualizando a hora da última atualização

      await registro.save();

      res.status(200).json({ message: "Registro da horta atualizado com sucesso", data: registro });
    } else {
      res.status(404).json({ message: "Registro da horta não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao atualizar registro da horta:", error);
    res.status(500).json({ message: "Erro ao atualizar registro da horta" });
  }
};

// Listar todos os registros da horta
export const listarHorta = async (req: Request, res: Response) => {
  try {
    const registros = await HortaModel.findAll({
      order: [["hora_atualizacao", "DESC"]],
    });
    res.status(200).json({ data: registros });
  } catch (error) {
    console.error("Erro ao listar registros da horta:", error);
    res.status(500).json({ message: "Erro ao listar registros da horta" });
  }
};

export const obterHortaPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const registro = await HortaModel.findByPk(id);

    if (registro) {
      res.status(200).json({ data: registro });
    } else {
      res.status(404).json({ message: "Registro da horta não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao obter registro da horta:", error);
    res.status(500).json({ message: "Erro ao obter registro da horta" });
  }
};

// Excluir um registro da horta pelo ID
export const deletarHorta = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const registro = await HortaModel.findByPk(id);

    if (registro) {
      await registro.destroy();
      res.status(200).json({ message: "Registro da horta excluído com sucesso" });
    } else {
      res.status(404).json({ message: "Registro da horta não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao excluir registro da horta:", error);
    res.status(500).json({ message: "Erro ao excluir registro da horta" });
  }
};
