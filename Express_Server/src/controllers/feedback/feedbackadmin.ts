import { Request, Response } from "express";
import path from "path";
import fs from "fs";

const FEED_PATH = path.resolve("generated/feedbacks.json");
const REQUEST_PATH = path.resolve("generated/requests.log");
const SENHA_ADMIN = process.env.ADMIN_KEY;

const parseLogToJson = (logData: string): object[] => {
  return logData
    .trim()
    .split("\n")
    .map((line) => {
      const match = line.match(
        /\| (\w+) ([^|]+) \| IP: ([^|]+) \| Tempo: ([^|]+) seg \| Status: (\d+) \| Data: ([^|]+) \|/
      );
      if (!match) return null;
      return {
        metodo: match[1],
        rota: match[2].trim(),
        ip: match[3].trim(),
        tempo: parseFloat(match[4]),
        status: parseInt(match[5], 10),
        data: match[6].trim()
      };
    })
    .filter(
      (
        entry
      ): entry is { metodo: string; rota: string; ip: string; tempo: number; status: number; data: string } =>
        entry !== null
    );
};

const FeedbackAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    if (req.query.senha !== SENHA_ADMIN) {
      res.status(400).json({ message: "Senha incorreta" });
      return;
    }

    if (!fs.existsSync(FEED_PATH) && !fs.existsSync(REQUEST_PATH)) {
      res.status(404).json({ message: "Nenhum feedback encontrado." });
      return;
    }

    const Feedback = fs
      .readFileSync(FEED_PATH, "utf-8")
      .split("\n")
      .filter((line) => line.trim())
      .map((line) => JSON.parse(line));

    const Request = fs.existsSync(REQUEST_PATH) ? parseLogToJson(fs.readFileSync(REQUEST_PATH, "utf-8")) : [];

    res.status(200).json({ Feedback, Request });
  } catch {
    res.status(500).json({ message: "Erro no servidor" });
    return;
  }
};

export { FeedbackAdmin };
