const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const moment = require('moment');
const fetch = require('node-fetch');
const exphbs = require('express-handlebars');
const https = require("https");

const REGION = F.MODEL("region.entity").schema;

const BRAND = F.MODEL("brand.entity").schema;

const BROKER = F.MODEL("broker.entity").schema;


F.app.engine('handlebars', exphbs());
F.app.set('view engine', 'handlebars');

const _ = require('lodash');

const { body: checkBody, param: checkParam} = require('express-validator');

let FileUtil = require('../utils/file.util');


const { getContractsByUser } = require('../utils/common');

const REGISTRATION = F.MODEL("register.entity").schema;
const VALIDATION = F.MODEL("validation.entity").schema;
const QUEUE = F.MODEL("queue.entity").schema;
const DRAFT = F.MODEL("draft.entity").schema;
const CUSTOMER = F.MODEL("customer.entity").schema;
const OTP = F.MODEL("otp.entity").schema;

const { readFilePromise } = FileUtil;
const version = "v1";

exports.install = function () {
    F.ROUTE(`/${version}/register`, postRegister, ["cors", "multipart", "@validate-register", "post"]);
    // F.ROUTE(`/${version}/validate`, postValidate, ["cors", '@validate-hash', "post"]);
    F.ROUTE(`/validate/:token`, getValidate, ["cors", "get"]);
    F.ROUTE(`/lien-he`, getContact, ["cors", "get"]);
    F.ROUTE(`/draft-data`, getDraftDataByBroker, ["cors", "get"]);
    
    F.ROUTE(`/${version}/validate/resend`, resendValidationMail, ["cors", "@validate-mail-resend", "post"]);
    F.ROUTE(`/${version}/view/:hash`, getView, ["cors", "@validate-view", "get"]);
    F.ROUTE(`/${version}/image/:hash/:no?`, getImage, ["cors", "@validate-view", "get"]);
    F.ROUTE(`/${version}/detail`, detail, ["cors", "get"]);
    F.ROUTE(`/${version}/banks`, banks, ["cors", "get"]);
    F.ROUTE(`/${version}/bank/:code/branches`, branchesByBank, ["cors", "get"]);
    F.ROUTE(`/${version}/test`, testFunc, ["cors", "get"]);
    F.ROUTE(`/${version}/migrate`, migrateRule, ["cors", "get"]);
    // F.ROUTE(`/${version}/test-send-mail`, testSendMail, ["cors", "get"]);
    
    F.ROUTE(`/${version}/users`, getUsers, ["cors", "get"]);
    F.ROUTE(`/${version}/configs`, getConfigs, ["cors", "get"]);
    F.ROUTE(`/${version}/check-id-number`, postValidateIdNumber, ["cors", "post"]);
    F.ROUTE(`/${version}/listCustomer`, listCustomer, ["cors", "get"]);
    F.ROUTE(`/${version}/register/step-1`, postRegisterStep1, ["cors", "post", "@validate-register-step1"]);

    F.ROUTE(`/${version}/otp/confirm`, postConfirmOtp, ["cors", "post", "@validate-confirm-otp"]);
    F.ROUTE(`/${version}/otp/resend`, postResendOtp, ["cors", "post", "@validate-confirm-resend"]);
    F.ROUTE(`/v3/register`, postRegisterV3, ["cors", "post"]);
    // F.ROUTE(`/${version}/reset-counter`, resetCounter, ["cors", "get"]);
}
async function resetCounter() {

}
async function testFunc(_, req) {
let user = await REGISTRATION.findOneAndUpdate({ hash: req.query.token }, { validated: true }).exec();
console.log(user);        
if (!user) { this.json({status: 222}); return }
    let data = await F.SERVICE("rabbit").sendLead(JSON.stringify({ region: user.brand, token: user.hash, name: user.name, type: "next_person" }));

    // let lastTowHour = moment().subtract(2, 'minutes');

    // let drafts = await DRAFT.find({ 
    //     createdAt: { 
    //         $lt: lastTowHour
    //     },
    //     assign_to_user: null,
    //     // completedAt: null
    // });

    this.json({
        data,
	user
    })
    return;

    // reset
    // await DRAFT.updateMany({}, {assign_to_user: null, completedAt: null}, { upsert: false, new: false })
    
    // await BROKER.updateMany({}, {count_draft: 0}, { upsert: true, new: false })
    
    // await BRAND.updateMany({}, {count_draft: 0}, { upsert: true, new: false })
    
    // await REGION.updateMany({}, {count_draft: 0}, { upsert: true, new: false })
    
    // let lastTowHour = moment().subtract(2, 'hours');

    // let drafts = await DRAFT.find({ 
    //     createdAt: { 
    //         $lt: lastTowHour
    //     },
    //     assign_to_user: null,
    //     completedAt: null
    // });

    // if (drafts.length === 0) { 
    //     console.log('No drafts found, last checked time at ', moment());
    //     return;
    // }

    // let brokers = await BROKER.find().sort({count_draft: 1});

    // let brokersIndexByRegionAndBrand = {};
    // let objBrokers = brokers.reduce((obj, br) => {
    //     br = br.toObject();
    //     if (obj[br.region] === undefined) {
    //         obj[br.region] = {
    //             [br.brand]: [br]
    //         };
    //         brokersIndexByRegionAndBrand[br.region] = {};
    //     } else {
    //         if (obj[br.region][br.brand] === undefined) {
    //             obj[br.region][br.brand] = [br];
    //         } else {
    //             obj[br.region][br.brand].push(br);
    //         }
    //     }
    //     brokersIndexByRegionAndBrand[br.region][br.brand] = 0;
    //     return obj;
    // }, {});

    // let brands = await BRAND.find().sort({count_draft: 1});

    // let branchesIndex = {};
    // let brandsByRegion = brands.reduce((obj, br) => {
    //     if (obj[br.region] == undefined) {
    //         obj[br.region] = [br.name];
    //         branchesIndex[br.region] = 0;
    //     } else {
    //         obj[br.region].push(br.name);
    //     }
    //     return obj;
    // }, {});

    // let draftsPromise = [],
    //     brandsPromise = [],
    //     brokersPromise = [],
    //     regionsPromise = [];

    // let objBrandsUpdate = {}, 
    //     objBrokersUpdate = {},
    //     objRegionsUpdate = {};

    // for (let draft of drafts) {
    //     let reg = draft.brand;
    //     let brand = brandsByRegion[reg][branchesIndex[reg]];
    //     let brokerIndex = brokersIndexByRegionAndBrand[reg][brand];
    //     let broker = objBrokers[reg][brand][brokerIndex];
    //     if (broker) {
    //         draftsPromise.push(
    //             DRAFT.updateOne({_id: draft._id}, {assign_to_user: broker.email}, { upsert: false, new: false })
    //         )
    //         objRegionsUpdate[broker.region] = objRegionsUpdate[broker.region] ? objRegionsUpdate[broker.region] + 1 : 1;
    //         objBrandsUpdate[broker.brand] = objBrandsUpdate[broker.brand] ? objBrandsUpdate[broker.brand] + 1 : 1;
    //         objBrokersUpdate[broker.email] = objBrokersUpdate[broker.email] ? objBrokersUpdate[broker.email] + 1 : 1;
            
    //         branchesIndex[reg]++;
    //         brokersIndexByRegionAndBrand[reg][brand]++;

    //         if (brokersIndexByRegionAndBrand[reg][brand] >= objBrokers[reg][brand].length) {
    //             brokersIndexByRegionAndBrand[reg][brand] = 0;
    //         }
    //         if (branchesIndex[reg] >= brandsByRegion[reg].length) {
    //             branchesIndex[reg] = 0;
    //         }
    //     }
    // }

    // let keys = Object.keys(objRegionsUpdate);

    // for (let key of keys) {
    //     regionsPromise.push(
    //         REGION.updateOne({name: key}, {$inc: {count_draft: objRegionsUpdate[key]}}, { upsert: false, new: false })
    //     )
    // }

    // keys = Object.keys(objBrandsUpdate);

    // for (let key of keys) {
    //     brandsPromise.push(
    //         BRAND.updateOne({name: key}, {$inc: {count_draft: objBrandsUpdate[key]}}, { upsert: false, new: false })
    //     )
    // }

    // keys = Object.keys(objBrokersUpdate);

    // for (let key of keys) {
    //     brokersPromise.push(
    //         BROKER.updateOne({email: key}, {$inc: {count_draft: objBrokersUpdate[key]}}, { upsert: false, new: false })
    //     )
    // }

    // await Promise.all(brokersPromise);
    // await Promise.all(brandsPromise);
    // await Promise.all(regionsPromise);
    // await Promise.all(draftsPromise);
    // // let brokers = await BROKER.find().sort({count: 1});

    // let brokers = await BROKER.find().sort({count_draft: 1});

    // let regionIndex = {};
    // let objBrokers = brokers.reduce((obj, br) => {
    //     br = br.toObject();
    //     if (obj[br.region] === undefined) {
    //         obj[br.region] = {
    //             [br.brand]: [br]
    //         };
    //         regionIndex[br.region] = {};
    //     } else {
    //         if (obj[br.region][br.brand] === undefined) {
    //             obj[br.region][br.brand] = [br];
    //         } else {
    //             obj[br.region][br.brand].push(br);
    //         }
    //     }
    //     regionIndex[br.region][br.brand] = 0;
    //     return obj;
    // }, {});

    // let branches = await BRAND.find().sort({count_draft: 1});

    // let branchesByRegion = branches.reduce((obj, br) => {
    //     if (obj[br.region] == undefined) {
    //         obj[br.region] = [br.name]
    //     } else {
    //         obj[br.region].push(br.name);
    //     }
    //     return obj;
    // }, {});

    // let lastTowHour = moment().subtract(1, 'hours')

    // let drafts = await DRAFT.find({ createdAt: { $lt: lastTowHour},
    // assign_to_user: null, completedAt: null} );

    // drafts = drafts.map(dr => {
    //     return {
    //         ...dr.toObject(),
    //         full_name: dr.name
    //     }
    // })
    // await REGION.updateOne({name: "HOCHIMINH"}, {count: 2}, { upsert: true, new: false });
    this.json({
        status: 200,
        // brokers: objBrokers,
        // // drafts,
        // regionIndex,
        // branchesByRegion
        // brk
    })
}
async function logCameraDevices(_, { body }) {
    let draft = await DRAFT.findOne({ _id: 'body.draftId' });
    console.log(body);
    this.json({
        status: 200
    })
}

