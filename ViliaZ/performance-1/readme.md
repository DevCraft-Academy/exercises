## Verbesserung der linearen Suche

Optimiere eine ineffiziente lineare Suchfunktion in JavaScript und erkläre die Methodik hinter der Optimierung.

Betrachte die folgende lineare Suchfunktion, die in einem sortierten Array nach einem Ziel-Element sucht:

`function linearSearch(data, target) {
  for (let i = 0; i < data.length; i++) {
    if (data[i] === target) {
      return i;
    }
  }
  return -1; // Nicht gefunden
}
`

## Schritte

### Verstehe die Ineffizienz
Analysiere die lineare Suchfunktion.
Identifiziere Ineffizienzen, insbesondere in Szenarien mit großen Datensätzen.


### Implementiere eine effizientere Suche.
Erkläre die Methodik: Erläutere klar die Gründe für die Wahl dieses Algorithmus.
Teste und Vergleiche: Erstelle Testfälle mit verschiedenen Datensatzgrößen.

### Dokumentiere Ergebnisse
Dokumentiere die beobachteten Verbesserungen in der Ausführungszeit.
Biete Einblicke, wie die Wahl eines effizienteren Algorithmus die Leistung der Funktion positiv beeinflusst hat.
