# Grundlagen relationalke Datebanken

## Entitäten und Tabellen

1. Tabelle Rezepte - Attribute: RezeptId(primary key), Name, Kurzbeschreibung,
   Zubereitungsanleitung, Erstelldatum, Änderungsdatum

2. Tabelle Zutaten - Attribute: ZutatenId (primary key), RezeptId(foreign key), Name, Menge,
   Maßeinheit

3. Tabelle Bewertungen - Attribute: BewertungId (primary key), RezeptId (foreign key), UserId
   (foreign key), Rating, Datum
