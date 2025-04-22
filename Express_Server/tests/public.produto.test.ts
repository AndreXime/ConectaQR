import request from 'supertest';

describe('Testando pegar informações de produtos publicas', () => {
	it('Deve responder que empresas não existe', async () => {
		const response = await request('http://localhost:4000').get('/produto/naoexiste');

		expect(response.status).toBe(404);
	});

	it('Deve responder com array de produtos de uma empresa', async () => {
		let response = await request('http://localhost:4000').get('/produto/amazon');

		expect(response.status).toBe(200);
		expect(response.body).toEqual(
			expect.objectContaining({
				data: {
					categorias: expect.arrayContaining([
						{
							nome: expect.any(String),
						},
					]),
					produtos: expect.arrayContaining([
						{
							imagemUrl: expect.any(String),
							nome: expect.any(String),
							preco: expect.any(String),
							categoria: {
								nome: expect.any(String),
							},
						},
					]),
				},
				pagination: {
					PaginaAtual: expect.any(Number),
					PaginasTotais: expect.any(Number),
					ProdutosTotal: expect.any(Number),
					limitePorPagina: expect.any(Number),
				},
				tema: expect.any(String),
			})
		);
	});

	it('Deve responder com array vazio mas sem erro sem empresa não tiver produtos', async () => {
		const response = await request('http://localhost:4000').get('/produto/apple');

		expect(response.status).toBe(200);
		expect(response.body).toEqual(
			expect.objectContaining({
				data: {
					categorias: expect.arrayContaining([]),
					produtos: expect.arrayContaining([]),
				},
				pagination: {
					PaginaAtual: expect.any(Number),
					PaginasTotais: expect.any(Number),
					ProdutosTotal: expect.any(Number),
					limitePorPagina: expect.any(Number),
				},
				tema: expect.any(String),
			})
		);
	});
});
