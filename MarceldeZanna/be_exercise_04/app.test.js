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

describe('POST /book', () => {
  it('sollte ein neues Buch anlegen und es zurückgeben', async () => {
    const newBook = {
      title: 'Der kleine Prinz',
      author: 'Antoine de Saint-Exupéry'
    };

    const response = await request(app)
      .post('/book')
      .send(newBook)
      .expect(201)
      .expect('Content-Type', /json/);

    expect(response.body).toMatchObject({
      title: 'Der kleine Prinz',
      author: 'Antoine de Saint-Exupéry'
    });
    expect(response.body).toHaveProperty('id');
  });

  it('sollte 400 melden, wenn Titel fehlt', async() => {
    await request(app)
      .post('/book')
      .send({author: 'Author'})
      .expect(400);
  })
});

describe('DELETE /book/:id', () => {
  it('sollte prüfen ob Bücher vorhanden sind und das erste Element entfernen', async () => {
    const newBook = {
      title: 'Der Test',
      author: 'Testi der Tester',
    };

    const postResponse = await request(app)
      .post('/book')
      .send(newBook)
      .expect(201)
      .expect('Content-Type', /json/);

    const deleteResponse = await request(app)
      .delete(`/book/${postResponse.body.id}`)
      .expect(201);

    expect(deleteResponse.text).toBe('Buch erfolgreich entfernt');
  })
})