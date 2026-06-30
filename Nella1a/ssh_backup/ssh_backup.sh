#!/bin/bash

# exit script immediately if any command fails
set -e

# Configuration
REMOTE_USER="userone"
REMOTE_HOST="161.35.20.88"
REMOTE_FILE="/home/userone/backup.txt"
AUTH_KEY="~/.ssh/id_rsa"
LOCAL_DIR="./remote_backup/"
LOG_FILE="./remote_backup/scp_job.log"

# Timestamp
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")

# Derived values
BASENAME=$(basename "$REMOTE_FILE")
NAME="${BASENAME%.*}" # removes the extension
EXT="${BASENAME##*.}" # extracts the extension
LOCAL_FILE="${LOCAL_DIR}/${NAME}_${TIMESTAMP}.${EXT}"

# Copy file
echo "$(date -Iseconds) - Starting SCP" >> "$LOG_FILE"
scp -i "$AUTH_KEY" "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_FILE}" "$LOCAL_FILE"


# check if scp was succesfull
is_backup=${$?}

if $isbackup;then
 echo "backup was successfull"
 echo "$(date -Iseconds) - Copy successful: $LOCAL_FILE" >> "$LOG_FILE"
else
 echo "backup failed" >&2
 echo "$(date -Iseconds) - Copy failed: $LOCAL_FILE" >> "$LOG_FILE"
 exit 1
fi
