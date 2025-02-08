import { redirect } from 'next/navigation';
import Painel from './Painel';
import type { EmpresaCompleta } from '@/types/types.ts';
import { cookies } from 'next/headers';

export type PropsPage = {
	initialData: EmpresaCompleta;
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
			credentials: 'include',
		});

		if (response.ok) {
			const data = await response.json();

			return <Painel initialData={data.data} />;
		} else {
			throw Error;
		}
	} catch {
		redirect('/acesso');
	}
}
