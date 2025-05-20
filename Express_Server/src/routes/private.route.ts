import { Router } from 'express';
import multer from 'multer';
import { validateInput, verifyAuth } from '../middlewares/index.js';
import { Private } from '../controllers/index.js';

const upload = multer({
	storage: multer.memoryStorage(),
	limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

const router = Router();

// Rotas que precisam de autenticação
router.patch(
	'/empresa',
	verifyAuth,
	upload.single('imagem'),
	validateInput('UpdateEmpresa'),
	Private.Empresa.updateEmpresa
);
router.delete('/empresa', verifyAuth, Private.Empresa.deleteEmpresa);
router.get('/empresa', verifyAuth, Private.Empresa.getEmpresa);

router.post('/produto', verifyAuth, upload.single('imagem'), Private.Produto.createProduto);
router.patch('/produto', verifyAuth, upload.single('imagem'), Private.Produto.updateProduto);
router.delete('/produto/:id', verifyAuth, Private.Produto.deleteProduto);

router.post('/categoria', verifyAuth, validateInput('Categoria'), Private.Categoria.createCategoria);
router.patch('/categoria', verifyAuth, validateInput('Categoria'), Private.Categoria.updateCategoria);
router.delete('/categoria', verifyAuth, Private.Categoria.deleteCategoria);

export default router;
