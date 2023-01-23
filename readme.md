## **Meal Record Keeping Application**

This is a meal record keeping application that allows users to log their meals, view their meal records and update them. It also includes user authentication, role-based permissions and pagination.


**Postman collection link** -

https://www.postman.com/descent-module-architect-13586242/workspace/meal-recorder-app/collection/19587055-d0ec6f18-e1a1-4ed0-b06f-640fd5c88842?action=share&creator=19587055

**Api documentation with examples** -

 https://documenter.getpostman.com/view/19587055/2s8ZDa1gHC

### **Features**

- User authentication using email and password with JWT token
- Forgot password functionality
- Add new meal records with time, meal name, and calories
- View all meals
- Update meal records by id
- Role-based permissions
    - Users can CRUD only their records
    - Admins can CRUD everyone's records
    - Admins can make any user an admin and make any admin a normal user
- Pagination and other filters to fetch records
- If calories are not entered, the application will call an API to fetch the calories via meal name.

## **Getting Started**

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### **Prerequisites**

- NodeJS
- MongoDB
- nutritionix API key

### **Installing**

- Clone the repository

```bash
Copy code
git clone https://github.com/Shreyaan/spotify-backend-dn.git
```

- Install the dependencies

```bash
yarn
```

- Create a .env file in the root directory of the project by following .env example in project root

- Start the development server

```
Copy code
npm run dev
```

## **API Routes**
https://documenter.getpostman.com/view/19587055/2s8ZDa1gHC

## **Built With** 

- **[NodeJS](https://nodejs.org/)**
- **[ExpressJS](https://expressjs.com/)**
- **[MongoDB](https://www.mongodb.com/)**
- **[nutritionix api](https://www.nutritionix.com/business/api)**


## **models**

The User model has several fields, including email, password, role, created_at, and updated_at. The email field has a type of String and is set as required and unique. The password field is also a String and is not required. The role field is a String with a defined set of allowed values ("user" or "admin") and has a default value of "user". The created_at and updated_at fields are both Dates, with created_at having a default value of the current date and time.

The Meal model has several fields, including user_id, name, servingSize, description, calories, protein, carbs, fat, created_at, and updated_at. The user_id field is an ObjectId and is required. The name field is a String and is required. The servingSize, description, calories, protein, carbs, and fat fields are Numbers, and servingSize and calories are required. The created_at and updated_at fields are both Dates, with created_at having a default value of the current date and time.
