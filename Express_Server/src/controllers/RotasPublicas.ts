import { Request, Response } from "express";
import { Empresa, Produto } from "../database/databaseModels.js";
import type { FindOptions } from "sequelize";

const getProdutos = async (req: Request, res: Response): Promise<void> => {
  try {
    const { empresa } = req.params;
    const { categoria, page } = req.query;
    const limitePorPagina = 12;

    const PaginaAtual = parseInt(page as string) || 1;
    if (isNaN(PaginaAtual) || PaginaAtual <= 0) {
      res.status(400).json({ message: "Query page deve ser numero" });
      return;
    }

    const offset = (PaginaAtual - 1) * limitePorPagina;

    const query: Partial<FindOptions> = {
      attributes: ["nome", "preco", "categoria"],
      limit: limitePorPagina,
      offset: offset,
      include: [
        {
          model: Empresa,
          attributes: [],
          where: { nome: empresa }
        }
      ]
    };

    if (categoria) query.where = { categoria };

    const { count, rows: produtos } = await Produto.findAndCountAll(query);

    if (produtos.length === 0) {
      res.status(404).json({ message: "Nenhum produto nessa empresa" });
      return;
    }

    res.status(200).json({
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
    const { count, rows } = await Empresa.findAndCountAll({ attributes: ["nome", "descricao"] });

    res.status(200).json({ total: count, data: rows });
  } catch {
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};

const getEmpresasByName = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nome } = req.params;
    const empresa = await Empresa.findAll({
      where: { nome },
      attributes: ["nome", "descricao", "tema"]
    });

    if (empresa.length === 0) {
      res.status(404).json({ message: "Nenhuma empresa encontrada" });
      return;
    }

    res.status(200).json(empresa);
  } catch {
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};

export default { getProdutos, getAllEmpresas, getEmpresasByName };
