# UE - Der Inspektor

For this exercise I choose the page theverge.com to test out the Browser Inspector tool.

1. First, I wanted to reorganize the way the footer of the page is set up, from having two rows of links, into having two columns of links. I did this through editing the styles of the encapsulating divs, changing the flexbox properties to adjust the flex-direction and play a bit with the other properties to get a better alignment. I did this to see how an alternative layout would look, as many times the footer can be organized in columns.

2. Some of the pages have sometimes a sort of paywall popup that asks you to subscribe to see the article. As in those cases the actual article gets loaded in the background, we can use the inspector to simply remove the elements from the DOM responsible for the popup and overlay and overwrite any other styles that would prevent us to see the rest of the page (for example, overriding the overflow and the 'body' tag level).

3. Lastly, I wanted to see how the page would look with a different colro pallete, so I went into the styles tab and found the css variables defined for the color pallete and replaced them with other color combinations, to see how the page would look.