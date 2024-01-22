const request = require('supertest');
const app = require('../app');
require('../models');

let id;

test('GET /directors obtiene todos los directores', async () => {
    const res = await request(app).get('/directors')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
});

test("POST /directors debe agregar un director", async () => {
    const newDirector = {
        firstName: "test",
        lastName: "director",
        nationality: "Mexico",
        image:"https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
        birthday:"1993-08-06"
    }
    const res = await request(app).post('/directors').send(newDirector);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(newDirector.name);
});

test("GET /directors/:id debe traer un director por id", async () => {
    const res = await request(app).get(`/directors/${id}`);
    expect(res.status).toBe(200);
});

test("PUT /adirectors/:id debe actualizar un director", async () => {
    const director = {
        firstName: "Test",
    }
    const res = await request(app).put(`/directors/${id}`).send(director);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(director.name);
})

test("DELETE /directors/:id debe eliminar un director", async () => {
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204);
});