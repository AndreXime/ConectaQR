import { Request, Response } from "express";
import { Empresa, Produtos } from "../database/models.js";

const getProdutos = async (req: Request, res: Response): Promise<void> => {
  try {
    const { empresa } = req.params;
    const { categoria, page } = req.query;
    const limitePorPagina = 12;

    const PaginaAtual = parseInt(page as string) || 1;
    if (isNaN(PaginaAtual) || PaginaAtual <= 0) {
      res.status(400).json({ message: "Query page deve ser numero positivo" });
      return;
    }

    const [produtos, count] = await Promise.all([
      Produtos.findMany({
        where: {
          empresa: { nome: empresa },
          ...(categoria && { categorias: categoria as string })
        },
        select: { nome: true, preco: true, categorias: true },
        skip: (PaginaAtual - 1) * limitePorPagina,
        take: limitePorPagina
      }),

      Produtos.count({
        where: {
          empresa: { nome: empresa },
          ...(categoria && { categorias: categoria as string })
        }
      })
    ]);

    if (produtos.length === 0) {
      res.status(404).json({ message: "Nenhum produto nessa empresa" });
      return;
    }

    res.status(200).json({
      message: "Produtos achados com sucesso",
      data: produtos,
      pagination: {
        PaginaAtual,
        limitePorPagina,
        ProdutosTotal: count,
        PaginasTotais: Math.ceil(count / limitePorPagina)
      }
    });
  } catch {
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};

const getAllEmpresas = async (req: Request, res: Response): Promise<void> => {
  try {
    const [data, total] = await Promise.all([
      Empresa.findMany({
        select: { nome: true, descricao: true }
      }),
      Empresa.count()
    ]);

    res.status(200).json({ total: total, data: data });
  } catch {
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};

const getEmpresasByName = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nome } = req.params;
    const empresa = await Empresa.findUnique({
      where: { nome },
      select: { nome: true, descricao: true, tema: true }
    });

    if (!empresa) {
      res.status(404).json({ message: "Nenhuma empresa encontrada" });
      return;
    }

    res.status(200).json(empresa);
  } catch {
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};

export default { getProdutos, getAllEmpresas, getEmpresasByName };
