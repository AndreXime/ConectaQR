import { spawn } from 'child_process';
import http from 'http';

export default async function globalSetup(): Promise<void> {
	console.log('\nIniciando servidor...\n');

	await new Promise<void>((resolve, reject) => {
		const seed = spawn('npx', ['tsx', 'prisma/seed.ts'], { stdio: ['ignore', 'pipe', 'pipe'] });
		seed.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`Seed falhou (${code})`))));
	});

	const serverProcess = spawn('npm', ['run', 'dev:silent'], { stdio: 'ignore' });
	serverProcess.on('error', (err) => {
		console.error('Erro ao iniciar serverProcess:', err);
		process.exit(1);
	});

	// Espera o servidor estar disponível
	await waitForServer('http://localhost:4000');

	global.testServerProcess = serverProcess;
}

function waitForServer(url: string, timeout = 30000): Promise<void> {
	return new Promise((resolve, reject) => {
		const start = Date.now();

		const attempt = () => {
			const req = http.get(url, (res) => {
				// qualquer status conta como “up”
				res.destroy();
				resolve();
			});

			req.on('error', () => {
				if (Date.now() - start > timeout) {
					reject(new Error(`Server start timeout after ${timeout}ms`));
				} else {
					// aguarda um pouquinho e tenta de novo
					setTimeout(attempt, 500);
				}
			});
		};

		attempt();
	});
}
