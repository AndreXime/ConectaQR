export default async function serverState() {
	let status = false;

	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, { cache: 'no-store' });
		status = res.ok ? true : false;
	} catch {
		status = false;
	}

	return (
		<div className="flex flex-row gap-2 font-bold">
			<div className="inline-grid *:[grid-area:1/1] text-xl">
				<div className={`status status-xl ${status ? 'status-success' : 'status-error'} animate-ping`}></div>
				<div className={`status status-xl ${status ? 'status-success' : 'status-error'}`}></div>
			</div>
			{status ? 'Servidor está operacional' : 'O servidor não está funcionando'}
		</div>
	);
}
