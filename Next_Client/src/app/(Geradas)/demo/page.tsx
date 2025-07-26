import { EmpresaPrivate } from '@/types/global';
import Painel from './page-client';
import { EmpresaContext } from '@/module/Painel/lib/Context';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'ConnectQR - Painel',
    description: 'Area da empresa configurar sua loja no ConnectQR',
};

export default async function PageServer() {
    const empresaMock: EmpresaPrivate = {
        nome: 'Café Central',
        descricao: 'O melhor café da cidade, com ambiente acolhedor e internet rápida.',
        tema: 'pastel',
        maps: '',
        telefone: '(11) 91234-5678',
        instagram: '@cafecentral',
        emailContato: 'contato@cafecentral.com',
        foto: '',
        cidade: 'São Paulo',
        email: 'admin@cafecentral.com',
        createdAt: '2023-11-05T14:23:00Z',
        updatedAt: '2024-04-12T09:15:30Z',
        categorias: [
            { id: '1', nome: 'Cafés' },
            { id: '2', nome: 'Bolos' },
            { id: '3', nome: 'Salgados' },
        ],

        produtos: [
            {
                id: '101',
                nome: 'Café Expresso',
                preco: '7.50',
                categoria: { nome: 'Cafés' },
                imagemUrl: '/assets/mock1.png',
            },
            {
                id: '301',
                nome: 'Coxinha',
                preco: '5.00',
                categoria: { nome: 'Salgados' },
                imagemUrl: '/assets/mock2.png',
            },
            {
                id: '201',
                nome: 'Bolo de Cenoura',
                preco: '6.00',
                categoria: { nome: 'Bolos' },
                imagemUrl: '/assets/mock3.png',
            },
            {
                id: '102',
                nome: 'Salgado de forno',
                preco: '9.00',
                categoria: { nome: 'Cafés' },
                imagemUrl: '/assets/mock4.png',
            },
        ],
    };

    return (
        <EmpresaContext initialData={empresaMock}>
            <Painel />
        </EmpresaContext>
    );
}
