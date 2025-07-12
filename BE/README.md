# ReWear Backend API

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create a `.env` file in the BE directory:**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/rewear
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

## Project Structure

```
BE/
  |-- controllers/
  |     |-- authController.js
  |     |-- itemController.js
  |     |-- swapController.js
  |     |-- adminController.js
  |
  |-- models/
  |     |-- userModels.js
  |     |-- itemModel.js
  |     |-- swapModel.js
  |     |-- pointModel.js
  |
  |-- routes/
  |     |-- authRoutes.js
  |     |-- itemRoutes.js
  |     |-- swapRoutes.js
  |     |-- adminRoutes.js
  |
  |-- middlewares/
  |     |-- authMiddleware.js
  |     |-- errorMiddleware.js
  |
  |-- index.js
  |-- package.json
  |-- .env
```

## Main Features
- User authentication (JWT, bcrypt)
- Item CRUD (add, update, delete, list)
- Swap requests and point system
- Admin moderation (approve/reject, remove users/items)
- Modular, clean code
- Centralized error handling
- Input validation (add as needed)

## API Endpoints

### Auth
- `POST /api/auth/signup` — Register
- `POST /api/auth/signin` — Login
- `GET /api/auth/profile` — Get user profile (JWT required)

### Items
- `POST /api/items` — Add item (JWT required)
- `GET /api/items` — List items
- `GET /api/items/:id` — Get item by ID
- `PUT /api/items/:id` — Update item (JWT required, owner only)
- `DELETE /api/items/:id` — Delete item (JWT required, owner only)

### Swaps
- `POST /api/swaps` — Create swap request (JWT required)
- `GET /api/swaps` — List user swaps (JWT required)
- `PUT /api/swaps/:id` — Update swap status (JWT required, owner only)

### Admin
- `GET /api/admin/pending-items` — List items pending approval (admin only)
- `PUT /api/admin/item/:id` — Approve/reject item (admin only)
- `DELETE /api/admin/user/:id` — Remove user (admin only)
- `DELETE /api/admin/item/:id` — Remove item (admin only)

---

**You are ready to build your frontend and scale your backend!**

For any new features, just add a new controller, route, and update the model as needed. 