# Availio 

Availio is a location-based product search platform that helps users find products available in nearby stores.

Users can:
- Search for products (e.g. Coca Cola)
- Find nearby stores that have the product in stock
- View price, stock quantity, and distance

Store owners can:
- Register their store
- Manage inventory
- Update product quantities and prices

---

# Tech Stack

## Backend
- Node.js
- Express.js
- MySQL
- OpenCage Geocoding API

## Database
- MySQL

## Future Scope
- Authentication (JWT)
- Neo4j Recommendations
- Product Images
- Deployment

---


# Project Structure

```txt
availio
├── DB_MODELS
├── public
├── src
│   ├── config
│   ├── controllers
│   ├── routes
│   ├── utils
│   ├── views
│   └── app.js
├── package.json
├── package-lock.json
├── README.md
└── server.js
```


---

## Installation

### 1. Clone Repository

```bash
git clone <repo-url>
cd availio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env`

Create a `.env` file in the root directory.

Example:

```env
PORT=3000

MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=yourpassword
MYSQL_DATABASE=availio

OPEN_CAGE_API=your_opencage_api_key
```

### 4. Start Server

Development:

```bash
npm run dev
```

or

```bash
nodemon server.js
```

Production:

```bash
node server.js
```

---

# Database Setup

Create database:

```sql
CREATE DATABASE availio;
USE availio;
```

Create tables using the project SQL schema.

Required tables:

- stores
- products
- inventory

---

# API Endpoints

## Products

### Create Product

```http
POST /products
```

Body:

```json
{
  "name": "Coca Cola",
  "brand": "Coca Cola",
  "barcode": "123456"
}
```

### Get All Products

```http
GET /products
```

### Get Product By ID

```http
GET /products/:id
```

### Update Product

```http
PUT /products/:id
```

### Delete Product

```http
DELETE /products/:id
```

---

## Stores

### Create Store

```http
POST /store
```

Body:

```json
{
  "name": "DMart Uttam Nagar",
  "address": "Uttam Nagar, New Delhi"
}
```

Coordinates are automatically fetched using OpenCage.

### Get All Stores

```http
GET /store
```

### Search Store

```http
GET /store/search?query=dmart
```

### Get Stores By Location

```http
GET /store/location?location=uttam+nagar
```

Returns stores within a 5 km radius.

### Update Store

```http
PUT /store/:id
```

### Delete Store

```http
DELETE /store/:id
```

---

## Inventory

### Create Inventory

```http
POST /inventory
```

Body:

```json
{
  "store_id": 1,
  "product_id": 1,
  "quantity": 25,
  "price": 45
}
```

### Get All Inventory

```http
GET /inventory
```

### Get Inventory By Store

```http
GET /inventory/store/:storeId
```

### Update Inventory

```http
PUT /inventory/:id
```

### Delete Inventory

```http
DELETE /inventory/:id
```

---

## Product Search

### Search Product Near User

```http
GET /search
```

Query Parameters:

| Parameter | Description |
|-----------|-------------|
| query | Product name |
| lat | User latitude |
| lng | User longitude |

Example:

```http
GET /search?query=coca&lat=28.6218&lng=77.0548
```

Response contains:

- Product Name
- Store Name
- Address
- Stock
- Price
- Distance

---

## Nearby Stores

### Get Nearby Stores

```http
GET /nearbyStores
```

Query Parameters:

| Parameter | Description |
|-----------|-------------|
| latitude | User latitude |
| longitude | User longitude |

Example:

```http
GET /nearbyStores?latitude=28.6218&longitude=77.0548
```

Returns stores within 5 km sorted by nearest distance.

---

# Frontend Integration

## Get User Location

```javascript
navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
});
```

Use these coordinates when calling:

```http
GET /search
```

and

```http
GET /nearbyStores
```

---

# Pages To Build

## Home Page

Features:

- Search Bar
- Use My Location Button

## Search Results Page

Display:

- Product Name
- Store Name
- Price
- Stock
- Distance

## Store Dashboard

Display:

- Store Inventory
- Add Product
- Update Quantity
- Update Price
- Delete Product

---

# Team Notes

- Do not commit `.env`
- Do not commit `node_modules`
- Always pull before pushing

```bash
git pull origin main
```

Before pushing:

```bash
git add .
git commit -m "your message"
git push origin main
```

---

# Current Status

## Backend Completed

- ✅ Product CRUD
- ✅ Store CRUD
- ✅ Inventory CRUD
- ✅ Product Search
- ✅ Nearby Store Search
- ✅ OpenCage Integration
- ✅ Location-Based Store Search

## Pending

- ⏳ Frontend Development
- ⏳ Authentication
- ⏳ Deployment

---
