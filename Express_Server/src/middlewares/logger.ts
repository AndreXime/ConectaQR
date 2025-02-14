import type { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";

const logFilePath = path.join(process.cwd(), "requests.log");

const logger = (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime();

  res.on("close", () => {
    if (req.originalUrl === "/favicon.ico") return; // Ignorar favicon
    const [seconds, nanoseconds] = process.hrtime(start);
    const segundosPassados = (seconds + nanoseconds / 1e9).toFixed(3);
    const status = res.statusCode;
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const message = `| ${req.method} ${req.originalUrl} | IP: ${ip} | Tempo: ${segundosPassados} | Status: ${status}`;
    if (process.env.NODE_ENV !== "production") {
      console.log(message);
    }
    fs.appendFile(logFilePath, message + "\n", (err) => {
      if (err) console.log(err);
    });
  });

  next();
};

export default logger;
