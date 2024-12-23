import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../instances/mysql";
import { EspMacAdress } from "../macAdressModels/espMacAdressModel";

export class PhMetroModel extends Model {
  public id!: number;
  public ph!: number;
  public id_fk_esp_macAdress?: number;
  public escala?: String;
  public data_hora_atualizacao?: Date;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date;
}

PhMetroModel.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    ph: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    escala: {
      type: DataTypes.STRING,
      allowNull: true
    },
    id_fk_esp_macAdress: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
    },
    data_hora_atualizacao: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    }
  },
  {
    sequelize,
    tableName: "phMetro_esp",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true
  }
);

PhMetroModel.belongsTo(EspMacAdress, {
  foreignKey: 'id_fk_esp_macAdress', 
  as: 'macAddress' 
});

EspMacAdress.hasMany(PhMetroModel, {
  foreignKey: 'id_fk_esp_macAdress',
  as: 'phMetros'
});