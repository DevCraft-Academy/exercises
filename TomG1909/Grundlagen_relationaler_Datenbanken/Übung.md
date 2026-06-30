1. Tabellen & Struktur
   Tabelle: Rezepte
   rezept_id (PK) – eindeutige Kennung für jedes Rezept

name – Name des Rezepts

beschreibung – kurze Beschreibung

zubereitung – Zubereitungsanleitung (Text)

datum_hinzugefügt – Datum, an dem das Rezept in die DB kam

Tabelle: Zutaten
zutat_id (PK) – eindeutige Kennung für jede Zutat

name – Name der Zutat (z. B. „Mehl“)

Tabelle: Rezept_Zutat
(Verbindungstabelle für die N:M-Beziehung zwischen Rezepten und Zutaten)

rezept_id (FK → Rezepte.rezept_id)

zutat_id (FK → Zutaten.zutat_id)

menge – numerischer Wert

maßeinheit – z. B. „g“, „Tasse“, „ml“

Primärschlüssel: (rezept_id, zutat_id) – zusammengesetzt

Tabelle: Bewertungen
bewertung_id (PK) – eindeutige Kennung für jede Bewertung

rezept_id (FK → Rezepte.rezept_id)

nutzer_name – Name der Person, die bewertet

bewertung – ganzzahliger Wert (1–5)

datum_bewertung – Datum der Bewertung

2. Primärschlüssel (PK)
   Rezepte: rezept_id

Zutaten: zutat_id

Rezept_Zutat: (rezept_id, zutat_id) (kombiniert)

Bewertungen: bewertung_id

3. Beziehungen
   Rezepte ↔ Rezept_Zutat:
   1:N von Rezepte zu Rezept_Zutat (ein Rezept kann viele Zutaten-Einträge haben)

Zutaten ↔ Rezept_Zutat:
1:N von Zutaten zu Rezept_Zutat (eine Zutat kann in vielen Rezepten vorkommen)

Rezepte ↔ Bewertungen:
1:N von Rezepte zu Bewertungen (ein Rezept kann viele Bewertungen haben)

4. Fremdschlüssel (FK)
   In Rezept_Zutat:

rezept_id → Rezepte.rezept_id

zutat_id → Zutaten.zutat_id

In Bewertungen:

rezept_id → Rezepte.rezept_id

5. Designentscheidungen & Begründungen

Zutaten werden in einer eigenen Tabelle gespeichert, damit gleiche Zutaten nicht mehrfach redundant als Text im Rezept stehen.

N:M-Beziehung:
Ein Rezept kann viele Zutaten haben, und eine Zutat kann in vielen Rezepten vorkommen – daher Verbindungstabelle Rezept_Zutat.

Bewertungen separat:
So können mehrere Bewertungen pro Rezept verwaltet werden, ohne die Rezeptdaten zu duplizieren.

Datumsspeicherung:
Sowohl für Rezepterstellung als auch für Bewertungen wichtig für zeitliche Analysen.

Primärschlüsselwahl:
IDs sind künstliche Schlüssel (Surrogate Keys), um Änderungen an Namen etc. nicht zu Primärschlüsseländerungen zu zwingen.
