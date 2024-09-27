import { EspMacAdress } from "./espMacAdressModel";
import { MacsCapturados } from "./macsCapturadosModel";

// Função para configurar as associações
export const configurarAssociacoesMacAdress = () => {
  EspMacAdress.hasMany(MacsCapturados, {
    foreignKey: "id_fk_esp_macAdress",
    as: "macAddress_capturados"
  });

  MacsCapturados.belongsTo(EspMacAdress, {
    foreignKey: "id_fk_esp_macAdress",
    as: "macAddress_esp"
  });
};