const amqp = require('amqplib');

async function init () {
    let config = F.CONFIG("rabbit").config;

    try {
        let connection = await amqp.connect(config.host);
        let channel = await connection.createChannel();

        connection.on("error", function(err) {
            if (err.message !== "Connection closing") {
                console.error("[AMQP] conn error", err.message);
            }
        });

        console.log('\x1b[32m', `- RABBIT-QUEUE - Connected to ${ config.host }`)

        await channel.assertQueue(config.email_queue, {
            durable: true
        });

        await channel.assertQueue(config.person_queue, {
            durable: true
        });
        
        await channel.assertQueue(config.contract_queue, {
            durable: true
        });
        exports.sendMail = async (message) => {
            console.log('sendMail with message', message)
try {
                return await channel.sendToQueue(config.person_queue, Buffer.from(message), {
                    persistent: false
                })
            } catch (error) {
                console.error(error)
            }        

}

        exports.sendLead = async (message) => {

            console.log('sendLead with message', message)            
return await channel.sendToQueue(config.person_queue, Buffer.from(message), {
                persistent: false
            })
        }

        exports.sendContract = async (message) => {
            return await channel.sendToQueue(config.contract_queue, Buffer.from(message), {
                persistent: false
            })
        }

        exports.channel = channel;

    }catch (error) {
        console.error("QUEUE",error);
    }
}

exports.install = init;

exports.name = "rabbit";
