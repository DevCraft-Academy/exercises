# Tägliches Datenbackup:

## 1. Aufgabe: Plane ein tägliches Backup eines Verzeichnisses namens /important-data in ein Backup-Verzeichnis /backup-folder um 3 Uhr morgens.

Cron-Expression: 0 3 * * *

Befehl: cp -r /important-data /backup-folder

## 2. Log-Rotation:

Aufgabe: Rotiere Log-Dateien jeden Sonntag um Mitternacht, um zu verhindern, dass sie zu groß werden. Deine Logs befinden sich in /var/log/myapp/.

Cron-Expression: 0 0 * * 0

Befehl: logrotate /etc/logrotate.d/myapp

## 3. Geplante Benachrichtigungen:

Aufgabe: Sende täglich um 9 Uhr morgens E-Mails mit Systemstatusberichten.

Cron-Expression: 0 9 * * *

Befehl: mail -s "Täglicher Systemstatus" [email protected] < /pfad/zu/systemreport.txt

## 4. Regelmäßige Bereinigung:

Aufgabe: Plane ein Bereinigungsskript, das jeden Samstag um 14 Uhr läuft, um temporäre Dateien aus dem Verzeichnis /tmp zu entfernen.

Cron-Expression: 0 14 * * 6

Befehl: rm -rf /tmp/*

## 5. Individuelle Aufgabe:

Aufgabe: Erstelle einen individuellen Cron-Job für eine Aufgabe deiner Wahl. Definiere den Zeitplan und den auszuführenden Befehl. Sei kreativ!

Cron-Expression: 15 12 * * *

Befehl: /usr/bin/python3 /home/username/scripts/random_motivation.py
