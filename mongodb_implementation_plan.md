# MongoDB Implementation Plan for Zomato Frontend

## Goal Description
Design a production‑ready MongoDB data model and corresponding REST API structure to support all frontend features listed in the Zomato application. This plan outlines collections, key fields, indexes, relationships, and sample endpoint signatures that the future backend (Node.js/Express) will implement.

## User Review Required
> [!IMPORTANT]
> Please review the proposed collection schemas and API surface. Approve to proceed with backend implementation or suggest modifications (e.g., additional fields, naming conventions, indexing strategies).

## Open Questions
- **Authentication method**: Should we store passwords with bcrypt hashes in the `users` collection, or use an external auth provider (e.g., Auth0)?
- **Image storage**: Will restaurant and user images be stored in Cloudinary with URLs saved in MongoDB, or uploaded to the server filesystem?
- **Geo‑location**: Do we need a 2dsphere index on restaurant coordinates for “Nearby Restaurants” queries?
- **Payment data**: Should payment transaction records be kept in a separate `payments` collection or embedded within `orders`?

## Proposed Collections & Schemas

### 1. users
```json
{
  "_id": ObjectId,
  "email": { "type": "string", "unique": true },
  "passwordHash": "string", // bcrypt hash
  "name": "string",
  "role": { "enum": ["customer", "owner", "admin"] },
  "profilePhoto": "string", // URL (Cloudinary)
  "addresses": [
    {
      "_id": ObjectId,
      "label": "string",
      "line1": "string",
      "line2": "string",
      "city": "string",
      "state": "string",
      "postalCode": "string",
      "coordinates": { "type": "[Number]", "index": "2dsphere" }
    }
  ],
  "wishlist": [{ "type": "ObjectId", "ref": "restaurants" }],
  "createdAt": Date,
  "updatedAt": Date
}
```

### 2. restaurants
```json
{
  "_id": ObjectId,
  "ownerId": { "type": "ObjectId", "ref": "users" },
  "name": "string",
  "slug": "string", // for SEO URLs
  "description": "string",
  "logo": "string", // URL
  "coverImage": "string",
  "cuisine": ["string"],
  "categoryIds": [{ "type": "ObjectId", "ref": "categories" }],
  "address": {
    "line1": "string",
    "city": "string",
    "state": "string",
    "postalCode": "string",
    "coordinates": { "type": "[Number]", "index": "2dsphere" }
  },
  "rating": { "type": "Number", "default": 0 },
  "reviewCount": { "type": "Number", "default": 0 },
  "isApproved": { "type": "Boolean", "default": false },
  "isOpen": { "type": "Boolean", "default": true },
  "createdAt": Date,
  "updatedAt": Date
}
```

### 3. categories
```json
{
  "_id": ObjectId,
  "name": "string",
  "icon": "string",
  "createdAt": Date,
  "updatedAt": Date
}
```

### 4. menuItems
```json
{
  "_id": ObjectId,
  "restaurantId": { "type": "ObjectId", "ref": "restaurants" },
  "name": "string",
  "description": "string",
  "price": "Number",
  "image": "string",
  "category": "string",
  "isAvailable": { "type": "Boolean", "default": true },
  "createdAt": Date,
  "updatedAt": Date
}
```

### 5. orders
```json
{
  "_id": ObjectId,
  "userId": { "type": "ObjectId", "ref": "users" },
  "restaurantId": { "type": "ObjectId", "ref": "restaurants" },
  "items": [
    {
      "menuItemId": { "type": "ObjectId", "ref": "menuItems" },
      "quantity": "Number",
      "price": "Number"
    }
  ],
  "status": {
    "enum": ["pending", "accepted", "rejected", "preparing", "ready", "out_for_delivery", "delivered", "cancelled"]
  },
  "total": "Number",
  "deliveryAddress": {
    "type": "ObjectId",
    "ref": "users.addresses"
  },
  "paymentId": { "type": "ObjectId", "ref": "payments" },
  "createdAt": Date,
  "updatedAt": Date
}
```

