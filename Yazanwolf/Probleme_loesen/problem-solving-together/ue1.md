# The functionalities of the website:
 
Backend API: 
    - Login/Register Robin
        implementing registration as well as login
        securing all endpoints for authorized users.
    - Product: Luca
        CRUD operations including Creating, Reading, Updating and Deleting.
        Endpoint for fetching all products implementing pagination
        Endpoint for fetching products by name.
        Endpoint for checkout and payment.

Page design: Ameer & Kai "The may choose between the tasks or maybe work on them using pair programming"
 - Create a design for register page
 - Create a design for login page
 - Create a design for cataloge page
 - Create a design for product page
 - Create a design for cart page

frontend:
 Layout: Amir & Kai "The may choose between the tasks or maybe work on them using pair programming"
    - create login page:
        The page contains a form including two input fields aligned vertically: email and password.
        underneath the input fields is a login button.
        underneath the login button is a "register" link.

    - register page:
        The page contains a form including the following input fields aligned vertically:
        1- First name
        2- Last name
        3- Date of birth
        4- Address
        5- Email
        6- Password
        underneath the input fields is a register button

    - Craeate cataloge page:
        The page contains all the products.
        each product is in the form of a card containing photo and name and price of the product.
        at the top of the page is an input field with a place holder "product name" followd by a search button.

    - Create product page:
        At the top of the page comes the name of the product followd by a photo slide of the product underneath it.
        Directly below the photo slide is the price of the product followed by a button called "Add to cart".
        Right Below the "Add to cart" button is a detailed description.

    - Create cart page:
        The page consists of a list of the added products aligned vertically at the left side of the page.
        At the right side of the page is a checkout dialoge, this dialoge consists of the total price, the address and a checkout button.
        
 API integration: Kim
    - Login page: add functionality to the login button as well as the register link.
        Valiation:
        - Email must have the correct format.
        - Password Can not be empty.
        if any of the previous validation didn't success the user must see a note accordingly
        and the login button must be deactivated.
    - Register page: add functionality to the register button.
        Valiation:
        - All input fields are required.
        - Email must have the correct format.
        - Password must follow a strict format: including capital letters small letters numbers and symbols.
        - Date of birth must be over 16.
        if any of the previous validation didn't success the user must see a note accordingly
        and the register button must be deactivated.
    - Cataloge page: 
        Add functionality to the search button:
            By clicking on it the pages refreshes showing only the products filtered by the name provided in the search field.
        Implement pagination:
            the user sees only 20 products per page.
            the user can switch between the pages by clicking either on the page's number or right/left arrow.
    - Cart page:
        Implement the sliding photos and the checkout functionality (Will not go in detail as it's not requested).
