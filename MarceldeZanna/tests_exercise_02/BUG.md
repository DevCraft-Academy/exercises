Function trim übergibt den falschen String (removes whitespace)
    -> Ausgabe 'hello  ' 
    -> Function sollte mit RegEx umgesetzt werden

Function Capitalize sollte den ersten Buchstaben gross schreiben, bei mehr wie einem Buchstaben tritt der Fehler auf.
   (capitalizes UPPERCASE correctly)
    -> Ausgabe 'HELLO'
    -> korrekt wäre 'Hello' -> ... str.slice(1).toLowerCase();

Function Slugify entfernt die Whitespaces nicht korrekt
    (works with multiple words)
    -> korrekt wäre: 
        return str.toLowerCase().replace(/\s+/g, '-')