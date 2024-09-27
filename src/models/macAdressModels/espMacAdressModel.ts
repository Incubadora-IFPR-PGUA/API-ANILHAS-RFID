import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../instances/mysql";
import { MacsCapturados } from "./macsCapturadosModel";

export class EspMacAdress extends Model {
  public id!: number;
  public latitude!: string;
  public longitude!: string;
  public cliente_id?: number; // Inclui a FK cliente_id
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date;
}

EspMacAdress.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,  
      autoIncrement: true,
      primaryKey: true
    },
    latitude: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    longitude: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: true
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
    tableName: "macAddress_esp",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at"
  }
);
