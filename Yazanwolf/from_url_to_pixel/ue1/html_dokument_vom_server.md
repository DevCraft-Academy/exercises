## Wrong version

HTTP/1.1 200 OK
Date: Wed, 16 Aug 2023 12:45:20 GMT
Server: Apache/2.4.41 (Unix)
Content-Length: 99999 => content-length is too large
Content-Encoding: gzip => response is not encoded
Content-Type: text/plain; charset=UTF-8 => content-type is text/html not plain
Connection: keep-alive
Cache-Control: no-cache, no-store
Expires: Tue, 15 Aug 2022 12:00:00 GMT => cache-control is set to no-cache no-store, thus no expires is needed, besides date is set to an already expired date.

<!DOCTYPE html>
<html>
  <head>
    <title>Testseite</title => closing ">" is missing.
    <script src="blockScript.js" sync></script> => blocking script should be at the end of html body, or async.
    <link rel=stylesheet type=text/css href="styles.css"> => should be placed at the beginning
  </head>
  <body>
    <h1 Willkommen!</h1> => opening tag misses a closing ">"
    <p>Hier ist ein einfacher Text</p>
  </body>
</html>
</html>

## Correct version

HTTP/1.1 200 OK
Date: Wed, 16 Aug 2023 12:45:20 GMT
Server: Apache/2.4.41 (Unix)
Content-Length: 289
Content-Type: text/html; charset=UTF-8
Connection: keep-alive
Cache-Control: no-cache, no-store

<!DOCTYPE html>
<html>
  <head>
    <title>Testseite</title>
    <link rel=stylesheet type=text/css href="styles.css"/>
  </head>
  <body>
    <h1> Willkommen!</h1>
    <p>Hier ist ein einfacher Text</p>
    <script src="blockScript.js" sync></script>
  </body>
</html>