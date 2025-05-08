# UE - Code Review


1. HTML file
    - Good to load the script at the end of the body to not block the rendering
    - Document is structured well
    - Should add a `label` tag to accompany the input
    - Also you can use some semantic html tags for the structure of the page, for example wrapping the `task-container` and `task-list` into a `main` tag


2. CSS file
    - Would be good to add a custom outline style for elements that can be focused on with keyboard navigation
    - The usage of ids for css selectors is usually discouraged but this seems to be a small enough use case so it is in order. Otherwise use class names
    - Styles are good, page looks good and is responsive, color contrasts are also ok.

3. JS file
    - It's good that the code is running on 'DOMContentLoaded'
    - The `listItem.innerHtml` line could be refactored by separately creating the `span` and `button` nodes and appending them to the `listItem`. This would also make the `querySelector` on lne 17 obsolete as we would already have a reference to that DOM node.
    - Also, the current usage of `innerHTML` would be prone to code injection attacks in the input! This is a significant security risk!
    - Good that the value from the input is first trimmed before executing.