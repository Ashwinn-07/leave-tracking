# Employee Leave & Attendance Management System

## 📖 Project Overview

A **MERN + TypeScript** application featuring:

- Role-based authentication (Employee/Manager/Admin)
- Leave management system with approvals
- Employee attendance tracking
- Company holiday configuration

## 🛠 Tech Stack

**Backend**:

- Node.js | Express | TypeScript
- MongoDB | Mongoose
- Repository Pattern Architecture
- tsyringe (Dependency Injection)
- Repository-Service-Controller layers

**Frontend**:

- React | TypeScript
- Zustand (store slices) | React Router
- Axios (scoped API instances)
- Tailwind CSS | react-hot-toast

## ✨ Core Features

### 1. Authentication & Authorization

- JWT in HTTP-only cookies
- Role-based route protection
- Session cleanup on logout

### 2. Leave Management

- **Employees**: Request/view/cancel leaves
- **Managers**: Approve/reject requests
- **Admins**: Configure leave types

### 3. Attendance Tracking

- Clock-in/out system
- Attendance history
- Manager edit approvals

### 4. Holiday Management

- Admin-defined company holidays

## 🚀 Local Setup

### 1. Clone Repository

```bash
git clone https://github.com/Ashwinn-07/leave-tracking.git
cd leave-tracking
2. Backend Setup
bash
cd backend
npm install

# Create .env file
echo "MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=3000
FRONTEND_URL=http://localhost:5173" > .env

npm run dev
3. Frontend Setup
bash
cd ../frontend
npm install

# Create .env file
echo "VITE_BACKEND_URL=http://localhost:3000/api" > .env

npm run dev
4. Seed Demo Data
bash
# From backend directory
npm run seed
⚙️ Environment Variables
Backend (.env)

env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
PORT=3000
FRONTEND_URL=http://localhost:5173
Frontend (.env)

env
VITE_BACKEND_URL=http://localhost:3000/api
```
