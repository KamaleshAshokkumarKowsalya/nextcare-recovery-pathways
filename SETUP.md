# NextCare Setup Guide

## Quick Start

### 1. Install Dependencies

**Frontend:**
```bash
cd /Users/roshan/Desktop/html/nextcare/nextcare-recovery-pathways
npm install
```

**Backend:**
```bash
cd /Users/roshan/Desktop/html/nextcare/nextcare-recovery-pathways/server
npm install
```

### 2. Setup MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB (if not installed)
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection string
4. Update `server/.env` with your connection string

### 3. Configure Environment Variables

**Backend** (`server/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nextcare
JWT_SECRET=your_secure_random_jwt_secret_change_this
NODE_ENV=development
```

**Frontend** (`.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Run the Application

**Run both frontend and backend together:**
```bash
cd /Users/roshan/Desktop/html/nextcare/nextcare-recovery-pathways
npm run dev:full
```

**Or run separately:**

Terminal 1 - Backend:
```bash
cd server
npm run dev
```

Terminal 2 - Frontend:
```bash
npm run dev
```

### 5. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- API Health Check: http://localhost:5000/api/health

### 6. Create First User

1. Go to http://localhost:3000/register
2. Register a new account
3. Complete the onboarding process
4. Access the dashboard

### 7. Create Admin User (Optional)

To create an admin user, you'll need to manually update the user in MongoDB:

```javascript
// Connect to MongoDB and run:
db.users.updateOne(
  { email: "admin@nextcare.com" },
  { $set: { role: "admin" } }
)
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `brew services list`
- Check connection string in `server/.env`
- Verify MongoDB is accessible: `mongosh`

### Port Already in Use
```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill

# Find and kill process on port 3000
lsof -ti:3000 | xargs kill
```

### Module Not Found Errors
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# For server
cd server
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. Customize the theme in `src/theme.js`
2. Add more API endpoints as needed
3. Implement additional features
4. Configure production deployment
5. Set up environment-specific configs

## Key Changes Made

✅ Removed all hardcoded/fake data
✅ Converted TypeScript to JavaScript
✅ Replaced shadcn/Radix UI with Chakra UI
✅ Added Express.js backend with MongoDB
✅ Implemented JWT authentication
✅ Created RESTful API endpoints
✅ Connected frontend to backend via API calls
✅ Removed all TypeScript config files
✅ Updated Vite config for proxy

## File Structure

```
nextcare-recovery-pathways/
├── src/                       # Frontend (React + Chakra UI)
│   ├── pages/                 # All pages use API calls
│   ├── services/api.js        # API service layer
│   ├── contexts/AuthContext.jsx
│   └── theme.js               # Chakra UI theme
├── server/                    # Backend (Express + MongoDB)
│   ├── models/                # Mongoose schemas
│   ├── controllers/           # Business logic
│   ├── routes/                # API routes
│   ├── middleware/            # Auth middleware
│   └── server.js              # Server entry
└── package.json
```
