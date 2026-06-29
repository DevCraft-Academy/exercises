# Aufgabe

## Verbesserungen in Sachen Barrierefreiheit

In dieser Übung wirst du die Barrierefreiheit eines bereitgestellten CodePens bewerten und notwendige Verbesserungen vornehmen, um sicherzustellen, dass er für alle Benutzer zugänglich ist.

# Lösung:

passende semantische HTML-Elemente verwenden wie: header, main, section und footer.

```html
<header>
  <h1>CodePen Example</h1>
</header>
<main>
  <section>Main Section</section>
</main>
<footer>
  <p>Footer</p>
</footer>

alt-Attribute verwenden.
<img
  src="https://thumbnail.com/img/xxxxx"
  height="300"
  width="300"
  alt="This is a thumbnail"
/>
```

Fokus:

```css
button:focus {
  outline: 4px solid red;
}

a:focus {
  outline: 2px solid green;
}
```

Formularelemente mit Labels und Inputs/Submit versehen.

```html
<form>
  <label for="input">Full Name:</label>
  <input
    type="text"
    id="input"
    placeholder="Enter your name"
    aria-label="Name"
  />
  <button aria-label="Submit">Submit</button>
</form>
```

# Übung 2

Nutzen von media queries - beispiel:

```css
@media screen and (max-width: 768px) {
  nav ul {
    text-align: center;
    padding-top: 10px;
  }

  nav li {
    display: block;
    margin: 10px 0;
  }

  section {
    padding: 10px;
  }
}
```
