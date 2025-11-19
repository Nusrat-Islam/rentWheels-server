##RentWheels – Server-side

Node.js/Express backend for RentWheels car rental platform, handling user authentication, bookings, and database operations.

---

## Table of Contents

- [About the Project](#about-the-project)
- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Dependencies](#dependencies)
- [Installation️ & Setup](#installation--setup)
- [Folder Structure](#folder-structure)
- [Contributions](#contributions)
- [How to Contribute](#how-to-contribute)
- [License](#license)
- [Contact](#contact)

---

## About the Project 
The backend of RentWheels manages car data, bookings, and user authentication. It provides RESTful APIs for the frontend and ensures secure data management using JWT and MongoDB.

---

## Project Overview  
Objective: Provide secure and scalable backend services.
Users: Works with frontend to manage users, cars, and bookings.
APIs: CRUD operations for cars, bookings, and user accounts.

---

## Key Features  
- User authentication with JWT.
- Provider dashboard APIs (add/update/delete cars).
- Booking system with status updates (Available/Booked).
- MongoDB database integration for persistent storage.

---

## Tech Stack  
Backend: Node.js · Express.js · MongoDB · JWT
Tools: Git · VS Code · Postman

---

## Dependencies  
List required dependencies or major libraries:

```json{
  "express": "^4.x",
  "mongoose": "^7.x",
  "dotenv": "^16.x",
  "jsonwebtoken": "^9.x",
  "cors": "^2.x"
}

```

---

## Installation️ & Setup
1. Clone the repo and install dependencies:

```bash
git clone https://github.com/Nusrat-Islam/RentWheels-Server
cd RentWheels-Server
npm install
```

2. Set up environment variables by creating a `.env` file in the root directory:

```env
DATABASE_URL=`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.zpccury.mongodb.net/?appName=Cluster0`;

```

3. Run the application:

```bash
npm run dev
```

---

## Folder Structure

```plaintext
your-project/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── hooks/
├── public/
└── package.json
```


---

## Contact


**Email:** [Nusrat-Islam](nishinusrat395@gmail.com)
