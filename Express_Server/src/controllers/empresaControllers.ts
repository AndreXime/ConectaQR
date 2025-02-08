import { Request, Response } from "express";
import { Empresa } from "../database/models.js";
import { generateToken } from "../middlewares/index.js";

const findOwnEmpresa = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await Empresa.findUnique({
      where: { id: req.userId },
      include: {
        produtos: true,
        categorias: true
      }
    });

    if (!data) {
      throw Error;
    }

    res.status(200).json({ message: "Sucesso", data });
  } catch {
    res.status(400).json({ message: "Esse token não pertence a nenhuma empresa" });
  }
};

const createEmpresa = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, senha, nome, descricaoCurta } = req.body;
    // Nome precisa ser formartado para facilitar ter outras urls com esse nome
    const formartNome = (nome as string).toLowerCase().replace(/\s+/g, "-");
    const empresa = await Empresa.create({
      data: { email, senha, nome: formartNome, descricaoCurta },
      select: { id: true }
    });
    const token = generateToken(empresa.id);
    res.cookie("token", token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true, sameSite: "lax" });
    res.status(200).json({ message: "Sucesso" });
  } catch (error) {
    res.status(400).json({ message: "Essa empresa já existe", error });
  }
};

const loginEmpresa = async (req: Request, res: Response): Promise<void> => {
  try {
    const empresa = await Empresa.findUnique({ where: req.body, select: { id: true } });
    if (!empresa) {
      res.status(400).json({ message: "Essa empresa não existe" });
    } else {
      const token = generateToken(empresa.id);
      res.cookie("token", token, {
        maxAge: 60 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: "lax"
      });
      res.status(200).json({ message: "Sucesso" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error no servidor", error });
  }
};

const updateEmpresa = async (req: Request, res: Response): Promise<void> => {
  try {
    const camposPermitidos = ["nome", "senha", "email", "descricao", "descricaoCurta", "tema"];

    const dadosAtualizados = Object.fromEntries(
      Object.entries(req.body).filter(
        ([key, value]) => camposPermitidos.includes(key) && typeof value === "string"
      )
    );

    if (Object.keys(dadosAtualizados).length === 0) {
      res.status(400).json({ message: "Nenhum campo para atualizar" });
      return;
    }

    await Empresa.update({
      where: { id: req.userId },
      select: {},
      data: dadosAtualizados
    });

    res.status(200).json({ message: "Atualizado com sucesso" });
  } catch {
    res.status(400).json({ message: "Erro ao atualizar" });
  }
};

const deleteEmpresa = async (req: Request, res: Response): Promise<void> => {
  try {
    await Empresa.delete({
      where: { id: req.userId },
      select: {}
    });
    res.status(200).json({ message: "Sucesso" });
  } catch {
    res.status(400).json({ message: "Erro ao remover" });
  }
};

export default {
  findOwnEmpresa,
  loginEmpresa,
  createEmpresa,
  updateEmpresa,
  deleteEmpresa
};
