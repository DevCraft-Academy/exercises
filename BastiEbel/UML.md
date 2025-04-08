Teil 1: Klassendiagramm
Das Klassendiagramm zeigt die Hauptkomponenten des Systems und deren Beziehungen.

+----------------+       1       *       +----------------+
|    Kunde       |-----------------------|   Bestellung   |
+----------------+                       +----------------+
| - name         |                       | - bestellNr    |
| - adresse      |                       | - datum        |
| - telefon      |                       | - status       |
+----------------+                       +----------------+
| + bestellungAufgeben()                 | + artikelHinzufügen() |
| + bestellungAnzeigen()                 | + statusÄndern()      |
+----------------+                       +----------------+
                                           |
                                           |
                                           *       
                                           |
                                           |
                                   +----------------+
                                   |    Artikel     |
                                   +----------------+
                                   | - artikelNr    |
                                   | - name         |
                                   | - preis        |
                                   +----------------+
                                   | + preisBerechnen() |
                                   +----------------+
                                           |
                                           |
                                           *
                                           |
                                           |
                                   +----------------+
                                   |    Zahlung     |
                                   +----------------+
                                   | - zahlungsNr   |
                                   | - betrag       |
                                   | - methode      |
                                   +----------------+
                                   | + zahlungDurchführen() |
                                   +----------------+
Kunde: Kann mehrere Bestellungen aufgeben. Attribute wie name, adresse und Methoden wie bestellungAufgeben().
Bestellung: Enthält mehrere Artikel. Attribute wie bestellNr, datum, status und Methoden wie artikelHinzufügen().
Artikel: Repräsentiert Speisen oder Getränke. Attribute wie artikelNr, name, preis und Methoden wie preisBerechnen().
Zahlung: Verknüpft mit einer Bestellung. Attribute wie zahlungsNr, betrag, methode und Methoden wie zahlungDurchführen().

Teil 2: Zustandsdiagramm
Das Zustandsdiagramm zeigt den Lebenszyklus einer Bestellung.

[Erstellt] --> [Bestätigt]: Bestellung bestätigen
[Bestätigt] --> [In Zubereitung]: Zubereitung starten
[In Zubereitung] --> [Fertig zur Lieferung]: Zubereitung abgeschlossen
[Fertig zur Lieferung] --> [Geliefert]: Lieferung abgeschlossen

Zustände:
Erstellt: Die Bestellung wurde vom Kunden aufgegeben.
Bestätigt: Die Bestellung wurde vom System bestätigt.
In Zubereitung: Die Küche hat mit der Zubereitung begonnen.
Fertig zur Lieferung: Die Bestellung ist fertig und bereit zur Lieferung.
Geliefert: Die Bestellung wurde erfolgreich geliefert.

Bestellung bestätigen: Vom Zustand „Erstellt“ zu „Bestätigt“.
Zubereitung starten: Vom Zustand „Bestätigt“ zu „In Zubereitung“.
Zubereitung abgeschlossen: Vom Zustand „In Zubereitung“ zu „Fertig zur Lieferung“.
Lieferung abgeschlossen: Vom Zustand „Fertig zur Lieferung“ zu „Geliefert“.

Teil 3: Sequenzdiagramm
Das Sequenzdiagramm zeigt die Interaktion zwischen Kunde, Bestellsystem und Küche.

Kunde          Bestellsystem          Küche
  |                  |                  |
  |  Bestellung aufgeben  -->           |
  |                  |                  |
  |       Bestellung speichern          |
  |                  |                  |
  |  <-- Bestätigung senden             |
  |                  |                  |
  |                  |  Bestellung weiterleiten -->
  |                  |                  |
  |                  |  <-- Zubereitung starten   |
  |                  |                  |
  |  <-- Status aktualisieren           |
  |                  |                  |
  |  Lieferung bestätigen  -->          |

Der Kunde gibt eine Bestellung auf.
Das Bestellsystem speichert die Bestellung und sendet eine Bestätigung an den Kunden.
Das Bestellsystem leitet die Bestellung an die Küche weiter.
Die Küche startet die Zubereitung und informiert das System.
Das System aktualisiert den Status und informiert den Kunden über die Lieferung.
