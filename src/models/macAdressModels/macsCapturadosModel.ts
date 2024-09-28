import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../instances/mysql";
import { EspMacAdress } from "./espMacAdressModel";

export class MacsCapturados extends Model {
  public id!: number;
  public id_fk_esp_macAdress?: number;
  public MAC!: string;
  public fabricante!: string;
  public data_hora_captura?: Date;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date;
}

MacsCapturados.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    id_fk_esp_macAdress: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
    },
    MAC: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    fabricante: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    data_hora_captura: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
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
    tableName: "macAddress_capturados",
    timestamps: true, 
    createdAt: 'created_at',
    updatedAt: 'updated_at', 
    deletedAt: 'deleted_at',
    paranoid: true,
  }
);