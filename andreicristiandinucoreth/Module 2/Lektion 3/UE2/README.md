# UE2 - Ladereihenfolge einer Webseite

Analyzing the order of the requests shown in the Dev Tools Network tab when loading https://www.wikipedia.de/

- The first resource loaded is of course the HTML of the page

- This is then followed by the Stylesheet, and then an image, various scripts, and two more icons towards the end

- This order is dictated by the order in which those linked resources show up in the HTML. The link to the stylesheet is included in the `<head>` so it is requested first. There is no other script mentioned in the `<head>` so we then need to look at the `<body>` content. There, the image (logo) is referenced first, so this is the next resource to be loaded. At the end of the `<body>` we then have the links to all the scripts, and they get loaded in the order that they are referenced.