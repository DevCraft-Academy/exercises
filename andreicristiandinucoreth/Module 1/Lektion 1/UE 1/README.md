# UE 1 - Was macht deine Lieblingswebsite?

For this exercise, I took a look at an article page from theverge.com (for example, this one: https://www.theverge.com/news/629949/star-wars-hunters-offline-october)

Looking into the HTML code of the page, we can see the use of some Semantic HTML elements:

1. There are several uses of `<nav>` elements to encapsulate various navigation features. For example, the main menu at the top of the page is contained in one such element (can be identified by `aria-label="Top Navigation"`).
    
    - This usage of the `<nav>` tag helps quickly identify content that can be used to navigate to other pages on the website. This is especially important for screen-readers or other crawlers that would look at the code, to correctly flag such navigation features

2. The main part of the page is wrapped in a `<main>` element.

    - This is useful to identify the section of the HTML code that actually contains the content of the page. A screen-reader can use this to skip any other navigation or extra-code and go directly to the content relevant for a user.

3. The section of the page that actually contains the blog article is wrapped in an `<article>` element.

    - This section basically exists as a complete and coherent unit of content, aptly containing in this case the blog 'article'. Screen-readers can easily recognize this as a meaningful piece of information.