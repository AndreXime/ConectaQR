import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import routes from './routes/routes.js';
import middlewareTempo from './middlewares/logger.js';
import path from 'path';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(
	cors({
		origin: process.env.CLIENT_DOMAIN,
		methods: ['GET', 'POST', 'PATCH', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true,
	})
);

app.set('x-powered-by', false); // Desativa assinatura do express nas requisiçoes
app.set('trust proxy', 1); // Para lidar com proxies
app.use(middlewareTempo); // Mede o tempo de que o servidor demora em cada requisição
app.use(cookieParser()); // Para pode usar cookies entre o client e o server
app.use(express.json({ limit: '5mb' })); // Para entender requisições JSON
app.use(express.urlencoded({ extended: true, limit: '5mb' })); // Para entender dados de formulários

app.use('/uploads', express.static(path.resolve('generated/uploads')));
app.use('/', routes);

const port = Number(process.env.PORT) || 4000;
app.listen(port, '0.0.0.0', () => {
	console.log(`Server online em ${process.env.PUBLIC_DOMAIN}\n`);
});
