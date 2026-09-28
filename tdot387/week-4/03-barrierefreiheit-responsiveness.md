Übung 1: Verbesserungen in Sachen Barrierefreiheit

1. Tastaturnavigation: 
Getestete Fokus-Reihenfolge (Tab, Shift+Tab):
    - Link um das Bild (Anker, der das GIF umschließt)
    - „Link“ (Wikimedia-Link nach dem Bild)
    - Button „Click Me“
    - Formulareingabefeld „Name“ (Kein sichtbarer Submit-Button; ein Button existiert, ist aber display:none und somit nicht fokussier-/bedienbar)

Beobachtung:
    - Fokus ist grundsätzlich erreichbar, Standard-Outline ist sichtbar.
    - Ein großes Problem ist die fehlende sichtbare Submit-Aktion für die Tastatur.
    - Bild-Link hat kein alt am img, der Screenreader-Name des Links ist daher unklar.
    - Die Überschrift „Also this is hard to read“ hat sehr niedrigen Farbe-Kontrast und ist schwer lesbar.

2. Barrierefreiheitsprobleme identifizieren:
    - Fehlender Alternativtext am Bild (<img …> hat kein alt).
    - Unklarer Linkname für den Bild-Link (Anker um das img hat keinen sprechenden Namen)
    - Kontrastmangel bei h2
    - Kein sichtbarer Submit-Button im Formular (vorhandener Button ist display:none → nicht fokussierbar/bedienbar).
    - Redundante/irrelevante „hidden label“ (<span class="hidden-label">Name:</span>) ohne semantischen Nutzen (verwirrt Pflege, birgt Risiko, bei Stiländerungen versehentlich sichtbar zu werden).
    
3. Verbesserungsvorschläge anbieten:
    3.1 Bild & Link zugänglich machen:
    <a href="https://commons.wikimedia.org/wiki/File:Under_construction_graphic.gif#/media/File:Under_construction_graphic.gif"
        aria-label="Details zur Baustellen-Grafik auf Wikimedia Commons">
    <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/Under_construction_graphic.gif"
       height="150" width="200"
       alt="Baustellen-Grafik mit gelbem Warnschild">
    </a>
    
    3.2 Kontast der h2 erhöhen:
    h2 {
        color: #4b5563; /* statt #b5b5b5 */
    }
 
    3.3 Sichtbaren Submit-Button bereitstellen
    <form>
        <label for="input">Name:</label>
        <input type="text" id="input" name="name" placeholder="Enter your name">
        <button type="submit">Submit</button>
    </form>
    

4. Barrierefreiheitsprobleme und Lösungsvorschläge

1. Problem: `alt`-Tag im Bild fehlt  
   Ort: `<img>` innerhalb von `.content`  
   Auswirkung: Screenreader erhalten keinen sinnvollen Namen oder Beschreibung  
   Lösungsvorschlag: Beschreibenden Alternativtext ergänzen, z. B. `alt="Baustellen-Grafik mit gelbem Warnschild"`

---

2. Problem: Unklarer Linkname beim Bild-Link  
   Ort: `<a>`-Tag, der das Bild umschließt  
   Auswirkung: Screenreader können den Zweck des Links nicht erkennen  
   Lösungsvorschlag: `aria-label` am `<a>` ergänzen oder den Alternativtext des Bildes so formulieren, dass der Linkzweck klar wird

---

3. Problem: Zu niedriger Farbkontrast bei Überschrift  
   Ort: `h2 { color: #b5b5b5; }` auf `#f5f5f5` Hintergrund  
   Auswirkung: Text ist schwer lesbar, WCAG-Kontrastanforderungen werden nicht erfüllt  
   Lösungsvorschlag: Dunklere Schriftfarbe verwenden, z. B. `#4b5563`, um einen Kontrast von über 4.5 : 1 zu erreichen

---

4. Problem: Unsichtbarer Submit-Button im Formular  
   Ort: `.hidden-button { display: none; }` innerhalb des `<form>`  
   Auswirkung: Tastaturnutzer können das Formular nicht absenden  
   Lösungsvorschlag: Einen sichtbaren Button einfügen, z. B. `<button type="submit">Absenden</button>`, und den versteckten entfernen



Übung 2: Verbesserungen für Responsive Design

