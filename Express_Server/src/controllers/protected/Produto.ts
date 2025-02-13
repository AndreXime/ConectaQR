import { Empresa, Produtos } from "../../database/models.js";
import { Request, Response } from "express";
import path from "path";
import sharp from "sharp";
import fs from "fs";

const createProduto = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nome, preco, categoriaId } = req.body;

    if (!req.file) {
      res.status(400).json({ message: "Não foi fornecido uma imagem" });
      return;
    }

    const nomeEmpresa = await Empresa.findUnique({ where: { id: req.userId }, select: { nome: true } });
    if (!nomeEmpresa) throw 1;

    const empresaDir = path.join(path.resolve("uploads"), nomeEmpresa.nome);

    // Criar a pasta da empresa se não existir
    if (!fs.existsSync(empresaDir)) {
      fs.mkdirSync(empresaDir, { recursive: true });
    }

    const fileName = `${nome}.webp`;
    const filePath = path.join(empresaDir, fileName);
    const imagemUrl = `${process.env.PUBLIC_DOMAIN}/uploads/${nomeEmpresa.nome}/${fileName}`;

    await sharp(req.file.buffer).resize({ width: 800 }).toFormat("webp", { quality: 70 }).toFile(filePath);

    const produto = await Produtos.create({
      data: {
        nome,
        preco,
        imagemUrl,
        categoria: { connect: { id: categoriaId } },
        empresa: { connect: { id: req.userId } }
      },
      select: { nome: true, preco: true, imagemUrl: true, categoria: true }
    });

    res.json({ message: "Produto adicionado!", data: produto });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erro no servidor" });
  }
};

const updateProduto = async (req: Request, res: Response): Promise<void> => {
  try {
    const { produtoId, nome, preco, categoriaId } = req.body;

    const produto = await Produtos.findUnique({
      where: { id: produtoId, empresaId: req.userId },
      select: { imagemUrl: true }
    });

    if (!produto) {
      res.status(404).json({ message: "Produto não encontrado" });
      return;
    }

    let imagemUrl = produto.imagemUrl; // Mantém a imagem antiga se não mudar

    if (req.file) {
      const empresa = await Empresa.findUnique({
        where: { id: req.userId },
        select: { nome: true }
      });

      if (!empresa) {
        res.status(404).json({ message: "Empresa não encontrada" });
        return;
      }

      const empresaNome = empresa.nome;
      const empresaDir = path.join(path.resolve("uploads"), empresaNome);

      // É bom fazer a verificação se a pasta da empresa existe
      if (!fs.existsSync(empresaDir)) {
        fs.mkdirSync(empresaDir, { recursive: true });
      }

      const fileName = `${nome}.webp`;
      const filePath = path.join(empresaDir, fileName);

      // Remover a imagem antiga se existir
      if (fs.existsSync(produto.imagemUrl)) {
        fs.unlinkSync(produto.imagemUrl);
      }

      await sharp(req.file.buffer).resize({ width: 800 }).toFormat("webp", { quality: 80 }).toFile(filePath);

      imagemUrl = filePath;
    }

    await Produtos.update({
      where: { id: produtoId, empresaId: req.userId },
      data: {
        nome,
        preco,
        imagemUrl, // Atualiza apenas se a imagem mudou
        categoria: { connect: { id: categoriaId } }
      }
    });

    res.status(200).json({ message: "Sucesso" });
  } catch {
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};

const deleteProduto = async (req: Request, res: Response): Promise<void> => {
  try {
    const produto = await Produtos.delete({
      where: {
        id: req.body.produtoId,
        empresaId: req.userId
      },
      select: { imagemUrl: true }
    });

    if (!produto) {
      res.status(400).json({ message: "Esse produto não existe" });
      return;
    }

    if (fs.existsSync(produto.imagemUrl)) {
      fs.unlinkSync(produto.imagemUrl); // Remove a imagem
    }

    res.status(200).json({ message: "Produto removido com sucesso" });
  } catch {
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};

export default { createProduto, updateProduto, deleteProduto };
