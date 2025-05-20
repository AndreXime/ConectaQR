import { Router } from 'express';
import { validateInput } from '../middlewares/index.js';
import { Auth } from '../controllers/index.js';

const router = Router();

// Rotas para autenticar
router.post('/empresa/login', validateInput('LoginEmpresa'), Auth.loginEmpresa);
router.post('/empresa/registro', validateInput('RegistrarEmpresa'), Auth.registerEmpresa);

export default router;
