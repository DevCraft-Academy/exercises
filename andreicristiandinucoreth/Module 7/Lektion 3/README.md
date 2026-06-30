# UE - APIs

1. Logging-middleware, regarding the different `morgan` output formats:
    - `combined` is the standard apache combined log format, shows both the endpoint called and the user-agent
    - `dev` also shows info regarding response time
    - you can also build your own custom format by using their predefined tokens.

4. Reflexion:
    - How middleware helped my API: It adds neccessary functionality to my code, authentication is important to make sure that only authorized users get access to the information on our server, logging is very important for tracking issues and performance of our application.
    - How can we improve the header check middleware: right now we are only checking for the api key, we could be checking for other properties as well. For example if we have an auth system that provides a Session-Token, we can check for the validity of that token. Also if we have a system to only allow acces for specific resources, we can check if the user is authorized to access that resource.
    - What else can be done with the middleware: we can add more layers, for example for caching, for attaching cookies before sending the response to the user, or for better error handling to be displayed to the user.