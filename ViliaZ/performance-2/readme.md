
### Aufgabe 1: Einfaches In-Memory-Caching

1.  Erstelle eine einfache Webseite, die auf Knopfdruck eine Webanfrage an eine öffentliche API macht ([Wie wäre es mit Bildern von Füchsen?](https://randomfox.ca/floof/))
    
2.  Implementiere ein einfaches In-Memory-Cache, um die abgerufenen Daten zu speichern.
    
3.  Wenn der Nutzer dieselbe URL erneut anfragt, hole die Daten aus dem Cache, anstatt eine neue Netzwerkanfrage zu machen.
    
    

### Aufgabe 2: Cache-Verfallszeit

1.  Verbessere deinen Caching-Mechanismus, indem du eine Verfallszeit zu den gecachten Elementen hinzufügst
    
2.  Setze eine angemessene Verfallszeit für die gecachten Daten (z.B. 5 Minuten).
    
3.  Wenn die gecachten Daten älter als die Verfallszeit sind, hole sie erneut vom Server.
    
    

### Aufgabe 3: Anzeige gecachter Daten

1.  Zeige die abgerufenen Daten auf der Webseite an.
    
2.  Wenn die Daten aus dem Cache abgerufen werden, füge einen visuellen Indikator hinzu, um zu zeigen, dass sie aus dem Cache kommen (z.B. ändere die Hintergrundfarbe).
    
    

### Aufgabe 4: Fehlerbehandlung

1.  Implementiere eine Fehlerbehandlung für fehlgeschlagene Netzwerkanfragen.
    
2.  Wenn eine Anfrage fehlschlägt, überprüfe, ob die Daten im Cache verfügbar sind, und zeige sie an.
    
3.  Biete eine benutzerfreundliche Nachricht für fehlgeschlagene Anfragen.
    