Tägliches Datenbackup:

Aufgabe: Plane ein tägliches Backup eines Verzeichnisses namens /important-data in ein Backup-Verzeichnis /backup-folder um 3 Uhr morgens.

Cron-Expression: 0 3 * * *

Befehl: /usr/bin/rsync -av /important-data/ /backup-folder/

Log-Rotation:

Aufgabe: Rotiere Log-Dateien jeden Sonntag um Mitternacht, um zu verhindern, dass sie zu groß werden. Deine Logs befinden sich in /var/log/myapp/.

Cron-Expression: 0 0 * * 0

Befehl: /usr/sbin/logrotate /etc/logrotate.d/myapp

Geplante Benachrichtigungen:

Aufgabe: Sende täglich um 9 Uhr morgens E-Mails mit Systemstatusberichten.

Cron-Expression: 0 9 \* \* \*

Befehl: /usr/bin/uptime | /usr/bin/mail -s "Täglicher Systembericht" admin@example.com

Regelmäßige Bereinigung:

Aufgabe: Plane ein Bereinigungsskript, das jeden Samstag um 14 Uhr läuft, um temporäre Dateien aus dem Verzeichnis /tmp zu entfernen.

Cron-Expression: 0 14 * * 6

Befehl: /usr/bin/find /tmp -type f -mtime +1 -delete

Individuelle Aufgabe:

Aufgabe: Erstelle einen individuellen Cron-Job für eine Aufgabe deiner Wahl. Definiere den Zeitplan und den auszuführenden Befehl. Sei kreativ!

Cron-Expression: 0 8 * * 1

Befehl: /usr/bin/logger -t motivation "Neuer Wochenstart – Sei produktiv und bleib fokussiert!"
