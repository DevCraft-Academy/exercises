const resetDB = () => {
  books = [
    { id: 1, title: '1984', author: 'George Orwell' },
    { id: 2, title: 'Brave New World', author: 'Aldous Huxley' },
  ];
  nextId = 3;
};

resetDB();

const getAllBooks = () => {
  return books;
};
const getBookById = (id) => books.find((b) => b.id === id);
const addBook = (title, author) => {
  books.sort((a, b) => a.id - b.id);
  const lastId = books.length > 0 ? Number(books[books.length - 1].id) : 0;
  const newBook = { id: lastId + 1, title, author };
  books.push(newBook);
  return newBook;
};
const deleteBookById = (id) => {
  const index = books.findIndex((b) => b.id === id);
  if (index === -1) return false;
  books.splice(index, 1);
  return true;
};

module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  deleteBookById,
  resetDB,
};
