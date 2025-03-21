# UE1 - URL-Zerlegung

https://www.theverge.com/search?q=android

- Schema: https://
- Domain: www.theverge.com
- Port: - (probably default 443)
- Pfad: /search
- Query-Parameter: &q=android
- Fragment: -


https://devcraft.academy/#program-details

- Schema: https://
- Domain: devcraft.academy
- Port: - (probably default 443)
- Pfad: /
- Query-Parameter: -
- Fragment: #program-details


https://en.wikipedia.org/wiki/URL

- Schema: https://
- Domain: en.wikipedia.org
- Port: - (probably default 443)
- Pfad: /wiki/URL
- Query-Parameter: -
- Fragment: - 

What is common:
- All the URL examples use a Schema and a Domain. The port also is always defined, but the broswer usually does not show it, in case it is the default port for that protocol. (in these examples, 443 for https). Also, the 'route' is usually at least a simple '/' to signify the root (but that is not always given for every URL)

What is different:
- The query parameter and the fragment parts are not used for every URL, as they are usually used for those specific behaviours (here, a search page, and the targeting of a specific section of the page)