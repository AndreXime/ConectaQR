import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
	return (
		<div className="bg-slate-100 flex justify-center">
			<footer className="footer footer-horizontal  pt-10 pb-24 px-4 max-w-6xl text-base-content">
				<div className="">
					<p className="font-bold text-2xl">ConectaQR</p>
					<p className="">Copyright © 2025 - All right reserved</p>
				</div>
				<div>
					<span className="footer-title">Informações</span>
					<Link
						href="/about-us"
						className="link link-hover">
						Sobre nós
					</Link>
					<Link
						href="/faqs"
						className="link link-hover">
						FAQs
					</Link>
				</div>
				<div>
					<span className="footer-title">Legal</span>
					<Link
						href="/privacy-policy"
						className="link link-hover">
						Politica de privacidade
					</Link>
					<Link
						href="/terms-and-conditions"
						className="link link-hover">
						Termos e condições
					</Link>
				</div>
				<div>
					<span className="footer-title">Social</span>
					<div className="grid grid-flow-col gap-4">
						<Link
							href="/"
							target="_blank">
							<FaFacebookF size={22} />
						</Link>

						<Link
							href="/"
							target="_blank">
							<FaInstagram size={22} />
						</Link>

						<Link
							href="/"
							target="_blank">
							<FaTwitter size={22} />
						</Link>
					</div>
				</div>
			</footer>
		</div>
	);
}
