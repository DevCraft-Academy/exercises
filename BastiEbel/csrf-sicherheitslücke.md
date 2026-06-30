Behebung der CSRF-Sicherheitslücke
In der ursprünglichen Version der Anwendung war die POST-Route /submit anfällig für Cross-Site Request Forgery (CSRF)-Angriffe. 
Ein Angreifer konnte durch das Ausführen eines schädlichen Skripts in einem anderen Tab oder auf einer anderen Website unbemerkt 
Anfragen an die /submit-Route senden, um Daten im Namen eines ahnungslosen Benutzers zu übermitteln.

Um diese Sicherheitslücke zu schließen, wurde ein CSRF-Schutz implementiert, der auf dem csurf-Paket basiert. 

Die folgenden Schritte wurden unternommen:

1.Installation der benötigten Pakete:
Das csurf-Paket wurde installiert, um CSRF-Token zu generieren und zu validieren. 
Zusätzlich wurde das cookie-parser-Paket verwendet, um Cookies zu verarbeiten.
npm install csurf cookie-parser

2.Aktivierung des CSRF-Schutzes: 
Der CSRF-Schutz wurde in der Anwendung aktiviert, indem ein Middleware-Handler für csurf hinzugefügt wurde. 
Dieser Middleware-Handler generiert ein CSRF-Token, das in einem Cookie gespeichert wird.

const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

3.Bereitstellung des CSRF-Tokens im Formular: 
Bei der Bereitstellung des HTML-Formulars wurde ein verstecktes Eingabefeld hinzugefügt, 
das das CSRF-Token enthält. Dieses Token wird bei der Übermittlung des Formulars an den Server gesendet.
<input type="hidden" name="_csrf" value="${req.csrfToken()}">

4.Validierung des CSRF-Tokens: 
Bei der Verarbeitung der POST-Anfrage an die /submit-Route wird das CSRF-Token automatisch validiert. 
Wenn das Token fehlt oder ungültig ist, wird die Anfrage abgelehnt, und der Server protokolliert den Vorfall nicht.
