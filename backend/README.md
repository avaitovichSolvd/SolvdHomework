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
      - Add lawyer in favorites
      - Delete lawyer's card from user's favorites
   - [Lawyer's Profile Endpoints](#lawyers-profile)
      - Add new lawyer
      - Update a lawyer profile
      - Delete lawyer profile 
   - [Filter And Get a List of Lawyers Endpoints](#filter-and-get-a-list-of-lawyers)
   - [Calendar Endpoints](#calendar-endpoints)
       - Create Event
       - View all events
       - Delete event
       - Send notification about event
   - [Chat Endpoints](#chat-endpoints)
       - Send message
       - View chat
       - Delete chat
</br>

# DB: MySQL
## Relationship diagram
![image](https://github.com/avaitovichSolvd/SolvdHomework/assets/143712741/bbc8bf4d-4a34-41ba-a6fc-c67a81ff17a8)

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

### 3. Favorites
Information about User's Favorites of saved Lawyers
| Key | Column name | Data type | Description |
|------------|------------|------------|------------|
| PK | favorites_id | int | Primery key for User's Favorites |
| FK | username | varchar(45) | User uniq name |
| FK | lawyer_id | INT | Lawyer ID |

### 4. Calendar events
Information about Calendar events between user and lawyer
| Key | Column name | Data type | Description |
|------------|------------|------------|------------|
| PK | event_id | int | Primery key for Event |
| FK | username | varchar(45) | User uniq name |
| FK | id_lawyer | INT | Lawyer ID |
|  | event_date | datetime | Date and time about meet |
|  | event_description | text | Description about meet |

### 5. Chat
Information about Chat between user and lawyer
| Key | Column name | Data type | Description |
|------------|------------|------------|------------|
| PK | message_id | int | Primery key for Message |
| FK | sender_id | varchar(45) | User uniq name |
| FK | receiver_id | INT | Lawyer ID |
|  | message_text | text | Message content |
|  | timestamp | timestamp | Sending time |
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

### 1.2. Add lawyer in favorites

- **URL:** `/user/api/AddToFavorites`
- **Method:** POST 
- **Description:** Save lawyer's profile in user's favorites.
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
const userFavoritesData = {
  "username": "testUser",
  "lawyer_id": 2
};

const addToFavoritesURL = 'http://localhost:3000/user/api/AddToFavorites';

fetch(addToFavoritesURL, {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(userFavoritesData)
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
  "message": "Lawyer profile added to the favorites"
}
```
</br>

### 1.3. Get User's Favorites

- **URL:** `/user/api/ViewFavorites/{username}`
- **Method:** GET 
- **Description:** Retrieve a list of saved items in user's favorites.
- **Response:**
 - Success (HTTP 200 OK):
   - Returns a JSON object with the favorites items when the request is successful.
 - Error (HTTP 400 Bad Request):
   - Returns a JSON object with an error message if the `username` parameter is missing.
 - Error (HTTP 404 Not Found):
   - Returns a JSON object with a message indicating that the favorites is empty when no items are found.
 - Error (HTTP 500 Internal Server Error):
   - Returns a JSON object in case of a server error.



**Usage Example**
```javascript

const getUserFavoritesURL = `http://localhost:3000/user/api/ViewFavorites/${username}`;

fetch(getUserFavoritesURL, {
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
  "favorites": [
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

### 1.4. Delete lawyer's card from user's favorites

- **URL:** `/user/api/RemoveFromFavorites`
- **Method:** DELETE 
- **Description:** Removes the saved lawyer profile from the user's list.
- **Request Body:** JSON object with `username` and `lawyer_id` fields.
  - `username` (string): The username of the user.
  - `lawyer_id` (string): The id of the lawyer.
- **Response:**
- Success (HTTP 200 OK):
  - Returns a JSON object with a success message indicating the lawyer profile was successfully removed from the favorites.
- Error (HTTP 400 Bad Request):
  - Returns a JSON object with an error message if the `username` and `lawyer_id` parameters are missing.
- Error (HTTP 404 Not Found):
  - Returns a JSON object with an error message if the specified lawyer profile was not found in the favorites.
- Error (HTTP 500 Internal Server Error):
  - Returns a JSON object in case of a server error.

 

**Usage Example**
```javascript
const userLawyer = {
  "username": "testUser",
  "lawyer_id": 2
}

const deleteUserURL = `http://localhost:3000/user/api/RemoveFromFavorites`;

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
  "message": "Lawyer profile successfully removed from the favorites"
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
</br>

[Content](#content)
## Calendar Endpoints

### 1.1. Create Event

- **URL:** `/calendar/api/AddEvent`
- **Method:** POST 
- **Description:** Create new evnt - meeting between user and lawyer.
- **Request Body:** JSON object with `id_lawyer`, `username`, `event_date`, `event_description` fields.
  - `id_lawyer` (string): The lawyer ID.
  - `username` (string): Uniq user name.
  - `event_date` (datetime): Date and time about meet.
  - `event_description` (string): Description about meet.
- **Response:**
  - Success (HTTP 201 Created):
    - Returns a JSON object with a success message.
  - Error (HTTP 500 Internal Server Error):
    - Returns a JSON object in case of a server error.
   

**Usage Example**
```javascript
const eventData = {
  "id_lawyer": 1,
  "username": "testUser",
  "event_date": "2023-11-12 16:00:00",
  "event_description": "Meeting with the client"
}

const addEventURL = 'http://localhost:3000/calendar/api/AddEvent'

fetch(addEventURL, {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(eventData)
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
  "message": "Event created successfully"
}
```
</br>


### 1.2. View all events

- **URL:** `/calendar/api/GetEventList?id_lawyer={id_lawyer}&username={username}`
- **Method:** GET 
- **Description:** Get all created events.
- **Query Parameters:**
  - `id_lawyer` (string): The lawyer ID.
  - `username` (string): Uniq user name.
- **Response:**
  - Success (HTTP 200 Created):
    - Returns a JSON object with a success message and list of events between lawyer and user.
  - Error (HTTP 500 Internal Server Error):
    - Returns a JSON object in case of a server error.
   

**Usage Example**
```javascript
const viewEventListURL = 'http://localhost:3000/calendar/api/GetEventList?id_lawyer=1&username=testUser'

fetch(viewEventListURL, {
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
  "events": [
    {
      "event_id": 1,
      "id_lawyer": 1,
      "username": "testUser",
      "event_date": "2023-11-12T15:00:00.000Z",
      "event_description": "Meeting with the client"
    },
    {
      "event_id": 3,
      "id_lawyer": 1,
      "username": "testUser",
      "event_date": "2023-11-15T15:00:00.000Z",
      "event_description": "Meeting with the client"
    }
  ]
}
```
</br>

### 1.3. Delete event

- **URL:** `/calendar/api/DeleteEvent/{event_id}`
- **Method:** DELETE 
- **Description:** Delete meeting.
- **URL Parameters:**
  - `event_id` (num, required): The event_id of the meet to be deleted.
- **Response:**
- Success (HTTP 200 OK):
  - Returns a JSON object with a success message indicating that the meet was successfully deleted.
- Error (HTTP 404 Not Found):
  - Returns a JSON object with an error message if the specified meet was not found.
- Error (HTTP 500 Internal Server Error):
  - Returns a JSON object in case of a server error.

 

**Usage Example**
```javascript
const deleteLawyerURL = `http://localhost:3000/calendar/api/DeleteEvent/3`;

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
  "message": "Event deleted successfully"
}
```
</br>

### 1.4. Send notification about event

- **URL:** `/calendar/api/EventNotificationToChat`
- **Method:** POST 
- **Description:** Send notification in chat about meeting between user and lawyer.
- **Request Body:** JSON object with `sender_id`, `receiver_id`, `event_id` fields.
  - `receiver_id` (string): The lawyer ID.
  - `sender_id` (string): Uniq user name.
  - `event_id` (datetime): Uniq event ID.
- **Response:**
  - Success (HTTP 201 Created):
    - Returns a JSON object with a success message.
  - Error (HTTP 404 Not Found):
    - Returns a JSON object with an error message if the specified event was not found.
  - Error (HTTP 500 Internal Server Error):
    - Returns a JSON object in case of a server error.
   

**Usage Example**
```javascript
const eventNoteData = { "sender_id": "testUser", "receiver_id": "1", "event_id": "1" }

const addEventURL = 'http://localhost:3000/calendar/api/EventNotificationToChat'

fetch(addEventURL, {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(eventNoteData)
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
  "message": "Event created successfully"
}
```
</br>
</br>

[Content](#content)
## Chat Endpoints

### 1.1. Send message

- **URL:** `/chat/api/SendMessage`
- **Method:** POST 
- **Description:** Sending message from user to lawyer.
- **Request Body:** JSON object with `sender_id`, `receiver_id`, `message_text` fields.
  - `receiver_id` (string): The lawyer ID.
  - `sender_id` (string): Uniq user name.
  - `message_text` (string): Content in message.
- **Response:**
  - Success (HTTP 201 Created):
    - Returns a JSON object with a success message.
  - Error (HTTP 500 Internal Server Error):
    - Returns a JSON object in case of a server error.
   

**Usage Example**
```javascript
const messageData = {
"sender_id": "testUser",
"receiver_id": "1",
"message_text": "How are you?"
}

const sendingMessageURL = 'http://localhost:3000/chat/api/SendMessage'

fetch(sendingMessageURL, {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(messageData)
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
  "message": "Message sent successfully"
}
```
</br>


### 1.2. View chat

- **URL:** `/chat/api/GetChatMessages?sender_id={sender_id}&receiver_id={receiver_id}`
- **Method:** GET 
- **Description:** Get chat history.
- **Query Parameters:**
  - `receiver_id` (string): The lawyer ID.
  - `sender_id` (string): Uniq user name.
- **Response:**
  - Success (HTTP 200 Created):
    - Returns a JSON object with a success message and list of events between lawyer and user.
  - Error (HTTP 500 Internal Server Error):
    - Returns a JSON object in case of a server error.
   

**Usage Example**
```javascript
const viewChatURL = 'http://localhost:3000/chat/api/GetChatMessages?sender_id=testUser&receiver_id=1'

fetch(viewChatURL, {
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
  "messages": [
    {
      "message_id": 1,
      "sender_id": "testUser",
      "receiver_id": 1,
      "message_text": "Hi. I need your consultation",
      "timestamp": "2023-11-02T15:27:23.000Z"
    },
    {
      "message_id": 2,
      "sender_id": "testUser",
      "receiver_id": 1,
      "message_text": "How are you?",
      "timestamp": "2023-11-02T15:27:39.000Z"
    }
  ]
}
```
</br>

### 1.3. Delete chat

- **URL:** `/chat/api/DeleteChat?sender_id={sender_id}&receiver_id={receiver_id}`
- **Method:** DELETE 
- **Description:** Delete meeting.
- **Query Parameters:**
  - `receiver_id` (string): The lawyer ID.
  - `sender_id` (string): Uniq user name.
- **Response:**
- Success (HTTP 200 OK):
  - Returns a JSON object with a success message indicating that the meet was successfully deleted.
- Error (HTTP 500 Internal Server Error):
  - Returns a JSON object in case of a server error.

 

**Usage Example**
```javascript
const deleteChatURL = `http://localhost:3000/chat/api/DeleteChat?sender_id=testUser&receiver_id=1`;

fetch(deleteChatURL, {
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
  "message": "Chat deleted successfully"
}
```
</br>
