import { Router } from 'express';
import { Public } from '../controllers/index.js';

const router = Router();

// Rotas públicas
router.get('/empresas', Public.getAllEmpresas);
router.get('/empresas/:nome', Public.getEmpresaByName);
router.get('/produto/:empresa', Public.getProdutos);

export default router;
