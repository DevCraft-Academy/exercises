# UE - Backend Security

Identified issues:

1. Database Credatials are hardcoded and not stored in an env file (user, host, dbname, password, port)
2. Potential for SQL injection, no prepared statements.
3. Passwords are saved cleartext.
4. There is an endpoint to show all users (and passwords)!
5. You can change the username without checking access rights (at least password?).
6. Error handling missing for some sensitive steps, like db connection.
7. No limiting for login attempts.
8. No validation of inputs from request bodies (potential for XSS).
9. No Session Management for logged in users.