# NextJS Login Project

## Description

This project is a full-stack web application that demonstrates a secure login and user authentication system. It uses Next.js for the frontend, Express.js for the backend, and MongoDB for data storage. The application features user registration, login functionality, and a simple profile page.

## Features

- User registration with email and username
- Secure password hashing
- JWT-based authentication
- Login with email or username
- Profile page displaying user information
- Responsive design using Tailwind CSS

## Technologies Used

- Frontend:
  - Next.js
  - React
  - Tailwind CSS
- Backend:
  - Express.js
  - MongoDB with Mongoose
  - JSON Web Tokens (JWT)
- Development:
  - TypeScript
  - Node.js

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm or yarn
- MongoDB (local installation or a cloud-hosted instance)

## Installation

1. Clone the repository:   ```
   git clone https://github.com/your-username/nextjs-login-project.git
   cd nextjs-login-project   ```

2. Install dependencies for both frontend and backend:   ```
   # Install frontend dependencies
   cd nextjs-login-project
   npm install

   # Install backend dependencies
   cd ../backend
   npm install   ```

3. Set up environment variables:
   - Create a `.env` file in the `backend` directory with the following content:     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret     ```
   Replace `your_mongodb_connection_string` with your MongoDB connection string and `your_jwt_secret` with a secure random string for JWT encryption.

## Running the Application

1. Start the backend server:   ```
   cd backend
   npm start   ```
   The server will run on `http://localhost:5000`.

2. In a new terminal, start the frontend development server:   ```
   cd nextjs-login-project
   npm run dev   ```
   The frontend will be available at `http://localhost:3000`.

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Click on "Sign Up" to create a new account.
3. Log in using your email/username and password.
4. You will be redirected to your profile page upon successful login.
5. Use the "Logout" button to end your session.

## API Endpoints

- `POST /api/auth/signup`: Register a new user
- `POST /api/auth/login`: Authenticate a user and receive a JWT



## License

This project is licensed under the MIT License 

## Contact

If you have any questions or feedback, please contact:

Zac - zacarmani@proton.me

