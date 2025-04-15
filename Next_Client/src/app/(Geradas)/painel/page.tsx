import { redirect } from 'next/navigation';
import Painel from './Painel';
import { cookies } from 'next/headers';
import { EmpresaContext } from '@/components/Painel/Context';

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
					<Painel />;
				</EmpresaContext>
			);
		} else {
			throw Error;
		}
	} catch {
		redirect('/acesso');
	}
}
