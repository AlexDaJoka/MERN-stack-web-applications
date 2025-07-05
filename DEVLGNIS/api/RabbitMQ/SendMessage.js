const amqp = require('amqplib');

async function sendMessage(queue, message) {
    try {
        const connection = await amqp.connect('amqp://127.0.0.1'); // Укажите адрес вашего RabbitMQ сервера
        const channel = await connection.createChannel();

        const exchange = 'direct';

        const routingKey = 'key1';

        await channel.assertExchange(exchange, 'direct', {
            durable: true
        });
    

        const q = await channel.assertQueue(queue, { durable: false });

        await channel.bindQueue(q.queue, exchange, routingKey);

        channel.publish(exchange, routingKey, Buffer.from((JSON.stringify(message))));

        console.log(`Message sent to ${queue}: ${message}`);
        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Error sending message:', error);
    }
}
module.exports = sendMessage;

