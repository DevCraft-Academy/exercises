## https://www.wikipedia.de/
Here is the sequence of the loaded resources:
1- Doc: The html resource is loaded: www.wikipedia.de encoded with gzip, it will be decoded and parsed first.
2- CSS: The style.css is loaded next so that the html elements are styled correctly.
3- Img: The logo of wikipedia is loaded next in the form of .svg
4- JS: Blocking JavaScript files are then loaded then so that they modify the DOM.

The position of an HTML element affects the order of loading the resources, because while parsing the html
resource, the resources will be loaded when found, for example, script tags which contain javascript code,
are blocking, as the pause the parsing of the DOM, until they are downloaded and executed, unless the contain
the "async" attribute, then they will be loaded asynchronously.
it's important for css files to be loaded at first so that the html elements get the correct styling.

