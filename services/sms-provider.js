
const fetch = require('node-fetch');
const axios = require('axios');

let instance = null;

function init() {
    instance = axios.create({
        baseURL: process.env.SMS_PROVIDER_URL,
        timeout: 60000,
        headers: {
            API_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidmNzYy1zZWNyZXQiLCJpYXQiOjE2MDM3ODQwNjl9.AM94NrpvpVdtbdj-qcdiZY9IJVHEk4aP8be2ilWAGCk',
        }
    });
    

    console.log('------------Created instance SmsProvider Service  ---------')
}
async function send(mobile) {
    try {
        let body = {
            actionType: 'OTP_SMS',
            payload: JSON.stringify({
                Mobile: mobile,
                Message: `VCSC: #otp_code la ma xac thuc cua Quy khach. Ma OTP se het han sau 05 phut. Vui long bao mat KHONG chia se OTP cho nguoi khac duoi bat ky hinh thuc nao`
            })
        }
        console.log('SmsProvider send OTP_SMS', body);

        let res =  await instance.post('/action-push', body).catch(async (error) => {
            console.error('SmsProvider send SMS interception', error); 
            // return null;
        });
        let result = res.data;

        console.log('SmsProvider send OTP_SMS response', result);
    
        return result.data || {};
    } catch (error) {
        console.error('SmsProvider send SMS failed', error);
        return {};
    }
}

async function confirmOTP(value_otp, key) {
    try {
        let body = {
            value_otp,
            key
        }
        console.log('SmsProvider confirmOTP', body);
        let res = await instance.post('/otp-sms/confirm', body).catch(async (error) => {
            console.error('SmsProvider confirmOTP interception', error); 
            // return null;
        });
        if (!res) return false;
    
        let result = res.data;
    
        return result.status === 200;
    } catch (error) {
        console.error('SmsProvider confirmOTP failed', error);
        return false;
    }
}
exports.install = init;
exports.send = send;
exports.confirmOTP = confirmOTP;
exports.name = 'SmsProvider';