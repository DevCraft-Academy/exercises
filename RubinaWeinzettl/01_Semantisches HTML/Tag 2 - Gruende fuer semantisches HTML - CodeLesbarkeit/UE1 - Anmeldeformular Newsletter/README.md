1. Im <header> steht die Überschift <h1> als Überschrift für das Formular
2. Der Hauptinhalt ist das Formular, daher ist es in <main>
3. Das Formular wird durch den <form> Tag definiert, der eine action enthält, der ihn zu einem PHP File weiterleitet
4. Innerhalb des <form> Tags sind die richtigen Input-Feldern mit korrekten Types (text für Vor- und Nachname, email für die Mailadresse) und Attributen definiert. 
   Das input Feld für die E-Mail Adresse enthält zusätzlich required, damit das Formular nicht abgeschickt werden kann, bevor die Mailadresse (im korrekten Format) eingegeben wurde.
5. Am Ende gibt es einen Button, der das Formular abschickt und via post an das PHP File weiterleitet, wo sie dann weiter verarbeitet werden würden (würde das File tatsächlich existieren).