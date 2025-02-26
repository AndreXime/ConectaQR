const request = require("supertest");

describe("Testando pegar informações de empresas publicas", () => {
  it("Deve responder com array de empresas se não passar query", async () => {
    const response = await request("http://localhost:4000").get("/empresas");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: expect.arrayContaining([
        expect.objectContaining({
          nome: expect.any(String),
          descricao: expect.any(String)
        })
      ])
    });
  });

  it("Deve responder com objeto de uma unica empresa se passar query", async () => {
    const response = await request("http://localhost:4000").get("/empresas?nome=amazon");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        nome: expect.any(String),
        descricao: expect.any(String),
        tema: expect.any(String),
        maps: expect.toBeOneOf([expect.any(String), null]), // Aceita String ou null
        instagram: expect.toBeOneOf([expect.any(String), null]),
        emailContato: expect.toBeOneOf([expect.any(String), null]),
        telefone: expect.toBeOneOf([expect.any(String), null])
      })
    );
  });

  it("Deve responder que não existe empresa se invalido", async () => {
    const response = await request("http://localhost:4000").get("/empresas?nome=naoexiste");

    expect(response.status).toBe(404);
  });
});
