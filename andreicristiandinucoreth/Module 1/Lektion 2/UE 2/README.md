# UE 2 - Beherrsche die Überschriften-Hierarchie

I decided for this exercise to look at a page containg various titles and subtitles: https://en.wikipedia.org/wiki/HTML

(Note: I only analysed part of the page as the content is quite long)

My hierarchy proposal for the titles would be as follows:

```
<h1>HTML</h1>
    <h2>History</h2>
        <h3>Development</h3>
        <h3>HTML version timeline</h3>
            <h4>HTML 2</h4>
                <h5>November 24, 1995</h5>
            <h4>HTML 4</h4>
                <h5>January 14, 1997</h5>
                ...
        <h3>HTML draft version timeline</h3>
    ...
    <h2>Markup</h2>
    ...
```

Comparing my solution to the actual code, we see that most heading levels match, regarding the `h1`, `h2`, `h3` and `h4` levels. 
The `h5` heading from my solution is in actuality a different element specific to the page implementation. But, at this hierarchy depth and considering the content, this might make more sense in the real implementation.
Also important to note, the `h1` tag actually contains first a `span` element, that then contains the title text (`<h1><span>HTML</span></h1>`). This is likely specific to the styling used by the page, but still allows for clear identification of the main heading.