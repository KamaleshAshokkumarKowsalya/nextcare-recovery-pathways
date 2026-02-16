# 🏥 NextCare Recovery Pathways - Full Stack Application

## ✨ Complete Refactor Summary

Your application has been completely transformed:

### Before ➡️ After

| Component | Before | After |
|-----------|--------|-------|
| **Frontend Framework** | TypeScript + React | JavaScript + React |
| **UI Library** | shadcn/ui + Radix UI | Chakra UI |
| **Backend** | None (Frontend only) | Express.js |
| **Database** | None (LocalStorage) | MongoDB |
| **Data** | Hardcoded/Mock data | RESTful API calls |
| **Authentication** | Client-side only | JWT-based |

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js v18+
- MongoDB installed OR MongoDB Atlas account

### 1️⃣ Install Dependencies

Both dependencies are already installed! ✅

### 2️⃣ Start MongoDB

**Local MongoDB:**
```bash
brew services start mongodb-community
```

**Or use MongoDB Atlas** - Get connection string from https://mongodb.com/atlas

### 3️⃣ Update Environment Variables

Edit `server/.env` if needed:
```env
MONGODB_URI=mongodb://localhost:27017/nextcare
JWT_SECRET=your_secret_key_here
```

### 4️⃣ Run the Application

**Option A - Run both together:**
```bash
npm run dev:full
```

**Option B - Run separately:**
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend  
npm run dev
```

### 5️⃣ Access the App

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/api/health

---

## 📁 New Project Structure

```
nextcare-recovery-pathways/
├── 📂 src/                          # React Frontend (JavaScript)
│   ├── 📂 components/
│   │   └── PrivateRoute.jsx         # Route protection
│   ├── 📂 contexts/
│   │   └── AuthContext.jsx          # Auth state management
│   ├── 📂 pages/                    # All using API calls
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Onboarding.jsx
│   │   ├── Profile.jsx
│   │   ├── Admin.jsx
│   │   └── NotFound.jsx
│   ├── 📂 services/
│   │   └── api.js                   # Axios API service layer
│   ├── 📂 utils/
│   │   └── riskScoreCalculator.js
│   ├── theme.js                     # Chakra UI theme
│   ├── App.jsx                      # Main app component
│   └── main.jsx                     # Entry point
│
├── 📂 server/                       # Express Backend
│   ├── 📂 config/
│   │   └── database.js              # MongoDB connection
│   ├── 📂 controllers/              # Business logic
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── appointmentController.js
│   │   ├── carePlanController.js
│   │   └── healthResourceController.js
│   ├── 📂 middleware/
│   │   └── auth.js                  # JWT authentication
│   ├── 📂 models/                   # Mongoose schemas
│   │   ├── User.js
│   │   ├── Appointment.js
│   │   ├── CarePlan.js
│   │   └── HealthResource.js
│   ├── 📂 routes/                   # API routes
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── appointments.js
│   │   ├── carePlans.js
│   │   └── healthResources.js
│   ├── .env                         # Environment variables
│   ├── package.json
│   └── server.js                    # Server entry point
│
├── .env                             # Frontend env
├── vite.config.js                   # Vite config with proxy
├── package.json                     # Frontend deps
├── README.md                        # Documentation
└── SETUP.md                         # Setup instructions
```

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register     - Register new user
POST   /api/auth/login        - Login user  
GET    /api/auth/me           - Get current user (Protected)
```

### Users
```
GET    /api/users/profile     - Get user profile (Protected)
PUT    /api/users/profile     - Update profile (Protected)
GET    /api/users             - Get all users (Admin)
DELETE /api/users/:id         - Delete user (Admin)
```

### Appointments
```
GET    /api/appointments      - Get user's appointments (Protected)
POST   /api/appointments      - Create appointment (Protected)
GET    /api/appointments/:id  - Get single appointment (Protected)
PUT    /api/appointments/:id  - Update appointment (Protected)
DELETE /api/appointments/:id  - Delete appointment (Protected)
```

### Care Plans
```
GET    /api/care-plans        - Get user's care plans (Protected)
POST   /api/care-plans        - Create care plan (Protected)
GET    /api/care-plans/:id    - Get single care plan (Protected)
PUT    /api/care-plans/:id    - Update care plan (Protected)
DELETE /api/care-plans/:id    - Delete care plan (Protected)
```

### Health Resources
```
GET    /api/health-resources      - Get resources (Public)
POST   /api/health-resources      - Create resource (Admin)
GET    /api/health-resources/:id  - Get single resource (Public)
PUT    /api/health-resources/:id  - Update resource (Admin)
DELETE /api/health-resources/:id  - Delete resource (Admin)
```

---

## 🎨 Key Features

### Frontend (Chakra UI)
- ✅ Clean, accessible Chakra UI components
- ✅ Responsive design
- ✅ Dark mode ready theme
- ✅ Toast notifications
- ✅ Loading states and spinners
- ✅ Form validation
- ✅ Protected routes
- ✅ Role-based access control

### Backend (Express + MongoDB)
- ✅ RESTful API architecture
- ✅ JWT authentication
- ✅ Password hashing with bcrypt
- ✅ MongoDB with Mongoose ODM
- ✅ Input validation
- ✅ Error handling middleware
- ✅ CORS enabled
- ✅ Environment-based configuration

### Authentication Flow
1. User registers/logs in
2. Server generates JWT token
3. Token stored in localStorage
4. Token sent with every API request
5. Server verifies token with middleware
6. Protected routes accessible

---

## 🔧 Configuration Files

### `vite.config.js`
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
```

### `server/server.js`
```javascript
// Express server with MongoDB
// CORS enabled
// All routes configured
// Error handling
```

---

## 📦 Dependencies

### Frontend
- `@chakra-ui/react` - UI components
- `axios` - HTTP client
- `react-router-dom` - Routing
- `react-hook-form` - Forms
- `react-icons` - Icons
- `date-fns` - Date formatting

### Backend
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT auth
- `bcryptjs` - Password hashing
- `cors` - CORS middleware
- `dotenv` - Environment variables

---

## 🧪 Testing the Application

### 1. Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 3. Access Protected Route
```bash
curl http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🎯 Next Steps

1. **Start MongoDB** if using local installation
2. **Run the app** with `npm run dev:full`
3. **Register** your first user at http://localhost:3000/register
4. **Complete onboarding** to set up your profile
5. **Explore the dashboard** to see API-driven data

### To Create Admin User
After registering, update in MongoDB:
```javascript
db.users.updateOne(
  { email: "your@email.com" },
  { $set: { role: "admin" } }
)
```

---

## 📝 Notes

- ✅ All TypeScript files converted to JavaScript
- ✅ All hardcoded data removed
- ✅ All forms now use API calls
- ✅ shadcn/Radix UI completely replaced with Chakra UI
- ✅ Full backend with MongoDB integration
- ✅ JWT authentication implemented
- ✅ Environment variables configured
- ✅ Both package.json files updated

**Dependencies installed successfully!**

---

## 🐛 Troubleshooting

### MongoDB not connecting?
```bash
# Check if MongoDB is running
brew services list

# Start MongoDB
brew services start mongodb-community

# Or use MongoDB Atlas cloud database
```

### Port 3000 or 5000 already in use?
```bash
# Kill process on port
lsof -ti:3000 | xargs kill
lsof -ti:5000 | xargs kill
```

### Module errors?
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

cd server
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Additional Resources

- [Chakra UI Docs](https://chakra-ui.com/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/)
- [JWT.io](https://jwt.io/)

**Your application is now fully refactored and ready to use! 🎉**
