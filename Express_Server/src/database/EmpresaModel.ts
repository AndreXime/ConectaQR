import { Table, Column, Model, DataType, PrimaryKey, Default } from "sequelize-typescript";
import { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
/**
 * Classe Empresa
 *
 * Atributos de criação:
 * - **email**, **senha**, **nome**, **descricao**, descricaoCurta e tema
 */
@Table({ tableName: "Empresa", timestamps: true })
class Empresa extends Model<InferAttributes<Empresa>, InferCreationAttributes<Empresa>> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID, allowNull: false })
  declare id: CreationOptional<string>;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare senha: string;

  /* Dados publicos */

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare nome: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare descricao: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare descricaoCurta: CreationOptional<string>;

  @Column({ type: DataType.STRING, allowNull: false })
  declare tema: CreationOptional<string>;
}

export default Empresa;
