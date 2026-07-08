1. Buchtitel abrufen - Ermittle die Titel aller Bücher.

SELECT DISTINCT title
FROM books;

2. Nach Genre filtern - Ermittle die Titel und Autor:innen aller Bücher im Genre „Science fiction”.

SELECT  title, author, genre
FROM books
WHERE genre = 'Science fiction';

3. Preisspanne - Ermittle die Titel und Preise von Büchern, die zwischen 10,00 € und 15,00 € kosten.

SELECT  title, price
FROM books
WHERE price > '10' AND price < '15'
ORDER BY price
ASC;

4. Nach Erscheinungsjahr sortieren - Ermittle die Titel, Autor:innen und Erscheinungsjahre aller Bücher, sortiert in aufsteigender Reihenfolge nach Erscheinungsjahr.

SELECT  title, author, publishyear
FROM books
ORDER BY publishyear
ASC;

5. Autor:in suchen - Ermittle die Titel und Erscheinungsjahre von Büchern, die von „Olivia Brown” geschrieben wurden.

SELECT  title, publishyear, author
FROM books
WHERE author = 'Olivia Brown'
ORDER BY publishyear
ASC;

!!! Existiert nicht

6. Einzigartige Genres finden - Ermittle die Genres. Jedes Genre soll nur einmal im Ergebnis vorkommen.

SELECT  DISTINCT genre
FROM books
ORDER BY genre
ASC;




| id | title                        | author                  | genre             | publishyear | price |
|----|------------------------------|-------------------------|-------------------|------------|------:|
| 1  | Let Us Now Praise Famous Men | Sylvester Reilly        | Science fiction   | 2004       | 7.60  |
| 2  | Antic Hay                    | The Hon. Micah Olson    | Speech            | 1978       | 19.56 |