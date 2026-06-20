# 🚀 TaskFlow Pro (Full-Stack AI Task Manager)

> **Live Demo:** [https://taskflow-pro-alpha.vercel.app/auth]

TaskFlow Pro is a modern, full-stack task management application built as the final project for the **Mastering Next.js Bootcamp** hosted by DevTown, Microsoft Student Chapter (MSC), and Google Developer Groups (GDG).

This application goes beyond basic CRUD operations by featuring a completely custom-built authentication system and an AI-powered engine that breaks down large tasks into actionable sub-tasks.

---

## ✨ Key Features

* **Custom Authentication Security:** A ground-up security architecture using JSON Web Tokens (JWT) for secure sessions, HTTP-only cookies, and Next.js Middleware to protect private routes.
* **Password Cryptography:** User passwords are encrypted and hashed utilizing `bcryptjs` (12 rounds) before entering the database.
* **AI Sub-Task Generation:** Integrated with the Groq AI API to automatically analyze user tasks and generate step-by-step, actionable sub-tasks.
* **Full CRUD Functionality:** Users can Create, Read, Update, and Delete tasks with priority tagging (High, Medium, Low) and due dates.
* **Database Driven:** Powered by a PostgreSQL relational database managed seamlessly through Prisma ORM.

---

## 🛠️ Tech Stack

* **Frontend:** Next.js 14 (App Router), React, Tailwind CSS
* **Backend:** Next.js Server Actions & API Routes
* **Database:** Supabase (PostgreSQL), Prisma ORM
* **Security:** `jsonwebtoken`, `bcryptjs`, Next.js Middleware
* **AI Integration:** Groq API

---

## 💻 Running the Project Locally

If you want to run this project on your own machine, follow these steps:

### 1. Clone the repository
```bash
git clone [https://github.com/YourUsername/YourRepoName.git](https://github.com/YourUsername/YourRepoName.git)
cd YourRepoName
```
### 2. Install dependencies
```bash

npm install
```

### 3. Configure Environment Variables

Create a .env file in the root directory and add the following keys. You will need to provision your own Supabase database and Groq API key.
Code snippet

##### Database connection string from Supabase
```bash
DATABASE_URL="postgresql://postgres.[your-id]:[your-password]@[aws-0-eu-central-1.pooler.supabase.com:6543/postgres](https://aws-0-eu-central-1.pooler.supabase.com:6543/postgres)"
```

##### AI Integration
```bash
GROQ_API_KEY="your_groq_api_key_here"
```

##### Custom Authentication Secret (Can be any secure string)
```bash
JWT_SECRET="your_custom_secret_key_here"
```

### 4. Setup the Database

Push the Prisma schema to your PostgreSQL database to create the required User and Task tables.
```Bash

npx prisma db push
```
### 5. Start the Development Server
```Bash

npm run dev
```

## 🎓 Acknowledgments

This project was built during the highly intensive 5-day Next.js Bootcamp. A massive thank you to our mentor, Avanish Cowku, for his excellent instruction on modern web security, server-side rendering, and backend architecture, and to the entire DevTown team for organizing this initiative.
