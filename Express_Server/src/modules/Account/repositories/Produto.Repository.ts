import DatabaseModels from '../../../config/Database.js';
import { CreateProdutoFinalDTO } from '../dto/ProdutoDTO.js';

export default class ProdutoRepository {
    private Database = DatabaseModels;
    async getEmpresaNome(empresaId: string) {
        return this.Database.empresa.findUnique({
            where: { id: empresaId },
            select: { nome: true },
        });
    }

    async create(empresaId: string, data: CreateProdutoFinalDTO) {
        return this.Database.produto.create({
            data: {
                nome: data.nome,
                preco: data.preco,
                imagemUrl: data.imagemUrl,
                categoria: { connect: { id: data.categoriaId } },
                empresa: { connect: { id: empresaId } },
            },
            select: {
                id: true,
                nome: true,
                preco: true,
                imagemUrl: true,
                categoria: { select: { nome: true, id: true } },
            },
        });
    }

    async findById(produtoId: string, empresaId: string) {
        return this.Database.produto.findUnique({
            where: { id: produtoId, empresaId },
            select: {
                imagemUrl: true,
                empresa: { select: { nome: true } },
            },
        });
    }

    async update(produtoId: string, empresaId: string, data: any) {
        return this.Database.produto.update({
            where: { id: produtoId, empresaId },
            data,
            select: {
                id: true,
                nome: true,
                preco: true,
                imagemUrl: true,
                categoria: { select: { nome: true } },
            },
        });
    }

    async delete(produtoId: string, empresaId: string) {
        return this.Database.produto.delete({
            where: { id: produtoId, empresaId },
            select: { imagemUrl: true },
        });
    }
}
