Ich prüfe, ob über das Eingabefeld Daten in einer Form kommen,
die nicht erlaubt sind. Geprüft wird in dem Fall mit dem Regex /<script.*?>.*?<\/script>/i.

Sollten die Daten dem Regex entsprechen, also ein Angriff vorliegen, wird in der Konsole ausgegeben,
von welcher IP-Adresse der Angriff kam und mit welchem Inhalt/Schadcode.

Grundsätzlich werden die Daten aus dem Eingabefeld, die gesendet werden,
immer bereinigt, in dem Zeichen wie z.B. "<" durch die jeweiligen html-Entities ersetzt werden.
Dadurch ist ersichtlich, um welchen Code es sicht handlet, ist abern icht mehr fähig ausgeführt zu werden.

