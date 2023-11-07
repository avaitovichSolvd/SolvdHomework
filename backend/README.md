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
   - [User's Profile Endpoints](#users-profile)
      - Get Users
      - Delete User
      - Add lawyer in favorites
      - Get User's Favorites
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
![image](https://github.com/avaitovichSolvd/SolvdHomework/assets/143712741/6e3183ee-5812-447a-aef6-02519bf81f2c)


</br>

## Tables
### 1. User
Information about User
| Key | Column name | Data type | Description |
|------------|------------|------------|------------|
| PK | user_id | int | User ID - Primery key  |
|  | first_name | varchar(45) | User first name |
|  | last_name | varchar(45) | User last name |
|  | password | varchar(45) | Account password |
|  | phone_number | varchar(15) | User phone number |
|  | email | varchar(255) | User email |

### 2. Lawyer
Information about Lawyer
| Key | Column name | Data type | Description |
|------------|------------|------------|------------|
| PK | lawyer_id | int | Lawyer ID - Primery key |
|  | first_name | varchar(45) | Lawyer first name |
|  | last_name | varchar(45) | Lawyer last name |
|  | phone_number | varchar(15) | Lawyer phone number |
|  | email | varchar(255) | Lawyer email |
|  | branch_of_law | enum | Optional: 'Criminal law', 'Labor law', 'Corporate and commercial law', 'International law', 'Healthcare and medical law' |
|  | description | text | Description of the specialist's profile |
|  | rate | enum | Optional rate for lawyer: '1', '2', '3', '4', '5' |
|  | budget | decimal(10,2) | Cost of specialist services |

### 3. Favorites
Information about User's Favorites of saved Lawyers
| Key | Column name | Data type | Description |
|------------|------------|------------|------------|
| PK | favorites_id | int | User's Favorites - Primery key |
| FK | user_id | INT | User ID |
| FK | lawyer_id | INT | Lawyer ID |

### 4. Calendar events
Information about Calendar events between user and lawyer
| Key | Column name | Data type | Description |
|------------|------------|------------|------------|
| PK | event_id | int | Primery key for Event |
| FK | user_id | INT | User ID |
| FK | lawyer_id | INT | Lawyer ID |
|  | event_date | datetime | Date and time about meet |
|  | event_description | text | Description about meet |

### 5. Chat
Information about Chat between user and lawyer
| Key | Column name | Data type | Description |
|------------|------------|------------|------------|
| PK | message_id | int | Primery key for Message |
| FK | user_id | INT | User ID |
| FK | lawyer_id | INT | Lawyer ID |
|  | message_text | text | Message content |
|  | sender_type | enum | Optional based of sender role: 'user', 'lawyer' |
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

- **URL:** `/auth/register`
- **Method:** POST 
- **Description:** Register a new user.
- **Request Body:** JSON object with next fields:
  - `first_name` (string): The first name of the new user.
  - `last_name` (string): The last name of the new user.
  - `password` (string): The password for the new user.
  - `email` (string): The email of the new user.
  - `phone_number` (string): The phone number of the new user.
- **Response:**
  - Success (HTTP 201 Created):
    - Returns a JSON object with a success message and an access token.
  - Error (HTTP 400 Bad Request):
    - Returns a JSON object with an error message if the request is missing fields or if the email already exists.
  - Error (HTTP 500 Internal Server Error):
    - Returns a JSON object in case of a server error.
   

**Usage Example**
```javascript
const userData = {
  "first_name": "TestName02",
  "last_name": "TestLastName02",
  "password": "test123456789",
  "email": "testemail@mail.com",
  "phone_number": "+123456789"
};

const signUpURL = 'http://localhost:3000/auth/register';

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

- **URL:** `/auth/login`
- **Method:** POST 
- **Description:** Authenticate an existing user.
- **Request Body:** JSON object with next fields:
  - `email` (string): The email of the user.
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
  "email": "testemail@mail.com",
  "password": "test123456789"
};

const signInURL = 'http://localhost:3000/auth/login';

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
</br>

[Content](#content)
## User's Profile

### 1.1. Get Users

- **URL:** `/user/users`
- **Method:** GET 
- **Description:** Retrieve a list of all users.
- **Response:**
  - Success (HTTP 200 OK):
    - Returns a JSON object with an array of user objects.
  - Error (HTTP 500 Internal Server Error):
    - Returns a JSON object in case of a server error.


**Usage Example**
```javascript

const getUsersURL = 'http://localhost:3000/user/users';

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
      "user_id": 1,
      "first_name": "TestName",
      "last_name": "TestLastName",
      "password": "test123456789",
      "phone_number": "+123456789",
      "email": "testemail02@mail.com"
    },
    {
      "user_id": 2,
      "first_name": "TestName02",
      "last_name": "TestLastName02",
      "password": "test123456789",
      "phone_number": "+123456789",
      "email": "testemail@mail.com"
    }
  ]
}
```


### 1.2. Delete User

- **URL:** `/user/users/{user_id}`
- **Method:** DELETE 
- **Description:** Delete a user.
- **URL Parameters:**
  - `user_id` (int, required): The user_id of the user to be deleted.
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
const deleteUserURL = `http://localhost:3000/user/users/${user_id}`;

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

