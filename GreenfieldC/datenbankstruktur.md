1. Registrierung der Nutzer
--------------------------------
Nutzer registrieren sich oder löschen ihre Konto

Tabelle "user":
userId  (Primärschlüssel), Nachname, Vorname, Emailadresse, Geburtsdatum, Geschlecht, status (verified, pending)


2. Beiträge der Nutzer
--------------------------------
Nutzer schreiben Beiträge

Tabelle "post"
postId (Primärschlüssel), Datum, Inhalt, userId (Autor)

3. Kommentare zu Beiträgen von Nutzern
----------------------------------------
Nutzer kommentieren Beiträge

Tabelle "post-response"
postRespId  (Primärschlüssel), Datum, Inhalt, postId (Origin), userID (Autor response)

4. Freundschaftsnetzwerk
-------------------------
Nutzer vernetzen sich mit anderen Nutzern

Tabelle "network"
usedId  (Primärschlüssel), userId, Status (angenommen, ausstehend, abgelehnt), createDate



