import type { Response, Request } from "express";
import { Router } from "express";

import Empresa from "./controllers/empresaControllers.js";
import Produto from "./controllers/produtoControllers.js";

import validateInput from "./middlewares/validateInput.js";
import { verifyAuth } from "./middlewares/JWT.js";

const router = Router();

router.get("/empresa", Empresa.getAllEmpresas);
router.post("/empresa", validateInput("Empresa"), Empresa.createEmpresas);
router.delete("/empresa/:id", verifyAuth, Empresa.deleteEmpresa);
router.patch("/empresa/:id", verifyAuth, Empresa.updateEmpresa);
router.get("/empresa/:id", Empresa.getEmpresasByName);

router.get("/produto", Produto.getAllProduto);
router.post("/produto", Produto.createProduto);
router.post("/produto/:categoria", Produto.getProdutoByCategoria);
router.delete("/produto/:id", Produto.deleteProduto);
router.patch("/produto/:id", Produto.updateProduto);

router.all("/", async (req: Request, res: Response) => {
  res.status(200).json({ message: "Pong" });
});

router.use(async (req: Request, res: Response) => {
  res.status(404).json({ message: "Não encontrado" });
});

export default router;