async function listCustomer({}, req, res ) {
    const id_number = req.query.id_number || '';
    const phone = req.query.phone || '';

    let result = {};
    //const url = new window.URL(`${HOST}/v1/detail`);
    //console.log(url, "url");
    const url = 'https://invest.vcsc.com.vn/mo-tai-khoan-online/v1/detail';
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            // 'Content-Type': 'multipart/form-data;',
        },
        referrerPolicy: 'no-referrer',
    });

    let users = await response.json();
    let registers = null;
    if(phone === '' && id_number === '') {
        console.log("1");        
        registers = await REGISTRATION.find({}, {name: 1, id_number: 1, brand: 1, sex: 1, phone: 1, address: 1, email: 1});
    } else if(phone === '') {
        console.log("2");
        registers = await REGISTRATION.find({id_number: id_number}, {name: 1, id_number: 1, brand: 1, sex: 1, phone: 1, address: 1, email: 1});
    } else if (id_number === '') { 
        console.log("3");
        registers = await REGISTRATION.find({phone: phone}, {name: 1, id_number: 1, brand: 1, sex: 1, phone: 1, address: 1, email: 1});
    } else if (phone !== '' && id_number !== '') {
        console.log("4");
        registers = await REGISTRATION.find({id_number: id_number, phone: phone}, {name: 1, id_number: 1, brand: 1, sex: 1, phone: 1, address: 1, email: 1});
    }
    let queues = await QUEUE.find({}, {cc: 1, to: 1, id_number: 1});
    let rs = await Promise.all([registers, queues])
    let [register, queue] = rs;
    let customers = [];
    for (let i = 0; i < register.length; i++) {
        for (let y = 0; y < queue.length; y++) {
            if(register[i].id_number === queue[y].id_number) {
                customers.push({
                    ...register[i].toObject(), sentInfo: queue[y]
                });
            }
        }
    }

    for (let i = 0; i < customers.length; i++) {
        for (let y = 0; y < users.users.length; y++) {
            if(customers[i].sentInfo.to === users.users[y].email) {
                customers[i].brand = users.users[y].brand
                // result.push({
                //     ...customers[i], 
                //     brand: users.users[y].brand
                // });
            }
        }
    }
    result.customers = customers;
    //result.users = users;
    //console.log(result, "result");
    return this.json(result);
}

