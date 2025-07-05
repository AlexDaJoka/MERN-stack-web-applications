const express = require('express');
const app = express();
const amqp = require('amqplib/callback_api');


amqp.connect('amqp://localhost', (error, conn) => {
    conn.createChannel((error, ch) => {
        const queue = 'q4';

        ch.assertQueue(queue, {durable: false});
        console.log(`Waiting for messages in ${queue}`);
        ch.consume(queue, (message) => {
            console.log(`Recived ${message.content}`);
        }, {noAck: true});

    });

});



app.listen(3001, () => {
    console.log(`Rabbit is running`);
})