# Event Management Application

This is a full-stack event management application that allows users and authors to manage and participate in events. The backend is built with Node.js, Express, and MongoDB, while the frontend is built with React and TypeScript.

## Features

- User Authentication (Register and Login)
- Author functionalities:
  - Create, Update, Delete Events
- User functionalities:
  - Register for Events
  - Cancel Event Registration
- Display the number of attendees for each event

## Technologies Used

- **Backend**:
  - Node.js
  - Express
  - MongoDB (Mongoose)
  - JWT (JSON Web Tokens) for authentication

- **Frontend**:
  - React
  - TypeScript
  - Axios for API calls
  - React Router for navigation

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- MongoDB server running locally or on the cloud (e.g., MongoDB Atlas)

### Installing

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/event-management-app.git
   cd event-management-app


   Backend Setup:

Navigate to the backend directory:

```bash
cd backend

Install the dependencies:
npm install

Create a .env file in the backend directory and add the following environment variables
PORT=5000
MONGO_URI=mongodb://localhost:27017/event_management
JWT_SECRET=your_jwt_secret_key

Start the backend server:
npm start


Frontend Setup:
Navigate to the frontend directory:
cd ../frontend

Install the dependencies:
npm install


Start the frontend development server:
npm start
Open your browser and go to http://localhost:3000

