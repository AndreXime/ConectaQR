import { Request, Response } from "express";
import { Empresa } from "../../database/models.js";

const getAllDataFromOwnEmpresa = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await Empresa.findUnique({
      where: { id: req.userId },
      include: {
        produtos: {
          select: { nome: true, preco: true, imagemUrl: true, categoria: { select: { nome: true } } }
        },
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
    });
    res.status(200).json({ message: "Sucesso" });
  } catch {
    res.status(400).json({ message: "Erro ao remover" });
  }
};

export default {
  getAllDataFromOwnEmpresa,
  updateEmpresa,
  deleteEmpresa
};
