1. Tägliches Datenbackup
   
Cron-Expression: 0 3 * * *
Befehl: cp -r /important-data /backup-folder

2.Log-Rotation
Cron-Expression: 0 0 * * 0
Befehl: logrotate /etc/logrotate.d/myapp

3.Geplante Benachrichtigung
Cron-Expression: 0 9 * * *
Befehl: bash /path/to/system-status-report.sh

4.Regelmäßige Bereinigung
Cron-Expression: 0 14 * * 6
Befehl: rm -rf /tmp/*

5.Individuelle Aufgabe
Cron-Expression: 0 8 * * 1
Befehl: bash /path/to/server-load-summary.sh
Ergebnis: Wöchentliches Zusammenfassung der Serverauslastung jeden um Montag 8 Uhr
