Ich habe zuerst meinen eigenen Blog mindful-it.dev genommen, weil es mich interessiert, wie das HTML in Wordpress im Hintergrund zusammengebaut ist.

Ich habe 3 Elemente am Anfang des Body Tags ausgewählt:
1. <header> mit der id "masthead" - gehört zum Menü oben auf der Webseite 
2. <nav> mit der id "site-navigation". 
3. Zwischen den beiden befindet sich auch ein <h1> Tag mit der class "site-title". Das ist die Hauptüberschrift meiner Webseite
4. Weiter unten nach dem <header> befindet sich ein <main> Tag, der den Hauptcontent (die Blogbeiträge) definiert.
5. In dem <main> Tag befindet sich mehrere <article> Tag. Diese definieren die einzelnen Blog Beiträge als abgeschlossene Einheiten. Jeder <article> hat einen eigenen <header>, die Überschrift des Beitrags ist durch <h2> definiert, die Vorschau auf den Text mit dem <p> Tag für den Absatz. Außerdem hat jeder einen <figure> Tag für das Beitragsbild.
	
Ich habe es dann mit der Webseite der von datacargo.at verglichen, wo die Softwareprodukte der Firma, bei der ich angestellt bin beschrieben werden. Das ist auch eine Wordpress-Webseite, die aber keinen Blog auf der Startseite hat.
Hier gibt es nach dem <body> Tag z. B.:
	
1. Den <header> Tag für das <nav> Menü, dass durch die Verwendung von elementor ganz anders aufgebaut ist wie meines. Es gibt keine IDs, sondern lauter elementor-Klassen, aber es ist dann in das typische <ul> Element mit einzelnen <li> Tags gegliedert.
2. Statt den <article> Tags ist der Content hier in mehrere <section> Elemente unterteilt.
3. Es gibt mehrere <h1> Tags in jeder section, gefolgt von <h3>, was aus meiner Sicht nicht der Best Practise für die Struktur entspricht, von der wir gelernt haben, dass sowohl Screen Reader als auch Bots sie zum Auslesen brauchen (es sollte nur ein h1 Element geben, das h3 Element sollte erst verwendet werden, wenn es vorher h2 gibt)