Function trim übergibt den falschen String (removes whitespace)
    -> Ausgabe 'hello  ' 
    -> Original frägt nur ob das Ergebnis wahr ist
    -> Function sollte mit RegEx umgesetzt werden

Function Capitalize sollte den ersten Buchstaben gross schreiben, bei mehr wie einem Buchstaben tritt der Fehler auf.
   (capitalizes UPPERCASE correctly)
    -> Ausgabe 'HELLO'
    -> Prüft nur auf den ersten Buchstaben, somit werden die restlichen Falschen nicht erkannt
    -> korrekt wäre 'Hello' -> ... str.slice(1).toLowerCase();

Function Slugify entfernt die Whitespaces nicht korrekt
    (works with multiple words)
    -> Prüft nur ob ein '-' beinhaltet ist, nicht ob mehrere und korrekte Variante da ist
    -> korrekt wäre: 
        return str.toLowerCase().replace(/\s+/g, '-')