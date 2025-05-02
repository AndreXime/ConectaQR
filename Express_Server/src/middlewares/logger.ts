import type { Request, Response, NextFunction } from 'express';
import { existsSync, mkdirSync } from 'fs';
import { appendFile } from 'fs/promises';
import path from 'path';

const logDir = path.resolve('logs');

if (!existsSync(logDir)) {
	mkdirSync(logDir);
}

const logger = (req: Request, res: Response, next: NextFunction) => {
	const start = process.hrtime();

	/* res.on close prende essa função até response disparar close que quando a conexao é fechada */
	res.on('close', async () => {
		if (/\.(ico|css|js)$/.test(req.originalUrl)) return; // Não faz log de arquivos css js ico

		const [seconds, nanoseconds] = process.hrtime(start);
		const logData = {
			date: new Date().toISOString(),
			method: req.method,
			url: req.originalUrl,
			status: res.statusCode,
			ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
			duration: Number((seconds + nanoseconds / 1e9).toFixed(3)),
		};

		if (process.env.NODE_ENV !== 'production') {
			console.log(logData);
		}

		const dateStr = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
		const dailyLogFile = path.join(logDir, `${dateStr}.log`);

		try {
			await appendFile(dailyLogFile, JSON.stringify(logData) + '\n');
		} catch (err) {
			console.error('Erro ao gravar log:', err);
		}
	});

	next();
};

export default logger;
