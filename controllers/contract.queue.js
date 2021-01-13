let channel = F.SERVICE("rabbit").channel
let config = F.CONFIG("rabbit").config;
const fs = require('fs');
const path = require('path');
const saveTo = path.join('./public/contracts/');
let HOST = F.CONFIG("app").config.host;
const puppeteer = require("puppeteer");
const { getContractsByUser } = require('../utils/common');
let moment = require('moment');
const CUSTOMER = F.MODEL("customer.entity").schema;
exports.install = function () {
    channel.prefetch(1);
    if (!fs.existsSync(path.join(saveTo))){ 
        fs.mkdirSync(path.join(saveTo));
    }

    console.log('\x1b[32m', `- RABBIT-QUEUE - Registered to ${ config.contract_queue }`)

    channel.consume(config.contract_queue, async function(msg) {
        try {

            let payload = JSON.parse(msg.content.toString());

            if (payload.type == "generate_pdf") {
                console.log('-------Starting generate_pdf-------', payload)
                let customer = await CUSTOMER.findOne({ hash: payload.hash });
                
                if (!customer) {
                    channel.ack(msg);
                    return;
                }
                if (!fs.existsSync(path.join(saveTo + customer._id))){ 
                    fs.mkdirSync(path.join(saveTo + customer._id));
                }
                let contracts = getContractsByUser(customer);
                
                let host = process.env.HOST_URL;
                contracts = contracts.filter(contract => contract.link)
                .map(contract => {
                    return { 
                        ...contract,
                        link_pdf: `${host}/contracts/${customer._id}/${contract.file_name}.pdf`
                    }
                });
                const browser = await puppeteer.launch();

                for (const contract of contracts) {
                    const page = await browser.newPage();
                    await page.goto(contract.link, {
                            waitUntil: "networkidle2"
                    });
                    await page.setViewport({ width: 1680, height: 1050 });
                    await page.pdf({
                            path: `${saveTo}/${customer._id}/${contract.file_name}.pdf`,
                            format: "A4",
                            printBackground: true
                    });
                }
                await CUSTOMER.updateOne({ hash: payload.hash }, {
                    contracts
                  }, { upsert: false, new: false });
                await browser.close();
                channel.ack(msg);
                console.log('-----------End------------');

            }
        } catch(error) {
            console.error("ERROR: ", error)
            channel.ack(msg);
        }
    });
}

