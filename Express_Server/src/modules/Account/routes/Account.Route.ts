import ProdutoController from '../controllers/Produto.Controller.js';
import CategoriaController from '../controllers/Categoria.Controller.js';
import EmpresaController from '../controllers/Empresa.Controller.js';

import SafeRouter from '../../../lib/utils/SafeRouter.js';
import AuthMiddleware from '../../../middlewares/AuthMiddleware.js';
import multer from 'multer';

export default class AccountRoutes {
	private router: SafeRouter;
	private produtoController: ProdutoController;
	private categoriaController: CategoriaController;
	private empresaController: EmpresaController;

	constructor() {
		this.router = new SafeRouter();
		this.produtoController = new ProdutoController();
		this.categoriaController = new CategoriaController();
		this.empresaController = new EmpresaController();

		const upload = multer({
			storage: multer.memoryStorage(),
			limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
		});

		this.router.setMiddleware(AuthMiddleware.verifyAuth);
		this.router.setMiddleware(upload.single('imagem'));

		this.registerRoutes();
	}

	private registerRoutes() {
		// Rotas de empresa
		this.router.patch('/empresa', this.empresaController.updateEmpresa);
		this.router.delete('/empresa', this.empresaController.deleteEmpresa);
		this.router.get('/empresa', this.empresaController.getEmpresa);

		// Rotas de produto
		this.router.post('/produto', this.produtoController.createProduto);
		this.router.patch('/produto', this.produtoController.updateProduto);
		this.router.delete('/produto/:id', this.produtoController.deleteProduto);

		// Rotas de categoria
		this.router.post('/categoria', this.categoriaController.createCategoria);
		this.router.patch('/categoria', this.categoriaController.updateCategoria);
		this.router.delete('/categoria', this.categoriaController.deleteCategoria);
	}

	public getRouter() {
		return this.router.getRouter();
	}
}
