document.addEventListener('DOMContentLoaded', function() {
    // Zwei Buttons für Cache-Strategien
    const btn5min = document.getElementById('cache5minBtn');
    const btnAlways = document.getElementById('cacheAlwaysBtn');
    const container = document.getElementById('foxContainer');
    let cacheMode = null; // '5min' oder 'always'

    // Neuer Button für Cache löschen
    const btnClear = document.getElementById('clearCacheBtn');
    btnClear.addEventListener('click', function() {
        localStorage.removeItem('foxData');
        container.innerHTML = '<div style="color:#1976d2;padding:10px;">Cache wurde gelöscht.</div>';
    });

    btn5min.addEventListener('click', function() {
        cacheMode = '5min';
        loadFox();
    });

    btnAlways.addEventListener('click', function() {
        cacheMode = 'always';
        loadFox();
    });

    function loadFox() {
        const cacheKey = 'foxData';
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
            const { data, timestamp } = JSON.parse(cached);
            if (cacheMode === 'always') {
                renderFox(data, true);
                return;
            }
            if (cacheMode === '5min') {
                const now = Date.now();
                if (now - timestamp < 5 * 60 * 1000) {
                    renderFox(data, true);
                    return;
                }
            }
        }

        // Simulierte Netzwerkanfrage (mit Fehlerbehandlung)
        fetch('https://randomfox.ca/floof/')
            .then(response => {
                if (!response.ok) throw new Error('Netzwerkfehler');
                return response.json();
            })
            .then(apiData => {
                const data = {
                    image: apiData.image,
                    link: apiData.link || apiData.image // fallback falls kein Link
                };
                localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }));
                renderFox(data, false);
            })
            .catch(() => {
                // Fehler: Prüfe, ob gecachte Daten existieren
                if (cached) {
                    const { data } = JSON.parse(cached);
                    renderFox(data, true, 'Netzwerkfehler – zeige gecachte Daten.');
                } else {
                    renderError('Netzwerkfehler – keine Daten verfügbar.');
                }
            });
    }

    function renderFox(data, fromCache, msg) {
        container.innerHTML = `
            <div style="background:${fromCache ? '#ffe082' : 'transparent'};padding:10px;border-radius:8px;">
                <a href="${data.link}" target="_blank">
                    <img src="${data.image}" alt="Random Fox" style="max-width:300px;">
                </a>
                ${msg ? `<div style="color:#b71c1c;margin-top:8px;">${msg}</div>` : ''}
                ${fromCache ? `<div style="color:#388e3c;font-size:0.9em;">(Aus Cache geladen)</div>` : ''}
            </div>
        `;
    }

    function renderError(msg) {
        container.innerHTML = `<div style="color:#b71c1c;padding:10px;">${msg}</div>`;
    }
});

