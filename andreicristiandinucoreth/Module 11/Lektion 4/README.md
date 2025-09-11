# Uebung 1 - OAuth Flow

## Authorization Code Flow

Chosen Site: Reddit
Chosen OAuth provider: Google

How the process works:

1. User initiates the login: In the login window, click on "Log in with Google"
2. Redirected to a Google page where the user signs in with the Google account.
3. The user is asked to approve the requested permission. (with a short description of data will be used)
4. Redirected back to the Reddit page with an authorization code.
5. Reddit sends the code to Google's server to get the access token.
6. Reddit uses the token to access the user data and perform the login.

This is a pretty standard OAuth flow and it is likely implemented properly, as this is a pretty big and well known website. It was not easy to follow the whole flow through dev tools because there are many other requests happening in parallel, but I used information available on the internet to fill in the gaps.

## Is the OAuth flow appropriate for this application?

The OAuth Authorization Code Flow is appropriate for Reddit's login system. It provides several security benefits:

- **Delegated Authentication:** Users can log in using their Google account without sharing their credentials with Reddit.
- **Token-Based Access:** Reddit receives an access token instead of the user's password, reducing the risk of credential theft.
- **Limited Scope:** Permissions requested are clearly defined, so Reddit only accesses the data it needs.
- **Revocation:** Users can revoke Reddit's access from their Google account at any time.
- **Protection Against CSRF:** The flow includes state parameters to prevent cross-site request forgery attacks.

Overall, this flow enhances security and user privacy while simplifying the login process.
