import { EspMacAdress } from "./macAdressModels/espMacAdressModel";
import { MacsCapturados } from "./macAdressModels/macsCapturadosModel";
import { AnilhaCadastrada } from "./anilhasModels/AnilhaCadastrada";
import { AnilhaRegistro } from "./anilhasModels/AnilhaRegistro";

export const configurarAssociacoesMacAdress = () => {
  EspMacAdress.hasMany(MacsCapturados, {
    foreignKey: "id_fk_esp_macAdress",
    as: "macAddress_capturados",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  });

  MacsCapturados.belongsTo(EspMacAdress, {
    foreignKey: "id_fk_esp_macAdress",
    as: "macAddress_esp",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  });
};

export const configurarAssociacoesAnilhas = () => {
  AnilhaCadastrada.hasMany(AnilhaRegistro, {
    foreignKey: "id_fk_anilha_cadastrada",
    as: "anilhas_registros",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  });

  AnilhaRegistro.belongsTo(AnilhaCadastrada, {
    foreignKey: "id_fk_anilha_cadastrada",
    as: "anilha_cadastrada",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  });
};