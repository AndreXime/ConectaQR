import { Router, Request, Response, NextFunction, RequestHandler } from 'express';

type ExpressFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export default class SafeRouter {
	private router = Router();
	private middlewares: RequestHandler[] = [];

	private wrapAsync(fn: ExpressFunction): RequestHandler {
		return (req, res, next) => {
			fn(req, res, next).catch(next);
		};
	}

	public setMiddleware(middleware: RequestHandler) {
		this.middlewares.push(middleware);
	}

	private applyMiddleware() {
		return [...this.middlewares];
	}

	get(path: string, ...handlers: ExpressFunction[]) {
		this.router.get(path, this.applyMiddleware(), ...handlers.map((h) => this.wrapAsync(h)));
	}

	post(path: string, ...handlers: ExpressFunction[]) {
		this.router.post(path, this.applyMiddleware(), ...handlers.map((h) => this.wrapAsync(h)));
	}

	put(path: string, ...handlers: ExpressFunction[]) {
		this.router.put(path, this.applyMiddleware(), ...handlers.map((h) => this.wrapAsync(h)));
	}

	delete(path: string, ...handlers: ExpressFunction[]) {
		this.router.delete(path, this.applyMiddleware(), ...handlers.map((h) => this.wrapAsync(h)));
	}

	patch(path: string, ...handlers: ExpressFunction[]) {
		this.router.patch(path, this.applyMiddleware(), ...handlers.map((h) => this.wrapAsync(h)));
	}

	use(...args: Parameters<Router['use']>) {
		this.router.use(...args);
	}

	getRouter() {
		return this.router;
	}
}
