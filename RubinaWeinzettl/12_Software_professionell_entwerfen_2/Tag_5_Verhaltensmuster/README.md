Übungen "Software professionell entwerfen 2" - Tag 5
Verhaltensmuster

Allgemeines:
In dieser Aufgabe geht es um ein Flexibles Formular-Validierungssystems, das nach dem Strategy Pattern aufgebaut ist

Verzeichnisse und Files:
- index.html
  User Interface
  Du kannst die Anwendung testen, indem du verschiedene Formulareingaben tätigst. Die Felder sollten valdiert werden, wenn man in ein anderes Feld oder auf den Absenden Button klickt
  Wenn die Eingabe nicht passt wird eine Fehlermeldung angezeigt
  Wenn die Eingabe passt, kommt ein Alert, dass das Absenden des Formulars erfolgreich war
- style. css - das Stylesheet
- js
    - app.js - ist in index.html included und handelt den User Input, die Formularvalidierung und das Absenden des Formulars
    - validationStrategies.js - enthält die konkreten Strategien für die Validierung verschiedener Felder
    - validatorContext.js - die Strategie (fungiert als Interface für die konkreten Strategien)
