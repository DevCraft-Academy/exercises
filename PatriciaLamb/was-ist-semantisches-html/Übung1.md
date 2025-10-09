#Was macht meine Lieblingswebsite?

Ich habe gesehen, dass es echt viele Websites gibt, die kein semantisches HTML benutzen, aber ich bin random auf eine Agentur gestoßen, die semantisches HTML benutzt.

<div class="page-wrapper">
  <header class="header">
    <div
      class="navigation-bar"
      style="will-change: background; background-color: rgba(0, 0, 0, 0);"
    >
      <div class="container">
        <nav
          data-w-id="bb85fba4-4c8c-53f3-1b4a-a01397f6687a"
          class="nav"
          style="border-color: rgba(255, 255, 255, 0.2);"
        >
          <a
            href="/"
            aria-current="page"
            class="brand-link w-inline-block w--current"
            ><img
              loading="lazy"
              alt=""
              class="brand-image"
              src="https://cdn.prod.website-files.com/64d390c8fd7366300128d276/64d3999b48496dcb9e0b033d_4D_Logo_2023_RGB_blanko.svg"
          /></a>
          <div class="nav-buttons">
            <a
              data-w-id="bb85fba4-4c8c-53f3-1b4a-a01397f66893"
              href="tel:+4936130265501"
              class="outline-button-small w-inline-block"
              style="will-change: background; background-color: rgba(255, 255, 255, 0.2); border-color: rgba(255, 255, 255, 0.6);"
              ><div
                data-w-id="bb85fba4-4c8c-53f3-1b4a-a01397f66894"
                class="text-tiny"
                style="color: rgb(255, 255, 255);"
              >
                Kontaktieren Sie uns!
              </div></a
            >
            <div
              data-w-id="bb85fba4-4c8c-53f3-1b4a-a01397f66896"
              class="menu-button"
            >
              <div
                data-w-id="030f39be-841b-c972-78bf-d97dff20a4f5"
                class="text-tiny is-hidden-mobile"
                style="color: rgb(255, 255, 255);"
              >
                Menu
              </div>
              <div
                data-w-id="fd1a3237-6606-5f95-3ff9-7b85d58c05b8"
                class="burger"
                style="will-change: filter; filter: invert(100%);"
              >
                <img
                  loading="lazy"
                  alt=""
                  class="burger-icon"
                  src="https://cdn.prod.website-files.com/64d390c8fd7366300128d276/64d390c9fd7366300128d307_menu-icon.svg"
                />
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </header>
  <main class="main">
    <div class="spacer-huge"></div>
    <div class="spacer-huge"></div>
    <div class="spacer-regular"></div>
    <section class="section-news">
      <div class="container">
        <div class="news-wrapper">
          <div class="intro-bar">
          ...
        </div>
      </div>
    </section>
    <div class="spacer-huge"></div>
    ...
  </main>
  <footer class="footer">
    ....
  </footer>
</div>

In diesem Beispiel kommen die semantischen Tags <header>, <nav>, <main>, <section> und <footer> zum Einsatz. Der <header> umschließt das obere Seitengerüst mit Logo/Marke und der Navigation (<nav>). Das <main>-Element enthält den Hauptinhalt, der in thematisch zusammenhängende <section>-Abschnitte gegliedert ist. Der <footer> bündelt Meta-Informationen wie Social Links und rechtliche Hinweise.
