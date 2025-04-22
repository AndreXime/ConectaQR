import { PrismaClient } from '@prisma/client';
import { exec } from 'child_process';

const prisma = new PrismaClient();

// O deploy acontece se ter conexão com o banco
async function prismaDeploy() {
	exec('npx prisma migrate deploy', (error, stdout) => {
		if (error) {
			console.error(`Erro ao rodar migrate deploy: ${error.message}`);
			return;
		}
		console.log(`${stdout}\n`);
	});
}

async function connectWithRetry(maxRetries = 5, delay = 2500) {
	while (true) {
		try {
			await prisma.$connect(); // Tenta conectar ao banco de dados
			await prismaDeploy();
			console.log('Conexão com o banco de dados estabelecida com sucesso!\n');
			return prisma;
		} catch (error) {
			console.error(`Falha ao conectar ao banco de dados: ${error}\n`);
			maxRetries--;
			if (maxRetries === 0) {
				throw new Error('Não foi possível conectar ao banco de dados após várias tentativas.');
			}
			console.log(`Tentando novamente em ${delay / 1000} segundos...`);
			await new Promise((resolve) => setTimeout(resolve, delay)); // Aguarda antes de tentar novamente
		}
	}
}
await connectWithRetry();
const Empresa = prisma.empresa;
const Produtos = prisma.produto;
const Categoria = prisma.categoria;

export { Empresa, Produtos, Categoria };