function detail () {
    let file = "./resource/rules.json";
    fs.readFile(file, 'utf-8', (err, data) => {
        data = JSON.parse(data);
        this.json(data)
    });
}

async function migrateRule(_, req) {
    const { reset } = req.query;
    let file = './resource/rules.json';
    let rules = await readFilePromise(file);
    let regionsPromise = rules.region.map(rg => {
        return REGION.findOneAndUpdate({name: rg.name}, {
            ...rg,
            count: reset ? 0 : rg.count,
            count_draft: reset ? 0 : rg.count_draft || 0
        }, { upsert: true, new: true })
    });

    let brandsPromise = rules.brands.map(rg => {
        return BRAND.findOneAndUpdate({ name: rg.name }, {
            ...rg,
            count: reset ? 0 : rg.count,
            count_draft: reset ? 0 : rg.count_draft || 0
        }, { upsert: true, new: true })
    });

    let usersPromise = rules.users.map(rg => {
        return BROKER.findOneAndUpdate({ email: rg.email }, {
            ...rg,
            count: reset ? 0 : rg.count,
            count_draft: reset ? 0 : rg.count_draft || 0
        }, { upsert: true, new: true })
    });
    
    let region =  await Promise.all(regionsPromise);
    let brand =  await Promise.all(brandsPromise);
    let broker =  await Promise.all(usersPromise);

    this.json({
        status: 200,
        broker,
        brand,
        region,
        message: 'Migrate rule into DB successfully!'
    })
} 

async function getBankList() {
    let file = './resource/bank/index.json';
    return await readFilePromise(file);
}   
async function getLocation() {
    let file = './resource/location.json';
    return await readFilePromise(file);
}
async function banks () {
    let data = await getBankList();
    this.json(data);
}
async function branchesByBank({ code }) {
    let file = `./resource/bank/branch/${code}.json`;
    let data = await readFilePromise(file);
    this.json(data);
}
async function getBrandByUserEmail(email) {
    let file = "./resource/rules.json";
    try {
        let data = await fs.promises.readFile(file, 'utf-8');

        data = JSON.parse(data.toString());

        let user = data.users.find(u => u.email == email);
        if (user) {
            return user.brand;
        }
        return null;
    } catch (error) {
        return null;
    }
    
}

async function getDraftDataByBroker(_, req, res) {
    let {token, from} = req.query;
    if (!token) {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Not found');
        return;
    }
    let broker = await BROKER.findOne({_id: token});
    if (!broker) {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Not found');
        return;
    }
    broker = broker.toObject();
    let drafts = [];
    if (from) {
        drafts = await DRAFT.find({ 
            assign_to_user: broker.email,
            createdAt: {
                $gte: moment(from)
            }
        });
    } else {
        drafts = await DRAFT.find({ 
            assign_to_user: broker.email,
            createdAt: {
                $lte: moment()
            }
         });
    }
    res.render('draft', {
        layout          : false,
        date            : moment(from ? from : new Date()).format('YYYY-MM-DD'),
        test            : `VCSC`,
        title           : `VCSC`,
        meta_description: `VCSC`,
        meta_keywords   : "VCSC",
        broker          : broker,
        drafts          : drafts.map((dr, index) => {
            return  {
                ...dr.toObject(),
                createdAt: moment(dr.createdAt).format('hh:mm DD/MM/YYYY'),
                sex: dr.sex === 'MALE' ? 'NAM' : 'NỮ',
                index: index+1
            }
        })
    });
    return;
}

