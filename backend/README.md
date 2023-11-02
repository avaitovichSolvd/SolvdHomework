# API Documentation Law Service

This document contains information on how to use the API for the legal services server.

**Description:** Our **lawyer matching platform** is a working system designed to make it easy to find the legal professional you need, connecting clients with qualified lawyers based on the lawyer's specialty, the opinions of other clients, and your budget. The system provides brief information about specialists and helps make a choice.

# Content
   **DB**
   - [Relationship diagram](#relationship-diagram)
   - [Tables](#tables)


   **Server**
   - [Authorization Endpoints](#authorization-endpoints)
      - Sign Up
      - Sign In
      - Get Users
   - [User's Profile Endpoints](#users-profile)
      - Delete User
      - Add lawyer in cart
      - Delete lawyer's card from user's cart
   - [Lawyer's Profile Endpoints](#lawyers-profile)
      - Add new lawyer
      - Update a lawyer profile
      - Delete lawyer profile 
   - [Filter And Get a List of Lawyers Endpoints](#filter-and-get-a-list-of-lawyers)
</br>

# DB: MySQL
## Relationship diagram
![image](https://github.com/avaitovichSolvd/SolvdHomework/assets/143712741/54f86b8f-2821-49ac-a7ca-baa7cbf80385)
</br>

## Tables
### 1. User
Information about User
| Key | Column name | Data type | Description |
|------------|------------|------------|------------|
| PK | id_user | int | Primery key for User |
|  | username | varchar(45) | User uniq name |
|  | password | varchar(45) | User password |

### 2. Lawyer
Information about Lawyer
| Key | Column name | Data type | Description |
|------------|------------|------------|------------|
| PK | id_lawyer | int | Primery key for lawyer |
|  | name | varchar(255) | Lawyer true name |
|  | branch_of_law | enum | Optional: 'Criminal law', 'Labor law', 'Corporate and commercial law', 'International law', 'Healthcare and medical law' |
|  | description | text | Description of the specialist's profile |
|  | rate | enum | Optional rate for lawyer: '1', '2', '3', '4', '5' |
|  | budget | decimal(10,2) | Cost of specialist services |

### 3. Cart
Information about User's CART of saved Lawyers
| Key | Column name | Data type | Description |
|------------|------------|------------|------------|
| PK | cart_id | int | Primery key for User's Cart |
| FK | username | varchar(45) | User uniq name |
| FK | lawyer_id | INT | Lawyer ID |
</br>
</br>


# Server: Node.js + Express.js
### Base URL

The base URL for all API endpoints is:
http://localhost:3000

</br>

[Content](#content)
## Authorization Endpoints

### 1.1. Sign Up

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
   

**Usage Example**
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
```
**Response Example**
```javascript
{
  "message": "Operation to add a new user was successful",
  "token": "eyJhbGciOiJIUzI1NiI...M5x9Mh1Z-0"
}
```
</br>


### 1.2. Sign In

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


**Usage Example**
```javascript
const userData = {
  username: "exampleUser",
  password: "password123"
};

const signInURL = 'http://localhost:3000/auth/api/SignIn';

fetch(signInURL, {
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
```
**Response Example**
```javascript
{
  "message": "Sign In successful",,
  "token": "eyJhbGciOiJI...M5x9Mh1Z-0"
}
```
</br>

### 1.3. Get Users

- **URL:** `/auth/api/users`
- **Method:** GET 
- **Description:** Retrieve a list of all users.
- **Response:**
  - Success (HTTP 200 OK):
    - Returns a JSON object with an array of user objects.
  - Error (HTTP 500 Internal Server Error):
    - Returns a JSON object in case of a server error.


**Usage Example**
```javascript

const getUsersURL = 'http://localhost:3000/auth/api/users';

fetch(getUsersURL, {
  method: 'GET',
  headers: {'Content-Type': 'application/json'},
})
  .then(response => response.json())
  .then(data => {
    ...
  })
  .catch(error => {
    ...
  });
```
**Response Example**
```javascript
{
  "users": [
    {
      "id_user": 1,
      "username": "testUser",
      "password": "test123456789"
    },
    {
      "id_user": 3,
      "username": "testUser02",
      "password": "test123456789"
    }
  ]
}
```
</br>
</br>

[Content](#content)
## User's Profile


### 1.1. Delete User

- **URL:** `/user/api/DeleteUser/{username}`
- **Method:** DELETE 
- **Description:** Delete a user.
- **URL Parameters:**
  - `username` (string, required): The username of the user to be deleted.
- **Response:**
- Success (HTTP 200 OK):
  - Returns a JSON object with a success message indicating that the user was deleted successfully.
- Error (HTTP 400 Bad Request):
  - Returns a JSON object with an error message if the `username` parameter is missing.
- Error (HTTP 404 Not Found):
  - Returns a JSON object with an error message if the specified user was not found.
-  Error (HTTP 500 Internal Server Error):
  - Returns a JSON object in case of a server error.
 

**Usage Example**
```javascript
const deleteUserURL = `http://localhost:3000/user/api/DeleteUser/${username}`;

fetch(deleteUserURL, {
  method: 'DELETE',
  headers: {'Content-Type': 'application/json'},
})
  .then(response => response.json())
  .then(data => {
    ...
  })
  .catch(error => {
    ...
  });
```
**Response Example**
```javascript
{
  "message": "User deleted successfully"
}
```
</br>

### 1.2. Add lawyer in cart

- **URL:** `/user/api/AddToCart`
- **Method:** POST 
- **Description:** Save lawyer's profile in user's cart.
- **Request Body:** JSON object with `username` and `lawyer_id` fields.
  - `username` (string): The username of the user.
  - `lawyer_id` (string): The id of the lawyer.
- **Response:**
 - Success (HTTP 200 OK):
   - Returns a JSON object with a success message and an access token upon successful authentication.
 - Error (HTTP 400 Bad Request):
   - Returns a JSON object with an error message if the request is missing fields.
 - Error (HTTP 500 Internal Server Error):
   - Returns a JSON object in case of a server error.


**Usage Example**
```javascript
const userCartData = {
  "username": "testUser",
  "lawyer_id": 2
};

const addToCartURL = 'http://localhost:3000/user/api/AddToCart';

fetch(addToCartURL, {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(userCartData)
})
  .then(response => response.json())
  .then(data => {
    ...
  })
  .catch(error => {
    ...
  });
```
**Response Example**
```javascript
{
  "message": "Lawyer profile added to the cart"
}
```
</br>

### 1.3. Get User's Cart

- **URL:** `/user/api/ViewCart/{username}`
- **Method:** GET 
- **Description:** Retrieve a list of saved items in user's cart.
- **Response:**
 - Success (HTTP 200 OK):
   - Returns a JSON object with the cart items when the request is successful.
 - Error (HTTP 400 Bad Request):
   - Returns a JSON object with an error message if the `username` parameter is missing.
 - Error (HTTP 404 Not Found):
   - Returns a JSON object with a message indicating that the cart is empty when no items are found.
 - Error (HTTP 500 Internal Server Error):
   - Returns a JSON object in case of a server error.



**Usage Example**
```javascript

const getUserCartURL = `http://localhost:3000/user/api/ViewCart/${username}`;

fetch(getUserCartURL, {
  method: 'GET',
  headers: {'Content-Type': 'application/json'},
})
  .then(response => response.json())
  .then(data => {
    ...
  })
  .catch(error => {
    ...
  });
```
**Response Example**
```javascript
{
  "cart": [
    {
      "id_lawyer": 1,
      "name": "testLawyer",
      "branch_of_law": "Criminal law",
      "description": "Experienced (15 years) criminal defense lawyer. Protecting your interests in criminal cases.",
      "rate": "5",
      "budget": "5000.00"
    }
  ]
}
```
</br>

### 1.4. Delete lawyer's card from user's cart

- **URL:** `/user/api/RemoveFromCart`
- **Method:** DELETE 
- **Description:** Removes the saved lawyer profile from the user's list.
- **Request Body:** JSON object with `username` and `lawyer_id` fields.
  - `username` (string): The username of the user.
  - `lawyer_id` (string): The id of the lawyer.
- **Response:**
- Success (HTTP 200 OK):
  - Returns a JSON object with a success message indicating the lawyer profile was successfully removed from the cart.
- Error (HTTP 400 Bad Request):
  - Returns a JSON object with an error message if the `username` and `lawyer_id` parameters are missing.
- Error (HTTP 404 Not Found):
  - Returns a JSON object with an error message if the specified lawyer profile was not found in the cart.
- Error (HTTP 500 Internal Server Error):
  - Returns a JSON object in case of a server error.

 

**Usage Example**
```javascript
const userLawyer = {
  "username": "testUser",
  "lawyer_id": 2
}

const deleteUserURL = `http://localhost:3000/user/api/RemoveFromCart`;

fetch(deleteUserURL, {
  method: 'DELETE',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(userLawyer)
})
  .then(response => response.json())
  .then(data => {
    ...
  })
  .catch(error => {
    ...
  });
```
**Response Example**
```javascript
{
  "message": "Lawyer profile successfully removed from the cart"
}
```
</br>
</br>

[Content](#content)
## Lawyer's Profile

### 1.1. Add new lawyer

- **URL:** `/lawyer/api/AddLawyer`
- **Method:** POST 
- **Description:** Register a new lawyer.
- **Request Body:** JSON object with ... fields.
  - `name` (string): The name of the new lawyer.
  - `branch_of_law` (string): Optional field of law: 'Criminal law', 'Labor law', 'Corporate and commercial law', 'International law', 'Healthcare and medical law'.
  - `description` (string): profile description.
  - `rate` (number): from 1 to 5.
  - `budget` (number): float nums support.
- **Response:**
 - Success (HTTP 201 Created):
   - Returns a JSON object with a success message indicating that the new lawyer was successfully added.
 - Error (HTTP 400 Bad Request):
   - Returns a JSON object with an error message if any of the required fields (`name`, `branch_of_law`, `rate`, `budget`) are missing.
 - Error (HTTP 500 Internal Server Error):
   - Returns a JSON object in case of a server error.

   

**Usage Example**
```javascript
const lawyerData = {
  "name": "testLawyer02",
  "branch_of_law": "Corporate and commercial law",
  "description": "Specializing in corporate and commercial law. Assisting with company registration and commercial matters.",
  "rate": 3,
  "budget": 2000
};

const newLawyerURL = 'http://localhost:3000/lawyer/api/AddLawyer';

fetch(newLawyerURL, {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(lawyerData)
})
  .then(response => response.json())
  .then(data => {
    ...
  })
  .catch(error => {
    ...
  });
```
**Response Example**
```javascript
{
  "message": "Operation to add a new lawyer was successful"
}
```
</br>


### 1.2. Update lawyer

- **URL:** `/lawyer/api/UpdateLawyer/{lawyer_id}`
- **Method:** PUT 
- **Description:** Update lawyer's profile.
- **Request Body:** JSON object with ... fields.
  - `name` (string): The name of the new lawyer.
  - `branch_of_law` (string): Optional field of law: 'Criminal law', 'Labor law', 'Corporate and commercial law', 'International law', 'Healthcare and medical law'.
  - `description` (string): profile description.
  - `rate` (number): from 1 to 5.
  - `budget` (number): float nums support.
- **Response:**
 - Success (HTTP 200 OK):
   - Returns a JSON object with a success message indicating that the lawyer profile was successfully updated.
 - Error (HTTP 400 Bad Request):
   - Returns a JSON object with an error message if any of the required fields (`id_lawyer`, `name`, `branch_of_law`, `rate`, `budget`) are missing.
 - Error (HTTP 404 Not Found):
   - Returns a JSON object with an error message if the specified lawyer was not found.
 - Error (HTTP 500 Internal Server Error):
   - Returns a JSON object in case of a server error.


   

**Usage Example**
```javascript
const lawyerData = {
  "name": "UpdateTestLawyer02",
  "branch_of_law": "Corporate and commercial law",
  "description": "Specializing in corporate and commercial law. Assisting with company registration and commercial matters.",
  "rate": 5,
  "budget": 5000
};

const newLawyerURL = 'http://localhost:3000/lawyer/api/UpdateLawyer/${lawyer_id]';

fetch(newLawyerURL, {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(lawyerData)
})
  .then(response => response.json())
  .then(data => {
    ...
  })
  .catch(error => {
    ...
  });
```
**Response Example**
```javascript
{
  "message": "Lawyer profile updated"
}
```
</br>

### 1.3. Delete Lawyer

- **URL:** `/lawyer/api/DeleteLawyer/${lawyer_id}`
- **Method:** DELETE 
- **Description:** Delete a lawyer.
- **URL Parameters:**
  - `lawyer_id` (string, required): The lawyer_id of the lawyer to be deleted.
- **Response:**
- Success (HTTP 200 OK):
  - Returns a JSON object with a success message indicating that the lawyer was successfully deleted.
- Error (HTTP 400 Bad Request):
  - Returns a JSON object with an error message if the `id_lawyer` parameter is missing.
- Error (HTTP 404 Not Found):
  - Returns a JSON object with an error message if the specified lawyer was not found.
- Error (HTTP 500 Internal Server Error):
  - Returns a JSON object in case of a server error.

 

**Usage Example**
```javascript
const deleteLawyerURL = `http://localhost:3000/lawyer/api/DeleteLawyer/${lawyer_id}`;

fetch(deleteLawyerURL, {
  method: 'DELETE',
  headers: {'Content-Type': 'application/json'},
})
  .then(response => response.json())
  .then(data => {
    ...
  })
  .catch(error => {
    ...
  });
```
**Response Example**
```javascript
{
  "message": "Lawyer deleted successfully"
}
```
</br>
</br>

[Content](#content)
## Filter And Get a List of Lawyers
- **URL:** `/filter/api/lawyers`
- **URL filter:** `/filter/api/lawyers?name_of_param={param}&name_of_second_param={param2}`
- **Method:** GET 
- **Description:** Obtaining a list of lawyers with and without filtering.
- **Query Parameters:**
  - `name` (string): Filter by lawyer's name.
  - `branch_of_law` (string): Filter by the branch of law.
  - `minRate` (number): Filter by the minimum hourly rate.
  - `maxRate` (number): Filter by the maximum hourly rate.
  - `exactRate` (number): Filter by the exact hourly rate.
  - `minBudget` (number): Filter by the minimum budget.
  - `maxBudget` (number): Filter by the maximum budget.
  - `exactBudget` (number): Filter by the exact budget.
  - `orderBy` (string): Sort the results by a specific field.
- **Response:**
- Success (HTTP 200 OK):
  - Returns a JSON object with an array of lawyer objects that match the query parameters.
- Error (HTTP 500 Internal Server Error):
  - Returns a JSON object in case of a server error.
</br>


**Usage Example BASIC GET**
```javascript

const getLawyersURL = `http://localhost:3000/filter/api/lawyers`;

fetch(getLawyersURL, {
  method: 'GET',
  headers: {'Content-Type': 'application/json'},
})
  .then(response => response.json())
  .then(data => {
    ...
  })
  .catch(error => {
    ...
  });
```
**Response Example**
```javascript
{
  "lawyers": [
    {
      "id_lawyer": 1,
      "name": "testLawyer",
      "branch_of_law": "Criminal law",
      "description": "...",
      "rate": "5",
      "budget": "6000.00"
    },
    {
      "id_lawyer": 3,
      "name": "testLawyer02",
      "branch_of_law": "Corporate and commercial law",
      "description": "...",
      "rate": "3",
      "budget": "2000.00"
    },
    {
      "id_lawyer": 4,
      "name": "testLawyer10",
      "branch_of_law": "Labor law",
      "description": "...",
      "rate": "2",
      "budget": "1000.00"
    }
  ]
}
```
</br>


**Usage Example FILTER GET**
```javascript

const getLawyersURL = `http://localhost:3000/filter/api/lawyers?branch_of_law=Criminal law&minRate=3&maxRate=5`;

fetch(getLawyersURL, {
  method: 'GET',
  headers: {'Content-Type': 'application/json'},
})
  .then(response => response.json())
  .then(data => {
    ...
  })
  .catch(error => {
    ...
  });
```
**Response Example**
```javascript
{
  "lawyers": [
    {
      "id_lawyer": 1,
      "name": "testLawyer",
      "branch_of_law": "Criminal law",
      "description": "...",
      "rate": "5",
      "budget": "6000.00"
    }
  ]
}
```
</br>