### 6. payments
```json
{
  "_id": ObjectId,
  "orderId": { "type": "ObjectId", "ref": "orders" },
  "method": { "enum": ["card", "upi", "wallet", "cash"] },
  "status": { "enum": ["pending", "successful", "failed"] },
  "transactionId": "string",
  "amount": "Number",
  "createdAt": Date
}
```

### 7. reviews
```json
{
  "_id": ObjectId,
  "userId": { "type": "ObjectId", "ref": "users" },
  "restaurantId": { "type": "ObjectId", "ref": "restaurants" },
  "rating": { "type": "Number", "min": 1, "max": 5 },
  "comment": "string",
  "createdAt": Date,
  "updatedAt": Date
}
```

### 8. coupons
```json
{
  "_id": ObjectId,
  "code": "string",
  "discountType": { "enum": ["percentage", "fixed"] },
  "value": "Number",
  "minOrderValue": "Number",
  "validFrom": Date,
  "validTo": Date,
  "usageLimit": { "type": "Number", "default": null },
  "usedCount": { "type": "Number", "default": 0 },
  "applicableRestaurantIds": [{ "type": "ObjectId", "ref": "restaurants" }],
  "createdAt": Date,
  "updatedAt": Date
}
```

### 9. notifications
```json
{
  "_id": ObjectId,
  "userId": { "type": "ObjectId", "ref": "users" },
  "type": "string",
  "message": "string",
  "isRead": { "type": "Boolean", "default": false },
  "createdAt": Date
}
```

## Indexing Recommendations
- `users.email` – unique index for login.
- `restaurants.slug` – unique index for SEO URLs.
- `restaurants.coordinates` – `2dsphere` index for geo queries (nearby).
- `orders.userId` – to fetch order history quickly.
- `orders.status` – for admin order management.
- `reviews.restaurantId` – for aggregating rating.
- `coupons.code` – unique index for coupon redemption.

## API Surface (REST) Overview
| Resource | Endpoints (example) | Purpose |
|----------|----------------------|---------|
| **auth** | `POST /api/auth/login`, `POST /api/auth/register`, `POST /api/auth/forgot`, `POST /api/auth/reset` | JWT authentication |
| **users** | `GET /api/users/me`, `PUT /api/users/me`, `POST /api/users/me/avatar` | Profile & address management |
| **restaurants** | `GET /api/restaurants`, `GET /api/restaurants/:slug`, `GET /api/restaurants/:id/menu` | Discovery, details |
| **categories** | `GET /api/categories` | Filter list |
| **menuItems** | `GET /api/restaurants/:id/menu` (already covered) |
| **orders** | `POST /api/orders`, `GET /api/orders/me`, `GET /api/orders/:id`, `PATCH /api/orders/:id/status` (admin) |
| **payments** | `POST /api/payments/checkout` (integrate gateway) |
| **reviews** | `POST /api/restaurants/:id/reviews`, `GET /api/restaurants/:id/reviews` |
| **wishlist** | `GET /api/users/me/wishlist`, `POST /api/users/me/wishlist`, `DELETE /api/users/me/wishlist/:restaurantId` |
| **coupons** | `GET /api/coupons`, `POST /api/coupons/apply` |
| **notifications** | `GET /api/users/me/notifications`, `PATCH /api/notifications/:id/read` |
| **admin** | Various admin routes: `/api/admin/users`, `/api/admin/restaurants`, `/api/admin/coupons`, etc. |

## Verification Plan
- **Schema Validation**: Use Mongoose schemas (or native driver validators) matching the JSON structures above.
- **Index Tests**: Ensure indexes are created on startup; run explain plans for geo and text queries.
- **API Contract**: Create OpenAPI (Swagger) spec from the endpoint table; auto‑generate stub controllers.
- **Integration Tests**: Write Jest/Supertest suites covering CRUD for each collection and authentication flows.
- **Performance Checks**: Load‑test `GET /api/restaurants` with geo queries (1000 concurrent requests) and monitor response time.

---
*Please approve or provide feedback on the collection designs, indexing strategy, and API surface. Once approved, the backend team can begin implementing the schemas and routes.*