async function getUsers(_, req, res) {
    try {

        let users = await REGISTRATION.find().exec();

       this.json({users})

    } catch(error) {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Not found');
    }
}

function getConfigs() {
    this.json({
        port: process.env.PORT,
        gzip: process.env.GZIP,
        file_size: process.env.FILE_SIZE,
        max_files: process.env.MAX_FILES,
        host: process.env.HOST,
        host_url: process.env.HOST_URL
    })
}

async function getImage({ hash, no = 0} , req, res) {

    try {

        let account = await REGISTRATION.findOne({ hash: hash, validated: true }).select("files").exec();

        account = account.toObject();

        if (account && account.files[no]) {
            let file = fs.createReadStream(account.files[no])
    
            file.on('open', function () {
                let type = account.files[no].split(".").slice(1)[0];
                res.set('Content-Type', `image/${type}`);
                file.pipe(res);
            });
        
            file.on('error', () => { 
                res.set('Content-Type', 'text/plain');
                res.status(404).end('Not found');            
            })

            return;
        }

        throw new Error();

    } catch(error) {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Not found');
    }

}
async function checkExistIdNumber(id_number) {
    let registration = REGISTRATION.findOne({ id_number });
        let validation = VALIDATION.findOne({ id_number });

        let result = await Promise.all([registration, validation])

        let [idExist, validationExist] = result;

        if (idExist) {
            if (idExist.validated == true) {
                this.json({ status: 304 })
                return;
            }

            // if user isnt validated but still within 30 days, no register
            if ((idExist.validated == false || idExist.validated == null) && moment().diff(moment(idExist.updatedAt), 'days') < 30) {
                this.json({ status: 405 })
                return;
            } 
        }

        if (validationExist) {
            this.json({ status: 304 })
            return;
        }
        this.json({status: 200});
        return;
}

async function getView({ hash }) {

    let selects = [
        "allow_margin_trade",
        "allow_derivative_trade",
        "allow_banking",
        "validated",
        "id_number",
        "birth_place",
        "country",
        "dob",
        "email",
        "id_issue_date",
        "id_type",
        "name",
        "phone",
        "bank_account",
        "bank_brand",
        "bank_brand_region",
        "createdAt",

        // https://vcscdev.slack.com/archives/C0145M5JDKJ/p1602068235004000?thread_ts=1602066466.002400&cid=C0145M5JDKJ,
        "brand"
    ];

    let account = await REGISTRATION.findOne({ hash: hash, validated: true }).select(selects.join(" ")).exec();
    
    if (account) {
        account = account.toObject();
        account.dob = moment(account.dob).format("DD/MM/YYYY");
        account.id_issue_date = moment(account.id_issue_date).format("DD/MM/YYYY");
        
        account.createdAt = moment(account.createdAt).format("DD/MM/YYYY HH:mm:ss");

        account.allow_margin_trade = account.allow_margin_trade ? 'Có đăng ký' : 'Không';
        account.allow_derivative_trade = account.allow_derivative_trade ? 'Có đăng ký' : 'Không';
        account.allow_banking = account.allow_banking ? 'Có đăng ký' : 'Không';
        account.validated = account.validated ? 'Đã xác nhận' : 'Chưa';
    
        let lcList = await getLocation();
        let birthPlace = lcList.find(x => x.value == account.birth_place);
        if (birthPlace) {
            account.birth_place = birthPlace.text;
        }
        let userAssign = await QUEUE.findOne({ hash: hash }).exec();
        
        
        if (userAssign) {
            userAssign = userAssign.toObject();
            account['assign_to_user'] = userAssign.to;

            let toBrand = await getBrandByUserEmail(userAssign.to);

            account['assign_to_user_brand'] = toBrand;
            
        }
        account = _.omit(account, "_id");
    
        this.json({ status: 200, data: account })
    } else {
        this.json({ status: 404 })
    }
  
}

