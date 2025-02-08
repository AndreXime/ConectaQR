import type { Response, Request } from "express";
import { Router } from "express";

import { Empresa, Produto, Publicas } from "./controllers/index.js";
import { validateInput, verifyAuth } from "./middlewares/index.js";

const router = Router();

/* Rotas que precisam de autenticação */
router.post("/empresa/login", validateInput("LoginEmpresa"), Empresa.loginEmpresa);
router.post("/empresa/registro", validateInput("RegistrarEmpresa"), Empresa.createEmpresa);
router.patch("/empresa", verifyAuth, validateInput("UpdateEmpresa"), Empresa.updateEmpresa);
router.delete("/empresa", verifyAuth, Empresa.deleteEmpresa);
router.get("/empresa", verifyAuth, Empresa.findOwnEmpresa);

router.post("/produto", verifyAuth, validateInput("Produtos"), Produto.createProduto);
router.patch("/produto/:id", verifyAuth, validateInput("Produtos"), Produto.updateProduto);
router.delete("/produto/:id", verifyAuth, Produto.deleteProduto);

/* Informações publicas */
router.get("/empresas", Publicas.getAllEmpresas);
router.get("/empresa/:nome", Publicas.getEmpresasByName);
router.get("/produto/:empresa", Publicas.getProdutos);

router.all("/", async (req: Request, res: Response) => {
  res.status(200).json({ message: "Pong" });
});

router.use(async (req: Request, res: Response) => {
  res.status(404).json({ message: "Não encontrado" });
});

export default router;
