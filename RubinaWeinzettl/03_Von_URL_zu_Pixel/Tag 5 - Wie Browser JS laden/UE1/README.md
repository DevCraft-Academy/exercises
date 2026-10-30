Übungen "Von URL zu Pixel: Wie ein Browser funktioniert" - Tag 5
Wie Browser JavaScript laden

Übung 1 - JavaScript-Ladeprobleme beheben

Versuch 1:
index.html so umgeschrieben:
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JS Laden Problem</title>
    <script src="js/script1.js" async></script>  // braucht keine DOM Elemente also auf async gestellt zum schnelleren Laden
    <script src="js/script2.js" defer></script> // braucht DOM Elemente - von unten rauf geschoben und auf defer gestellt zum Schnelleren Laden
    <script src="js/script3.js" async></script> // war gar nicht inkludiert, daher hinzugefügt und auf async gestellt, da keine DOM Elemente benötigt werden
    <script>
      console.log("Inline script!")
    </script>
</head>
<body>
    <h1>Willkommen beim JS Lade-Probleme Workshop!</h1>
    <button id="loadScript">Lade script3.js</button>
</body>
</html>

/* ERGEBNIS-AUSGABE IN CONSOLE
   1. Inline Skript (am schnellsten, weil es nicht extern geladen werden muss)
   2. Skript 1 geladen (wegen wenig Code und async schneller als defer)
   3. Skript 3 geladen (wegen defer und weniger Code als in Skript 2)
   4. Skript 2 geladen (defer und längster Code)
*/

Versuch 2:
index.html so umgeschrieben:
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JS Laden Problem</title>
    <script src="js/script1.js" asnyc></script>
    <script src="js/script2.js" async></script> // auch hier auf async gestellt, obwohl das Skript DOM Elemente braucht
    <script src="js/script3.js" async></script>
    <script>
      console.log("Inline script!")
    </script>
</head>
<body>
    <h1>Willkommen beim JS Lade-Probleme Workshop!</h1>
    <!--button id="loadScript">Lade script3.js</button-->
</body>
</html>

/* ERGEBNIS-AUSGABE IN CONSOLE
   "Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')"
   Ergibt Sinn, weil Skript 2 ja DOM Elemente benutzt

*/

Versuch 3:
index.html so umgeschrieben:
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JS Laden Problem</title>
    <script src="js/script1.js" defer></script> // auf defer gestellt
    <script src="js/script2.js" defer></script> 
    <script src="js/script3.js" defer></script> // auf defer gestellt
    <script>
      console.log("Inline script!")
    </script>
</head>
<body>
    <h1>Willkommen beim JS Lade-Probleme Workshop!</h1>
    <!--button id="loadScript">Lade script3.js</button-->
</body>
</html>

/* ERGEBNIS-AUSGABE IN CONSOLE
   1. Inline Skript (am schnellsten, weil es nicht extern geladen werden muss)
   2. Skript 1 geladen 
   3. Skript 2 geladen 
   4. Skript 3 geladen - da alle auf defer gestellt sind, wird einfach die von mir angegebene Reihenfolge von unten nach oben eingehalten

   Zuerst habe ich länger nicht auf den Button gedrückt, irgendwann stand da plötzlich folgende Fehlermeldung:
   Außerdem: "Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received"
   Hier kann man sehen, dass mein erster Versuch richtig war und async die richtige Wahl für die beiden Skripte war

   Die Fehlermeldung verschwand, nachdem ich auf den Button geklickt habe.
*/


