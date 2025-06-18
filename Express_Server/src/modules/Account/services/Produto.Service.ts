import { HTTPError } from '../../../lib/errors/HTTPError.js';
import ImageManager from '../../../lib/utils/ImageManager.js';
import { CreateProdutoDTO, UpdateProdutoDTO } from '../dto/ProdutoDTO.js';
import ProdutoRepository from '../repositories/Produto.Repository.js';

export default class ProdutoService {
    private repository: ProdutoRepository;

    constructor() {
        this.repository = new ProdutoRepository();
    }

    async createProduto(empresaId: string, body: CreateProdutoDTO, file?: Express.Multer.File) {
        const { nome, preco, categoriaId } = body;

        if (!file) {
            throw new HTTPError(400, 'Não foi fornecido uma imagem');
        }

        const empresa = await this.repository.getEmpresaNome(empresaId);
        if (!empresa) {
            throw new HTTPError(400, 'Empresa não encontrada');
        }

        const imagemUrl = await ImageManager.GenerateImageFileAndUrl(empresa.nome, file.buffer);

        const produto = await this.repository.create(empresaId, {
            nome,
            preco,
            imagemUrl,
            categoriaId,
        });

        return produto;
    }

    async updateProduto(empresaId: string, body: UpdateProdutoDTO, file?: Express.Multer.File) {
        const { produtoId, nome, preco, categoriaId } = body;

        const produto = await this.repository.findById(produtoId, empresaId);
        if (!produto) {
            throw new Error('Produto não encontrado');
        }

        let imagemUrl = produto.imagemUrl;

        if (file) {
            ImageManager.apagarImagemporURL(imagemUrl);

            const newImagemUrl = await ImageManager.GenerateImageFileAndUrl(produto.empresa.nome, file.buffer);

            imagemUrl = newImagemUrl;
        }

        const produtoAtualizado = await this.repository.update(produtoId, empresaId, {
            nome,
            preco,
            imagemUrl,
            categoria: { connect: { id: categoriaId } },
        });

        return produtoAtualizado;
    }

    async deleteProduto(produtoId: string, empresaId: string) {
        const produto = await this.repository.delete(produtoId, empresaId);
        if (produto.imagemUrl) {
            ImageManager.apagarImagemporURL(produto.imagemUrl);
        }
        return { message: 'Produto removido com sucesso' };
    }
}
