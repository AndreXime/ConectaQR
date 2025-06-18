import request from 'supertest';

describe('Testando registrar uma empresa', () => {
    it('Deve responder com sucesso se dados forem validos ao registro', async () => {
        const response = await request('http://localhost:4000')
            .post('/empresa/registro')
            .send({
                email: 'novaconta@example.com',
                senha: 'senha123',
                nome: 'empresaNova' + Date.now(),
                descricao: 'Descrição da nova empresa',
            });
        expect(response.status).toBe(200);
        expect(response.headers['set-cookie']).toBeDefined();
        // Verifica se o cookie possui algum valor
        expect(response.headers['set-cookie'][0]).toMatch(/^[^=]+=[^;]+/);
    });

    it('Deve responder com erro se existir uma empresa com esse nome ou email', async () => {
        const response = await request('http://localhost:4000').post('/empresa/registro').send({
            email: 'amazon@example.com',
            senha: 'senha123',
            nome: 'amazon', // já existe na seed
            descricao: 'Empresa já existente',
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain('já existe');
    });

    it('Deve responder que falta campo a serem preenchidos', async () => {
        const response = await request('http://localhost:4000').post('/empresa/registro').send({
            email: 'semnome@example.com',
            senha: 'senha123',
            // nome ausente
            descricao: 'Falta nome nessa empresa',
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain('Erros na validação no dados enviados');
    });
});

describe('Testando login de empresa', () => {
    it('Deve fazer login com sucesso com credenciais válidas', async () => {
        const response = await request('http://localhost:4000').post('/empresa/login').send({
            email: 'amazon@email.com', // deve existir no banco
            senha: 'senha123',
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Conta logada com sucesso');
        expect(response.headers['set-cookie']).toBeDefined();
        expect(response.headers['set-cookie'][0]).toMatch(/token=[^;]+/);
    });

    it('Deve falhar ao logar com email incorreto', async () => {
        const response = await request('http://localhost:4000').post('/empresa/login').send({
            email: 'emailinvalido@example.com',
            senha: 'senha123',
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Credenciais inválidas');
    });

    it('Deve falhar ao logar com senha incorreta', async () => {
        const response = await request('http://localhost:4000').post('/empresa/login').send({
            email: 'amazon@example.com',
            senha: 'senhaErrada',
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Credenciais inválidas');
    });

    it('Deve falhar se campos obrigatórios não forem enviados', async () => {
        const response = await request('http://localhost:4000').post('/empresa/login').send({
            email: 'amazon@example.com',
            // senha ausente
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain('Erros na validação');
    });
});
