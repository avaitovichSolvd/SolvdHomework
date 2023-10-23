# API Documentation

This document contains information on how to use the API for the legal services server.

## Base URL

The base URL for all API endpoints is:
http://localhost:3000


## Functions
### 1. Authorization (endpoints):


#### 1.1. Sign Up

- **URL:** `/auth/api/SignUp`
- **Method:** POST 
- **Description:** Register a new user.
- **Request Body:** JSON object with `username` and `password` fields.
  - `username` (string): The username of the new user.
  - `password` (string): The password for the new user.
- **Response:**
  - Success (HTTP 201 Created):
    - Returns a JSON object with a success message and an access token.
  - Error (HTTP 400 Bad Request):
    - Returns a JSON object with an error message if the request is missing fields or if the username already exists.
  - Error (HTTP 500 Internal Server Error):
    - Returns a JSON object in case of a server error.

#### 1.2. Sign In

- **URL:** `/auth/api/SignIn`
- **Method:** POST 
- **Description:** Authenticate an existing user.
- **Request Body:** JSON object with `username` and `password` fields.
  - `username` (string): The username of the user.
  - `password` (string): The password of the user.
- **Response:**
  - Success (HTTP 200 OK):
    - Returns a JSON object with a success message and an access token upon successful authentication.
  - Error (HTTP 400 Bad Request):
    - Returns a JSON object with an error message if the request is missing fields.
  - Error (HTTP 401 Unauthorized):
    - Returns a JSON object with an error message if the username or password is invalid.
  - Error (HTTP 500 Internal Server Error):
    - Returns a JSON object in case of a server error.

#### 1.3. Get Users

- **URL:** `/auth/api/users`
- **Method:** GET 
- **Description:** Retrieve a list of all users.
- **Response:**
  - Success (HTTP 200 OK):
    - Returns a JSON object with an array of user objects.
  - Error (HTTP 500 Internal Server Error):
    - Returns a JSON object in case of a server error.

#### Example

Example of how to use the API with JavaScript:

**Sign Up Endpoint:**

```javascript
const userData = {
  username: "exampleUser",
  password: "password123"
};

const signUpURL = 'http://localhost:3000/auth/api/SignUp';

fetch(signUpURL, {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(userData)
})
  .then(response => response.json())
  .then(data => {
    ...
  })
  .catch(error => {
    ...
  });

