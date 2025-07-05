const amqp = require('amqplib');

async function takeMessage(queue) {
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

        channel.consume(queue, (message) => {
            console.log(`Recived ${message.content}`);
        });
    } catch (error) {
        console.error('Error taking message:', error);
    }
}
module.exports = takeMessage;