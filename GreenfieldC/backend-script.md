#!/bin/bash

# === Konfiguration ===

# IP-Adresse oder Hostname des Servers, von dem das Backup gezogen wird
SERVER_IP="server_ip"

# Benutzername für den SSH-Zugriff auf den Remote-Server
REMOTE_USER="username"

# Pfad zum Verzeichnis auf dem Server, das gesichert werden soll
# Das `*` am Ende bedeutet, dass alle Dateien und Unterordner kopiert werden
REMOTE_DIR="/pfad/zum/backup/verzeichnis/auf/server/*"

# Lokales Verzeichnis, in dem die Backups gespeichert werden sollen
LOCAL_DIR="/pfad/zum/lokalen/speicherort"

# Pfad zum privaten SSH-Schlüssel für die Authentifizierung beim Server
SSH_KEY="/pfad/zu/deinem/privaten/ssh/schluessel"

# === Backup-Verzeichnis vorbereiten ===

# Es wird ein Unterverzeichnis mit aktuellem Datum und Uhrzeit erstellt,
# damit jedes Backup in einem separaten Ordner landet
BACKUP_DIR="${LOCAL_DIR}/backup_$(date +%Y%m%d_%H%M%S)"

# Erstellt das Backup-Verzeichnis, falls es noch nicht existiert
mkdir -p "$BACKUP_DIR"

# === Backup durchführen ===

# Gibt den Pfad des Backup-Ziels in der Konsole aus
echo "Starte Backup in das Verzeichnis: $BACKUP_DIR"

# Führt den Kopiervorgang aus:
# - `-i` gibt den privaten Schlüssel an
# - `-r` kopiert rekursiv (inkl. Unterverzeichnissen)
scp -i "$SSH_KEY" -r ${REMOTE_USER}@${SERVER_IP}:"${REMOTE_DIR}" "${BACKUP_DIR}/"

# === Erfolgskontrolle ===

# Prüft, ob der letzte Befehl (scp) erfolgreich war
if [ $? -eq 0 ]; then
  echo "Backup erfolgreich: ${BACKUP_DIR}"
else
  # Gibt eine Fehlermeldung auf stderr aus und beendet das Skript mit Fehlercode 1
  echo "Fehler beim Backup" >&2
  exit 1
fi
