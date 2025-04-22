import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';
import { config } from 'dotenv';

config();

const ARGON_SECRET = Buffer.from(process.env.ARGON2_KEY || '123');

const prisma = new PrismaClient();
const { categoria, empresa, produto } = prisma;

async function main() {
	await produto.deleteMany({ where: {} });
	await categoria.deleteMany({ where: {} });
	await empresa.deleteMany({ where: {} });

	/* Um exemplo de uma empresa completa e uma vazia */
	const senha = await argon2.hash('senha123', {
		type: argon2.argon2id,
		memoryCost: 3 * 1024,
		timeCost: 3,
		parallelism: 1,
		secret: ARGON_SECRET,
	});

	const [empresaCriada] = await empresa.createManyAndReturn({
		data: [
			{
				nome: 'amazon',
				email: 'amazon@email.com',
				senha: senha,
				descricao: 'descricao',
				telefone: '123456789',
				instagram: 'instagram',
				emailContato: 'emailemail',
			},
			{
				nome: 'apple',
				email: 'apple@email.com',
				senha: senha,
				descricao: 'descricao',
			},
		],
	});
	const [Categoria, Categoria2, Categoria3] = await categoria.createManyAndReturn({
		data: [
			{ nome: 'Categoria', empresaId: empresaCriada.id },
			{ nome: 'Categoria2', empresaId: empresaCriada.id },
			{ nome: 'Categoria3', empresaId: empresaCriada.id },
		],
		select: { id: true },
	});
	await produto.createMany({
		data: Array.from({ length: 30 }, (_, i) => ({
			nome: `Produto${i + 1}`,
			preco: `${i + 10}`,
			imagemUrl: `http://localhost:4000/uploads/placeholder/produto${[1, 2, 3][i % 3]}.webp`,
			categoriaId: [Categoria.id, Categoria2.id, Categoria3.id][i % 3], // Alternando entre categorias
			empresaId: empresaCriada.id,
		})),
	});
}
try {
	await main();
	console.log('Seed ocorreu com sucesso');
} catch (err) {
	console.log(err);
	console.log('Ocorreu um erro na seed mas o processo continuara');
}

await prisma.$disconnect();