Probleme und Lösungsvorschläge zur Responsivität

1.  Problem: Kein responsives Grundlayout vorhanden  
    Ort: Gesamte Seite (`.container`, `.content`, `.navbar`, `.footer`)  
    Auswirkung: Auf kleineren Bildschirmen läuft der Inhalt über den Rand hinaus, Texte und Bilder werden zu klein oder zu groß dargestellt  
    Lösungsvorschlag: Grundlayout mit flexiblen Breiten (`width: 100%`, `max-width`, `margin: auto`) und relativen Einheiten (`em`, `rem`, `%`) anpassen, um eine skalierbare Basis zu schaffen

---

2.  Problem: Navigationsleiste ist auf kleinen Bildschirmen zu breit und bricht unschön um  
    Ort: `<nav>`-Bereich  
    Auswirkung: Navigationselemente überlappen oder werden abgeschnitten  
    Lösungsvorschlag:
        - Navigation mit `flex-wrap: wrap` und `justify-content: center` versehen  
        - Ab einer bestimmten Breite (z. B. `max-width: 600px`) das Layout vertikal anordnen  
    
        css: @media (max-width: 600px) {
                nav ul {
                flex-direction: column;
                align-items: center;
                gap: 0.5rem;
                }
            }

---

3.  Problem: Text ist auf mobilen Geräten zu klein und schwer lesbar
    Ort: Allgemeine Text- und Überschriftenelemente (h1, p)
    Auswirkung: Lesbarkeit eingeschränkt, Nutzer müssen zoomen oder scrollen
    Lösungsvorschlag: Schriftgrößen mit rem definieren und über Media Queries anpassen

---

4.  Problem: Inhalt (Text und Bild) wird nebeneinander dargestellt, auch auf kleinen Bildschirmen
    Ort: .content-Container
    Auswirkung: Bild und Text sind zu eng nebeneinander, Layout bricht bei schmalen Displays
    Lösungsvorschlag: Flex- oder Grid-Layout für mobile Geräte anpassen, z. B. Spalten auf Stapelansicht umstellen

    .content {
        display: flex;
        flex-direction: row;
        gap: 1rem;
    }

    @media (max-width: 768px) {
    .content {
    flex-direction: column;
    align-items: center;
    text-align: center;
        }
    }

---

5.  Problem: Bilder skalieren nicht mit der Fenstergröße
    Ort: <img> innerhalb des Inhaltsbereichs
    Auswirkung: Bilder ragen über den Viewport hinaus oder erscheinen verzerrt
    Lösungsvorschlag: Responsives Bildverhalten sicherstellen
    img {
        max-width: 100%;
        height: auto;
    }

---

6.  Problem: Footer überlappt bei kleiner Bildschirmhöhe den Seiteninhalt
    Ort: <footer>
    Auswirkung: Footer verdeckt Textinhalte, insbesondere bei mobilen Geräten
    Lösungsvorschlag: Footer fixieren vermeiden und durch flexibles Layout am Ende positionieren

---

7. Problem: Abstände und Ränder sind auf mobilen Geräten zu groß
   Ort: Mehrere Container (.header, .content, .footer)
   Auswirkung: Zu viel ungenutzter Raum, unnötiges Scrollen
   Lösungsvorschlag: Abstände über Media Queries reduzieren

---

8.  Problem: Keine einheitliche Skalierung für Buttons und Links auf Touchgeräten
    Ort: Navigation und Buttons im Content
    Auswirkung: Buttons zu klein oder zu nah beieinander – nicht touchfreundlich
    Lösungsvorschlag: Mindestgröße und Abstand erhöhen

---

9.  Problem: Kein Breakpoint für Tablets definiert
    Ort: CSS (fehlende Media Queries für mittlere Auflösungen)
    Auswirkung: Zwischenzustände (600–900 px) wirken unbalanciert
    Lösungsvorschlag: Zusätzliche Media Query für mittlere Viewports einfügen

---

10. Problem: Kein Viewport-Meta-Tag gesetzt
    Ort: <head> im HTML
    Auswirkung: Seite wird auf mobilen Geräten nicht korrekt skaliert
    Lösungsvorschlag: Im <head> ergänzen: <meta name="viewport" content="width=device-width, initial-scale=1.0">

 