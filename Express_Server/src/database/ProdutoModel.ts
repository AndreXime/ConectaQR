import { Table, Column, Model, DataType, PrimaryKey, Default } from "sequelize-typescript";
import { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";

@Table({ tableName: "Produto", timestamps: true })
class Funcionario extends Model<InferAttributes<Funcionario>, InferCreationAttributes<Funcionario>> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID, allowNull: false })
  declare id: CreationOptional<string>;

  @Column({ type: DataType.STRING, allowNull: false })
  declare nome: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare preco: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare imagem: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare categorias: string;

  @Column({ type: DataType.UUID, allowNull: false })
  declare empresaId: string;
}

export default Funcionario;
