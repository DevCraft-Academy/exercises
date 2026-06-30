const request = require('supertest');
const app = require('./app')

describe('GET /books', () => {
    it('fetch books', async () => {
        const res = await request(app)
        .get('/books')
        .expect('Content-Type', /json/)
        .expect(200);
    })
})


//AI Lösung
describe('GET /books', () => {
  it('sollte eine Liste von Büchern als JSON zurückgeben', async () => {
    const response = await request(app)
      .get('/books')
      .expect('Content-Type', /json/) // Prüft, ob der Header 'application/json' enthält
      .expect(200); // Prüft auf Status Code 200
    // Den Inhalt des Bodys prüfen
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
 
   // Spezifische Inhalte prüfen (Beispiel: Erstes Buch)
    expect(response.body[0]).toMatchObject({
      id: 1,
      title: '1984',
      author: 'George Orwell'
    });
  });
  it('sollte ein bestimmtes Schema einhalten', async () => {
    const response = await request(app).get('/books');
 
    // Prüfen, ob jedes Objekt die richtigen Felder hat
    response.body.forEach(book => {
      expect(book).toHaveProperty('id');
      expect(book).toHaveProperty('title');
      expect(book).toHaveProperty('author');
    });
  });
});