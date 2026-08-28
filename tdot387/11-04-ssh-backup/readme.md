#!/bin/bash

## Regeln für Bash setzen:
## -e -> Script bricht ab, sobald ein Kommando nicht Fehlercode 0 hat
## -u -> Wenn Variablen nicht gesetzt sind, wird ein Fehler ausgegeben
## -o pipefail -> Wenn ein Teil der Pipeline fehlschlägt, schlägt die gesamte Pipeline fehl
set -euo pipefail

## Name des Users auf dem Server, hier entfernt
REMOTE_USER="xxx"

## IPv4 des Servers, hier entfernt
REMOTE_HOST="XX.XX.XXX.XX"

## Pfad eines Ordners innerhalb des /etc-Ordners vom Server
REMOTE_PATH="/etc/console-setup"

## Pfad des Backup-Ordners auf meiner Maschine
BACKUP_BASE="$HOME/backups/hetzner"

## Hier wird das Logfile gespeichert
LOG_FILE="$BACKUP_BASE/backup.log"

## Erzeugt ein Datum und formatiert dieses
TIMESTAMP="$(date +'%Y-%m-%d_%H-%M-%S')"

## Der Ordner der erstellt wird, wenn das Backup startet
BACKUP_DIR="$BACKUP_BASE/$TIMESTAMP"

## Legt beim Start des Scripts den Ordner an
mkdir -p "$BACKUP_DIR"

## Funktion, die Logs ausgibt
log() {
  echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

## Log-Message, sobald das Backup startet
log "Starte Backup von $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH"

## SCP-Call
## -r -> Rekursiv
## -p -> versucht, Berechtigungen (permissions) zu erhalten
## -o BatchMode=yes -> SSH fragt nicht nach PW, schlägt fehl, wenn kein Key-Auth
## if-Fkt: geht diese durch, also gibt sie true zurück, wird geloggt, dass alles geklappt hat
## falls nicht: Error mit Exitcode 1
## fi markiert des Ende des if-Blocks
if scp -r -p -o BatchMode=yes \
  "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH" \
  "$BACKUP_DIR"; then
  log "Backup erfolgreich abgeschlossen"
else
  log "ERROR: Backup fehlgeschlagen"
  exit 1
fi


Cronjob:

30 2 * * * /bin/bash /home/unixuser/scp-backup.sh >> /home/unixuser/backups/hetzner/cron.log 2>&1

