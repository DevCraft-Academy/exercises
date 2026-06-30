# UE - Cron Jobs

1. Daily Data Backup

- Cron Expression: 0 3 * * * (Every day, 3:00)

- Command: rsync -avz /important-data/ /backup-folder/

2. Log Rotation

- Cron Expression:0 0 * * 0 (Every Day that is Sunday, 0:00) 

- Command: logrotate /etc/logrotate.d/myapp

3. Planned Notification

- Cron Expression: 0 9 * * * (Every day, 9:00)

- Command: mail -s "Status Report" < /status-report/status_report.txt

4. Regular Cleanup

- Cron Expression: 0 14 * * 6 (Every Day that is Saturday, 14:00)

- Command: find /tmp -type f -attime +7 -delete

5. Individual Task

Update all local package lists and install updates, every tuesday at 4:30 AM

- Cron Expression: 30 4 * * 2

- Command: sudo apt update && sudo apt upgrade -y