const request = require('supertest');
const {app, books } = require('../d5.js');  // Der Pfad zu deiner Express-App

test('Should only respond once if a book without author is added', async () => {
  const response = await request(app).post('/book').send({ title: 'Neues Buch' });
  expect(response.status).toBe(404);
  // Hier könntest du auch andere Checks einbauen, z.B. die Response-Nachricht überprüfen
});

test('Should add unique id', async () => {
  const idArrayBefore = books.map(book => book.id);

  const response = await request(app)
    .post('/book')
    .send({ title: 'Neues Buch', author: 'Banana Joe' });

  const newId = response.body.id;
  expect(idArrayBefore.includes(newId)).toBe(false);  
  expect(response.status).toBe(201);
});

test('Should send correct status if book id is not valid when try to delete', async () => {
  const response = (await request(app).delete('/book/200'));
  expect(response.status).toBe(404);
});