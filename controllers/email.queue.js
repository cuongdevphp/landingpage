/**
 * Consume Email Send Queue
 * 1. Validation Mail
 * 2. New Validation Mail
 */
let channel = F.SERVICE("rabbit").channel
let mailer =  F.SERVICE("mailer").mailer
let config = F.CONFIG("rabbit").config;

let HOST = F.CONFIG("app").config.host;

let moment = require('moment');

async function send_validation_mail (payload) { 
    console.log('send_validation_mail with payload', payload)   
    return await mailer.sendMail({
        from: 'VCSC Customer Services <customer.service@vcsc.com.vn>',
        to: `${payload.name.charAt(0).toUpperCase() + payload.name.slice(1)} <${payload.email}>`,
        subject: 'VCSC (1/4) CHỈ CÒN MỘT BƯỚC ĐỂ HOÀN TẤT ✔',
        // text: F.CONFIG("mail").template_validation(payload),
        html: F.CONFIG("mail").template_validation({ link: `${HOST}/validate/${payload.token}`, name: `${payload.name.charAt(0).toUpperCase() + payload.name.slice(1)}` , host: HOST })
    });
}

async function send_validated_mail (payload) {    
    return await mailer.sendMail({
        from: 'VCSC Customer Services <customer.service@vcsc.com.vn>',
        to: `${payload.name.charAt(0).toUpperCase() + payload.name.slice(1)} <${payload.email}>`,
        subject: 'ĐĂNG KÝ TÀI KHOẢN THÀNH CÔNG ✔',
        // text: F.CONFIG("mail").template_validation(payload),
        html: F.CONFIG("mail").template_validated({ name: `${payload.name.charAt(0).toUpperCase() + payload.name.slice(1)}` , host: HOST })
    });
}

async function send_report_mail (payload) {
    let cc = payload.cc != null ? payload.cc.join(",") : "";
    return await mailer.sendMail({
        from: 'VCSC Customer Services <customer.service@vcsc.com.vn>',
        to: `${payload.email}`,
        cc: cc,
        subject: `Đăng ký mới ${moment().format("DD/MM/YYYY HH:mm:ss")} no: ${payload.no} ✔`,
        // text: F.CONFIG("mail").template_send_to_user(payload),
        html: F.CONFIG("mail").template_send_to_user({ token: payload.token, host: HOST })
    });
}
async function send_contracts_mail (payload) {
    // template_contracts
    // let cc = payload.cc != null ? payload.cc.join(",") : "";
    return await mailer.sendMail({
        from: 'VCSC Customer Services <customer.service@vcsc.com.vn>',
        to: `${payload.email}`,
        cc: '',
        subject: `VCSC (2/4) ĐĂNG KÝ THÀNH CÔNG - NHẬN HỢP ĐỒNG MỞ TÀI KHOẢN ✔`,
        // text: F.CONFIG("mail").template_send_to_user(payload),
        html: F.CONFIG("mail").template_contracts({ host: HOST, name: payload.name, contracts: getContractsContentHtml(payload.contracts) })
    });
}
function getContractsContentHtml(contracts) {
    let content = '';
    for (let index = 0; index < contracts.length; index++) {
        const contract = contracts[index];
        let text = `
            <span style="color: #c42127;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-decoration: underline;text-align:left;">
                <a style="color: #c42127; line-height: 22px; font-family: Arial,Helvetica,Arial,sans-serif; font-size: 14px; text-decoration: underline; text-align: left;" href="${contract.link}" target="_blank">${contract.name}</a>
            </span>
        `;
        if (!contract.link) {
            text = `
            <span style="color: #c42127;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-decoration: none;text-align:left;">
                ${contract.name}
            </span>
            `;
        }
        content += `
            <div style="line-height:22px">
                <br>
                <span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;"> </span>
                <span style="color: #c42127;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">${index + 1}.</span>
                <span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;"> </span>
                ${text}
            </div>
        `;
    }
   return content;
}

async function send_draft_data(payload) {
    let cc = payload.cc != null ? payload.cc.join(",") : "";
    return await mailer.sendMail({
        from: 'VCSC Customer Services <customer.service@vcsc.com.vn>',
        to: `${payload.email}`,
        cc: cc,
        subject: `[Mở tài khoản] Có thêm ${payload.no} thông tin liên hệ mới ${moment().format("DD/MM/YYYY HH:mm:ss")} ✔`,
        // text: F.CONFIG("mail").template_send_to_user(payload),
        html: F.CONFIG("mail").template_send_draft_data({ token: payload.token, host: HOST, fromDate: moment().format("YYYY-MM-DD") })
    });
}


exports.install = function () {
    channel.prefetch(1);

    console.log('\x1b[32m', `- RABBIT-QUEUE - Registered to ${ config.email_queue }`)

    channel.consume(config.email_queue, async function(msg) {
        try {

            let payload = JSON.parse(msg.content.toString());

            if (payload.type == "validation") {
                
                let info = send_validation_mail(payload);
                console.log(info);
                channel.ack(msg);
                console.log('--send mail complete--', info)
                info.then( i => {
                    console.log(info.response)
                    if (i.rejected.length > 0) {
                        console.error(`Error: ${payload}`);
                    }
                    // console.log('Preview URL: %s', require('nodemailer').getTestMessageUrl(info));
                })
            }

            if (payload.type == "validated") {
                let info = send_validated_mail(payload)
                channel.ack(msg);

                info.then( i => {
                    if (i.rejected.length > 0) {
                        console.error(`Error: ${payload}`);
                    }
                })
            }

            if (payload.type == "report") {
                
                let info = send_report_mail(payload)
                channel.ack(msg);

                info.then( i => {
                    if (i.rejected.length > 0) {
                        console.error(`Error: ${payload}`);
                    }
                })


            }
            if (payload.type == "contracts") {
                // console.log('send_contracts_mail with payload ', payload)
                let info = send_contracts_mail(payload)
                channel.ack(msg);

                info.then( i => {
                    if (i.rejected.length > 0) {
                        console.error(`Error: ${payload}`);
                    }
                })

            }

            if (payload.type == "draft_data") {

                console.log('send_draft_data', payload)
                
                let info = send_draft_data(payload)
                channel.ack(msg);

                info.then( i => {
                    if (i.rejected.length > 0) {
                        console.error(`Error: ${payload}`);
                    }
                })

                // console.log('Preview URL: %s', require('nodemailer').getTestMessageUrl(info));

            }

        }catch(error) {
            console.log("ERROR: ", payload)
            channel.ack(msg);
        }
    });
}

