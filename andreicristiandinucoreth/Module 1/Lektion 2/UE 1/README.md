# UE 1 - Anmeldeformular

For this exercise I built a simple newsletter signup form using Semantic HTML elements.

1. First of all, the page has a simple structure using semantic HTML, with a `<header>` tag containing an `<h1>` header with a simple page title. The rest of the page is contained by a `<main>` tag indicating the main content part of the page.

2. The form is contained in a `<form>` tag with defined `action` and `method` properties, to use the browser functionality for collecting the form values and submitting the content.

3. The `inputs` have a defined `type` and are accompanied by a `label` linked to the inputs' `id`s, to allow for good readability and accessibility.

4. The email input uses the type `email` to take advantage of the browser validation for the email address.

5. Both the email and checkbox inputs have the `required` attribute, to signify they need to be provided for the form to be valid.

6. For submission, we use a `<button>` element, making it easy to identify the element responsible for an action, and by using `type="submit"` it also links the button with the submission action of the form. 