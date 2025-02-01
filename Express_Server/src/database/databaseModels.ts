import { Sequelize } from "sequelize-typescript";
import Empresa from "./EmpresaModel.js";
import Produto from "./ProdutoModel.js";

const databaseUrl = process.env.databaseUrl || "postgres://nexusfin:nexusadmin@localhost:5432/rootDatabase";

const sequelize = new Sequelize(databaseUrl, {
  logging: false,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000, // Tempo máximo para uma conexão ser adquirida antes de lançar um erro
    idle: 10000 // Tempo máximo que uma conexão pode ficar ociosa antes de ser liberada
  },
  models: [Empresa, Produto]
});

Empresa.hasMany(Produto, { foreignKey: "empresaId", as: "produtos" });
Produto.belongsTo(Empresa, { foreignKey: "empresaId", as: "empresa" });

export async function testConnection() {
  try {
    await sequelize.authenticate({ logging: false });
    console.info("Conexão com PostgreSQL estabelecida");
    if (process.env.SYNC === "true" || !process.env.NODE_ENV) {
      await sequelize.sync({ logging: false });
    }
    console.info("Modelos sincronizados com o banco de dados\n");
  } catch (err) {
    console.error("Erro ao conectar ao PostgreSQL:\n", err);
  }
}
export { Empresa, Produto };
