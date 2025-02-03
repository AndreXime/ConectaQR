import type { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";

const logFilePath = path.join(process.cwd(), "request-time.log");

/* 
Esse middleware acopla quando a requisição termina essa função 
e ignora o favicon pois atrapalha depuração no desenvolvimento
*/
const middlewareTempo = (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime();

  res.on("finish", () => {
    if (!(req.originalUrl == "/favicon.ico")) {
      const [seconds, nanoseconds] = process.hrtime(start);
      const segundosPassados = (seconds + nanoseconds / 1e9).toFixed(3);
      const message = `Request ${req.method}  para ${req.originalUrl} demorou ${segundosPassados} segundos\n`;
      if (process.env.NODE_ENV !== "production") {
        console.log(message);
      }
      fs.appendFile(logFilePath, message, (err) => {
        console.log(err);
      });
    }
  });

  next();
};

export default middlewareTempo;