//https://github.com/validatorjs/validator.js#validators
//https://gist.github.com/rhamedy/8f29ec90a00fcf8fec8f2c82bd34d10e
//https://jsao.io/2019/06/uploading-and-downloading-files-buffering-in-node-js/
async function postRegister(_, { body }) {

    const saveTo = path.join('./upload/');    
    
    try {
        let registration = REGISTRATION.findOne({ id_number: body.id_number });
        let validation = VALIDATION.findOne({ id_number: body.id_number });

        let result = await Promise.all([registration, validation])

        let [idExist, validationExist] = result;

        if (idExist) {
            if (idExist.validated == true) {
                this.json({ status: 304 })
                return;
            }

            // if user isnt validated but still within 30 days, no register
            if ((idExist.validated == false || idExist.validated == null) && moment().diff(moment(idExist.updatedAt), 'days') < 30) {
                this.json({ status: 405 })
                return;
            } 
        }

        if (validationExist) {
            this.json({ status: 304 })
            return;
        }
        
        //safety for folder, which could be remove for production to optimize
        if (!fs.existsSync(path.join(saveTo))){ 
            fs.mkdirSync(path.join(saveTo)); 
        }
        // Handle Pictures Upload, this will hog resource, but i guess, no other way
        let hashPicture = crypto.createHash('sha256').update(body.id_number).digest('hex');

        let pictures = [];

        if(body.files && Object.keys(body.files).length > 0 ) {
            pictures = Object.keys(body.files).map( (name, index) => {
                const tail = name.split(".");
                if (index > 1) {
                    return null;
                }
                const picturePath = saveTo + `${hashPicture}_${index}.${tail[tail.length-1]}`;
                return new Promise((resolve, reject) => fs.writeFile(picturePath, body.files[name], null, e => {
                    if (e) {  return reject(e); }
                    resolve(picturePath)
                }));
            })
        }

        let picPaths = await Promise.all(pictures);

        let salt = crypto.randomBytes(256).toString() + moment().unix().toString() + body.id_number;
        let hashLink = crypto.createHash('sha256').update(salt).digest('hex');

        let bodies = { 
            name: body.name,
            email: body.email,
            phone: body.phone,
            address: body.address,
            brand: body.brand,
            country: body.country,
            birth_place: body.birth_place,
            id_number: body.id_number,
            id_type: body.id_type,   
            allow_margin_trade: body.allow_margin_trade,
            allow_derivative_trade: body.allow_derivative_trade,
            allow_banking: body.allow_banking,
            bank_account: body.bank_account,
            bank_brand: body.bank_brand,
            bank_brand_region: body.bank_brand_region,
            requests: body.requests,
            files: picPaths, 
            dob: moment(body.dob, 'DD/MM/YYYY'), 
            id_issue_place: body.id_issue_place,
            id_issue_date: moment(body.id_issue_date, 'DD/MM/YYYY'),
            hash: hashLink,
            validated: false,
            sent: false,
            sex: body.sex,
            draftId: body.draftId
        }

        // let nextAccount = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=6LdoB7IZAAAAAD2QHRyzd8dxrURqiwe3DYGlq8Nv&response=${value}`, {
        //     method: "POST"
        // })

        // nextAccount = await nextAccount.json();
        // if (bodies.bank_brand.trim().length) {
        //     let banksList = a getBankList();
        //     let banksName = banksList.find(x => x.value == bodies.bank_brand);
        //     if (banksName) {
        //         bodies.bank_brand = banksName.text;
        //     }
        // }
        console.log('register with body', body)

        let nextRegistration = REGISTRATION.findOneAndUpdate({ id_number: body.id_number }, bodies, { upsert: true, new: true }).exec();

        let nextValidation = VALIDATION.findOneAndUpdate({ id_number: body.id_number, email: body.email }, { token: hashLink, expireAt: moment().add(2, "hours") }, { upsert: true, new: true }).exec();

        let nextResult = await Promise.all([nextRegistration, nextValidation])

        if (nextResult[0] && nextResult[1]) {
            let payload = { token: hashLink, type: "validation", email: body.email, name: body.name }
            await F.SERVICE("rabbit").sendMail(JSON.stringify(payload));
            this.json({ status: 200 })
            return;
        } 

        throw new Error();
    }catch (er) {
        console.log(er)
        this.throw500("500");
    }
}
async function postRegisterV3(_, { body }) {
    try {
        let draft = await DRAFT.findOne({ _id: body.draftId });
        let salt = crypto.randomBytes(256).toString() + moment().unix().toString() + body.soCmt;
        let hashLink = crypto.createHash('sha256').update(salt).digest('hex');
        let bodies = { 
            name: body.hoVaTen,
            email: body.email,
            phone: body.phone,
            address: body.address,
            brand: body.brand,
            country: body.country,
            // birth_place: body.birth_place,
            id_number: body.soCmt,
            id_type: !body.loaiCmt ? null : (body.loaiCmt.includes('old') ? 'CMND' : 'CCCD'),   
            allow_margin_trade: body.allow_margin_trade,
            allow_derivative_trade: body.allow_derivative_trade,
            allow_banking: body.allow_banking,
            bank_account: body.bank_account,
            bank_brand: body.bank_brand,
            files: draft ? draft.images : [],
            dob: moment(body.namSinh, 'DD/MM/YYYY'), 
            id_issue_place: body.noiCap,
            id_issue_date: moment(body.ngayCap, 'DD/MM/YYYY'),
            hash: hashLink,
            validated: false,
            sent: false,
            sex: body.sex,
            is_ekyc: true,
            draftId: body.draftId
        }
        if (!bodies.id_issue_date.isValid()) {
            delete bodies.id_issue_date;
        }
        if (!bodies.dob.isValid()) {
            delete bodies.dob;
        }
       
        let nextRegistration = REGISTRATION.findOneAndUpdate({ id_number: bodies.id_number }, bodies, { upsert: true, new: true }).exec();
        let nextValidation = VALIDATION.findOneAndUpdate({ id_number: bodies.id_number, email: bodies.email }, { token: hashLink, expireAt: moment().add(2, "hours") }, { upsert: true, new: true }).exec();

        let nextResult = await Promise.all([nextRegistration, nextValidation])

        if (nextResult[0] && nextResult[1]) {
            if (draft) {
                await DRAFT.updateOne({ _id: body.draftId }, {completedAt: moment()}, { upsert: false, new: false }).exec();
                
                await CUSTOMER.updateOne({ draftId: body.draftId }, {
                    hash: hashLink,
                    step: 'WAITING_ACTIVE',
                    address: body.address,
                    email: body.email,
                    allow_margin_trade: body.allow_margin_trade,
                    allow_derivative_trade: body.allow_derivative_trade,
                    allow_banking: body.allow_banking,
                    bank_account: body.bank_account,
                    bank_brand: body.bank_brand,
                }, { upsert: false, new: false }).exec();
            }
            let payload = { token: hashLink, type: "validation", email: bodies.email, name: bodies.name }
            await F.SERVICE("rabbit").sendMail(JSON.stringify(payload));
            this.json({ status: 200 })
            return;
        } 

        throw new Error();
    } catch (error) {
        console.error(error)
        this.throw500("500");
    }
    
    
}
async function cloneBodiesToRegisterCore(bodies) {
    let lcList = await getLocation();
    let lc = lcList.find(x => x.value == bodies.birth_place);
    let issuePlace = 'CA_TP_HCM';
    if (lc && lc.value == "01") {
        issuePlace = 'CA_TP_HN';
    }
    let body = {"job":"EMPLOYEE",
    "sex": bodies.sex,
    "email": bodies.email,
    "htsId": "123456",
    "smsYn":"Y",
    "aimRt2":99,
    "aimRt1":99,
    "aimRt3":99,
    "aimRt4":99,
    "branch":bodies.brand == 'HOCHIMINH' ? 'CN_HCM' : "CN_HN",
    "mobile": bodies.phone,
    "homeTel": bodies.phone,
    "riskRt1":0,
    "riskRt2":0,
    "riskRt3":0,
    "telType":"HOME",
    "fullName": bodies.name,
    "national":"001",
    "totalAim":0,
    "userType":"PERSONAL",
    "birthDate": moment(bodies.dob).format('YYYYMMDD'),
    "investExp":"NO_EXPERIENCE",
    "issueDate": moment(bodies.id_issue_date).format('YYYYMMDD'),
    "officeTel": "",
    "totalRisk": 0,
    "visitDate": moment(new Date()).format('YYYYMMDD'),
    "assetsAmt1":0,
    "assetsAmt2":0,
    "assetsAmt3":0,
    "assetsAmt4":0,
    "investType": "BEGINNER",
    "issuePlace": issuePlace,
    "nationalId": "001",
    "officeName":"",
    "addressType": "HOME",
    "homeAddress": bodies.address,
    "foreignerType":"DOMESTIC",
    "officeAddress": "",
    "accountPassword": bodies.phone.substr(bodies.phone.length - 4, 4),
    "confirmPassword": bodies.phone.substr(bodies.phone.length - 4, 4)
    }
    return body;
}
// Check exist id number
async function postValidateIdNumber(any, { body }) {
    let { id_number } = body;
    console.log("postValidateIdNumber with 'id_number'", id_number)
    let registration = REGISTRATION.findOne({ id_number });
        let validation = VALIDATION.findOne({ id_number });

        let result = await Promise.all([registration, validation])

        let [idExist, validationExist] = result;

        if (idExist) {
            if (idExist.validated == true) {
                this.json({ status: 304 })
                return;
            }

            // if user isnt validated but still within 30 days, no register
            if ((idExist.validated == false || idExist.validated == null) && moment().diff(moment(idExist.updatedAt), 'days') < 30) {
                this.json({ status: 405 })
                return;
            } 
        }

        if (validationExist) {
            this.json({ status: 304 })
            return;
        }
        this.json({status: 200});
        return;
}
//Validage An Email
async function postValidate(any, { body }) {
    let { email, token } = body;
    let item = await VALIDATION.findOne({ email: email, token: token }).exec();
    if (item) {
        VALIDATION.deleteOne({ email: email, token: token }).exec();
        let user = await REGISTRATION.findOneAndUpdate({ email: email }, { validated: true }).exec();
        let payload = { region: user.brand, token: user.hash, username: user.name, type: "next_person" }
        await F.SERVICE("rabbit").sendLead(JSON.stringify(payload));
        this.json({ status: 200 })
    } else {
        this.json({ status: 404 })
    }
}

