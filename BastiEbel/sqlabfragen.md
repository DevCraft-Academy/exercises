Buch Titel abrufen:
SELECT titel FROM books

nach Genre filtern:
SELECT title, author FROM books WHERE genre = 'Programming Language';

Preisspanne:
SELECT title, price FROM books WHERE price BETWEEN 10.00 AND 15.00;

nach Erscheinungsjahr sortieren:
SELECT title, author, year FROM books ORDER BY year ASC;

Autor:in suchen:
SELECT title, publication_year FROM books WHERE author = 'Maximilian Schwarzmüller';

Einzigartige Genres finden:
SELECT DISTINCT genre FROM books;
