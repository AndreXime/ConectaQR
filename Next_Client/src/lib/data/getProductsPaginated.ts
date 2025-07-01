import { notFound } from 'next/navigation';
import { NextQueryType, ProdutoPageProps } from '../types';
import montarQueryURL from '../montarQuery';

export default async function getProdutosPaginated(nome: string, queryraw: NextQueryType): Promise<ProdutoPageProps> {
    const query = await montarQueryURL(queryraw);
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/produto/${nome}${query}`;

    try {
        const response = await fetch(URL, { method: 'get', cache: 'no-store' });
        const status = response.status;
        if (status >= 400) {
            notFound();
        } else {
            const { data, pagination, tema } = await response.json();
            return { data, pagination, tema };
        }
    } catch {
        notFound();
    }
}
