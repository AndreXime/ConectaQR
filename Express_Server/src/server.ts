import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import LoggerMiddleware from './middlewares/LoggerMiddleware.js';
import ErrorHandler from './middlewares/ErrorMiddleware.js';
import IndexRouter from './routes.js';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';

export default class Server {
    private app: Express;
    private port: number;

    constructor() {
        this.app = express();
        this.port = Number(process.env.PORT) || 4000;

        this.middlewares();
        this.routes();
    }

    private middlewares() {
        this.app.use(
            cors({
                origin: process.env.CLIENT_DOMAIN,
                methods: ['GET', 'POST', 'PATCH', 'DELETE'],
                allowedHeaders: ['Content-Type', 'Authorization'],
                credentials: true,
            })
        );

        this.app.set('x-powered-by', false);
        this.app.set('trust proxy', 1);
        this.app.use(express.json({ limit: '5mb' }));
        this.app.use(express.urlencoded({ extended: true, limit: '5mb' }));
        this.app.use(cookieParser());

        this.app.use(new LoggerMiddleware().invoke);
    }

    private routes() {
        this.app.use(
            '/uploads',
            (req, res, next) => {
                // Removendo Querys que geralmente tem no nextjs
                const match = req.url.match(/^(.+\.(webp|png|jpg|jpeg|gif))/i);
                if (match) req.url = match[1];
                next();
            },
            express.static(path.resolve('generated/uploads'))
        );
        this.app.use('/', new IndexRouter().router);
        this.app.use(ErrorHandler);
    }

    public start() {
        this.app.listen(this.port, '0.0.0.0', () => {
            console.log(`Server online em ${process.env.PUBLIC_DOMAIN}\n`);
        });
    }
}

dotenv.config();
new Server().start();
