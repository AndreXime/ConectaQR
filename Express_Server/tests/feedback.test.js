const request = require("supertest");

describe("Testando /feedback", () => {
  it("Deve aceitar formulario de feedback", async () => {
    await request("http://localhost:4000")
      .post("/feedback")
      .send({ nome: "andre", email: "email@email", mensagem: "lore impsun" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("Deve recusar se falta algo", async () => {
    await request("http://localhost:4000")
      .post("/feedback")
      .send({ nome: "andre", mensagem: "lore impsun" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);
  });
});

describe("Testando /feedbackadmin", () => {
  it("Deve retornar o feedback com a senha correta", async () => {
    const response = await request("http://localhost:4000").get("/feedbackadmin?senha=senha123");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      Feedback: expect.arrayContaining([]),
      Request: expect.arrayContaining([])
    });
  });
  it("Deve recusar se a senha for incorreta", async () => {
    const response = await request("http://localhost:4000").get("/feedbackadmin?senha=senha12");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Senha incorreta" });
  });
});
