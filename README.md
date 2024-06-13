# NutriSight Back-end API Documentation

This documentation will help to understand how to use this API

---

API URL `http://localhost:3000`

## Run API in Local

1. clone this repository `https://github.com/Nutrisight-capstone-nutrisight-app/NutriSight-Backend.git`
2. open new terminal and run `npm ci` for install all existing dependencies or `npm i` for update current dependencies
3. open and start xampp
4. make database named as "ns_test" or else but need to change on file `.env`
5. may need to run `npx prisma generate` to update or `npx prisma migrate dev` to reruns the existing migration
6. lastly, run `npm run dev` on your terminal
7. the server will run successfully

### Auth Endpoint

1. Register

- POST /register

  - Require

  | Parameter |  Type  |
  | :-------: | :----: |
  | username  | String |
  |   email   | String |
  | password  | String |

  - Response:

  ```
  {
  "message": "User successfully created"
  }
  ```

2. Login

- POST /login

  - Require

  | Parameter |  Type  |
  | :-------: | :----: |
  |   email   | String |
  | password  | String |

  - Response

  ```
  {
  "accessToken":
  }
  ```

3. Logout

- DELETE /logout
  -Response
  ```
  {
  "message": "Logout successfully"
  }
  ```

### User Endpoint

1. Get User by Id

- GET /user/[user_id]
  - Response
  ```
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

- PATCH /user/[user_id]

  - Response

  ```
  {
  "message": "User successfully edited"
  }

  ```

3. Delete User

- DELETE /user/[user_id]
  - Response
  ```
  {
  "message": "user has been deleted"
  }
  ```
