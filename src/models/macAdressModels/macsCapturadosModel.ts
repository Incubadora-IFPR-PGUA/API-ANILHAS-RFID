import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../instances/mysql";

export class MacsCapturados extends Model {
  public id!: number;
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
      primaryKey: true,
    },
    MAC: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    fabricante: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    data_hora_captura: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    tableName: "macs_capturados",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);
