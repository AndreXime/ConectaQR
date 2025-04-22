export default async function () {
	await fetch('http://localhost:3001/shutdown', { method: 'POST' });
}
