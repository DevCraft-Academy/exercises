Übungen "Security und Authentifizierung" - Tag 4
OAuth

Übung 1 - Fallstudienanalyse zu OAuth-Flows in Web-Anwendungen


1. Anmeldung bei Canva mit Google

Request URL: https://accounts.google.com/v3/signin/identifier?opparams=%253F&dsh=S890698315%3A1743177170015879&access_type=offline&client_id=779010036194-lf6spugv22vvj41pqjdj4d8k2tq7o5fd.apps.googleusercontent.com&ddm=1&o2v=2&prompt=consent&redirect_uri=https%3A%2F%2Fwww.canva.com%2Foauth%2Fauthorized%2Fgoogle&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&service=lso&state=4e15563a-f77d-4ade-9b38-6642233c9ebe&flowName=GeneralOAuthFlow&continue=https%3A%2F%2Faccounts.google.com%2Fsignin%2Foauth%2Fconsent%3Fauthuser%3Dunknown%26part%3DAJi8hAO9GaYmHQQ8TluxxUF3geEBd9Uyex0eA56uGRTzUG-kyo56RC3hykUkB7QadVZyTUUkgiXCZLgi-xsY61afTO4_EhDI68Dqk5seOZ0wBXnC1qDi6qqakXm1n8EUdiDDdJzdwHRSNIANe1LLDul0p8wInyk1RBqO2I5nxJcvAwfejmyioUxTa0OAUUPX_800S7drBNdU4MoruVdjkjwHjESrZHAE1p-J2s2rZ2PDCXyHbKixtFWnu8mJDVXbLWTNMr0yOYWmtlDc4xp1l9U0aXbgAl9Vp2_fPC7a-cyte2qdngTs8W4Cj3RtVLxaahcbZbeAQhxY6lMVAbHAZVIMdVW7V_vs0O9k19vtFPPGQELYO49C44HeoaLsM7bPnWS0vq_haEOmZtOL9NZFlB0OaL4ywwMW1ekrks91f44D62FrhkHARMLraBIJdEnW2FDmfP5X77cWD1q2HjxBqMrSSQbEpVvVAg%26flowName%3DGeneralOAuthFlow%26as%3DS890698315%253A1743177170015879%26client_id%3D779010036194-lf6spugv22vvj41pqjdj4d8k2tq7o5fd.apps.googleusercontent.com%23&app_domain=https%3A%2F%2Fwww.canva.com&rart=ANgoxcd....
-> auf diese Seite wird der Request für die Authorisierung geschickt mit Autorisierungstoken in den GET-Parametern
-> hier fällt mir der Parameter "GeneralOAuthFlow" auf

Dann macht die Anwendung einen Ajax-Call mit dem Titel "createBatch"
Request URL: https://www.canva.com/_ajax/ae/createBatch
er schickt in der Payload irgendwelche Buchstaben und Zahlenkombinationen, tw. auch mit Timestamp mit

Dann wartet er (traces) bis ich mich im zweiten Fenster angemeldet habe

Weiterer Request(login2):
Request URL: https://www.canva.com/_ajax/csrf3/login2
-> Hier holt sich die Anwendung einen CSRF-Token, damit der Authentifizierungsprozess geschützt ist

Dann gibt es mehrere Requests an Cloudflare (auch schon vorher)

Dann gibt es einen weiteren login2 Request mit einem Ajax-Call:
Request URL: https://www.canva.com/_ajax/login2
-> hier kommen mehrere Cookies zurück, die Session Cookies sein könnten

Danach bin ich bei Canva angemeldet

Fazit: Ich glaube, dass es sich um einen Authorization Code Flow handelt, weil man nicht wirklich viel nachvollziehen kann
Daraus schließe ich, dass hier eine Server zu Server Kommunikation stattfindet



2. Anmeldung bei Trello mit Google


Ich werde wieder zur Anmeldemaske von Google weitergeleitet:
https://accounts.google.com/v3/signin/identifier?opparams=%253F&dsh=S103435545%3A1743178667405493&client_id=596149463257-9oquqfivs9on8t8erq23c8qso6vk3cp1.apps.googleusercontent.com&code_challenge=w8TFccE9gTmVZG1JW-OF669bNgAcu51BiIn3sipJQBE....
-> Hier fällt mir die Code Challenge in den GET-P

Es werden mehrere Requests weg geschickt, u. a. dieser:
Request-URL: https://play.google.com/log?format=json&hasfast=true&authuser=0
-> authuser = 0 bedeutet wahrscheinlich, dass die Anwendung den User noch nicht identifiziert hat

Ich habe jetzt Mailadresse und Passwort bestätigt. Hier fällt mir dieser Request auf:
https://www.gstatic.com/_/mss/boq-identity/_/js/k=boq-identity.OAuthUi.de.0iQyMStZsTA.es5.O/ck=boq-identity.OAuthUi.ZGRfiRHlwoY.L.B1.O/a.....
Hier scheinen auch über Google irgendwelche Tokens und Parameter zur Authentifizierung ausgetauscht zu werden

In Atlassian anmelden -> weiter
hier wird man dann auf Atlassian weitergeleitet und es gibt einen Request mit dem Titel auth?response
https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=596149463257-9oquqfivs9on8t8erq23c8qso6vk3cp1.apps.googleusercontent.com&code_challenge=w8TFccE9gTmVZG1JW-OF669bNgAcu51BiIn3sipJQBE.....
-> Hier scheint mir bin ich angemeldet, es wird Zugriff auf die notwendigen Daten erteilt(apps.googleusercontent) und eine code challenge wird wieder mitgeliefert

Fazit: Da wiederholt Code Challenges mitgeschickt werden komme ich zum Schluss, dass es sich um einen Authorization Code Flow mit PKCE handelt.







