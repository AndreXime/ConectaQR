'use client';
import { FaQuestionCircle } from 'react-icons/fa';
type Props = {
	Title: string;
	Message: { title?: string; message: string }[];
};

export default function Component({ Title, Message }: Props) {
	return (
		<>
			<button
				className={`cursor-pointer`}
				onClick={() => (document.getElementById('modal' + Title)! as HTMLDialogElement).showModal()}>
				<FaQuestionCircle
					color="blue"
					size={15}
				/>
			</button>
			<dialog
				id={'modal' + Title}
				className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg text-center">{Title}</h3>
					<div className="py-4">
						{Message.map((value, index) => (
							<p key={index}>
								<strong>{value.title}</strong> - {value.message}
							</p>
						))}
					</div>
					<div className="modal-action">
						<form method="dialog">
							<button className="btn">Fechar</button>
						</form>
					</div>
				</div>
			</dialog>
		</>
	);
}
