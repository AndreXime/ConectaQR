import { Empresa, Produtos } from '../../database/DatabaseModels.js';
import { Request, Response } from 'express';
import sharp from 'sharp';
import { apagarImagemporURL, FilePath_Url_Maker } from '../../lib/gerenciarImagens.js';

const createProduto = async (req: Request, res: Response): Promise<void> => {
	try {
		const { nome, preco, categoriaId } = req.body;

		if (!req.file) {
			res.status(400).json({ message: 'Não foi fornecido uma imagem' });
			return;
		}

		const nomeEmpresa = await Empresa.findUnique({ where: { id: req.userId }, select: { nome: true } });
		if (!nomeEmpresa) throw Error;

		const { filePath, newImagemUrl } = FilePath_Url_Maker(nomeEmpresa.nome);

		await sharp(req.file.buffer).resize({ width: 800 }).toFormat('webp', { quality: 70 }).toFile(filePath);

		const produto = await Produtos.create({
			data: {
				nome,
				preco,
				imagemUrl: newImagemUrl,
				categoria: { connect: { id: categoriaId } },
				empresa: { connect: { id: req.userId } },
			},
			select: {
				id: true,
				nome: true,
				preco: true,
				imagemUrl: true,
				categoria: { select: { nome: true, id: true } },
			},
		});

		res.json({ message: 'Produto adicionado!', data: produto });
	} catch {
		res.status(500).json({ message: 'Erro no servidor' });
	}
};

const updateProduto = async (req: Request, res: Response): Promise<void> => {
	try {
		const { produtoId, nome, preco, categoriaId } = req.body;

		const produto = await Produtos.findUnique({
			where: { id: produtoId, empresaId: req.userId },
			select: { imagemUrl: true, empresa: { select: { nome: true } } },
		});

		if (!produto) {
			res.status(404).json({ message: 'Produto não encontrado' });
			return;
		}

		let imagemUrl = produto.imagemUrl; // Mantém a imagem antiga se não mudar

		if (req.file) {
			const { filePath, newImagemUrl } = FilePath_Url_Maker(produto.empresa.nome);

			apagarImagemporURL(imagemUrl);

			await sharp(req.file.buffer).resize({ width: 800 }).toFormat('webp', { quality: 70 }).toFile(filePath);

			imagemUrl = newImagemUrl;
		}

		const data = await Produtos.update({
			where: { id: produtoId, empresaId: req.userId },
			data: {
				nome,
				preco,
				imagemUrl,
				categoria: { connect: { id: categoriaId } },
			},
			select: {
				id: true,
				nome: true,
				preco: true,
				imagemUrl: true,
				categoria: { select: { nome: true } },
			},
		});

		res.status(200).json({ message: 'Produto atualizado com sucesso', data });
	} catch (error) {
		res.status(500).json({ message: 'Erro interno no servidor ' + error });
	}
};

const deleteProduto = async (req: Request, res: Response): Promise<void> => {
	try {
		const produtoId = req.params.id;
		const { imagemUrl } = await Produtos.delete({
			where: {
				id: produtoId,
				empresaId: req.userId,
			},
			select: { imagemUrl: true },
		});

		apagarImagemporURL(imagemUrl);

		res.status(200).json({ message: 'Produto removido com sucesso' });
	} catch {
		res.status(500).json({ message: 'Erro interno no servidor' });
	}
};

export default { createProduto, updateProduto, deleteProduto };
