import request from 'supertest';
import path from 'path';

const server = 'http://localhost:4000';

describe('Testando rotas privadas para Empresa, Categoria e Produto', () => {
	let cookie: string[];
	let categoryId: string;
	let productId: string;
	const uniqueSuffix = Date.now();
	const email = `test${uniqueSuffix}@example.com`;
	const password = 'senha123';
	const nomeEmpresa = `empresaTeste${uniqueSuffix}`;
	const updatedNome = `empresaAtualizada${uniqueSuffix}`;
	const updatedEmail = `testAtualizado${uniqueSuffix}@example.com`;

	beforeAll(async () => {
		const res = await request(server)
			.post('/empresa/registro')
			.send({ email, senha: password, nome: nomeEmpresa, descricao: 'descricao de teste privado' });
		expect(res.status).toBe(200);
		const rawSetCookie = res.headers['set-cookie'];
		expect(rawSetCookie).toBeDefined();
		// Extract only the token cookie (remove attributes)
		const cookieHeader = Array.isArray(rawSetCookie) ? rawSetCookie[0] : rawSetCookie;
		const tokenCookie = cookieHeader.split(';')[0];
		cookie = [tokenCookie];
	});

	it('Deve autenticar empresa existente com login', async () => {
		const res = await request(server).post('/empresa/login').send({ email, senha: password });
		expect(res.status).toBe(200);
		expect(res.headers['set-cookie']).toBeDefined();
	});

	it('Deve retornar erro para login com credenciais invalidas', async () => {
		const res = await request(server).post('/empresa/login').send({ email: 'invalid@example.com', senha: 'wrongpass' });
		expect(res.status).toBe(400);
		expect(res.body).toHaveProperty('message');
		expect(res.body.message).toContain('Credenciais inválidas');
	});

	it('Deve obter dados da empresa autenticada', async () => {
		const res = await request(server).get('/empresa').set('Cookie', cookie);
		expect(res.status).toBe(200);
		expect(res.body).toEqual(
			expect.objectContaining({
				message: 'Sucesso',
				data: expect.objectContaining({
					nome: nomeEmpresa.toLowerCase().replace(/\s+/g, '-'),
					descricao: 'descricao de teste privado',
					produtos: expect.arrayContaining([]),
					categorias: expect.arrayContaining([]),
				}),
			})
		);
	});

	it('Deve atualizar dados da empresa', async () => {
		const res = await request(server)
			.patch('/empresa')
			.set('Cookie', cookie)
			.send({ nome: updatedNome, email: updatedEmail });
		expect(res.status).toBe(200);
		expect(res.body).toEqual(
			expect.objectContaining({
				message: 'Atualizado com sucesso',
				data: expect.objectContaining({
					nome: updatedNome.toLowerCase().replace(/\s+/g, '-'),
					email: updatedEmail,
				}),
			})
		);
	});

	it('Deve criar uma nova categoria', async () => {
		const res = await request(server).post('/categoria').set('Cookie', cookie).send({ nome: 'CategoriaTeste' });
		expect(res.status).toBe(200);
		expect(res.body).toEqual(
			expect.objectContaining({
				message: 'Categoria adicionado!',
				data: expect.objectContaining({
					id: expect.any(String),
					nome: 'CategoriaTeste',
				}),
			})
		);
		categoryId = res.body.data.id;
	});

	it('Deve atualizar a categoria', async () => {
		const res = await request(server)
			.patch('/categoria')
			.set('Cookie', cookie)
			.send({ categoriaId: categoryId, nome: 'CategoriaAtualizada' });
		expect(res.status).toBe(200);
		expect(res.body).toEqual(
			expect.objectContaining({
				message: 'Atualizado com sucesso',
				data: expect.objectContaining({
					id: categoryId,
					nome: 'CategoriaAtualizada',
				}),
			})
		);
	});

	it('Deve recusar apagar categoria quando ids forem iguais', async () => {
		const res = await request(server)
			.delete('/categoria')
			.set('Cookie', cookie)
			.send({ id: categoryId, newId: categoryId });
		expect(res.status).toBe(400);
		expect(res.body).toEqual({ message: 'Os ids passado são iguais!' });
	});

	it('Deve criar um novo produto', async () => {
		const imgPath = path.resolve('tests', 'fixtures', 'produto1.webp');
		const res = await request(server)
			.post('/produto')
			.set('Cookie', cookie)
			.field('nome', 'ProdutoTeste')
			.field('preco', '10')
			.field('categoriaId', categoryId)
			.attach('imagem', imgPath);
		expect(res.status).toBe(200);
		expect(res.body).toEqual(
			expect.objectContaining({
				message: 'Produto adicionado!',
				data: expect.objectContaining({
					id: expect.any(String),
					nome: 'ProdutoTeste',
					preco: '10',
					categoria: expect.objectContaining({ nome: expect.any(String) }),
					imagemUrl: expect.any(String),
				}),
			})
		);
		productId = res.body.data.id;
	});

	it('Deve atualizar o produto sem fornecer nova imagem', async () => {
		const res = await request(server)
			.patch('/produto')
			.set('Cookie', cookie)
			.field('produtoId', productId)
			.field('nome', 'ProdutoAtualizado')
			.field('preco', '15')
			.field('categoriaId', categoryId);
		expect(res.status).toBe(200);
		expect(res.body).toEqual(
			expect.objectContaining({
				message: 'Produto atualizado com sucesso',
				data: expect.objectContaining({
					id: productId,
					nome: 'ProdutoAtualizado',
					preco: '15',
					categoria: expect.objectContaining({ nome: expect.any(String) }),
				}),
			})
		);
	});

	it('Deve remover o produto', async () => {
		const res = await request(server).delete(`/produto/${productId}`).set('Cookie', cookie);
		expect(res.status).toBe(200);
		expect(res.body).toEqual({ message: 'Produto removido com sucesso' });
	});

	it('Deve remover a empresa', async () => {
		const res = await request(server).delete('/empresa').set('Cookie', cookie);
		expect(res.status).toBe(200);
		expect(res.body).toEqual({ message: 'Sucesso' });
	});
});

describe('Testando acesso sem autenticação nas rotas privadas', () => {
	it('Deve retornar 401 ao acessar GET /empresa sem cookie', async () => {
		const res = await request(server).get('/empresa');
		expect(res.status).toBe(401);
		expect(res.body).toEqual({ message: 'Não autenticado' });
	});

	it('Deve retornar 401 ao criar categoria sem cookie', async () => {
		const res = await request(server).post('/categoria').send({ nome: 'X' });
		expect(res.status).toBe(401);
		expect(res.body).toEqual({ message: 'Não autenticado' });
	});
});
