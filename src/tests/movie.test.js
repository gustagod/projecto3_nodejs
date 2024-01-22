const request = require('supertest');
const app = require('../app');
const Actor=require('../models/Actor');
const Director=require('../models/Director');
const Genre=require('../models/Genre');
require('../models');

let id;

test('GET /movies obtiene todas las peliculas', async () => {
    const res = await request(app).get('/movies')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
    
});

test("POST /movies debe agregar una pelicula", async () => {
    const newMovie = {
        name: "test",
        image:"https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
        synopsis:"test",
        releaseYear:2023
    }
    const res = await request(app).post('/movies').send(newMovie);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(newMovie.name);
});

test("GET /movies/:id debe traer una pelicula por id", async () => {
    const res = await request(app).get(`/movies/${id}`);
    expect(res.status).toBe(200);
});

test("PUT /movies/:id debe actualizar una pelicula", async () => {
    const movie = {
        name: "Test",
    }
    const res = await request(app).put(`/movies/${id}`).send(movie);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movie.name);
})

test('POST /movies/:id/genres debe insertar los géneros de una pelicula', async () => {
    const genre = await Genre.create({
      name: 'genre test',
    });
    const res = await request(app)
      .post(`/movies/${id}/genres`)
      .send([ genre.id ]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });


  test('POST /movies/:id/actors debe insertar los actores de una pelicula', async () => {
    const actor = await Actor.create({
        firstName: "test",
        lastName: "actor",
        nationality: "Mexico",
        image:"https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
        birthday:"1993-08-06"
    });
    const res = await request(app)
      .post(`/movies/${id}/actors`)
      .send([ actor.id ]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });

  test('POST /movies/:id/directors debe insertar los directores de una pelicula', async () => {
    const director = await Director.create({
        firstName: "test",
        lastName: "director",
        nationality: "Mexico",
        image:"https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
        birthday:"1993-08-06"
    });
    const res = await request(app)
      .post(`/movies/${id}/directors`)
      .send([ director.id ]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });


test("DELETE /movies/:id debe eliminar una pelicula", async () => {
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
});