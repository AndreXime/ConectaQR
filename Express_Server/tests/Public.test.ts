import request from 'supertest';
import 'jest-extended';

describe('Testando pegar informações de empresas publicas', () => {
	it('Deve responder com array de empresas no endpoint /empresas', async () => {
		const response = await request('http://localhost:4000').get('/empresas');

		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			data: expect.arrayContaining([
				expect.objectContaining({
					nome: expect.any(String),
					descricao: expect.any(String),
				}),
			]),
		});
	});

	it('Deve responder com objeto de uma única empresa no endpoint /empresa/:nome', async () => {
		const response = await request('http://localhost:4000').get('/empresa/amazon');

		expect(response.body).toEqual(
			expect.objectContaining({
				nome: expect.any(String),
				descricao: expect.any(String),
				tema: expect.any(String),
				maps: expect.toBeOneOf([expect.any(String), null]), // Aceita String ou null
				instagram: expect.toBeOneOf([expect.any(String), null]),
				emailContato: expect.toBeOneOf([expect.any(String), null]),
				telefone: expect.toBeOneOf([expect.any(String), null]),
			})
		);
		expect(response.status).toBe(200);
	});

	it('Deve responder com array de produtos de uma empresa no endpoint /produto/:empresa', async () => {
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

	it('Deve responder com array vazio se a empresa não tiver produtos no endpoint /produto/:empresa', async () => {
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

	it('Deve responder 404 quando empresa não existe no endpoint /empresa/:nome', async () => {
		const response = await request('http://localhost:4000').get('/empresa/naoexiste');

		expect(response.status).toBe(404);
	});

	it('Deve responder 404 quando empresa não existe no endpoint /produto/:empresa', async () => {
		const response = await request('http://localhost:4000').get('/produto/naoexiste');

		expect(response.status).toBe(404);
	});
});
