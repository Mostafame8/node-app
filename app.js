const express = require('express');
const bodyParser = require('body-parser');
const { validateUser } = require('./middleware/validationMiddleware');
const amqp = require('amqplib');

const app = express();
const port = 3000;
const rabbitMQUrl = 'amqp://localhost';
const queueName = 'userQueue';

// Helper function to publish a message to RabbitMQ
const publishToQueue = async (user) => {
  try {
    const connection = await amqp.connect(rabbitMQUrl);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: false });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(user)));
    console.log('User sent to RabbitMQ:', user);
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error('Error publishing to RabbitMQ:', error);
  }
};
app.use(bodyParser.json());

app.post('/user', validateUser, async (req, res) => {
  const user = req.body;
  console.log('User Recived! ', user);

  await publishToQueue(user);

  res.status(200).json('Success');
});

app.listen(port, () => {
  console.log('App listening at port ' + port);
});
