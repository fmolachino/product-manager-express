# E-commerce Web Application

This is an e-commerce web application built using Express, Handlebars, Socket.IO, and MongoDB. The application allows users to browse products, add them to their cart, and view the cart contents. It also supports real-time updates for products through WebSockets.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Running the Application](#running-the-application)

## Technologies Used
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web framework for Node.js
- **Handlebars**: Template engine for rendering views
- **Socket.IO**: Real-time, bidirectional communication between clients and server
- **MongoDB**: NoSQL database for managing data
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/fmolachino/product-manager-express.git
   ```

2. Install the necessary dependencies:
  ```bash
  npm install
  ```

3. MongoDB Connection: Make sure to have MongoDB running and set up. Replace the MongoDB connection string in server.js if necessary:
  ```bash
  mongoose.connect('your-mongo-db-connection-string')
  ```

4. Start the server:
  ```bash
  npm start
  ```

## Running the Application
Once the server is running, open your browser and navigate to:
`http://localhost:8080
`






   
