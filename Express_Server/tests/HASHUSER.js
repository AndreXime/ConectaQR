import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';
const prisma = new PrismaClient();

const ARGON_SECRET = Buffer.from(process.env.ARGON2_KEY || '123');

async function hashSenhasEmpresas() {
	const empresas = await prisma.empresa.findMany({
		select: { id: true, senha: true },
	});

	for (const empresa of empresas) {
		const senhaHasheada = await argon2.hash(empresa.senha, {
			type: argon2.argon2id,
			memoryCost: 3 * 1024,
			timeCost: 3,
			parallelism: 1,
			secret: ARGON_SECRET,
		});

		await prisma.empresa.update({
			where: { id: empresa.id },
			data: { senha: senhaHasheada },
		});

		console.log(`Senha atualizada para empresa ID: ${empresa.id}`);
	}

	console.log('Todas as senhas foram atualizadas.');
}

hashSenhasEmpresas()
	.catch((e) => {
		console.error('Erro ao atualizar senhas:', e);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
