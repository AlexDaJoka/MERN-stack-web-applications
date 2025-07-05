const amqp = require('amqplib/callback_api');


amqp.connect('amqp://localhost', (error, conn) => {
    conn.createChannel((error, ch) => {
        const queue = 'q4';
        const message = {content: "Hello message"};

        ch.assertQueue(queue, {durable: false});
        ch.sendToQueue(queue, Buffer.from(JSON.stringify(message)));

        console.log("Sendet");
    });
    setTimeout(() => {
        conn.close();
        process.exit(0); }, 500);
});
