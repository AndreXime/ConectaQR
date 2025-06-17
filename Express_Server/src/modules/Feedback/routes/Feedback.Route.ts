import FeedbackController from '../controllers/Feedback.Controller.js';
import SafeRouter from '../../../lib/utils/SafeRouter.js';

export default class FeedbackRoutes {
	public router: SafeRouter;
	private controller: FeedbackController;

	constructor() {
		this.router = new SafeRouter();
		this.controller = new FeedbackController();
		this.registerRoutes();
	}

	private registerRoutes() {
		this.router.post('/feedback', this.controller.POST);
		this.router.get('/feedback', this.controller.GET);
	}

	public getRouter() {
		return this.router.getRouter();
	}
}
