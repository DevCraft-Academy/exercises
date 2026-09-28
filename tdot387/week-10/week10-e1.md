Fehler, die aufgefallen sind:

1. Username und Passwort sind nicht ausgelagert und unverschlüsselt im Code sichtbar
2. In der Login-Route werden SQL-Befehle direkt eingefügt, hier ist SQL-Injection möglich
3. Unzureichendes Error-Handling
4. Username und Userdata können von jedem User aufgerufen werden