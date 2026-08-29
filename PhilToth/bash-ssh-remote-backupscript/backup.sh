#!/bin/bash
###############################################################################
# SSH Backup Script
# Erstellt ein Backup von einem entfernten Server via SCP
# Autor: Philipp Toth
# Erstellt am: 2025-12-21
###############################################################################

# -----------------------------
# KONFIGURATION
# -----------------------------

# SSH-Zugangsdaten
REMOTE_USER="user"
REMOTE_HOST="server-ip-or-hostname"

# Quellverzeichnis auf dem Server
REMOTE_PATH="/var/www/html"

# Lokales Backup-Verzeichnis
LOCAL_BACKUP_BASE="$HOME/backups"

# Logdatei
LOGFILE="$LOCAL_BACKUP_BASE/backup.log"

# Datum/Uhrzeit für Backup-Namen
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")

# Zielverzeichnis für dieses Backup
LOCAL_BACKUP_DIR="$LOCAL_BACKUP_BASE/backup_$TIMESTAMP"

#SSH Key
SSH_KEY="/pfad/zu/deinem/privaten/ssh/schluessel"

# -----------------------------
# VORBEREITUNG
# -----------------------------

# Backup-Verzeichnis anlegen
mkdir -p "$LOCAL_BACKUP_DIR"

# Prüfen ob Verzeichnis erstellt wurde
if [ $? -ne 0 ]; then
    echo "$(date) - FEHLER: Backup-Verzeichnis konnte nicht erstellt werden!" >> "$LOGFILE"
    exit 1
fi

# -----------------------------
# BACKUP STARTEN
# -----------------------------

echo "$(date) - Backup gestartet..." >> "$LOGFILE"

scp -r "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH" "$LOCAL_BACKUP_DIR" >> "$LOGFILE" 2>&1

# -----------------------------
# FEHLERPRÜFUNG
# -----------------------------

if [ $? -eq 0 ]; then
    echo "$(date) - Backup ERFOLGREICH abgeschlossen." >> "$LOGFILE"
else
    echo "$(date) - FEHLER beim Backup!" >> "$LOGFILE"
    exit 1
fi

# -----------------------------
# OPTIONAL: ALTE BACKUPS LÖSCHEN
# (älter als 14 Tage)
# -----------------------------

find "$LOCAL_BACKUP_BASE" -maxdepth 1 -type d -name "backup_*" -mtime +14 -exec rm -rf {} \;

echo "$(date) - Alte Backups bereinigt." >> "$LOGFILE"

exit 0
