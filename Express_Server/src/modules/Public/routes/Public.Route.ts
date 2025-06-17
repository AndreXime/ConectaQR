import PublicController from '../controllers/Public.Controller.js';
import SafeRouter from '../../../lib/utils/SafeRouter.js';

export default class PublicRoutes {
	private router: SafeRouter;
	private controller: PublicController;

	constructor() {
		this.controller = new PublicController();
		this.router = new SafeRouter();
		this.registerRoutes();
	}

	private registerRoutes() {
		this.router.get('/empresas', this.controller.FindAll);
		this.router.get('/empresa/:nome', this.controller.FindOne);
		this.router.get('/produto/:empresa', this.controller.GetProdutos);
	}

	public getRouter() {
		return this.router.getRouter();
	}
}