### 1.3. Add lawyer in favorites

- **URL:** `/user/favorite`
- **Method:** POST 
- **Description:** Save lawyer's profile in user's favorites.
- **Request Body:** JSON object with `user_id` and `lawyer_id` fields.
  - `user_id` (string): The user_id of the user.
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
  "user_id": 1,
  "lawyer_id": 2
};

const addToFavoritesURL = 'http://localhost:3000/user/favorite';

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

### 1.4. Get User's Favorites

- **URL:** `/user/favorites/{username}`
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

const getUserFavoritesURL = `http://localhost:3000/user/favorites/${user_id}`;

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

### 1.5. Delete lawyer's card from user's favorites

- **URL:** `/user/favorite?user_id={user_id}&lawyer_id={lawyer_id}`
- **Method:** DELETE 
- **Description:** Removes the saved lawyer profile from the user's list.
- **Request Body:** JSON object with `username` and `lawyer_id` fields.
  - `user_id` (string): The user_id of the user.
  - `lawyer_id` (string): The lawyer_id of the lawyer.
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
const deleteUserURL = `http://localhost:3000/user/favorite?user_id=${user_id}&lawyer_id=${lawyer_id}`;

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
  "message": "Lawyer profile successfully removed from the favorites"
}
```
</br>
</br>

[Content](#content)
## Lawyer's Profile

### 1.1. Add new lawyer

- **URL:** `/lawyers/lawyer`
- **Method:** POST 
- **Description:** Register a new lawyer.
- **Request Body:** JSON object with next fields:
  - `first_name` (string): The first name of the new lawyer.
  - `last_name` (string): The last name of the new lawyer.
  - `phone_number` (string): The phone number of the new lawyer.
  - `email` (string): The email of the new lawyer.
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
  "first_name": "testLawyerName",
  "last_name": "testLawyerLastName",
  "phone_number": "+123456789",
  "email": "testLawyer02@mail.com",
  "branch_of_law": "Labor law",
  "description": "Experienced (10 years)",
  "rate": 3,
  "budget": 1000
};

const newLawyerURL = 'http://localhost:3000/lawyers/lawyer';

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

- **URL:** `/lawyers/lawyer/{lawyer_id}`
- **Method:** PUT 
- **Description:** Update lawyer's profile.
- **Request Body:** JSON object with ... fields.
  - `first_name` (string): The first name of the new lawyer.
  - `last_name` (string): The last name of the new lawyer.
  - `phone_number` (string): The phone number of the new lawyer.
  - `email` (string): The email of the new lawyer.
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
  "first_name": "testLawyerNameUP",
  "last_name": "testLawyerLastNameUP",
  "phone_number": "+1234567888",
  "email": "testLawyerUP@mail.com",
  "branch_of_law": "Corporate and commercial law",
  "description": "Experienced (15 years) criminal defense lawyer. Protecting your interests in criminal cases.",
  "rate": 4,
  "budget": 3000
};

const newLawyerURL = 'http://localhost:3000//lawyers/lawyer/${lawyer_id]';

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

- **URL:** `/lawyers/lawyer/${lawyer_id}`
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
const deleteLawyerURL = `http://localhost:3000/lawyers/lawyer/${lawyer_id}`;

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
- **URL:** `/lawyers/filter`
- **URL filter:** `/lawyers/filter?name_of_param={param}&name_of_second_param={param2}`
- **Method:** GET 
- **Description:** Obtaining a list of lawyers with and without filtering.
- **Query Parameters:**
  - `first_name` (string): The first name of the new lawyer.
  - `last_name` (string): The last name of the new lawyer.
  - `email` (string): The email of the new lawyer.
  - `branch_of_law` (string): Optional field of law: 'Criminal law', 'Labor law', 'Corporate and commercial law', 'International law', 'Healthcare and medical law'.
  - `description` (string): profile description.
  - `rate` (number): from 1 to 5.
  - `budget` (number): float nums support.
- **Response:**
- Success (HTTP 200 OK):
  - Returns a JSON object with an array of lawyer objects that match the query parameters.
- Error (HTTP 500 Internal Server Error):
  - Returns a JSON object in case of a server error.
</br>


**Usage Example BASIC GET**
```javascript

const getLawyersURL = `http://localhost:3000/lawyers/filter`;

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

const getLawyersURL = `http://localhost:3000/lawyers/filter?branch_of_law=Criminal law&minRate=3&maxRate=5`;

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

- **URL:** `/calendar/event`
- **Method:** POST 
- **Description:** Create new event - meeting between user and lawyer.
- **Request Body:** JSON object with `lawyer_id`, `user_id`, `event_date`, `event_description` fields.
  - `lawyer_id` (string): The lawyer ID.
  - `user_id` (string): The user ID.
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
  "lawyer_id": 1,
  "user_id": 2,
  "event_date": "2023-11-12 16:00:00",
  "event_description": "Meeting with the client"
}

