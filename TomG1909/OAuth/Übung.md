Beispiel: Spotify Web Player

Ablauf:
Authorization Request: Weiterleitung zu Spotify Login
User Authorization: Benutzer meldet sich an
Authorization Code: Callback mit temporärem Code
Token Exchange: Frontend tauscht Code + Verifier gegen Access Token
API Access: Authentifizierte Spotify API Calls

Sicherheitsmerkmale
PKCE-Schutz:

Code Challenge/Verifier verhindert Code Interception Attacks
Kein Client Secret im Frontend erforderlich
Dynamische Sicherheit pro Session

Zusätzliche Maßnahmen:

State Parameter für CSRF-Schutz
Scope Limitation (minimale Berechtigungen)
Token Expiration (1 Stunde Laufzeit)

Bewertung der Angemessenheit
Sehr Angemessen

Optimal für SPAs - Keine Backend-Abhängigkeit für Token-Austausch
Consumer-App gerecht - Nahtlose User Experience
Modernste Sicherheit - PKCE ist State-of-the-Art für Public Clients
Standard-konform - Entspricht OAuth 2.0 Best Practices