'use client';
import { useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';

type Props = {
	empresa: string;
	className?: string;
};

export default function SearchProduto({ empresa, className }: Props) {
	const router = useRouter();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const inputValue = (event.target as HTMLFormElement).querySelector('input')?.value;

		if (inputValue) {
			router.push(`/${empresa}/produtos?s=${inputValue}`);
		} else {
			router.push(`/${empresa}/produtos`);
		}
	};

	return (
		<form
			className={className}
			onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Pesquisar produtos..."
			/>
			<FaSearch />
		</form>
	);
}
