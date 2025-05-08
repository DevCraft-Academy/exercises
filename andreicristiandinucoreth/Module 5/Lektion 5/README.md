
Had to increase the loop size to 100_000 to get some noticeable slowness for easier testing.
Also adjusted the style to make the items more like 'pixels' on a big grid, it makes the whole rendering process more visual.

Optimizations:

1. Render the list in chunks instead of waiting for the whole loop to finish.
    - This way you can interact with the page while the generation occurs, but the overall time for the list to finish generating is significantly higher

2. Lazy Load only the elements that are in view. 
    - looked into a few options on how this can be done, using IntersectionObserver, but did not adapt our exercise to that.