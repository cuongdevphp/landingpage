const nodemailer = require('nodemailer'); //.createTransport(mail_config);

async function init () {
    return new Promise( (resolve, reject) => {

        if (process.env.NODE_ENV != "production") {
        

            nodemailer.createTestAccount((err, account) => {
                if (err) {
                    console.error('Failed to create a testing account. ' + err.message);
                    reject();
                    return process.exit(1);
                }
            
                console.log('- IN DEVELOPMENT MODE - CREATED MAIL TEST ACCOUNT')
                // console.log('Account --- ', JSON.stringify(account))
            
                // Create a SMTP transporter object
                let transporter = nodemailer.createTransport({
                    // host: account.smtp.host,
                    // port: account.smtp.port,
                    // secure: account.smtp.secure,
                    // auth: {
                    //     user: account.user,
                    //     pass: account.pass
                    // }
                    host: "smtp.mailtrap.io",
                    port: 2525,
                    auth: {
                        user: "2a9dbbd87bca37",
                        pass: "3067ce8b200502"
                    }
                });
                // console.log(transporter, "transporter");
                resolve(transporter)
    
                exports.mailer = transporter;
            });
        } else if (process.env.NODE_ENV == "production") {
            let config = F.CONFIG("mail").config;
            console.log('\x1b[32m', `- MAIL - Connected to ${ config.host }`)
            const transporter = nodemailer.createTransport(config);

            transporter.verify(function(error, success) {
                if (error) {
                    console.log(error);
                } else {
                    resolve(transporter)
                    console.log("Server is ready to take our messages");
                }
            });
            
            exports.mailer = transporter;
        }
    })
}

exports.install = init;

exports.name = "mailer";