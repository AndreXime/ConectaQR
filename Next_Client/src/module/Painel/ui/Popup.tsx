'use client';

import { useEffect, useRef } from 'react';

export type MessageType = { id: number; text: string; status: 'success' | 'error' };

type PopupProps = {
	messages: MessageType[];
	setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
};

export default function Popup({ messages, setMessages }: PopupProps) {
	const timers = useRef(new Map());

	useEffect(() => {
		const currentTimers = timers.current;

		// Processar apenas novas mensagens
		messages.forEach((message) => {
			if (!currentTimers.has(message.id)) {
				const timer = setTimeout(() => {
					setMessages((prev) => prev.filter((m) => m.id !== message.id));
					currentTimers.delete(message.id);
				}, 5000);

				currentTimers.set(message.id, timer);
			}
		});

		// Limpar timers de mensagens removidas
		const currentMessageIds = new Set(messages.map((m) => m.id));
		currentTimers.forEach((timer, id) => {
			if (!currentMessageIds.has(id)) {
				clearTimeout(timer);
				currentTimers.delete(id);
			}
		});
	}, [messages, setMessages]);

	return (
		<div className="toast toast-top toast-start">
			{messages.map((msg) => (
				<div
					key={msg.id}
					className={`alert animate-slideIn ${msg.status === 'success' ? 'alert-success' : 'alert-error'}`}>
					<span>{msg.text}</span>
				</div>
			))}
		</div>
	);
}