async function getAccountNumber() {
    let file = './resource/account.json';

    let account = await readFilePromise(file);

    account.current += 1;

    await FileUtil.writeFilePromise(file, JSON.stringify(account, null, 4));
    
    let customer = await CUSTOMER.findOne({account_number: `${account.prefix}${account.current}`});
    
    if (customer) {
        return getAccountNumber();
    }
    return {
        account_number: `${account.prefix}${account.current}`
    };
}

async function getContact(_, {res}) {
    res.render('contact', {
        layout          : false,
        title           : `VCSC`,
        meta_description: `VCSC`,
        meta_keywords   : "VCSC",
    }); 
}

async function getValidate({ token }, { res }) {
    let item = await VALIDATION.findOne({ token: token }).exec();
    if (item != null) {
        let user = await REGISTRATION.findOneAndUpdate({ hash: token }, { validated: true }).exec();
        
        let draft = null, assign_to_user = null;
        if (user && user.draftId) {
            draft = await DRAFT.findOne({ _id: user.draftId });
            
            assign_to_user = draft ? draft.assign_to_user : null;

            let account = await getAccountNumber();

            await CUSTOMER.updateOne({ draftId: user.draftId }, {
                ...account,
                active_email: true,
                status: 'EKYC_SUCCESS',
                step: 'FINISHED'
            }, { upsert: false, new: false }).exec();

            // await F.SERVICE("rabbit").sendMail(JSON.stringify({ contracts: getContractsByUser(user), email: user.email, name: user.name, type: "contracts" }));

        }
        VALIDATION.deleteOne({ token: token }).exec();
        
        // await F.SERVICE("rabbit").sendMail(JSON.stringify({ region: user.brand, token: user.hash, name: user.name, email: user.email, type: "validated" }));
        

        await F.SERVICE("rabbit").sendLead(JSON.stringify({ region: user.brand, token: user.hash, name: user.name, type: "next_person" }));
        res.render('validated', {
            layout          : false,
            title           : `VCSC`,
            meta_description: `VCSC`,
            meta_keywords   : "VCSC",
        });
        return;
    } 

    let user = await REGISTRATION.findOne({ hash: token, validated: true }).exec();
    
    if (user) {
        res.render('validated', {
            layout          : false,
            title           : `VCSC`,
            meta_description: `VCSC`,
            meta_keywords   : "VCSC",
        });
    } else {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Not found');
    }
}



