# Sending http requests from postman:

    - the following headers are preset in postman request:
        User-Agent, Accept, Accept-Encoding, Connection
    - only get method is allowed on the server:
         I've tried OPTIONS and received response code 405 with message: Method Not Allowed
    - Adding path to the get request:
        after localhost:8080 adding /devCraft-exercises/ as a path and executing the request
        I receive an HTML response, where the content of the devCraft's git content is included.
        I can navigate the content by adding "/" and the name of the folder I wnat to navigate, and
        execute the get request.
        trying to perform a get request on an unavailable path I receive a response code: 404 Not Found

# Which HTTP Method would have been logcial in which case:

    I can imagine allowing the api to receive requests to add a new data into a specific folder
    by allowing a put method, performed on the path of the folder e.g. http://localhost:8080/devCraft-exercises/Yazanwolf
    the name and type of the new data could be sent inside the request body as JSON object e.g.:
    { "type": "file", "name": "frontend-project" }
    The header Content-Type must be application/json
    When the execution is successful, then a response code 201 Created would be received.

