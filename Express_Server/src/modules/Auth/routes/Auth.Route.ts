import AuthController from '../controllers/Auth.Controller.js';
import SafeRouter from '../../../lib/utils/SafeRouter.js';

export default class AuthRoutes {
	private router: SafeRouter;
	private controller: AuthController;

	constructor() {
		this.controller = new AuthController();
		this.router = new SafeRouter();
		this.registerRoutes();
	}

	private registerRoutes() {
		this.router.post('/empresa/login', this.controller.Login);
		this.router.post('/empresa/registro', this.controller.Register);
	}

	public getRouter() {
		return this.router.getRouter();
	}
}