/**
 * RESEND EMAIL with token to client
 * DO NOT SEND EMAIL if recent email is sent 15 minutes ago
 */
async function resendValidationMail (any, { body }) {
    try {
        let { email } = body;

        let validation = VALIDATION.findOne({ email: email }).exec();
        let register = REGISTRATION.findOne({ email: email, validated: false }).exec();

        let result = await Promise.all([validation, register]);

        let [item, account] = result;
        let lastSent = moment.utc(item.updatedAt);

        if (moment().diff(lastSent, 'minutes') < 15) {
            this.json({ status: 304 });
        } else {
            
            let payload = { token: account.hash, type: "validation", email: account.email, name: account.name }
            //force update and extends another 15 mins for user
            VALIDATION.findOneAndUpdate({ email: email }, { updatedAt: moment(), expireAt: moment.utc(item.expireAt).add(15, "minutes") }).exec();
            await F.SERVICE("rabbit").sendMail(JSON.stringify(payload));
            
            this.json({ status: 200 })
        }

    }catch(er) {
        this.json({ status: 404 })
    }
}

async function postRegisterStep1(_, { body }) {
    try {
        let draft = await DRAFT.findOne({ phone: body.phone });

        if (draft && draft.completedAt) {
            this.json({
                status: 403,
                message: 'Số điện thoại này đã mở tài khoản tại VCSC'
            });
            return;
        }
        if (!draft) {
            draft = new DRAFT({
                ...body,
                otp_success: false,
                status: 'NEW_REGISTER'
            });
            await draft.save();

            await new CUSTOMER({
                ...body,
                gender: body.sex,
                draftId: draft._id
            }).save()
        }
        if (!draft.transaction_code || moment().diff(draft.createdAt, 'minutes') > 15) {
            let transaction_code = await F.SERVICE('ekyc').getTransactionCode();
            
            await DRAFT.findOneAndUpdate({ _id: draft._id }, {transaction_code}, { upsert: true, new: false }).exec();
        }

        let otp = await OTP.findOne({ phone_number: body.phone, sentAt: null });
        let otpKey = null;
        if (!otp) {
            let otpResponse = await F.SERVICE('SmsProvider').send(body.phone);
            otpKey = otpResponse.key;
            otp = new OTP({
                phone_number: body.phone,
                code: otpResponse.OTP,
                key: otpResponse.key,
                sentAt: moment()
            });
            await otp.save();

        } else {
            otpKey = otp.key
        }

        this.json({
            status: 200,
            data: {
                draft_id: draft._id,
                otpKey
            }
        })
    } catch(err) {
        console.error(err)
        this.throw500("500");
    }
}

async function postResendOtp(_, {body}) {
    let { phone, key } = body;
    let otp = await OTP.findOne({ phone_number: phone, key });

    let otpKey = null;
    if (!otp) {
        let otpResponse = await F.SERVICE('SmsProvider').send(phone);
        otpKey = otpResponse.key;
        otp = new OTP({
            phone_number: phone,
            code: otpResponse.OTP,
            key: otpResponse.key,
            sentAt: moment()
        });
        await otp.save();
    } else {
        await OTP.findOneAndUpdate({ _id: otp._id }, {resend_number: otp.resend_number + 1}, { upsert: true, new: false }).exec();
    }
    this.json({
        status: 200,
        data: true
    })
        
}

async function postConfirmOtp(_, { body }) {
    try {
        let check = false
        if (body.key && body.code) {
            check = await F.SERVICE('SmsProvider').confirmOTP(body.code, body.key);
            if (check) {
                OTP.deleteOne({ key: body.key, code: body.code }).exec();
            }
        }
        if (body.draft_id) {
            await CUSTOMER.updateOne({ draftId: body.draft_id}, {
                otp_success: check,
                step: check ? 'EKYC_OCR' : 'CONFIRM_OTP'
            }, { upsert: false, new: false }) 
        }
        this.json({
            status: 200,
            data: check
        })
    } catch(err) {
        console.error(err)
        this.throw500("500");
    }
}

F.MIDDLEWARE("validate-hash", F.Validate422([
    checkBody("email").isEmail().withMessage("Body 'email' is invalid"),
    checkBody("email").isLength({ max: 200 }).withMessage("Body 'email' is too long"),
    checkBody("token").isLength({ min: 64, max: 64 }).withMessage("Body 'token' is invalid")
]));

