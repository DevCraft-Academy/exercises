# UE1 - Analyse des Render-Prozesses

For this exercise, I profiled the loading of the https://www.derstandard.at/ website

Reflows: 2 (caused by the loading in of the navigation menu on the left side)

Paints: 5 (a bit hard to track as the exact number is not shown, but this is approximately the result from the timeline)

There is one clear blocker in the timeline, that took longer than any other step. This seems to be some script related to ads that should load some extra content to be shown on the page.