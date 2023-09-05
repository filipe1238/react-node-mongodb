const express = require("express");
const { app } = require("./server");
const request = require("supertest")(app);
const db = require("./dataBase/DB.js");

describe("server", () => {
  const repository = db.getRepository("users");

  beforeAll(async () => {
    await db.connect();
  });

  afterAll(async () => {
    console.log("Closing server");
    await db.getClient().close();
    await request.post("/shutdown");
  });

  beforeEach(async () => {
    await repository.deleteAll();
  });

  test("GET /users", async () => {
    const response = await request.get("/api/v1/users");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);

    //criar um usuário
    const user = {
      name: "Teste",
      username: "teste",
      email: "test@test.com",
      password: "123456",
    };

    await repository.create(user);
    const id = user._id.toString();
    const response2 = await request.get(`/api/v1/users/${id}`);
    expect(response2.status).toBe(200);
    expect(response2.body.name).toBe(user.name);
  });

  test("POST /users", async () => {
    const user = {
      name: "Teste",
      username: "teste",
      email: "test@test.com",
      password: "123456",
    };

    const response = await request.post("/api/v1/users").send(user);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(user.name);
    expect(response.body.username).toBe(user.username);
    expect(response.body.email).toBe(user.email);
    expect(response.body.password).toBe(user.password);
  });

  /**
   *  1 - Status Code = 200 (OK)
   */
  test("GET /users/:id - evento existente", async () => {
    const user = {
      name: "Teste",
      username: "teste",
      email: "test@test.com",
      password: "123456",
    };

    const response = await request.post("/api/v1/users").send(user);
    const id = response.body.id;
    const userFound = await request.get(`/api/v1/users/${id}`);
    expect(userFound.status).toBe(200);
  });
  

  
  /**
   * 2 - Status Code = 404 (Not Found)
   *
   */
    test('GET /users/:id - evento inexistente', async () => {
      const user = {
        name: "Teste",
        username: "teste",
        email: "test@test.com",
        password: "123456",
      };

      const response = await request.post("/api/v1/users").send(user);
      const id = response.body.id;
      const idDiferente = id + '123';
      const userFound = await request.get(`/api/v1/users/${idDiferente}`);
      expect(userFound.status).toBe(404);
    });

    
    test('PUT /users/:id - evento existente', async () => {
      const user = {
        name: "Teste",
        username: "teste",
        email: "test@test.co",
        password: "123456",
      };

      const response = await request.post("/api/v1/users").send(user);
      const id = response.body.id;

      //put
      const userUpdated = {
        name: "Teste",
        username: "teste",
        email: "test@test.com",
        password: "123456",
      };
      
      const response2 = await request.put(`/api/v1/users/${id}`).send(userUpdated);
      expect(response2.status).toBe(200);

      //get
      const userFound = await request.get(`/api/v1/users/${id}`);
      expect(userFound.status).toBe(200);
      expect(userFound.body.email).toBe(userUpdated.email);
      
      // get 404 
      const idDiferente = id + '123';
      const userFound2 = await request.get(`/api/v1/users/${idDiferente}`);
      expect(userFound2.status).toBe(404);
    });
    

    
    test('DELETE /users/:id - evento existente', async () => {
      const user = {
        name: "Teste",
        username: "teste",
        email: "test@test.com",
        password: "123456",
      };

      const response = await request.post("/api/v1/users").send(user);
      const id = response.body.id;

      //delete
      const response2 = await request.delete(`/api/v1/users/${id}`);
      expect(response2.status).toBe(200);

      //get
      const userFound = await request.get(`/api/v1/users/${id}`);
      expect(userFound.status).toBe(404);
    });

    test('DELETE /users/:id - evento inexistente', async () => {
      const user = {
        name: "Teste",
        username: "teste",
        email: "test@test.com",
        password: "123456",
      };

      const response = await request.post("/api/v1/users").send(user);
      const id = response.body.id;
      const idDiferente = id + '123';

      //delete
      const response2 = await request.delete(`/api/v1/users/${idDiferente}`);
      expect(response2.status).toBe(404);

    });
});
