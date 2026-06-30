#!/bin/bash

SERVER_IP="ec2-13-60-69-248.eu-north-1.compute.amazonaws.com"  # Aus AWS Console kopieren
REMOTE_USER="ec2-user"                                    # Abhängig von AMI-Typ
REMOTE_DIR="/home/ec2-user/testdaten/*"           # Anzupassender Pfad
LOCAL_DIR="./backups"                                     # Lokaler Backup-Ordner
SSH_KEY="$HOME/.ssh/pemKey.pem"                         # Heruntergeladener AWS Key

# Backup-Verzeichnis mit Zeitstempel
BACKUP_DIR="${LOCAL_DIR}/backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

# Log-Datei für Cronjobs
LOG_FILE="./backup.log"
echo "$(date): Starte Backup nach $BACKUP_DIR" | tee -a "$LOG_FILE"

# SSH-Verbindung testen
echo "Teste SSH-Verbindung..." | tee -a "$LOG_FILE"
ssh -i "$SSH_KEY" -o ConnectTimeout=10 -o BatchMode=yes ${REMOTE_USER}@${SERVER_IP} "echo 'Verbindung OK'" 
if [ $? -ne 0 ]; then
    echo "$(date): FEHLER - SSH-Verbindung fehlgeschlagen" | tee -a "$LOG_FILE"
    echo "Debug Info:" | tee -a "$LOG_FILE"
    echo "SSH_KEY: $SSH_KEY" | tee -a "$LOG_FILE"
    echo "SERVER_IP: $SERVER_IP" | tee -a "$LOG_FILE"
    echo "REMOTE_USER: $REMOTE_USER" | tee -a "$LOG_FILE"
    exit 1
fi

# Backup mit SCP
echo "Kopiere Dateien von ${REMOTE_USER}@${SERVER_IP}:${REMOTE_DIR}"
scp -i "$SSH_KEY" -r ${REMOTE_USER}@${SERVER_IP}:"${REMOTE_DIR}" "${BACKUP_DIR}/" 2>&1 | tee -a "$LOG_FILE"

# Erfolg überprüfen
if [ $? -eq 0 ]; then
    echo "$(date): ✓ Backup erfolgreich: ${BACKUP_DIR}" | tee -a "$LOG_FILE"
    
    # Backup-Statistik
    SIZE=$(du -sh "$BACKUP_DIR" | cut -f1)
    FILES=$(find "$BACKUP_DIR" -type f | wc -l)
    echo "$(date): Größe: $SIZE, Dateien: $FILES" | tee -a "$LOG_FILE"
    
    # Alte Backups löschen (älter als 30 Tage)
    find "$LOCAL_DIR" -type d -name "backup_*" -mtime +30 -exec rm -rf {} \; 2>/dev/null
    echo "$(date): Alte Backups bereinigt" | tee -a "$LOG_FILE"
else
    echo "$(date): ✗ FEHLER beim Backup" | tee -a "$LOG_FILE"
    exit 1
fi