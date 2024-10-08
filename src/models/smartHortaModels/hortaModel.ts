import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../instances/mysql";

export class HortaModel extends Model {
  public id!: number;
  public umidade_solo!: number;
  public umidade_ar!: number;
  public temperatura_ar!: number;
  public luz_ambiente!: String;
  public hora_atualizacao!: Date;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date;
}

HortaModel.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    umidade_solo: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    umidade_ar: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    temperatura_ar: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    luz_ambiente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hora_atualizacao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
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
    tableName: 'smartHorta_esp',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at', 
    deletedAt: 'deleted_at',
    paranoid: true,
  }
);