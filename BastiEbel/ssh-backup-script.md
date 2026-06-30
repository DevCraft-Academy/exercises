#!/bin/bash

# Konfiguration
REMOTE_USER="dein_benutzername"  # Benutzername für den Remote-Server
REMOTE_HOST="dein.server.com"      # Hostname oder IP-Adresse des Remote-Servers
REMOTE_DIR="/pfad/verzeichnis"  # Verzeichnis auf dem Remote-Server, das gesichert werden soll
LOCAL_DIR="/pfad/lokal/verzeichnis"  # Lokales Verzeichnis, in das die Backups gespeichert werden sollen

# Aktuelles Datum und Uhrzeit für den Backup-Namen
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_NAME="backup_$TIMESTAMP.tar.gz"

# Erstelle ein lokales Verzeichnis, falls es nicht existiert
mkdir -p "$LOCAL_DIR"

# SCP-Befehl zum Kopieren der Dateien vom Remote-Server
echo "Starte Backup von $REMOTE_HOST..."
scp -r "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR" "$LOCAL_DIR/$BACKUP_NAME"

# Überprüfen, ob der SCP-Befehl erfolgreich war
if [ $? -eq 0 ]; then
    echo "Backup erfolgreich: $LOCAL_DIR/$BACKUP_NAME"
else
    echo "Fehler beim Backup von $REMOTE_HOST"
    exit 1
fi # Schließt die Bedingung

Erklärung zu der if Bedingung
$?: Diese spezielle Variable enthält den Exit-Status des zuletzt ausgeführten Befehls. 
In Unix-ähnlichen Betriebssystemen gibt ein Befehl einen Exit-Status zurück, um anzuzeigen, ob er erfolgreich war oder nicht. 
Ein Exit-Status von 0 bedeutet in der Regel, dass der Befehl erfolgreich ausgeführt wurde, während ein Wert ungleich 0 auf einen Fehler hinweist.

-eq: Dies ist ein Vergleichsoperator, der "gleich" bedeutet. Er wird verwendet, um zwei numerische Werte zu vergleichen.

0: Dies ist der Wert, mit dem der Exit-Status verglichen wird. In diesem Fall wird überprüft, ob der Exit-Status des vorherigen Befehls gleich 0 ist.
