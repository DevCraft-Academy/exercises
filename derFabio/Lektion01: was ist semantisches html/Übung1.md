<!--Was macht meine Lieblingswebsite?-->

<!--Youtube, auszugsweise:-->

<body>
    <ytd-app>
        <div id="content">

            // hier startet der Header
            <div id="masthead-container">
                <ytd-masthead id="masthead">
                    // Container div für die einzelnen Bereiche des Headers
                    <div id="container">
                        // Container für Guide und Home Button
                        <div id="start">
                            <.../>
                            // YouTube Logo
                            <ytd-topbar-logo-renderer>
                                <a id="logo"></a>
                            </ytd-topbar-logo-renderer>
                        </div>
                        // Container für Suchfeld
                        <div id="center"></div>
                        // Container für Buttons für "Erstellen", "Benachrichtigen aka die Glocke", und "Kontomenü"
                        <div id="end"></div>
                    </div>
                </ytd-masthead>
            </div>

            // hier startet die Sidebar
            <ytd-mini-guide-renderer>
                // container für container für container für Links
                <div id="items">
                    // Home
                    <ytd-mini-guide-entry-renderer>
                        <a id="endpoint"></a>
                    </ytd-mini-guide-entry-renderer>
                    // Shorts
                    <ytd-mini-guide-entry-renderer>
                        <a id="endpoint"></a>
                    </ytd-mini-guide-entry-renderer>
                    // Abos
                    <ytd-mini-guide-entry-renderer>
                        <a id="endpoint"></a>
                    </ytd-mini-guide-entry-renderer>
                    // mein Youtube
                    <ytd-mini-guide-entry-renderer>
                        <a id="endpoint"></a>
                    </ytd-mini-guide-entry-renderer>
                </div>
            </ytd-mini-guide-renderer>

            // hier startet der Hauptinhalt, aka main
            <ytd-page-manager id="page-manager">
                <ytd-browse class="style-scope ytd-page-manager">
                    <ytd-two-column-browse-results-renderer>
                        <div id="primary">
                            <ytd-rich-grid-renderer>
                                // header Element für Genres
                                <div header></div>
                                // container für main content
                                <div id="contents">
                                    <ytd-rich-grid-row>
                                        <div id="contents">
                                            <ytd-rich-item-renderer>
                                                <div id="content">
                                                    <ytd-rich-grid-media>
                                                        <div id="dismissible">
                                                            <div id="thumbnail">
                                                                <ytd-thumbnail>
                                                                    <a id="thumbnail">
                                                                        // hier befindet sich endlich der Link zum Video
                                                                    </a>
                                                                </ytd-thumbnail>
                                                            </div>
                                                        </div>
                                                    </ytd-rich-grid-media>
                                                </div>
                                            </ytd-rich-item-renderer>
                                        </div>
                                    </ytd-rich-grid-row>
                                </div>
                            </ytd-rich-grid-renderer>
                        </div>
                    </ytd-two-column-browse-results-renderer>
                </ytd-browse>
            </ytd-page-manager>
        </div>
    </ytd-app>

</body>

Auf den ersten Blick wirkt die Seite sehr unübersichtlich und kompliziert, denn es werden viele divs verwendet. Gleichzeitig ist YouTube
aber eine risige Website und ohne die große Zahl an divs wird es wohl nicht gehen. Weiters konnte ich keine nested divs finden, es ist immer
ein anderes Element zwischen zwei divs, was die Überischtlichkeit erheblich verbessert.
Fazit: auf den ersten Blick unübersichtlich, bei genauerem Hinsehen offenbart sich der rote Faden.
