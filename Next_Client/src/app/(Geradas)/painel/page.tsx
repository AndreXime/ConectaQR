import { redirect } from 'next/navigation';
import Painel from './page-client';
import { cookies } from 'next/headers';
import { EmpresaContext } from '@/module/Painel/lib/Context';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'ConnectQR - Painel',
    description: 'Area da empresa configurar sua loja no ConnectQR',
};

export default async function PageServer() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token?.value}`,
            },
            cache: 'no-store',
            credentials: 'include',
        });

        if (response.ok) {
            const data = await response.json();

            return (
                <EmpresaContext initialData={data.data}>
                    <Painel />
                </EmpresaContext>
            );
        } else {
            throw Error;
        }
    } catch {
        redirect('/acesso');
    }
}
