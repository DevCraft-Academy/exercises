/**
 * Caching System für Fuchs-API Demo
 * Implementiert In-Memory-Cache mit TTL, visuellen Indikatoren und Fehlerbehandlung
 */

class ApiCache {
    constructor(defaultTTL = 5 * 60 * 1000) { // 5 Minuten in Millisekunden
        this.cache = new Map();
        this.defaultTTL = defaultTTL;
    }

    /**
     * Fügt Daten zum Cache hinzu
     */
    set(key, data, ttl = this.defaultTTL) {
        const expirationTime = Date.now() + ttl;
        this.cache.set(key, {
            data,
            expirationTime,
            createdAt: new Date().toLocaleTimeString('de-DE')
        });
        this.updateCacheDisplay();
    }

    /**
     * Holt Daten aus dem Cache (nur wenn noch nicht abgelaufen)
     */
    get(key) {
        const entry = this.cache.get(key);
        
        if (!entry) {
            return null;
        }

        // Prüfe ob abgelaufen
        if (Date.now() > entry.expirationTime) {
            this.cache.delete(key);
            this.updateCacheDisplay();
            return null;
        }

        return entry;
    }

    /**
     * Prüft ob ein Key im Cache existiert und noch gültig ist
     */
    has(key) {
        return this.get(key) !== null;
    }

    /**
     * Leert den gesamten Cache
     */
    clear() {
        this.cache.clear();
        this.updateCacheDisplay();
        this.showStatus('Cache wurde geleert', 'cache');
    }

    /**
     * Gibt Cache-Statistiken zurück
     */
    getStats() {
        const validEntries = [];
        const expiredEntries = [];
        
        for (const [key, entry] of this.cache.entries()) {
            if (Date.now() > entry.expirationTime) {
                expiredEntries.push(key);
            } else {
                validEntries.push({ key, ...entry });
            }
        }

        // Entferne abgelaufene Einträge
        expiredEntries.forEach(key => this.cache.delete(key));

        return {
            validCount: validEntries.length,
            expiredCount: expiredEntries.length,
            entries: validEntries
        };
    }

    /**
     * Aktualisiert die Cache-Anzeige im UI
     */
    updateCacheDisplay() {
        const stats = this.getStats();
        const cacheDetailsElement = document.getElementById('cacheDetails');
        
        if (stats.validCount === 0) {
            cacheDetailsElement.innerHTML = '<p>Cache ist leer</p>';
        } else {
            let html = `<p><strong>Gecachte Einträge:</strong> ${stats.validCount}</p>`;
            stats.entries.forEach(entry => {
                const remainingTime = Math.ceil((entry.expirationTime - Date.now()) / 1000);
                html += `
                    <div class="cache-entry">
                        <small>URL: ${entry.key}</small><br>
                        <small>Erstellt: ${entry.createdAt} | Läuft ab in: ${remainingTime}s</small>
                    </div>
                `;
            });
            cacheDetailsElement.innerHTML = html;
        }
    }

    /**
     * Zeigt Status-Nachrichten an
     */
    showStatus(message, type = 'info') {
        const statusElement = document.getElementById('cacheStatus');
        statusElement.textContent = message;
        statusElement.className = `cache-status ${type}`;
        
        // Status nach 3 Sekunden ausblenden
        setTimeout(() => {
            statusElement.textContent = '';
            statusElement.className = 'cache-status';
        }, 3000);
    }
}

class FoxApiClient {
    constructor() {
        this.cache = new ApiCache();
        this.foxApiUrl = 'https://randomfox.ca/floof/';
        
        this.initEventListeners();
        
        // Cache-Display alle 1 Sekunde aktualisieren für Countdown
        setInterval(() => {
            this.cache.updateCacheDisplay();
        }, 1000);
    }

    /**
     * Event-Listener für Buttons initialisieren
     */
    initEventListeners() {
        const fetchBtn = document.getElementById('fetchFoxBtn');
        const clearBtn = document.getElementById('clearCacheBtn');

        fetchBtn.addEventListener('click', () => this.fetchFoxImage());
        clearBtn.addEventListener('click', () => this.clearCache());
    }

    /**
     * Lädt ein Fuchsbild mit Caching-Logic
     */
    async fetchFoxImage() {
        const url = this.foxApiUrl;
        let fromCache = false;
        let foxData = null;

        try {
            // Erst im Cache nachsehen
            const cachedEntry = this.cache.get(url);
            
            if (cachedEntry) {
                foxData = cachedEntry.data;
                fromCache = true;
                this.cache.showStatus('Daten aus Cache geladen! 🚀', 'cache');
            } else {
                // Neue Anfrage stellen
                this.cache.showStatus('Lade neues Fuchsbild...', 'loading');
                
                const response = await fetch(url);
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                
                foxData = await response.json();
                
                // Im Cache speichern
                this.cache.set(url, foxData);
                this.cache.showStatus('Neues Bild geladen und gecacht! ✨', 'fresh');
            }

            this.displayFoxImage(foxData, fromCache);
            this.clearError();
            
        } catch (error) {
            await this.handleError(error, url);
        }
    }

    /**
     * Zeigt das Fuchsbild im UI an
     */
    displayFoxImage(foxData, fromCache = false) {
        const displayElement = document.getElementById('foxDisplay');
        
        displayElement.innerHTML = `
            <div class="fox-image-container ${fromCache ? 'from-cache' : 'fresh-data'}">
                <img src="${foxData.image}" alt="Zufälliger Fuchs" class="fox-image">
                <div class="data-source">
                    ${fromCache ? 
                        '<span class="cache-indicator">📱 Aus Cache</span>' : 
                        '<span class="fresh-indicator">🌐 Frisch geladen</span>'
                    }
                </div>
            </div>
        `;
    }

    /**
     * Leert den Cache
     */
    clearCache() {
        this.cache.clear();
    }
}

// App starten wenn DOM geladen ist
document.addEventListener('DOMContentLoaded', () => {
    const foxApp = new FoxApiClient();
    
    // Erste Cache-Display-Aktualisierung
    foxApp.cache.updateCacheDisplay();
    
    console.log('Fuchs-Cache-Demo gestartet!');
    console.log('Cache TTL:', foxApp.cache.defaultTTL / 1000, 'Sekunden');
});