import express from "express";
import cookieParser from "cookie-parser";
import routes from "./routes.js";
import middlewareTempo from "./middlewares/tempoRequest.js";

const app = express();

app.set("x-powered-by", false); // Desativa assinatura do express nas requisiçoes
app.use(middlewareTempo); // Mede o tempo de que o servidor demora em cada requisição
app.use(cookieParser()); // Para pode usar cookies entre o client e o server
app.use(express.json()); // Para entender requisições JSON
app.use(express.urlencoded({ extended: true })); // Para entender dados de formulários

app.use("/", routes);

const port = Number(process.env.PORT) || 4000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server está na porta ${port}`);
});
