Klassendiagramm
Kunde
-----------------
- name
- adresse
-----------------
+ bestellungAufgeben()

Bestellung
-----------------
- nummer
- status
-----------------
+ artikelHinzufuegen()
+ bezahlen()

Artikel
-----------------
- name
- preis
-----------------
+ getPreis()

Zahlung
-----------------
- betrag
- methode
-----------------
+ ausfuehren()

Beziehungen

Kunde 1 —— 0..* Bestellung

Bestellung 1 —— 1..* Artikel

Bestellung 1 —— 1 Zahlung

Zustandsdiagramm
[erstellt]
    |
    | Bestellung bestätigen
    v
[bestätigt]
    |
    | Zubereitung starten
    v
[in Zubereitung]
    |
    | Fertigstellen
    v
[fertig zur Lieferung]
    |
    | Ausliefern
    v
[geliefert]

Sequenzdiagramm
Kunde -> Bestellsystem: Bestellung aufgeben
Bestellsystem -> Küche: Bestellung weiterleiten
Küche -> Bestellsystem: Bestellung bestätigt
Bestellsystem -> Kunde: Bestätigung senden
