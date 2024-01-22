const request = require('supertest');
const app = require('../app');
require('../models');

let id;

test('GET /actors obtiene todos los actores', async () => {
    const res = await request(app).get('/actors')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
});

test("POST /actors debe agregar un actor", async () => {
    const newActor = {
        firstName: "test",
        lastName: "actor",
        nationality: "Mexico",
        image:"https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
        birthday:"1993-08-06"
    }
    const res = await request(app).post('/actors').send(newActor);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(newActor.name);
});

test("GET /actors/:id debe traer un actor por id", async () => {
    const res = await request(app).get(`/actors/${id}`);
    expect(res.status).toBe(200);
});

test("PUT /actors/:id debe actualizar un actor", async () => {
    const actor = {
        firstName: "Test",
    }
    const res = await request(app).put(`/actors/${id}`).send(actor);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(actor.name);
})

test("DELETE /actors/:id debe eliminar un actor", async () => {
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204);
});
