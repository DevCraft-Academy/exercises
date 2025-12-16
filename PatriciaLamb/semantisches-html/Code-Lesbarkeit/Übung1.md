#Aufgabe: Newsletteranmeldung mit semantischen HTML erstellen

<form method="post"> <!-- action="/newsletter" hinzufügen, falls die Verarbeitung unter einer anderen URL erfolgen soll -->
  <h2>Newsletter Anmeldung</h2>
  <label for="email">Email-Adresse</label>
  <input id="email" name="email" type="email" required>
  <button type=submit>Anmelden</button> 
</form>
