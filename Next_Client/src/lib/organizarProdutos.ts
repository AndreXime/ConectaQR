import { Categoria, Produto } from './types';

type data = {
    produtos: Produto[];
    categorias: Categoria[];
};

export default async function OrganizarProdutos(data: data) {
    return data.produtos.reduce((acc: Record<string, Produto[]>, produto) => {
        const categoria = produto.categoria.nome;

        if (!acc[categoria]) {
            acc[categoria] = [];
        }

        acc[categoria].push(produto);
        return acc;
    }, {});
}
