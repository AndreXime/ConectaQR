import type { Response, Request } from 'express';
import { Router } from 'express';
import multer from 'multer';

import { Empresa, Produto, Categoria, PublicInfo, Auth, Feedback, FeedbackAdmin } from './controllers/index.js';
import { validateInput, verifyAuth } from './middlewares/index.js';

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

/* Rotas para autenticar */
router.post('/empresa/login', validateInput('LoginEmpresa'), Auth.loginEmpresa);
router.post('/empresa/registro', validateInput('RegistrarEmpresa'), Auth.createEmpresa);

/* Rotas que precisam de autenticação */
router.patch('/empresa', verifyAuth, upload.single('imagem'), validateInput('UpdateEmpresa'), Empresa.updateEmpresa);
router.delete('/empresa', verifyAuth, Empresa.deleteEmpresa);
router.get('/empresa', verifyAuth, Empresa.getAllDataFromOwnEmpresa);

router.post('/produto', verifyAuth, upload.single('imagem'), Produto.createProduto);
router.patch('/produto', verifyAuth, upload.single('imagem'), Produto.updateProduto);
router.delete('/produto/:id', verifyAuth, Produto.deleteProduto);

router.post('/categoria', verifyAuth, validateInput('Categoria'), Categoria.createCategoria);
router.patch('/categoria', verifyAuth, validateInput('Categoria'), Categoria.updateCategoria);
router.delete('/categoria', verifyAuth, Categoria.deleteCategoria);

/* Rotas publicas */
router.get('/empresas', PublicInfo.getAllEmpresasOrByName);
router.get('/produto/:empresa', PublicInfo.getProdutos);
router.post('/feedback', Feedback);

/* Rotas para admins */
router.get('/feedbackadmin', FeedbackAdmin);

router.all('/', async (req: Request, res: Response) => {
	res.status(200).json({ message: 'Pong' });
});

router.use(async (req: Request, res: Response) => {
	res.status(404).json({ message: 'Não encontrado' });
});

export default router;
