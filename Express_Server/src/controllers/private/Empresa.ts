import { Request, Response } from 'express';
import { Empresa, Categoria, Produtos } from '../../database/models.js';
import fs from 'fs/promises';
import sharp from 'sharp';
import { apagarImagemporURL, FilePath_Url_Maker } from '../../lib/gerenciarImagens.js';

const getEmpresa = async (req: Request, res: Response): Promise<void> => {
	try {
		const data = await Empresa.findUnique({
			where: { id: req.userId },
			include: {
				produtos: {
					select: {
						id: true,
						nome: true,
						preco: true,
						imagemUrl: true,
						categoria: { select: { nome: true } },
					},
				},
				categorias: { select: { id: true, nome: true } },
			},
		});

		if (!data) {
			throw Error;
		}

		res.status(200).json({ message: 'Sucesso', data });
	} catch {
		res.status(400).json({ message: 'Esse token não pertence a nenhuma empresa' });
	}
};

const updateEmpresa = async (req: Request, res: Response): Promise<void> => {
	try {
		const dadosAtualizados = {
			nome: req.body?.nome,
			senha: req.body?.senha,
			email: req.body?.email,
			descricao: req.body?.descricao || '',
			tema: req.body?.tema || '',
			maps: req.body?.maps || '',
			instagram: req.body?.instagram || '',
			telefone: req.body?.telefone || '',
			emailContato: req.body?.emailContato || '',
			cidade: req.body?.cidade || '',
			foto: req.body?.foto || '',
		};

		if (!dadosAtualizados.nome || !dadosAtualizados.email) {
			res.status(400).json({ message: 'Voce não pode deletar campos obrigatorios!' });
			return;
		} else {
			dadosAtualizados.nome = (dadosAtualizados.nome as string).toLowerCase().replace(/\s+/g, '-');
		}

		/* Usuario não quis alterar senha deve-se tirar do objeto */
		if (!dadosAtualizados.senha) {
			delete dadosAtualizados.senha;
		}

		/** Extraindo a url do iframe do google maps, senão estiver dos parametros é deletado */
		if (dadosAtualizados.maps && typeof dadosAtualizados.maps == 'string') {
			const match = dadosAtualizados.maps.match(/src="(https:\/\/www\.google\.com\/maps\/embed\?[^"]+)"/);
			if (match && match[1]) {
				dadosAtualizados.maps = match[1];
			} else {
				delete dadosAtualizados.maps;
			}
		}

		if (req.file) {
			const empresa = await Empresa.findUnique({
				where: { id: req.userId },
				select: { foto: true, nome: true },
			});
			if (!empresa) throw new Error();

			const { filePath, newImagemUrl } = FilePath_Url_Maker(empresa.nome);

			if (empresa.foto) apagarImagemporURL(empresa.foto);

			await sharp(req.file.buffer).resize({ width: 800 }).toFormat('webp', { quality: 70 }).toFile(filePath);

			dadosAtualizados.foto = newImagemUrl;
		}
		if (dadosAtualizados.foto == '') {
			delete dadosAtualizados.foto;
		}

		const EmpresaAtualizada = await Empresa.update({
			where: { id: req.userId },
			data: { ...dadosAtualizados },
		});

		res.status(200).json({ message: 'Atualizado com sucesso', data: EmpresaAtualizada });
	} catch {
		res.status(400).json({ message: 'Erro ao atualizar' });
	}
};

const deleteEmpresa = async (req: Request, res: Response): Promise<void> => {
	try {
		// Remove related categories and products first to avoid FK constraint errors
		await Categoria.deleteMany({ where: { empresaId: req.userId } });
		await Produtos.deleteMany({ where: { empresaId: req.userId } });
		const empresa = await Empresa.delete({
			where: { id: req.userId },
			select: { nome: true },
		});
		await fs.rm('./generated/uploads/' + empresa.nome, { recursive: true, force: true });
		res.status(200).json({ message: 'Sucesso' });
	} catch {
		res.status(400).json({ message: 'Erro ao remover' });
	}
};

export default {
	getEmpresa,
	updateEmpresa,
	deleteEmpresa,
};
