import { Request, Response } from "express";
import { Empresa } from "../database/models.js";
import { generateToken } from "../middlewares/index.js";

const createEmpresa = async (req: Request, res: Response): Promise<void> => {
  try {
    const empresa = await Empresa.create(req.body);
    const token = generateToken(empresa.id);
    res.cookie("Token", token, { maxAge: 90000, httpOnly: true, sameSite: "lax" });
    res.status(200).json(empresa);
  } catch {
    res.status(400).json({ message: "Essa empresa já existe" });
  }
};

const loginEmpresa = async (req: Request, res: Response): Promise<void> => {
  try {
    const empresa = await Empresa.findUnique(req.body);
    if (!empresa) {
      res.status(400).json({ message: "Essa empresa não existe" });
    } else {
      const token = generateToken(empresa.id);
      res.cookie("Token", token, { maxAge: 90000, httpOnly: true, sameSite: "lax" });
      res.status(200).json(empresa);
    }
  } catch {
    res.status(400).json({ message: "Error no servidor" });
  }
};

const updateEmpresa = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json();
};

const deleteEmpresa = async (req: Request, res: Response): Promise<void> => {
  res.status(200).send();
};

export default {
  loginEmpresa,
  createEmpresa,
  updateEmpresa,
  deleteEmpresa
};
