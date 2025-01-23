'use client';
import { FaPhoneAlt } from 'react-icons/fa';
type Props = {
	Message: string[];
};

const Component = ({ Message }: Props) => {
	return (
		<>
			<button
				className={`btn btn-primary font-bold text-lg mb-2 ${Message ? ' ' : 'btn-disabled'}`}
				onClick={() => (document.getElementById('my_modal_1')! as HTMLDialogElement).showModal()}>
				<FaPhoneAlt /> Contato
			</button>
			<dialog
				id="my_modal_1"
				className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg text-center">Informações de contato</h3>
					<p className="py-4">
						{Message.map((value, index) => (
							<p key={index}>{value}</p>
						))}
					</p>
					<div className="modal-action">
						<form method="dialog">
							<button className="btn">Fechar</button>
						</form>
					</div>
				</div>
			</dialog>
		</>
	);
};
export default Component;
