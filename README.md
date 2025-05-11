# Employee Leave & Attendance Management System

## 📖 Project Overview

This project is a **MERN + TypeScript** application implementing:

- **Authentication** with role-based access (Employee, Manager, Admin).
- **Leave Management**: leave types, leave requests, approvals, cancellations.
- **Attendance Tracking**: clock-in/out, history, manager edits.
- **Holiday Management**: admin-defined company holidays.

## 🛠 Tech Stack

- **Backend**: Node.js, Express, MongoDB, Mongoose, TypeScript
- **DI & Patterns**: tsyringe (Dependency Injection), Repository-Service-Controller layers
- **Frontend**: React, TypeScript, Zustand (store slices), React Router
- **API Clients**: Axios with scoped instances (`authApi`, `employeeApi`, `managerApi`, `adminApi`)
- **Styling**: Tailwind CSS
- **Toasts**: react-hot-toast

## ✨ Core Features

1. **Authentication & Authorization**

   - JWT in HTTP-only cookies
   - Role guards per route

2. **Leave Types (Admin)**

   - Manage Leave Types

3. **Leave Requests (Employee)**

   - Request, view, cancel

4. **Manager Approvals**

   - List pending leave & attendance edits
   - Approve or reject

5. **Attendance (Employee & Manager)**

   - Clock-in/out
   - History and edit approvals

6. **Holiday Management (Admin)**

   - Define company holidays

7. **Logout**
   - Clear session cookie and client state

## 🚀 Local Setup

1. **Clone the repo**

   ```bash
   git clone https://github.com/Ashwinn-07/leave-tracking.git
   cd leave-tracking
   ```

   cd backend
   npm install

# create .env with:

# MONGODB_URI=<your_mongo_uri>

# JWT_SECRET=<your_jwt_secret>

# PORT=3000

# FRONTEND_URL=http://localhost:5173

npm run dev

cd frontend
npm install

# create .env with:

# VITE_BACKEND_URL=http://localhost:3000/api

npm run dev

# seed demo users

npm run seed
