# EkaTrack (እቃTrack)

A full-stack stock management system built to help small businesses manage their inventory efficiently.

EkaTrack (እቃTrack) focuses on solving real-world inventory challenges while serving as a learning journey into building scalable full-stack applications.

---

## Tech Stack

### Frontend

- React
- TypeScript

### Backend

- Node.js
- Express.js
- TypeScript

### Database

- PostgreSQL
- Prisma ORM

---
## Features

- User authentication
- Role-based access control
- Product management
- Category management
- Stock In / Stock Out
- Inventory dashboard
- Transaction history
- Low-stock alerts
- Reports

 ## User Roles

Currently, the system has three roles:

- **ADMIN** – The business owner with full system access.
- **MANAGER** – Supervises inventory and manages stock operations.
- **STAFF** – Handles day-to-day sales and stock-related tasks (e.g., cashier).

> More roles and permissions may be added in future versions.
  
## Running the Project Locally

1. Clone the repository.

2. Create a `.env` file and define the required environment variables:

```env
PORT=5000
JWT_SECRET=your_secret_key
DATABASE_URL="postgresql://username:password@localhost:5432/your_db?schema=public"
```

3. Install the dependencies:

```bash
npm install
```

4. Seed the database to create the first **Admin** account:

```bash
npx tsx ./prisma/seed.ts
```

5. Start the development server:

```bash
npm run dev
```
