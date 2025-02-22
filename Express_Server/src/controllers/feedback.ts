import { Request, Response } from "express";
import path from "path";
import fs from "fs";

const FILE_PATH = path.resolve("generated/feedbacks.json");

const Feedback = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nome, email, mensagem } = req.body;

    if (!nome || !email || !mensagem) {
      res.status(400).json({ message: "Um campo não foi fornecido" });
      return;
    }

    const novoFeedback = {
      nome,
      email,
      mensagem,
      data: new Date().toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo"
      })
    };

    const feedbackLine = JSON.stringify(novoFeedback) + "\n";

    fs.appendFileSync(FILE_PATH, feedbackLine);
    res.status(200).json({ message: "Feedback salvo com sucesso!" });
  } catch {
    res.status(500).json({ message: "Erro no servidor" });
    return;
  }
};

export { Feedback };
