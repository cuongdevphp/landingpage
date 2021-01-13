const exphbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');
const moment = require('moment');


const _ = require('lodash');
var hbs = require('handlebars');
hbs.registerHelper("isHN", function(value, options)
{
    return value.brand == 'HN'
});

hbs.registerHelper("isCMND", function(value, options)
{
    return value.id_type === 'CMND'
});
F.app.engine('handlebars', exphbs());
F.app.set('view engine', 'handlebars');
const CUSTOMER = F.MODEL("customer.entity").schema;

const REGISTRATION = F.MODEL("register.entity").schema;

const pathPrefix = '/hop-dong/0';
exports.install = function () {
    F.ROUTE(`${pathPrefix}1-hdmtk/:hash`, getContract, ["cors", "get"]);
    F.ROUTE(`${pathPrefix}2-hdtt/:hash`, getContract, ["cors", "get"]);
    F.ROUTE(`${pathPrefix}3-dkng/:hash`, getContract, ["cors", "get"]);
    F.ROUTE(`${pathPrefix}4-hdkq/:hash`, getContract, ["cors", "get"]);
    F.ROUTE(`${pathPrefix}5-hdckps/:hash`, getContract, ["cors", "get"]);
}
async function getContract({hash}, req, res) {
    let selects = [
        "allow_margin_trade",
        "allow_derivative_trade",
        "allow_banking",
        "active_email",
        "id_number",
        "country",
        "date_of_birth",
        "email",
        "id_issue_date",
        "id_issue_place",
        "name",
        "phone",
        "address",
        "address_permermanent",
        "brand",
        "bank_account",
        "bank_brand",
        // "bank_brand_region",
        "account_number"
    ];

    let account = await CUSTOMER.findOne({ hash: hash }).select(selects.join(" ")).exec();
    
    if (account) {
        let numberTemplateContract = +req.originalUrl.split(pathPrefix)[1].charAt(0);
        // let locations = await getLocations();

        account = account.toObject();
        account.dob = account.date_of_birth;
        if (numberTemplateContract == 3) { 
            account.bank_owner = account.name.toUpperCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D');

            if (account.bank_brand) {
                let bank = account.bank_brand.split('.');
                if (bank[1]) {
                    bank = bank[1].split('CN');
                    account.bank_brand = bank[0].trim().replace(/-/, '');
                    account.bank_brand_region = bank[1];
                }
            }
        }
        if (account.id_number && account.id_number.length < 10) {
            account.id_issue_place = 'CA ' + account.id_issue_place;
            account.id_type = 'CMND';
        }
        // account.id_issue_date = moment(account.id_issue_date).format("DD/MM/YYYY");
        // account.id_issue_place = getLocation(account.id_issue_place, locations);
        // account.birth_place = getLocation(account.birth_place, locations);
        account = _.omit(account, "_id");
        res.render(`templates-contract/${numberTemplateContract}`, {
            layout          : false,
            user            : account,
            host            : process.env.HOST_URL,
        });
        return;
    } else {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Not found');  
    } 
}
function getLocation(value, list) {
    let l = list.find(l => +l.value == +value);
    if (l) { return l.text; }
    return '';
}
async function getLocations() {
    let file = "./resource/location.json";
    try {
        let d = await fs.promises.readFile(file);
        return JSON.parse(String(d));
    } catch (error) {
        return [];
    }
}