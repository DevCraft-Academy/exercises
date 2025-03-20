# UE1 - Artikelvorschau mit Rich Snippets

For this exercise I teste an article on theverge.com to see if Rich Snippets get generated correctly. https://www.theverge.com/news/631826/google-pixel-9a-specs-price-availability

Using the Rich Resulting Testing Tool, there are two structured data items identified, an "Article" and "Breadcrumbs".

First, the Breadcrumbs identified are represented by the single "News" list item shown just above the title of the article. My guess is that, as the link used on this element matches part of the path of the article URL, it is interpreted correctly as a Breadcrumb. A potential improvement here would be adding an `aria-label="breadcrumb"` to the element.

For the "Article", the website uses good semantic HTML in that the content is correctly structured inside a `<main>` tag, which then contains an `<article>` tag with the article content itself. The Testing Tool also identifies a lot of additional parameters, most likely coming from the various `<meta>` tags used in the `<head>`, which provide much more information that an SEO can use to build the Rich Snippets.

On top of that, the one image used in the body of the article has proper `alt` description. But the image used in the header, as well as the ones used further down in the carrousel don't, or have some random string. This is a detail that could be improved

All in all, the article provides a lot of information to be used by the Rich Snippets, and seems to use Semantic HTML correctly.