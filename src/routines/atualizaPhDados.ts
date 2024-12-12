import { schedule } from "node-cron";
import { Op } from "sequelize";
import { PhMetroModel } from "../models/phMetro/phMetroModel";

export const rotinaTratarPh = (): void => {
  schedule("0 0 * * *", async () => {
    console.log("Iniciando rotina para tratar dados de pH das últimas 24 horas...");

    const dataAtual = new Date();
    const dataInicio = new Date(dataAtual.getTime() - 24 * 60 * 60 * 1000);

    try {
        const tiposPhMetro = await PhMetroModel.findAll({
            attributes: ['tipo'],
            group: ['tipo'],
        });

        if (tiposPhMetro.length === 0) {
            console.log("Nenhum tipo de phMetro encontrado.");
            return;
        }

        for (let tipoObj of tiposPhMetro) {
            const tipo = tipoObj.id_fk_esp_macAdress;
    
            console.log(`Processando registros do tipo: ${tipo}`);
    
            const registros = await PhMetroModel.findAll({
              where: {
                tipo: tipo,
                data_hora_atualizacao: {
                  [Op.between]: [dataInicio, dataAtual],
                },
              },
            });
    
            if (registros.length === 0) {
              console.log(`Nenhum registro encontrado para o tipo ${tipo} nas últimas 24 horas.`);
              continue;
            }
    
            const maxRegistro = registros.reduce((prev, curr) =>
              curr.ph > prev.ph ? curr : prev
            );
            const minRegistro = registros.reduce((prev, curr) =>
              curr.ph < prev.ph ? curr : prev
            );
    
            console.log(`Máximo encontrado para ${tipo}: ${maxRegistro.ph}`);
            console.log(`Mínimo encontrado para ${tipo}: ${minRegistro.ph}`);
    
            await PhMetroModel.destroy({
              where: {
                tipo: tipo,
                data_hora_atualizacao: {
                  [Op.between]: [dataInicio, dataAtual],
                },
              },
              force: true,
            });
    
            console.log(`Registros antigos do tipo ${tipo} deletados com sucesso.`);
    
            await PhMetroModel.bulkCreate([
              {
                ph: maxRegistro.ph,
                escala: maxRegistro.escala,
                data_hora_atualizacao: maxRegistro.data_hora_atualizacao,
                id_fk_esp_macAdress: maxRegistro.id_fk_esp_macAdress,
                tipo: tipo,
              },
              {
                ph: minRegistro.ph,
                escala: minRegistro.escala,
                data_hora_atualizacao: minRegistro.data_hora_atualizacao,
                id_fk_esp_macAdress: minRegistro.id_fk_esp_macAdress,
                tipo: tipo,
              },
            ]);
    
            console.log(`Máximo e mínimo valores salvos com sucesso para o tipo ${tipo}.`);
          }
        } catch (error) {
          console.error("Erro durante a execução da rotina de pH:", error);
        }
    });
};