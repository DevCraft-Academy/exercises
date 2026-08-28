#!/bin/bash

# Variablen
SERVER_USER="testuser"
SERVER_HOST="localhost"
SERVER_PORT=2222
REMOTE_PATH="~/data/"
LOCAL_BACKUP_DIR="./backups/$(date +'%Y-%m-%d_%H-%M-%S')"
SSH_KEY="C:/Users/Viktor und Laura/.ssh/docker_backup_key"

# Backup-Verzeichnis anlegen
mkdir -p "$LOCAL_BACKUP_DIR"

# Dateien vom Server kopieren
scp -i "$SSH_KEY" -P $SERVER_PORT -r "$SERVER_USER@$SERVER_HOST:$REMOTE_PATH" "$LOCAL_BACKUP_DIR"


echo "✅ Backup abgeschlossen: $LOCAL_BACKUP_DIR"

bash