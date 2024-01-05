# Node.js RabbitMQ Producer

This is a simple Node.js application that serves as a producer for sending user information to a RabbitMQ queue.

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [RabbitMQ Server](https://www.rabbitmq.com/)

## Getting Started

1. **Clone this repository:**

   ```bash
   git clone https://github.com/Mostafame8/node-app.git
   
2. **Install dependencies:**

   ```bash
   npm install
   
3. **Configure RabbitMQ:**

- Make sure your RabbitMQ server is running.
- Update the rabbitMQUrl variable in the app.js file if your RabbitMQ server is not running on amqp://localhost.

     
4. **Start the application:**

   ```bash
   npm start
   
5. **Usage:**

- Send a POST request to http://localhost:3000/user with a JSON payload containing user information and the headers contains authentication of email:"admin@test.com" and password:"123'.
   ```json
   {
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890"
  }
   ```
