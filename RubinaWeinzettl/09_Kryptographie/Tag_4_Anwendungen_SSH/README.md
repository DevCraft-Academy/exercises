Script für Cronjob:
0 2 * * * /Users/rubinaw/Documents/_WebDevelopment/DevCraftAcademy/exercises/RubinaWeinzettl/09_Kryptographie/Tag_4_Anwendungen_SSH/backup_von_server.sh

Ich habe den Cronjob dann temporär auf "jede Minute" umgeschrieben, damit ich sehe, ob der Cronjob ausgeführt wird:

* * * * * /Users/rubinaw/Documents/_WebDevelopment/DevCraftAcademy/exercises/RubinaWeinzettl/09_Kryptographie/Tag_4_Anwendungen_SSH/backup_von_server.sh

Leider wurde der Cronjob nicht ausgeführt. Daraufhin habe ich den Cronjob nocheinmal geändert:

* * * * * /Users/rubinaw/Documents/_WebDevelopment/DevCraftAcademy/exercises/RubinaWeinzettl/09_Kryptographie/Tag_4_Anwendungen_SSH/backup_von_server.sh >> /Users/rubinaw/Documents/_WebDevelopment/DevCraftAcademy/exercises/RubinaWeinzettl/09_Kryptographie/Tag_4_Anwendungen_SSH/cron.log 2>&1

Im Log des Cronjobs sieht man, dass es ein Mac spezifisches Problem gibt, dass der Cronjob nicht in mein Verzeichnis schreiben kann. Das habe ich dann nicht mehr debuggt.