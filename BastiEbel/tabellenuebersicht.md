Tabellenübersicht
Rezepte

Primärschlüssel: RezeptID
Attribute:
RezeptID (INT, PK)
Name (VARCHAR)
Beschreibung (TEXT)
Zubereitungsanleitung (TEXT)
HinzugefügtAm (DATETIME)
Zutaten

Primärschlüssel: ZutatID
Attribute:
ZutatID (INT, PK)
Name (VARCHAR)
Menge (DECIMAL)
Maßeinheit (VARCHAR)
Rezept_Zutaten (Verknüpfungstabelle für die N:M Beziehung zwischen Rezepten und Zutaten)

Primärschlüssel: RezeptID, ZutatID
Attribute:
RezeptID (INT, FK zu Rezepte.RezeptID)
ZutatID (INT, FK zu Zutaten.ZutatID)
Nutzer

Primärschlüssel: NutzerID
Attribute:
NutzerID (INT, PK)
Name (VARCHAR)
Bewertungen

Primärschlüssel: BewertungID
Attribute:
BewertungID (INT, PK)
RezeptID (INT, FK zu Rezepte.RezeptID)
NutzerID (INT, FK zu Nutzer.NutzerID)
Bewertung (INT, CHECK (Bewertung BETWEEN 1 AND 5))
Bewertungsdatum (DATETIME)
Beziehungen zwischen den Tabellen
Rezepte zu Rezept_Zutaten: 1:N

Ein Rezept kann mehrere Zutaten haben, aber jede Zutat in der Verknüpfungstabelle gehört zu genau einem Rezept.
Zutaten zu Rezept_Zutaten: 1:N

Eine Zutat kann in mehreren Rezepten verwendet werden, aber jede Zutat in der Verknüpfungstabelle gehört zu genau einer Zutat.
Rezepte zu Bewertungen: 1:N

Ein Rezept kann mehrere Bewertungen haben, aber jede Bewertung gehört zu genau einem Rezept.
Nutzer zu Bewertungen: 1:N

Ein Nutzer kann mehrere Bewertungen abgeben, aber jede Bewertung gehört zu genau einem Nutzer.
Entity-Relationship-Diagramm (ERD)
Das ERD könnte wie folgt aussehen:

[Rezepte] 1---N [Rezept_Zutaten] N---1 [Zutaten]
   |
   1
   |
   N
[Bewertungen] N---1 [Nutzer]
Designentscheidungen
Verknüpfungstabelle für Zutaten: Da ein Rezept mehrere Zutaten haben kann und eine Zutat in mehreren Rezepten verwendet werden kann, ist eine N:M Beziehung notwendig. Die Verknüpfungstabelle Rezept_Zutaten ermöglicht es, diese Beziehung zu modellieren.

Bewertungen: Die Bewertungen sind an die Rezepte und die Nutzer gebunden, was eine klare 1:N Beziehung zwischen Rezepten und Bewertungen sowie zwischen Nutzern und Bewertungen schafft.

Datentypen: Die Wahl der Datentypen (z.B. INT für IDs, VARCHAR für Namen) ist darauf ausgelegt, die Daten effizient zu speichern und die Integrität der Daten zu gewährleisten.

Fremdschlüssel: Die Verwendung von Fremdschlüsseln in den Verknüpfungstabellen stellt sicher, dass die referenzielle Integrität zwischen den Tabellen gewahrt bleibt.
