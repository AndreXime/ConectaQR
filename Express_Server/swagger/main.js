import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const app = express();
const PORT = process.env.PORT || 5000;

const swaggerDocument = YAML.load("./swagger.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/api-docs`);
});
