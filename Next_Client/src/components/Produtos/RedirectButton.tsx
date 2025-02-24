'use client';
import { useRouter } from 'next/navigation';
import { FaArrowRight } from 'react-icons/fa';
type Props = {
	Url: string;
	buttonText: string;
	ClassName: string;
	key?: string;
	icon?: boolean;
};

export default function RedirectButton({ Url, buttonText, ClassName, key, icon }: Props) {
	const router = useRouter();

	const handleClick = () => {
		router.push(Url);
	};

	return (
		<button
			key={key}
			className={ClassName}
			onClick={handleClick}>
			{buttonText} {icon ? <FaArrowRight /> : ''}
		</button>
	);
}
