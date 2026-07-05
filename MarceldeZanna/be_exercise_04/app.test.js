const request = require('supertest');
const app = require('./app');
const { describe } = require('node:test');

describe('GET /books', () => {
  it('sollte eine Liste von Büchern als JSON zurückgeben', async () => {
    const response = await request(app)
      .get('/books')
      .expect('Content-Type', /json/) 
      .expect(200); 
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
 
    expect(response.body[0]).toMatchObject({
      id: 1,
      title: '1984',
      author: 'George Orwell'
    });
  });

});

describe('GET /book/:id', () => {
  it('sollte ein vorhandenes Buch mit dem erwarteten Format zurückgeben', async () => {
    const response = await request(app)
      .get('/book/1')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toEqual({
      id: 1,
      title: '1984',
      author: 'George Orwell'
    });
  });

  it('sollte eine Meldung zurückgeben, wenn kein Buch gefunden wurde', async () => {
    const response = await request(app)
      .get('/book/999')
      .expect(404);

    expect(response.text).toBe('Buch nicht gefunden');
  });
});