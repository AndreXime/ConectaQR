import type { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

const logFilePath = path.resolve('generated/requests.log');

const logger = (req: Request, res: Response, next: NextFunction) => {
	const start = process.hrtime();

	/* res.on close prende essa função até response disparar close que quando a conexao é fechada */
	res.on('close', () => {
		if (req.originalUrl === '/favicon.ico') return; // Ignorar favicon
		const [seconds, nanoseconds] = process.hrtime(start);
		const segundosPassados = (seconds + nanoseconds / 1e9).toFixed(3);

		const status = res.statusCode;
		const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

		const todayDate = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }).replace(',', '');

		const message = `| ${req.method} ${req.originalUrl} | IP: ${ip} | Tempo: ${segundosPassados} seg | Status: ${status} | Data: ${todayDate} |`;
		if (process.env.NODE_ENV !== 'production') {
			console.log(message);
		}
		fs.appendFile(logFilePath, message + '\n', (err) => {
			if (err) console.log(err);
		});
	});

	next();
};

export default logger;
