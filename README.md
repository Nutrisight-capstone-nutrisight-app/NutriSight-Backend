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

2. Account Login

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

3. Account Logout

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

3. Delete User

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

### Save Endpoint

1. Save product

Create data about the product that saveded by the user

```http
POST /save
```

- **Require Header**

**Authorization** : Bearer {accessToken}

- **Optional body**

  |    Key    | Type |
  | :-------: | :--: |
  | productId | Int  |

- **Response**

  - **Code 200**

  ```json
  { "message": "save successful" }
  ```

  - **Code 400**

  When productId is not on request

  ```json
  { "message": "Id not Found" }
  ```

2. Get saved product

Get all product saved by user

```http
GET /save
```

- **Require Header**

**Authorization** : Bearer {accessToken}

- **Response**

  - **Code 200**

  ```json
  {
    "savedProduct": [
      {
        "createdAt": "2024-06-14T15:04:39.128Z",
        "ProductsOnSaves": [
          {
            "product": {
              "id": 0,
              "name": "Chitato",
              "category": "Food",
              "netWeight": 180,
              "servingAmount": 9,
              "servingSize": 20,
              "energyTotal": 100,
              "energyFat": 40,
              "fatTotal": 4.5,
              "saturatedFat": 2,
              "protein": 0,
              "carbohydrate": 15,
              "sugar": 1,
              "natrium": 60,
              "fatGrade": "B",
              "fatLevel": 2,
              "sugarGrade": "A",
              "sugarLevel": 1,
              "natriumGrade": "A",
              "natriumLevel": 1,
              "gradeAll": "B",
              "levelAll": 2,
              "url": "https://storage.googleapis.com/nutrisight-bucket/images/chitato.png"
            }
          }
        ]
      },
      {
        "createdAt": "2024-06-14T15:04:47.261Z",
        "ProductsOnSaves": [
          {
            "product": {
              "id": 3,
              "name": "Fitbar",
              "category": "Food",
              "netWeight": 20,
              "servingAmount": 1,
              "servingSize": 20,
              "energyTotal": 90,
              "energyFat": 30,
              "fatTotal": 3.5,
              "saturatedFat": 2,
              "protein": 2,
              "carbohydrate": 15,
              "sugar": 6,
              "natrium": 40,
              "fatGrade": "A",
              "fatLevel": 1,
              "sugarGrade": "A",
              "sugarLevel": 1,
              "natriumGrade": "A",
              "natriumLevel": 1,
              "gradeAll": "A",
              "levelAll": 1,
              "url": "https://storage.googleapis.com/nutrisight-bucket/images/fitbar.png"
            }
          }
        ]
      }
    ]
  }
  ```

### Product Endpoint

1. Get product

Get detail of a product using product id

```http
POST /product/{id}
```

- **Response**

  - **Code 200**

  ```json
  {
    "product": {
      "id": 0,
      "name": "Chitato",
      "category": "Food",
      "netWeight": 180,
      "servingAmount": 9,
      "servingSize": 20,
      "energyTotal": 100,
      "energyFat": 40,
      "fatTotal": 4.5,
      "saturatedFat": 2,
      "protein": 0,
      "carbohydrate": 15,
      "sugar": 1,
      "natrium": 60,
      "fatGrade": "B",
      "fatLevel": 2,
      "sugarGrade": "A",
      "sugarLevel": 1,
      "natriumGrade": "A",
      "natriumLevel": 1,
      "gradeAll": "B",
      "levelAll": 2,
      "url": "https://storage.googleapis.com/nutrisight-bucket/images/chitato.png"
    }
  }
  ```

  - **Code 404**

  ```json
  { "message": "Product not found" }
  ```
