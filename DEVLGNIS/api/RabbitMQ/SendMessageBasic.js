const amqp = require('amqplib');
async function sendMessageBasic(queue, message) {
    try {
        const connection = await amqp.connect(''); // Укажите адрес вашего RabbitMQ сервера
        const channel = await connection.createChannel();
        await channel.assertQueue(queue, { durable: false });
        channel.sendToQueue(queue, Buffer.from(message));
        console.log(`Message sent to ${queue}: ${message}`);
        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Error sending message:', error);
    }
}
module.exports = sendMessageBasic;
