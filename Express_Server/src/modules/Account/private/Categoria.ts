import { Categoria, Produtos } from '../../database/DatabaseModels.js';
import { Request, Response } from 'express';

const createCategoria = async (req: Request, res: Response): Promise<void> => {
	try {
		const { nome } = req.body;
		if (!nome) throw Error;
		const categoriaCriada = await Categoria.create({
			data: { nome: nome, Empresa: { connect: { id: req.userId } } },
			select: { id: true, nome: true },
		});
		res.status(200).json({ message: 'Categoria adicionado!', data: categoriaCriada });
	} catch {
		res.status(500).json({ message: 'Erro no servidor' });
	}
};

const updateCategoria = async (req: Request, res: Response): Promise<void> => {
	try {
		const { categoriaId, nome } = req.body;
		const categoriaAtualizada = await Categoria.update({
			where: { id: categoriaId, empresaId: req.userId },
			data: { nome },
			select: { id: true, nome: true },
		});
		res.status(200).json({ message: 'Atualizado com sucesso', data: categoriaAtualizada });
	} catch {
		res.status(500).json({ message: 'Erro interno no servidor' });
	}
};

const deleteCategoria = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id, newId } = req.body;

		if (id === newId) {
			res.status(400).json({ message: 'Os ids passado são iguais!' });
			return;
		}

		const categoriaNova = await Categoria.findUnique({ where: { id: newId }, select: { id: true, nome: true } });

		if (!categoriaNova) {
			res.status(400).json({ message: 'O id novo não existe' });
			return;
		}

		await Produtos.updateMany({
			where: { categoriaId: id, empresaId: req.userId },
			data: { categoriaId: newId },
		});

		await Categoria.delete({
			where: { id: id, empresaId: req.userId },
		});

		res.status(200).json({ message: 'Categoria removido com sucesso', data: categoriaNova });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Erro interno no servidor' });
	}
};

export default { createCategoria, updateCategoria, deleteCategoria };
