const request = require('supertest');
const app = require('../server.js');
const db = require('../database');

beforeEach(() => {
  db.resetDB();
});
const NON_EXISTING_ID = 100;

// helper functions
const getBooksSorted = async () => {
  const res = await request(app).get('/books');
  const books = [...res.body].sort((a, b) => a.id - b.id);
  return books;
};

const createBook = async (title, author) => {
  return request(app).post('/book').send({ title, author });
};
describe('GET /book/:id', () => {
  test('should return requested book via id', async () => {
    const response = await request(app).get(`/book/1`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      title: '1984',
      author: 'George Orwell',
    });
  });
  test('should return error when requested book does not exists', async () => {
    const response = await request(app).get(`/book/${NON_EXISTING_ID}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toEqual('Buch nicht gefunden');
  });
});

describe('POST /book', () => {
  test('A book can be added successfully, and the book list remains accessible afterwards', async () => {
    // Initial state
    const booksBefore = await getBooksSorted();
    const initialLength = booksBefore.length;

    // Create first book
    const res1 = await createBook('book one', 'author book one');
    expect(res1.status).toBe(200);

    const booksAfterFirst = await getBooksSorted();
    expect(booksAfterFirst.length).toBe(initialLength + 1);

    const firstNewBook = booksAfterFirst.at(-1);
    expect(firstNewBook).toMatchObject({
      title: 'book one',
      author: 'author book one',
    });

    // Create second book
    const res2 = await createBook('book two', 'author book two');
    expect(res2.status).toBe(200);

    const booksAfterSecond = await getBooksSorted();
    expect(booksAfterSecond.length).toBe(initialLength + 2);

    const secondNewBook = booksAfterSecond.at(-1);
    expect(secondNewBook).toMatchObject({
      title: 'book two',
      author: 'author book two',
    });

    // Ensure IDs are unique and increasing
    expect(secondNewBook.id).toBeGreaterThan(firstNewBook.id);
  });

  const invalidInputs = [
    { title: '', author: 'author book one', desc: 'missing title' },
    { title: 'book one', author: '', desc: 'missing author' },
    { title: '', author: '', desc: 'missing title and author' },
    { title: undefined, author: undefined, desc: 'undefined title and author' },
  ];

  invalidInputs.forEach(({ title, author, desc }) => {
    test(`should return error when ${desc}`, async () => {
      const booksBefore = await getBooksSorted();
      const response = await createBook(title, author);
      const booksAfter = await getBooksSorted();

      expect(response.status).toBe(400);
      expect(response.body.error).toEqual('Titel oder Autor fehlt');
      expect(booksAfter.length).toBe(booksBefore.length);
    });
  });
});

describe('DELETE /book/:id', () => {
  test('should return error when deleting a non-existent book', async () => {
    const response = await request(app).delete(`/book/${NON_EXISTING_ID}`);
    expect(response.status).toBe(404);
    expect(response.text).not.toBe('OK');
    expect(response.body.error).toEqual('Buch nicht gefunden');
  });

  test('deleting a non-existent book should not affect existing books', async () => {
    const booksBeforeDelete = await getBooksSorted();
    expect(booksBeforeDelete.length).toBeGreaterThan(0);

    const response = await request(app).delete(`/book/${NON_EXISTING_ID}`);
    const booksAfterDelete = await getBooksSorted();

    expect(response.status).toBe(404);
    expect(response.text).not.toBe('OK');
    expect(response.body.error).toEqual('Buch nicht gefunden');
    expect(booksBeforeDelete.length).toBe(booksAfterDelete.length);
  });
});