F.MIDDLEWARE("validate-confirm-resend", F.Validate422([
    checkBody("phone").not().isEmpty().withMessage("Body 'phone' is empty"),
    checkBody("key").not().isEmpty().withMessage("Body 'key' is empty")
]));

F.MIDDLEWARE("validate-mail-resend", F.Validate422([
    checkBody("email").isEmail().withMessage("Body 'email' is invalid"),
    checkBody("email").isLength({ max: 200 }).withMessage("Body 'email' is too long"),
]));

F.MIDDLEWARE("validate-register", F.Validate422([
    checkBody("name")
        .isLength({ min: 2 }).withMessage("Body 'name' is invalid"),
    checkBody("email")
        .isEmail().withMessage("Body 'email' is invalid")
        .isLength({ max: 200 }).withMessage("Body 'email' is too long"),
    checkBody("phone")
        .isNumeric().withMessage("Body 'phone' is invalid")
        .isLength({ min: 4 }).withMessage("Body 'phone' is invalid"),
    checkBody("address").not().isEmpty().withMessage("Body Address Empty").isLength({ max: 300 }).withMessage("Body 'address' is invalid"),
    checkBody("brand").isIn(["HOCHIMINH","HANOI"]).withMessage("Body 'brand' is invalid"),
    checkBody("country").isIn(["VIETNAM","OTHER"]).withMessage("Body 'country' is invalid"),
    checkBody("dob")
        .matches(/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/).withMessage("Body 'dob' is invalid DD/MM/YYYY")
        .custom((value, { req }) => {
        if(moment().diff(moment(value, 'DD/MM/YYYY'), 'years') < 18) {
            throw new Error("Body 'dob' is under 18 year old")
        }
        return true;
    }),
    checkBody("birth_place").not().isEmpty().withMessage("Body 'birth_place' is empty"),
    checkBody("id_type").isIn(["CMND","CCCD"]).withMessage("Body 'id_type' is wrong type"),
    checkBody("id_issue_date").matches(/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/).withMessage("Body 'id_issue_date' is invalid DD/MM/YYYY"), // YYYY/MM/DD
    // checkBody("id_issue_place").isEmpty().withMessage("Body 'id_issue_place' is empty"),
    checkBody("id_issue_place").custom((value, { req }) => {
        console.log(value)
        if (value.trim().length === 0) {
            throw new Error("Body 'id_issue_place' is empty")
        }
        return true;
    }),
    checkBody("allow_margin_trade").isIn([true,false]).withMessage("Body 'allow_margin_trade' must be true or false"),
    checkBody("allow_derivative_trade").isIn([true,false]).withMessage("Body 'allow_derivative_trade' must be true or false"),
    checkBody("allow_banking").isIn([true,false]).withMessage("Body 'allow_banking' must be true or false"),
    checkBody("bank_account").if(checkBody("allow_banking").isIn([true])).not().isEmpty().withMessage("Body 'bank_account' must not be null"),
    checkBody("bank_brand").if(checkBody("allow_banking").isIn([true])).not().isEmpty().withMessage("Body 'bank_brand' must not be null"),
    checkBody("bank_brand_region").if(checkBody("allow_banking").isIn([true])).not().isEmpty().withMessage("Body 'bank_brand_region' must not be null"),
    checkBody("requests").optional(),
    checkBody("capcha").not().isEmpty().withMessage("Body 'capcha' is invalid")
        .custom( async (value, {req}) => {
            return true;
            try {
                let valid = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=6LdoB7IZAAAAAD2QHRyzd8dxrURqiwe3DYGlq8Nv&response=${value}`, {
                    method: "POST"
                })
                valid = await valid.json();

                if (valid.success == true){
                    return true;
                }

                throw new Error("Body 'capcha' is incorect")
            } catch(err) {
                throw new Error("Body 'capcha' is incorect")
            }
    })
]))

F.MIDDLEWARE("validate-register-step1", F.Validate422([
    checkBody("name")
        .isLength({ min: 2 }).withMessage("Body 'name' is invalid"),
    checkBody("email")
        .isEmail().withMessage("Body 'email' is invalid")
        .isLength({ max: 100 }).withMessage("Body 'email' is too long"),
    checkBody("phone")
    .custom((value, { req }) => {
        if (!value || (value && value.trim().length === 0)) {
            throw new Error("Body 'phone' is empty")
        }
        let validPhone = /^\s*(\+?\b0{0,1}[3|5|7|8|9][0-9]{8}?)*$/gm.test(value);

        if (!validPhone) {
            throw new Error("Body 'phone' is invalid")
        }
        return true;

    }),
    checkBody("brand").isIn(["HOCHIMINH","HANOI"]).withMessage("Body 'brand' is invalid"),
    checkBody("sex").isIn(["FEMALE","MALE"]).withMessage("Body 'sex' is invalid"),
    checkBody("country").isIn(["VIETNAM","OTHER"]).withMessage("Body 'country' is invalid"),
]))

F.MIDDLEWARE("validate-view", F.Validate422([
    checkParam("hash").isLength({ min: 64, max: 64 }).withMessage("Body 'hash' is incorrect"),
    checkParam("no").optional().isNumeric().withMessage("Body 'No' is incorrect"),
]))
F.MIDDLEWARE("validate-confirm-otp", F.Validate422([
    checkBody("code").not().isEmpty().withMessage("Body 'code' is empty")
]));

