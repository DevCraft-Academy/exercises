# UE1 - HTTP-Methoden im Einsatz

Testing following requests:

- GET http://localhost:8080

    - http-server returns an answer with a generic html page representing the index of the folder the server was started from
    - if there is an `index.html` file at the requested route, that html file gets delivered instead
    - This type of request is used for fetching static content from a server

- POST http://localhost:8080 , with Body: {"name": "Max", "age": 25}

    - http-server returns a 404 error as it was not set up to handle the POST 
    - This type of request is used to send data to a server

- PUT http://localhost:8080 , with Body: {"name": "Max", "age": 25}

    - same result as with the POST method, as there is no defined behaviour for this in this basic configuration
    - This type of request is used to replace an existing resource with the provided data

- DELETE http://localhost:8080 

    - similarly, 404 response, this is not set up
    - This type of request is used to delete a resource from the server

- OPTIONS http://localhost:8080 

    - although I was expecting there to be some default answer http-server for this type of request, there was also a 404 returned, showing that this is as well not set up
    - This type of request is used to check what type of requests are supported by the server