const addEventURL = 'http://localhost:3000/calendar/event'

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

- **URL:** `/calendar/list?lawyer_id={lawyer_id}&user_id={user_id}`
- **Method:** GET 
- **Description:** Get all created events.
- **Query Parameters:**
  - `lawyer_id` (string): The lawyer ID.
  - `user_id` (string): The user ID.
- **Response:**
  - Success (HTTP 200 Created):
    - Returns a JSON object with a success message and list of events between lawyer and user.
  - Error (HTTP 500 Internal Server Error):
    - Returns a JSON object in case of a server error.
   

**Usage Example**
```javascript
const viewEventListURL = 'http://localhost:3000/calendar/list?lawyer_id=${lawyer_id}&user_id=${user_id}'

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

- **URL:** `/calendar/event/{event_id}`
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
const deleteLawyerURL = `http://localhost:3000/calendar/event/${event_id`;

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

- **URL:** `/calendar/notification`
- **Method:** POST 
- **Description:** Send notification in chat about meeting between user and lawyer.
- **Request Body:** JSON object with `user_chat`, `lawyer_chat`, `event_id` fields.
  - `lawyer_id` (string): The lawyer ID.
  - `user_id` (string): The user ID.
  - `event_id` (datetime): Uniq event ID.
  - `sender_type` (string): Optional role of sender: "user" or "lawyer".
- **Response:**
  - Success (HTTP 201 Created):
    - Returns a JSON object with a success message.
  - Error (HTTP 404 Not Found):
    - Returns a JSON object with an error message if the specified event was not found.
  - Error (HTTP 500 Internal Server Error):
    - Returns a JSON object in case of a server error.
   

**Usage Example**
```javascript
const eventNoteData = { "user_id": 1, "lawyer_id": "1", "event_id": "1", "sender_type": "user" };

const sendEventNotificationURL = 'http://localhost:3000/calendar/notification'

fetch(sendEventNotificationURL, {
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
  "message": "Event details sent to chat successfully"
}
```
</br>
</br>

[Content](#content)
## Chat Endpoints

### 1.1. Send message

- **URL:** `/chat/send_messagee`
- **Method:** POST 
- **Description:** Sending message from user to lawyer.
- **Request Body:** JSON object with `user_chat`, `lawyer_chat`, `message_text` fields.
  - `lawyer_id` (string): The lawyer ID.
  - `user_id` (string): Uniq user name.
  - `message_text` (string): Content in message.
  - `sender_type` (string): Optional role of sender: "user" or "lawyer".
- **Response:**
  - Success (HTTP 201 Created):
    - Returns a JSON object with a success message.
  - Error (HTTP 500 Internal Server Error):
    - Returns a JSON object in case of a server error.
   

**Usage Example**
```javascript
const messageData = {
"user_id": "1",
"lawyer_id": "1",
"message_text": "How are you?",
"sender_type": "lawyer"
}

const sendingMessageURL = 'http://localhost:3000/chat/send_messagee'

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

- **URL:** `/chat/history?user_id={user_id}&lawyer_id={lawyer_id}`
- **Method:** GET 
- **Description:** Get chat history.
- **Query Parameters:**
  - `lawyer_id` (string): The lawyer ID.
  - `user_id` (string): Uniq user name.
- **Response:**
  - Success (HTTP 200 Created):
    - Returns a JSON object with a success message and list of events between lawyer and user.
  - Error (HTTP 500 Internal Server Error):
    - Returns a JSON object in case of a server error.
   

**Usage Example**
```javascript
const viewChatURL = 'http://localhost:3000/chat/history?user_id=${user_id}&lawyer_id=${lawyer_id}'

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
      "user_chat": "testUser",
      "lawyer_chat": 1,
      "message_text": "{\"date\":\"2023-11-12T15:00:00.000Z\",\"description\":\"Meeting with the client\",\"lawyer\":1,\"client\":\"testUser\"}",
      "sender_type": "user",
      "timestamp": "2023-11-03T00:05:33.000Z"
    },
    {
      "message_id": 2,
      "user_chat": "testUser",
      "lawyer_chat": 1,
      "message_text": "How are you?",
      "sender_type": "lawyer",
      "timestamp": "2023-11-03T00:07:20.000Z"
    }
  ]
}
```
</br>

### 1.3. Delete chat

- **URL:** `/chat/history?user_id={user_id}&lawyer_id={lawyer_id}'
- **Method:** DELETE 
- **Description:** Delete meeting.
- **Query Parameters:**
  - `lawyer_id` (string): The lawyer ID.
  - `user_id` (string): Uniq user name.
- **Response:**
- Success (HTTP 200 OK):
  - Returns a JSON object with a success message indicating that the meet was successfully deleted.
- Error (HTTP 500 Internal Server Error):
  - Returns a JSON object in case of a server error.

 

**Usage Example**
```javascript
const deleteChatURL = `http://localhost:3000/chat//chat/history?user_id=${user_id}&lawyer_id=${lawyer_id}`;

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

