
Getränke Bestellsystem aufgebaut nach dem Decorator Pattern

Verzeichnisse und Files:
1. index.html - User Interface für Testzwecke
2. beverages
    a. Beverage.js - enthält die abstrakte Klasse für alle Getränke
    b. Coffee.js - konkretes Getränk - Kaffee
    c. Tea.js - konkretes Getränke - Tee
3. decorators
    a. AddonDecorator.js - enthält die abstrakte Klasse für alle Zusätze
    b. Chocolate Syrup.js - konkreter Zusatz - Schokoladensyrup
    c. Milk.js - kokreter Zusatz - Milch
    d. Sugar.js - konkreter Zusatz - Zucker

Weitere Getränke oder Zusätze können einfach durch Hinzufügen einer weiteren Klasse implementiert werden.