import { Categoria } from "../../database/models.js";
import { Request, Response } from "express";

const createCategoria = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nome } = req.body;
    if (!nome) throw Error;
    const categoriaCriada = await Categoria.create({
      data: { nome: nome, Empresa: { connect: { id: req.userId } } },
      select: { id: true, nome: true }
    });
    res.status(200).json({ message: "Categoria adicionado!", data: categoriaCriada });
  } catch {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

const updateCategoria = async (req: Request, res: Response): Promise<void> => {
  try {
    const { categoriaId, nome } = req.body;
    const categoriaAtualizada = await Categoria.update({
      where: { id: categoriaId, empresaId: req.userId },
      data: { nome },
      select: { id: true, nome: true }
    });
    res.status(200).json({ message: "Atualizado com sucesso", data: categoriaAtualizada });
  } catch {
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};

const deleteCategoria = async (req: Request, res: Response): Promise<void> => {
  try {
    const { categoriaId } = req.body;
    const categoriaDeletada = await Categoria.delete({
      where: { id: categoriaId, empresaId: req.userId },
      select: { id: true, nome: true }
    });
    res.status(200).json({ message: "Categoria removido com sucesso", data: categoriaDeletada });
  } catch {
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};

export default { createCategoria, updateCategoria, deleteCategoria };
