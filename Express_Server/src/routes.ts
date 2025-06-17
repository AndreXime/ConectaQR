import { Router } from 'express';
import AuthRoutes from './modules/Auth/routes/Auth.Route.js';
import FeedbackRoute from './modules/Feedback/routes/Feedback.Route.js';
import PublicRoutes from './modules/Public/routes/Public.Route.js';
import AccountRoutes from './modules/Account/routes/Account.Route.js';

export default class IndexRouter {
	public router: Router;

	constructor() {
		this.router = Router();
		this.registerRoutes();
	}

	private registerRoutes() {
		// Sub-rotas
		this.router.use(new AuthRoutes().getRouter());
		this.router.use(new FeedbackRoute().getRouter());
		this.router.use(new PublicRoutes().getRouter());
		this.router.use(new AccountRoutes().getRouter());

		// Rota de ping
		this.router.all('/', async (req: ExRequest, res: ExResponse) => {
			res.status(200).json({ message: 'Pong' });
		});

		// Rota 404
		this.router.use(async (req: ExRequest, res: ExResponse) => {
			res.status(404).json({ message: 'Não encontrado' });
		});
	}
}
