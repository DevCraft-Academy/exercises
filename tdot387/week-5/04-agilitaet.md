# Das Datenbank-Skalierungs-Dilemma

ShopSmart wächst stark, die Datenbank kommt an ihre Grenzen. Nutzer erleben langsame Ladezeiten und Ausfälle. Wir müssen kurzfristig stabilisieren und langfristig skalieren.

---

## Herausforderung

**Option 1: Vertikale Skalierung (Hardware)**  
+ schnelle Umsetzung  
– teuer, begrenzte Skalierbarkeit

**Option 2: Horizontale Skalierung (Sharding)**  
+ langfristig skalierbar, kosteneffizient  
– hoher Aufwand, längere Umsetzung

---

## Anforderungen & Rahmenbedingungen

- Nutzer erwarten stabile Performance.  
- Entwicklungsteam kann Hardware schnell umsetzen, Sharding braucht Zeit.  
- Budget ist begrenzt, CFO achtet auf langfristige Kosten.  
- Qualitätssicherung muss Ausfälle während der Umstellung verhindern.

---

## Vergleich

| Kriterium             | Vertikal              | Horizontal (Sharding)             |
|-----------------------|-----------------------|-----------------------------------|
| Umsetzung             | schnell               | langwierig                        |
| Kosten                | hoch (Hardware)       | hoch (Dev), langfristig günstiger |
| Skalierbarkeit        | begrenzt              | sehr gut                          |
| Risiko                | gering                | höher (Architekturänderung)       |

---

## Strategie

Ich schlage einen zweistufigen Ansatz vor:

1. Kurzfristig: Vertikale Skalierung + Datenbank-Tuning  
   - Stabilisierung des Systems (RAM, CPU, Indexe, Caching)
   - Monitoring verbessern  
   - Nutzerzufriedenheit schnell sichern

2. Mittelfristig: Vorbereitung auf Sharding  
   - Architektur prüfen
   - Migration einzelner Bereiche (z. B. Bestellungen)  
   - Risiko kontrolliert managen

---

## Qualitätssicherung

- Lasttests & Monitoring  
- Rollback-Möglichkeit  
- Step-by-Step-Rollout
- Klare Kommunikation bei Wartungsfenstern

---

## Roadmap (Grob)

| Zeitraum  | Maßnahme                               |
|-----------|----------------------------------------|
| Q1        | Hardware-Upgrade, Tuning, Monitoring   |
| Q2–Q3     | Architektur & PoC für Sharding         |
| Q4        | Pilotmigration & Rollout               |

---

## Fazit

Nur vertikal zu skalieren reicht nicht aus, nur Sharding wäre zu riskant und aufwendig.  
Kombination aus beidem ist realistisch:  
- schnell stabilisieren,  
- parallel Zukunft sichern.  
Das ist technisch machbar, wirtschaftlich sinnvoll und hält die Nutzer zufrieden.
