#!/bin/bash

# ===============================
# Automatisiertes SCP-Backup-Skript
# Autorin: Rubina Weinzettl
# Zweck: Backups vom Remote-Server automatisiert per SCP ziehen
# =================================

# ======= Konfiguration =======
REMOTE_USER="rubina"
REMOTE_HOST="192.168.0.5"
REMOTE_DIR="/home/${REMOTE_USER}/backup"

# Lokales Zielverzeichnis für das Backup
LOCAL_BASE_DIR="/Users/rubinaw/Documents/_WebDevelopment/DevCraftAcademy/exercises/RubinaWeinzettl/09_Kryptographie/Tag_4_Anwendungen_SSH"

# Zeitstempel für eindeutige Backup-Verzeichnisnamen
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")

# Zielverzeichnis inkl. Zeitstempel
LOCAL_BACKUP_DIR="${LOCAL_BASE_DIR}/backup_${TIMESTAMP}"

# Log-Datei (alternativ: /var/log/backup_script.log)
LOG_FILE="${LOCAL_BASE_DIR}/backup_log.txt"

# ======= Backup durchführen =======
echo "[$(date)] Backup gestartet..." >> "$LOG_FILE"

# Backup-Verzeichnis erstellen
mkdir -p "$LOCAL_BACKUP_DIR"

# Ausführung des SCP-Kommandos
scp -r "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR}/" "$LOCAL_BACKUP_DIR" >> "$LOG_FILE" 2>&1

# Erfolg oder Fehler loggen
if [ $? -eq 0 ]; then
    echo "[$(date)] ✅ Backup erfolgreich nach: $LOCAL_BACKUP_DIR" >> "$LOG_FILE"
else
    echo "[$(date)] ❌ Fehler beim Backup-Vorgang!" >> "$LOG_FILE"
fi

# Optional: Ausgabe für manuelle Ausführung
echo "Backup abgeschlossen. Details siehe Log: $LOG_FILE"

