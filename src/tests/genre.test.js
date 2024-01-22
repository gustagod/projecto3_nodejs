const request = require('supertest');
const app = require('../app');
require('../models');

let id;

test('GET /genres obtiene todos los generos', async () => {
    const res = await request(app).get('/genres')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
});

test("POST /genres debe agregar un genero", async () => {
    const newGenre = {
        name: "test",
    }
    const res = await request(app).post('/genres').send(newGenre);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(newGenre.name);
});

test("GET /genres/:id debe traer un genero por id", async () => {
    const res = await request(app).get(`/genres/${id}`);
    expect(res.status).toBe(200);
});

test("PUT /genres/:id debe actualizar un genero", async () => {
    const genre = {
        name: "Test",
    }
    const res = await request(app).put(`/genres/${id}`).send(genre);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(genre.name);
})

test("DELETE /genres/:id debe eliminar un genero", async () => {
    const res = await request(app).delete(`/genres/${id}`);
    expect(res.status).toBe(204);
});