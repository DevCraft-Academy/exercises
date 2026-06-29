# Aufgabe

Sieh dir das Projekt js-loading an und folge den Anweisungen im README, um es zum Laufen zu bringen.

Sieh dir mal an, wie die JavaScript-Dateien geladen werden. Kannst du dabei Probleme feststellen?
Experimentiere mit den async- und defer-Attributen. Wie beeinflussen sie das Laden und die Ausführung der Skripte? Sieh dir dazu die Console deiner Dev-Tools an, wo alle Scripts einen Satz hineinschreiben.
Überlege, wie die Skripte geladen werden sollten, um die beste User Experience zu bieten.
Fasse deine Erkenntnisse zusammen und teile sie als Pull-Request im Exercises-Repo.

# Lösung

Es macht definitiv sinn mit defer zu arbeiten, so wird javascript nach und nach verwendet nach dem das DOM geladen wurde, somit haben wir eine bessere user experience.
Async ist auch eine Möglichkeit, jedoch kann es passieren das das Script ausgeführt wird bevor das DOM geladen wurde, was zu Fehlern führen kann wenn das Script auf DOM Elemente zugreifen will.
Zusammenfassung der Erkenntnisse:

- Skripte ohne async oder defer blockieren das Laden der Seite, was die User Experience verschlechtert.
