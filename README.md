# p2-cms-integration-server
password database supabase : nixgANjtJDzrqcS0
databse url : postgresql://postgres:nixgANjtJDzrqcS0@db.lxkkfbyhivnnkxaxhumt.supabase.co:5432/postgres
## **List Endpoints**

List of Available Endpoints:
### **Admin & Staff (CMS)**
### **- Products**
- `POST /products`
- `GET /products`
- `GET /products/categories`
- `GET /products/:id`
- `DELETE /products/:id`
- `PATCH /products/:id`
- `PUT /products/:id`

### **- Users**
- `POST /users/register`
- `POST /users/login`
- `POST /users/googleSignIn`

### **- Histories**
- `GET /histories`

### **Public (Customer)**
### **- Pub**
- `GET /pub/products`
- `GET /pub/products/:id`

### **- Users**
- `POST /pub/users/register`
- `POST /pub/users/login`
- `POST /pub/users/googleSignIn`

### **- Wishlist**
- `GET /pub/wishlist`
- `POST /pub/wishlist/:productId`
- `DELETE /pub/wishlist/:wishlistId`

## **Endpoints (CMS)**
### **POST /products**
#### Description
- Create a new product data

#### Request
- Headers
    ```json
    {
      "Content-Type": "postman/raw",
      "access_token": String
    }
- Body
    ```json
    {
      "name": String,
      "description": String,
      "price": Integer,
      "stock": Integer,
      "imgUrl": String,
      "categoryId": Integer,
      "authorId": Integer,
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {
      "message": "Success create product",
      "product": {
        "name": String,
        "description": String,
        "price": Integer,
        "stock": Integer,
        "imgUrl": String,
        "categoryId": Integer,
        "authorId": Integer,
        "status": String,
        "createdAt": Date,
        "updatedAt": Date
      }
    }
    ```

_400 - Bad Request_
- Body
    ```json
    {
      "statusCode": 400,
      "error": {
        "message": String
      }
    }

    OR

    {
      "statusCode": 400,
      "error": {
        "message": "Error foreign key"
      }
    }

    ```

### **GET /products**
#### Description
- Get all the products data

#### Request
- Headers
    ```json
    {
      "access_token": String
    }
    ```

#### Response
_200 - OK_

- Body
    ```json
    {
      "message": "Success read products",
      "products": [
        {
          "id": Integer,  
          "name": String,
          "description": String,
          "price": Integer,
          "stock": Integer,
          "imgUrl": String,
          "categoryId": Integer,
          "authorId": Integer,
          "status": String,
          "createdAt": Date,
          "updatedAt": Date,
          "Category": {
              "id": Integer,
              "name": String,
              "createdAt": Date,
              "updatedAt": Date
          }
        },
      ]
    }
    ```
### **GET /products/categories**
#### Description
- Get all the categories data

#### Request
- Headers
    ```json
    {
      "access_token": String
    }
    ```

#### Response
_200 - OK_

- Body
    ```json
    {
      "message": "Success read categories",
      "categories": [
        {
          "id": Integer,
          "name": String,
          "createdAt": Date,
          "updatedAt": Date
        },
      ]
    }
    ```



### **GET /products/:id**
#### Description
- Get a product data based on given id

#### Request
- Headers
    ```json
    {
      "access_token": String
    }

#### Response
_200 - OK_

- Body
    ```json
    {
      "message": "Success read product",
      "product": [
        {
          "id": Integer,  
          "name": String,
          "description": String,
          "price": Integer,
          "stock": Integer,
          "imgUrl": String,
          "categoryId": Integer,
          "authorId": Integer,
          "status": String,
          "createdAt": Date,
          "updatedAt": Date,
          "Category": {
              "id": Integer,
              "name": String
          },
          "User": {
              "id": Integer,
              "email": String,
              "role": String
          }
        },
      ]
    }
    ```
_404 - Not Found_
- Body
    ```json
    {
      "statusCode": 404,
      "error": {
        "message": "Data not found"
      }
    }
    ```
    
### **DELETE /products/:id**
#### Description
- Remove a product data based on given id

#### Request
- Headers
    ```json
    {
      "access_token": String
    }

#### Response
_200 - OK_
- Body
    ```json
    {
      "message": "{Product name} success to delete"
    }
    ```
_403 - Forbidden_
- Body
    ```json
    {
      "statusCode": 403,
      "error": {
        "message": "Forbidden"
      }
    }
    ```

_404 - Not Found_
- Body
    ```json
    {
      "statusCode": 404,
      "error": {
        "message": "Data not found"
      }
    }
    ```

### **PATCH /products/:id**
#### Description
- Change status of a product based on given id

#### Request
- Headers
    ```json
    {
      "access_token": String
    }

#### Response
_200 - OK_
- Body
    ```json
    {
      "message": "Success update status {Product name} to {status}",
    }
    ```
_403 - Forbidden_
- Body
    ```json
    {
      "statusCode": 403,
      "error": {
        "message": "Forbidden"
      }
    }
    ```

_404 - Not Found_
- Body
    ```json
    {
      "statusCode": 404,
      "error": {
        "message": "Data not found"
      }
    }
    ```

### **PUT /products/:id**
#### Description
- Update product data based on given id

#### Request
- Headers
    ```json
    {
      "access_token": String
    }

#### Response
_200 - OK_
- Body
    ```json
    {
      "message": "Success update product {Product name}",
    }
    ```
_403 - Forbidden_
- Body
    ```json
    {
      "statusCode": 403,
      "error": {
        "message": "Forbidden"
      }
    }
    ```

_404 - Not Found_
- Body
    ```json
    {
      "statusCode": 404,
      "error": {
        "message": "Data not found"
      }
    }
    ```

### **POST /users/register**
#### Description
- Create a new user data

#### Request
- Headers
    ```json
    {
      "Content-Type": "postman/x-www-form-urlencoded"
    }
- Body
    ```json
    {
      "email": String,
      "password": String,
      "role": String,
      "phoneNumber": String,
      "address": String
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {
      "message": "Success create user",
    }
    ```

_400 - Bad Request_
- Body
    ```json
    {
      "statusCode": 400,
      "error": {
        "message": String
      }
    }
    ```

### **POST /users/login**
#### Description
- Login based on user data

#### Request
- Headers
    ```json
    {
      "Content-Type": "postman/x-www-form-urlencoded"
    }
- Body
    ```json
    {
      "email": String,
      "password": String,
    }
    ```
#### Response
_201 - OK_
- Body
    ```json
    {
      "access_token": String,
      "id": Integer,
      "email": String,
      "role": String
    }
    ```

_400 - Bad Request_
- Body
    ```json
    {
      "statusCode": 400,
      "error": {
        "message": "Email or password cannot be empty"
      }
    }
    ```

_401 - Not Authorized_
- Body
    ```json
    {
      "statusCode": 401,
      "error": {
        "message": "Please login first"
      }
    }
    ```

_401 - Not Authorized_
- Body
    ```json
    {
      "statusCode": 401,
      "error": {
        "message": "Error invalid email or password"
      }
    }
    ```

_401 - Not Authorized_
- Body
    ```json
    {
      "statusCode": 401,
      "error": {
        "message": "Invalid token"
      }
    }
    ```    

_403 - Forbidden_
- Body
    ```json
    {
      "statusCode": 403,
      "error": {
        "message": "Forbidden"
      }
    }
    ```

### **POST /users/googleSignIn**
#### Description
- Login using google account

#### Request
- Headers
    ```json
    {
      "Content-Type": "postman/x-www-form-urlencoded"
    }

#### Response
_201 - OK_
- Body
    ```json
    {
      "access_token": String,
      "id": Integer,
      "email": String,
      "role": String
    }
    ```

_403 - Forbidden_
- Body
    ```json
    {
      "statusCode": 403,
      "error": {
        "message": "Forbidden"
      }
    }
    ```

### **GET /histories**
#### Description
- Get all the histories data

#### Request
- Headers
    ```json
    {
      "access_token": String
    }
    ```

#### Response
_200 - OK_

- Body
    ```json
    {
      "message": "Success read histories",
      "histories": [
        {
          "id": Integer,  
          "productId": Integer,
          "name": String,
          "description": String,
          "updatedBy": String,
          "createdAt": Date,
          "updatedAt": Date
        },
        ...
      ]
    }
    ```
## **Endpoints (Customer)**
### **GET /pub/products**
#### Description
- Get all the products with pagination data for customer

#### Response
_200 - OK_

- Body
    ```json
    {
      "response": {
        "totalItems": Integer,
        "products": [
            {
                "id": Integer,  
                "name": String,
                "description": String,
                "price": Integer,
                "stock": Integer,
                "imgUrl": String,
                "categoryId": Integer,
                "authorId": Integer,
                "status": String,
                "createdAt": Date,
                "updatedAt": Date,
                "Category": {
                    "id": Integer,
                    "name": String,
                    "createdAt": Date,
                    "updatedAt": Date
                }
            },
        ],
        "totalPages": Integer,
        "currentPage": Integer,
      }
    }
    ```

### **GET /pub/products:id**
#### Description
- Get a products data based on given id for customer

#### Response
_200 - OK_

- Body
    ```json
    {
      "message": "Success read product",
      "product": [
        {
          "id": Integer,  
          "name": String,
          "description": String,
          "price": Integer,
          "stock": Integer,
          "imgUrl": String,
          "categoryId": Integer,
          "authorId": Integer,
          "status": String,
          "createdAt": Date,
          "updatedAt": Date,
          "Category": {
              "id": Integer,
              "name": String
          }
        },
      ]
    }
    ```
_404 - Not Found_
- Body
    ```json
    {
      "statusCode": 404,
      "error": {
        "message": "Data not found"
      }
    }
    ```
### **POST /pub/users/register**
#### Description
- Create a new user data for customer

#### Request
- Headers
    ```json
    {
      "Content-Type": "postman/x-www-form-urlencoded"
    }
- Body
    ```json
    {
      "email": String,
      "password": String,
      "role": String,
      "phoneNumber": String,
      "address": String
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {
      "message": "Success create new public user",
    }
    ```

_400 - Bad Request_
- Body
    ```json
    {
      "statusCode": 400,
      "error": {
        "message": String
      }
    }
    ```

### **POST /pub/users/login**
#### Description
- Login based on user data for customer

#### Request
- Headers
    ```json
    {
      "Content-Type": "postman/x-www-form-urlencoded"
    }
- Body
    ```json
    {
      "access_token": String,
      "id": Integer,
      "email": String,
      "role": String
    }
    ```
#### Response
_201 - OK_
- Body
    ```json
    {
      "access_token": String,
      "email": String,
    }
    ```

_400 - Bad Request_
- Body
    ```json
    {
      "statusCode": 400,
      "error": {
        "message": "Email or password cannot be empty"
      }
    }
    ```

_401 - Not Authorized_
- Body
    ```json
    {
      "statusCode": 401,
      "error": {
        "message": "Please login first"
      }
    }
    ```

_401 - Not Authorized_
- Body
    ```json
    {
      "statusCode": 401,
      "error": {
        "message": "Error invalid email or password"
      }
    }
    ```

_401 - Not Authorized_
- Body
    ```json
    {
      "statusCode": 401,
      "error": {
        "message": "Invalid token"
      }
    }
    ```    

_403 - Forbidden_
- Body
    ```json
    {
      "statusCode": 403,
      "error": {
        "message": "Forbidden"
      }
    }
    ```

### **POST /pub/users/googleSignIn**
#### Description
- Login using google account for customer

#### Request
- Headers
    ```json
    {
      "Content-Type": "postman/x-www-form-urlencoded"
    }

#### Response
_201 - OK_
- Body
    ```json
    {
      "access_token": String,
      "id": Integer,
      "email": String,
      "role": String
    }
    ```

_403 - Forbidden_
- Body
    ```json
    {
      "statusCode": 403,
      "error": {
        "message": "Forbidden"
      }
    }
    ```

### **GET /pub/wishlist**
#### Description
- Get all wishlist data

#### Request
- Headers
    ```json
    {
      "access_token": String
    }
    ```

#### Response
_200 - OK_

- Body
    ```json
    {
      "message": "Success read wishlist",
      "wishlist": [
        {
            "id": Integer,
            "authorId": Integer,
            "productId": Integer,
            "createdAt": Date,
            "updatedAt": Date,
            "Product": {
                "id": Integer,  
                "name": String,
                "description": String,
                "price": Integer,
                "stock": Integer,
                "imgUrl": String,
                "categoryId": Integer,
                "authorId": Integer,
                "status": String,
                "createdAt": Date,
                "updatedAt": Date,
            }
        },
      ]
    }
    ```
### **POST /pub/wishlist**
#### Description
- Adding new product data to wishlist data

#### Request
- Headers
    ```json
    {
      "access_token": String
    }

#### Response
_201 - Created_
- Body
    ```json
    {
      "message": "Product with id {Product Id} wishlisted",
      "wishlist": {
        "id": Integer,
        "authorId": Integer,
        "productId": Integer,
        "updatedAt": Date,
        "createdAt": Date
      }
    }
    ```

_400 - Bad Request_
- Body
    ```json
    {
      "statusCode": 400,
      "error": {
        "message": String
      }
    }

    OR

    {
      "statusCode": 400,
      "error": {
        "message": "Product already in the wishlist"
      }
    }

    ```
_404 - Not Found_
- Body
    ```json
    {
      "statusCode": 404,
      "error": {
        "message": "Data not found"
      }
    }
    ```

### **DELETE /pub/wishlist/:id**
#### Description
- Remove a wishlist data based on given id

#### Request
- Headers
    ```json
    {
      "access_token": String
    }

#### Response
_200 - OK_
- Body
    ```json
    {
      "message": "Wishlist with {id} success to delete"
    }
    ```
_403 - Forbidden_
- Body
    ```json
    {
      "statusCode": 403,
      "error": {
        "message": "Forbidden"
      }
    }
    ```

_404 - Not Found_
- Body
    ```json
    {
      "statusCode": 404,
      "error": {
        "message": "Data not found"
      }
    }
    ```

### **Global Error**
#### Response
_500 - Internal Server Error_
- Body
    ```json
    {
      "statusCode": 500,
      "error": {
        "message": "Internal Server Error"
      }
    }
    ```