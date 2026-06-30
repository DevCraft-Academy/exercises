URL List:

# 1 https://www.youtube.com/watch?v=7zfXQY-8chg
    Schema/Protocol: https
    Domain: www.youtube.com
    Port: as it is not set, it would be the default port for https: 443
    path: /watch
    Query parameters: ?v=7zfXQY-8chg
    fragment: None

# 2 https://martinfowler.com/articles/microservice-testing/#anatomy-modules
    Schema/Protocol: https
    Domain: martinfowler.com
    port: 443
    path: /articles/microservice-testing
    Query parameters: None
    fragment: anatomy-modules

# 3 https://www.udemy.com/course/draft/1349722/learn/lecture/11544042?start=0#overview
    Schema/Protocol: https
    Domain: www.udemy.com
    port: 443
    path: /course/draft/1349722/learn/lecture/11544042
    Query: ?start=0
    fragment: overview

All URLs define the schema first "https" followed by the domain, those two are obligatory.
Without defining a path, you might get to the homepage therefore I would say the following are optional:
- path
- port
- fragments
- query parameters
