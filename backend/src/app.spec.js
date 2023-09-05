const server = require('./server');
const request = require('supertest');
const db = require("./dataBase/DB.js");
const EventRepository = require("./dataBase/repository.js");

describe('server', () => {
    let repository;

    beforeAll(async () => {
      const collection = db.getClient().db("testdb").collection("users")
      repository = new EventRepository(collection);
    });
  
    afterAll(async () => {
      await db.getClient().close();
    });
  
    beforeEach(async () => {
      await repository.deleteAll();
    });
    
    test('GET /users', async () => {
        //has router routerAPIv1
        const response = await request(server).get('/api/v1/users');
        expect(response.status).toEqual(200);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty('name');
    });

    todo('POST /users');

    todo('GET /users/:id - evento existente');
    todo('GET /users/:id - evento inexistente');

    todo('PUT /users/:id - evento existente');
    todo('PUT /users/:id - evento inexistente');

    todo('DELETE /users/:id - evento existente');
    todo('DELETE /users/:id - evento inexistente');
});
