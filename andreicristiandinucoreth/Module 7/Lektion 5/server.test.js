const request = require('supertest');
const app = require('./server');  // Der Pfad zu deiner Express-App

// Bug 1
test('Adding new book should result in consistent ID', async () => {
const newBook = {title: 'New Book', author: 'New Author'};
const response = await request(app).post('/book').send(newBook);
expect(response.status).toBe(200);
expect(response.body).toEqual({ ...newBook, id: 3});
})

// Bug 2
test('Delete non-existing book should return 404', async () => {
  const response = await request(app).delete('/book/999'); // Assuming 999 doesn't exist
  expect(response.status).toBe(404);
  expect(response.text).toBe('Buch nicht gefunden');
});

// Bug 3
test('After adding book, book list should be retrievable and should contain the new book', async () => {
    const newBook = { title: 'New Book', author: 'New Author' };
    const response = await request(app).post('/book').send(newBook);
    expect(response.status).toBe(200);
    const newBookResponse = response.body;
    const list = await request(app).get('/books');
    expect(list.status).toBe(200);
    expect(list.body).toContainEqual(newBookResponse);
})

// Bug 4
test('Book with empty title or author should return 400', async () => {
    const response = await request(app).post('/book').send({ title: '', author: 'Author' });
    expect(response.status).toBe(400);
    expect(response.text).toBe('Titel oder Autor fehlt');
    });


// Bug 5
test('Should only respond once if a book without author is added', async () => {
    const response = await request(app).post('/book').send({ title: 'Neues Buch' });
    expect(response.status).toBe(400);
    expect(response.text).toBe('Titel oder Autor fehlt');
});