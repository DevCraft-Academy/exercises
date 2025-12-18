#Website Konzept für einen Online Shop:

<header> für mein Logo und Kundennamen. In diesem <header> tag soll <nav> als Navigationsleiste funktionieren. 
<main> für den Hauptteil, welches sich in <article> gliedert und jeweils die einzelnen Produkte zeigt.
<footer> für Rechtliches und Social Media Links

<header>
  <a href="/" class="brand">
    <img src="/logo.svg" alt="Shopname – Startseite">
  </a>

  <nav aria-label="Hauptnavigation">
    <ul>
      <li><a href="/neu">Neu</a></li>
      <li><a href="/herren">Herren</a></li>
      <li><a href="/damen">Damen</a></li>
      <li><a href="/sale">Sale</a></li>
    </ul>
  </nav>
</header>

<main>
  <h1>Running-Schuhe</h1>

  <section>
    <h2 id="ergebnisse">24 Ergebnisse</h2>
    <ul class="product-grid">
      <li>
        <article itemscope itemtype="https://schema.org/Product">
          <a href="/produkt/abc123">
            <img src="/img/abc.jpg" alt="Laufschuh Aero X (blau)" itemprop="image">
            <h3 itemprop="name">Laufschuh Aero X</h3>
            <p><data value="129.95" itemprop="price">129,95 €</data></p>
            <p class="rating" aria-label="Bewertung: 4,5 von 5">★★★★☆</p>
            <button type="button">In den Warenkorb</button>
          </a>
        </article>
      </li>
    </ul>
  </section>
</main>

<footer>
  <nav aria-label="Footer">
    <ul>
      <li><a href="/impressum">Impressum</a></li>
      <li><a href="/datenschutz">Datenschutz</a></li>
      <li><a href="/versand">Versand & Rückgabe</a></li>
    </ul>
  </nav>
  <ul class="social">
    <li><a href="https://instagram.com/…">Instagram</a></li>
    <li><a href="https://linkedin.com/…">LinkedIn</a></li>
  </ul>
  <small>&copy; 2025 Shopname</small>
</footer>
