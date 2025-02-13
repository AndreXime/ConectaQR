import { Request, Response } from "express";
import { Empresa, Produtos, Categoria } from "../database/models.js";

const getProdutos = async (req: Request, res: Response): Promise<void> => {
  try {
    const { empresa } = req.params;
    const { categoria, page, search } = req.query;
    const limitePorPagina = 12;

    const PaginaAtual = parseInt(page as string) || 1;
    if (isNaN(PaginaAtual) || PaginaAtual <= 0) {
      res.status(400).json({ message: "Query page deve ser numero positivo" });
      return;
    }
    const existe = await Empresa.findUnique({ where: { nome: empresa }, select: { tema: true } });
    if (!existe) {
      res.status(404).json({ message: "Não existe empresa com esse nome" });
      return;
    }

    const [produtos, categorias, count] = await Promise.all([
      Produtos.findMany({
        where: {
          empresa: { nome: empresa },
          ...(categoria ? { categoria: { nome: categoria as string } } : {}),
          ...(search ? { nome: { contains: search as string, mode:"insensitive"}} : {} )
        },
        select: { nome: true, preco: true, imagemUrl: true },
        skip: (PaginaAtual - 1) * limitePorPagina,
        take: limitePorPagina
      }),

      Categoria.findMany({
        where: {
          Empresa: { nome: empresa }
        },
        select: { nome: true }
      }),

      Produtos.count({
        where: {
          empresa: { nome: empresa },
          ...(categoria ? { categoria: { nome: categoria as string } } : {})
        }
      })
    ]);

    res.status(200).json({
      data: { produtos, categorias },
      pagination: {
        PaginaAtual,
        limitePorPagina,
        ProdutosTotal: count,
        PaginasTotais: Math.ceil(count / limitePorPagina)
      },
      tema: existe.tema
    });
  } catch {
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};

const getAllEmpresasOrByName = async (req: Request, res: Response): Promise<void> => {
  try {
    const nome = typeof req.query.nome === "string" ? req.query.nome : undefined;

    if (!nome) {
      const data = await Empresa.findMany({
        select: { nome: true, descricao: true, descricaoCurta: true }
      });

      res.status(200).json({ data: data });
      return;
    }

    const empresa = await Empresa.findUnique({
      where: { nome },
      select: {
        nome: true,
        descricao: true,
        descricaoCurta: true,
        tema: true,
        maps: true,
        telefone: true,
        instagram: true,
        emailContato: true
      }
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

export default { getProdutos, getAllEmpresasOrByName };
