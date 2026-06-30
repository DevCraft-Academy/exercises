# UE - Conceptual Design of a Blog Platform Using the MVC Pattern

## 1. Model

### Data Structures

- **User**

  - `id` (unique identifier)
  - `username`
  - `email`
  - `passwordHash`
  - `role` (e.g., admin, author, reader)

- **Article**

  - `id` (unique identifier)
  - `title`
  - `content`
  - `authorId` (references User)
  - `createdAt`, `updatedAt`
  - `tags` (optional)

- **Comment**
  - `id` (unique identifier)
  - `articleId` (references Article)
  - `authorId` (references User)
  - `content`
  - `createdAt`

### Relationships

- A **User** can write multiple **Articles** and **Comments**.
- An **Article** is written by one **User** and can have multiple **Comments**.
- A **Comment** is written by one **User** and belongs to one **Article**.

## 2. View

### Article Reading Interface

- Clean, readable layout displaying:
  - Article title
  - Author name
  - Publication date
  - Article content
  - Tags (if any)
  - List of comments below the article

### Article Writing/Editing Interface

- Simple form with fields for:
  - Title
  - Content (rich text editor or markdown support)
  - Tags (optional)
- Buttons for saving, publishing, or discarding drafts

### Commenting Interface

- Comments displayed in chronological order under each article
- Each comment shows:
  - Author name
  - Date/time
  - Content
- Input box for adding a new comment (visible to logged-in users)

## 3. Controller

### Article and Comment Creation Logic

- Receives user input from forms (new article, edit article, new comment)
- Validates input (e.g., required fields, content length)
- Interacts with the Model to create or update records
- Redirects or updates the View to reflect changes

### Article Browsing and Retrieval

- Handles requests to view lists of articles (e.g., homepage, tag/category pages)
- Supports search and filtering (by author, tag, date)
- Fetches article and comment data from the Model and passes it to the View

### User Authentication and Authorization

- Manages user login, registration, and logout
- Ensures only authenticated users can create, edit, or delete articles/comments
- Checks user roles for permissions (e.g., only authors can edit their own articles, only admins can delete any comment)
- Handles error messages and access control feedback

## 4. Component Interaction (MVC in Action)

1. **User requests a page** (e.g., article list or detail):
   - Controller receives the request, queries the Model for data, and renders the View.
2. **User submits a form** (e.g., new article, comment):
   - Controller validates input, updates the Model, and updates the View accordingly.
3. **User logs in or out:**
   - Controller manages authentication, updates session state, and controls access to Views.

This separation ensures maintainability, scalability, and a clear structure for future enhancements.
