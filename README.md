
# SwipeCart

SwipeCart is a full-stack E-commerce platform built using MERN stack with TailwindCSS and MUI as UI-toolkit.

## Features

- Secure user authentication and session storage using jwt-tokens.

- Product catalogs with search, filter and pagination functionalities.

- Detailed product description with add to cart     functionality.

- Secure product checkout and payment gateway with Stripejs.

## Demo

https://youtu.be/icyQ7u3b87c?si=SHoRcXrXUfAIUSLG

## Installation

Follow the steps below to install and run the project.

### Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (which includes npm)

### Clone the Repository

First, clone the repository to your local machine using `git`.

```sh
git clone https://github.com/Sumitkevlani/SwipeCart.git
cd SwipeCart
```
### For frontend
```bash
  cd frontend
  npm install
  npm run dev
```

### For backend
```bash
  cd backend
  npm install
  npm run dev
```

## API Reference

#### Register user

```http
  POST /api/user/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name`    | `string` | **Required**               |
| `email`   | `string` | **Required**               |
| `password`| `string` | **Required**               |
| `avatar`  | `file`   | **Not Required**           |

#### Login user

```http
  POST /api/user/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`   | `string` | **Required**|
| `password`| `string` | **Required**|


#### Logout user

```http
  GET /api/user/logout
```

### Forgot password
```http
  GET /api/user/forgot-password
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email`   | `string` | **Required**               |

### Reset password
```http
  PUT /api/user/password/reset/:token
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `password`| `string` | **Required**               |
| `confirmPassword`   | `string`  | **Required**|



### Get all products
```http
  GET /api/product/get-all-products
```

### Create a new product(Admin only)
```http
  POST /api/product/admin/create-product/new
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name`    | `string` | **Required**               |
| `description`   | `string`|**Required**           |
| `price`|  `number`| **Required**                  |
| `ratings`  | `number`   | **Not Required**        |
| `images`  | `array`   | **Not Required**          |
| `category`  | `string`   | **Required**           |
| `Stock`  | `number`   | **Required**              |
| `numOfReviews`  | `number`   | **Required**       |
| `reviews`  | `array`   | **Not Required**         |

### Update product details(Admin only)
```http
  PUT /api/product/admin/update-product/:product-id
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name`    | `string` | **Required**               |
| `description`   | `string`|**Required**           |
| `price`|  `number`| **Required**                  |
| `ratings`  | `number`   | **Not Required**        |
| `images`  | `array`   | **Not Required**          |
| `category`  | `string`   | **Required**           |
| `Stock`  | `number`   | **Required**              |
| `numOfReviews`  | `number`   | **Required**       |
| `reviews`  | `array`   | **Not Required**         |

### Delete a product(Admin only)
```http
  DELETE /api/product/admin/delete-product/:product-id
```

### Get a specific product
```http
  GET /api/product/get-product-details/:product-id
```

### Search a product
```http
  GET /api/product/get-product-details?keyword={keyword}
```

### Filter a product
```http
  GET /api/product/get-all-products?ratings[gte]={rating}
```

### Pagination
```http
  GET /api/product/get-all-products?page={page}
```

### Get a user(Admin only)
```http
  GET /api/user/admin/get-user/:user-id
```

### Delete a user(Admin only)
```http
  DELETE /api/user/admin/delete-user/:user-id
```

### Update user role(Admin only)
```http
  PUT /api/user/admin/update-role/user-id
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name`    | `string` | **Required**               |
| `email`   | `string` | **Required**               |
| `role`| `string` | **Required**                   |


### Get all users(Admin only)
```http
  GET /api/user/admin/get-all-users
```

### Upate Profile
```http
  PUT /api/user/update-profile
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name`    | `string` | **Required**               |
| `email`   | `string` | **Required**               |
| `avatar`| `file` | **Required**                   |


### Upate password
```http
  PUT /api/user/update-password
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `oldPassword`    | `string` | **Required**        |
| `newPassword`   | `string` | **Required**         |
| `confirmPassword`| `string` | **Required**        |


### Get profile
```http
  GET /api/user/profile
```

### Create or update reviews
```http
  PUT /api/product/reviews
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `rating`    | `number` | **Required**             |
| `comment`   | `string` | **Required**             |
| `productId`   | `objectId` | **Required**         |
| `name`   | `string` | **Required**                |


### Get all reviews
```http
  GET /api/product/reviews?id={reviewId}
```

### Delete a review
```http
  DELETE /api/product/reviews?id={reviewId}&productId={productId}
```

### Create a new order
```http
  POST /api/product/admin/create-product/new
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `shippingInfo`    | `object` | **Required**       |
| `orderItems`   | `array`|**Required**             |
| `paymentInfo`|  `object`| **Required**            |
| `itemsPrice`  | `number`   | **Required**         |
| `taxPrice`  | `number`   | **Required**           |
| `shippingPrice`  | `number`   | **Required**      |
| `totalPrice`  | `number`   | **Required**         |


### Get single order(Admin only)
```http
  GET /api/product/admin/get-single-order/:orderId
```

### Get user specific order details
```http
  GET /api/order/get-my-orders
```

### Get all orders(Admin only)
```http
  GET /api/order/admin/get-all-orders
```

### Update order status(Admin only)
```http
  PUT /api/order/admin/update-order/:orderId
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `status`    | `string` | **Required**             |


### Delete order(Admin only)
```http
  DELETE /api/order/admin/delete-order/:orderId
```

### Process a payment
```http
  POST /api/payment/process-payment
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `amount`    | `number` | **Required**             |


### Get Stripe API Key
```http
  GET /api/payment/stripeapikey
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`MONGO_URI`

`SECRET_KEY`

`EXPIRE_TIME`

`COOKIE_EXPIRE`

`SMTP_HOST`

`SMTP_PORT`

`SMTP_USER`

`SMTP_PASSWORD`

`CLOUDINARY_NAME`

`CLOUDINARY_APIKEY`

`CLOUDINARY_APISECRET`

`STRIPE_PUBLISHABLE_KEY`

`STRIPE_SECRET_KEY`



    
## 🔗 Links


[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sumit-kevlani-b61945224/)


[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/KevlaniSum22554)

