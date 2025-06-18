import { spawn } from 'child_process';
import http from 'http';

export default async function globalSetup(): Promise<void> {
    console.log('\nIniciando servidor...\n');

    // 1) Dropa, reaplica migrações e roda seed (via package.json)
    await new Promise<void>((resolve, reject) => {
        const migrate = spawn('npx', ['prisma', 'migrate', 'reset', '--force'], { stdio: 'inherit' });
        //{ stdio: ['ignore', 'pipe', 'pipe'] }
        migrate.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`prisma reset falhou (${code})`))));
    });

    // 2) Sobe o server
    const serverProcess = spawn('npm', ['run', 'dev:silent'], { stdio: 'ignore' });
    serverProcess.on('error', (err) => {
        console.error('Erro ao iniciar serverProcess:', err);
        process.exit(1);
    });

    // 3) Espera ele ficar up
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
