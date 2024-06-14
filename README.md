# NutriSight Back-end API Documentation

This documentation will help to understand how to use this API

## Run API in Local

API URL `http://localhost:3000`

1. clone this repository `https://github.com/Nutrisight-capstone-nutrisight-app/NutriSight-Backend.git`
2. open new terminal and run `npm ci` for install all existing dependencies or `npm i` for update current dependencies
3. open and start xampp
4. make database named as "ns_test" or else but need to change on file `.env`
5. may need to run `npx prisma generate` to update or `npx prisma migrate dev` to reruns the existing migration
6. lastly, run `npm run dev` on your terminal
7. the server will run successfully

### Authentication Endpoints

If user accessing some endpoint that need to authenticate themself, the API will respond with unauthorize.

1. Account Registration

User need to create their account first before they can authenticate themself

```http
POST /register
```

- **Require body**

  |   Key    |  Type  |
  | :------: | :----: |
  | username | String |
  |  email   | String |
  | password | String |

- **Response**

  - **Code 200**

  Sucessfully created user account

  ```json
  { "message": "User successfully created" }
  ```

  - **Code 400**

  When one of require body input is null

  ```json
  { "message": "Please insert email" }
  ```

  ```json
  { "message": "Please insert username" }
  ```

  ```json
  { "message": "Please insert password" }
  ```

  When user input username or email that already exist

  ```json
  { "message": "Email or username already exist" }
  ```

  - **Code 500**

  ```json
  { "error": "Server error" }
  ```

1. Account Login

The account login will authenticate user and response with the token that need to be send in some endpoint that need access with authorization bearer.

```http
POST /login
```

- **Require body**

  |   Key    |  Type  |
  | :------: | :----: |
  |  email   | String |
  | password | String |

- **Response**

  - **Code 200**

  ```json
  {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  }
  ```

  - **Code 403**

  When the request email and password do not match in the database

  ```json
  { "error": "Invalid email or password" }
  ```

1. Account Logout

```http
DELETE /logout
```

- **Require Header**

**Authorization** : Bearer {accessToken}

- **Response**

  - **Code 203**

  ```json
  { "message": "Logout successfully" }
  ```

  - **Code 404**

  ```json
  { "message": "User not found" }
  ```

4. Unauthorize Response

When user access endpoint that need a bearer token, and they are not send the token in request header, this response will pop up

- **Response**

  - **Code 401**

  ```json
  { "message": "Unautorized, token is missing or invalid" }
  ```

### User Endpoint

1. Logged on User Detail

Get user details of the currently logged-in user

```http
GET /user
```

- **Require Header**

**Authorization** : Bearer {accessToken}

- **Response**

  - **Code 200**

  ```json
  {
    "user": {
      "username": "hade",
      "email": "oikawa2@test.com"
    },
    "data": {
      "foodCal": 0,
      "drinkCal": 0,
      "totalCal": 0,
      "gradeAvg": "E",
      "saveAmount": 0
    }
  }
  ```

2. Edit User

Edit and update the data of currently logged-in user

```http
PATCH /user
```

- **Require Header**

**Authorization** : Bearer {accessToken}

- **Optional body**

  |   Key    |  Type  |
  | :------: | :----: |
  |  email   | String |
  | username | String |
  | password | String |

- **Response**

  - **Code 200**

  ```json
  { "message": "User successfully edited" }
  ```

  - **Code 400**

  ```json
  { "message": "Email or username already exist" }
  ```

  - **Code 404**

  ```json
  { "message": "User not Found" }
  ```

  - **Code 500**

  ```json
  { "message": "Server error" }
  ```

1. Delete User

Delete all the data of currently logged-in user

```http
DELETE /user
```

- **Require Header**

**Authorization** : Bearer {accessToken}

- **Response**

  - **Code 200**

  ```json
  { "message": "user has been deleted" }
  ```

  - **Code 404**

  ```json
  { "message": "User not Found" }
  ```
