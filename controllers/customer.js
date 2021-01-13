const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const moment = require('moment');
const fetch = require('node-fetch');
const exphbs = require('express-handlebars');

const REGION = F.MODEL("region.entity").schema;

const BRAND = F.MODEL("brand.entity").schema;

const BROKER = F.MODEL("broker.entity").schema;

const excel = require('node-excel-export');

const CommonUtil = require('../utils/common');

let FileUtil = require('../utils/file.util');

const { getContractsByUser, generateHash } = require('../utils/common');

F.app.engine('handlebars', exphbs());
F.app.set('view engine', 'handlebars');

const _ = require('lodash');

const { body: checkBody, param: checkParam} = require('express-validator');

const CUSTOMER = F.MODEL("customer.entity").schema;

const REGISTRATION = F.MODEL("register.entity").schema;

const DRAFT = F.MODEL("draft.entity").schema;

const version = "v1";
exports.install = function () {
 
    F.ROUTE(`/${version}/customers`, getList, ["cors", "get"]);
    F.ROUTE(`/${version}/customers/export`, exportExcel, ["cors", "get"]);
    F.ROUTE(`/${version}/customers/:id/approve`, approve, ["cors", "post", '@validate-id']);
    F.ROUTE(`/${version}/customers/get-contract`, confirm, ["cors", "post", '@validate-ids']);
    F.ROUTE(`/${version}/customers/:id`, detail, ["cors", "get", '@validate-id']);
    F.ROUTE(`/${version}/customers/:id/update`, updateCustomer, ["cors", "post", '@validate-id', '@validate-update']);
    F.ROUTE(`/${version}/customers/:id/resend-contract`, resendContract, ["cors", "post", '@validate-id']);
    F.ROUTE(`/${version}/customers/:id/generate-contract`, generateContract, ["cors", "post", '@validate-id']);
}
async function generateContract({id}) {
  let customer = await CUSTOMER.findOne({
    _id: id,
    hash: {$ne: null},
    email: {$ne: null},
    account_number: {$ne: null}
  });
  if (!customer) {
    this.throw403('Thông tin khách hàng chưa đầy đủ');
    return;
  }
  await F.SERVICE("rabbit").sendContract(JSON.stringify({
    hash: customer.hash, type: 'generate_pdf'
  }));
  this.json({ 
    status: 200, data: true, message: 'On queue generate_pdf'
  })
}
async function resendContract({id}) {
  let customer = await CUSTOMER.findOne({
    _id: id,
    hash: {$ne: null},
    email: {$ne: null},
    account_number: {$ne: null}
  });
  if (!customer) {
    this.throw403('Thông tin khách hàng chưa đầy đủ');
    return;
  }
  await F.SERVICE("rabbit").sendMail(JSON.stringify({ contracts: getContractsByUser(customer), email: customer.email, name: customer.name, type: "contracts" }));
  this.json({ 
    status: 200, data: true, message: 'On queue'
  })
}
async function updateCustomer({id}, { body }) {
  let customer = await CUSTOMER.findOne({_id: id});
  if (!customer) {
    this.throw404('Customer not found');
    return;
  }
  let checkNationalId = await CUSTOMER.findOne({id_number: body.id_number, _id: { $ne: id }});
  if (checkNationalId) {
    this.throw403(`Số CMND/CCCD ${body.id_number} đã tồn tại trong hệ thống.`);
    return;
  }
  let { allow_banking, bank_brand, bank_account, bank_owner } = body;

  let { allow_margin_trade, allow_derivative_trade, address_permermanent } = customer.toObject();
  
  if (!address_permermanent) {
    address_permermanent = body.address;
  }
  if (!(typeof allow_margin_trade === 'boolean')) {
    allow_margin_trade = body.allow_margin_trade == undefined ? true : body.allow_margin_trade;
  }
  if (!(typeof allow_derivative_trade === 'boolean')) {
    allow_derivative_trade = body.allow_derivative_trade == undefined ? true : body.allow_derivative_trade;;
  }

  if (allow_banking) {
    if (!bank_brand || !bank_account || !bank_owner) {
      this.throw400('Bank cannot empty');
      return;
    }
  } else {
    bank_brand = null;
    bank_account = null;
    bank_owner = null;
  }
  try {
    let hash = customer.hash;
    if (!hash) {
      hash = generateHash(body.id_number);
    }
    await CUSTOMER.updateOne({ _id: id}, {
      name: body.name,
      date_of_birth: body.date_of_birth,
      gender: body.gender,
      email: body.email,
      id_number: body.id_number,
      id_issue_date: body.id_issue_date,
      id_issue_place: body.id_issue_place,
      address: body.address,
      allow_banking,
      bank_brand,
      bank_account,
      bank_owner,
      hash,
      allow_margin_trade,
      allow_derivative_trade,
      address_permermanent,
    }, { upsert: false, new: false });


    if (customer.draftId) {
      await DRAFT.updateOne({_id: customer.draftId}, { email: body.email },{ upsert: false, new: false });
    }
    await REGISTRATION.updateOne({ id_number: body.id_number}, {
      name: body.name,
      phone: customer.phone,
      dob: moment(body.date_of_birth, 'DD/MM/YYYY'),
      sex: body.gender,
      email: body.email,
      id_number: body.id_number,
      id_issue_date: moment(body.id_issue_date, 'DD/MM/YYYY'),
      id_issue_place: body.id_issue_place,
      address: body.address,
      brand: customer.brand,
      country: customer.country,
      allow_banking,
      bank_brand,
      bank_account,
      hash,
      id_type: body.id_number.length < 10 ? 'CMND' : 'CCCD',
      allow_margin_trade,
      allow_derivative_trade,
      draftId: customer.draftId
    }, { upsert: true });


    this.json({
      status: 200, data: true,
    })
  } catch (error) {
    console.error(error)
    this.throw500('Internal Server Error');
  }
  
}
async function confirm(_, {body}) {
  let customers = await CUSTOMER.updateMany({ _id: { $in: body.ids } }, {
    status: 'COMPLETED_CONTRACT'
  }, { upsert: false, new: false} )
  this.json({
    status: 200, data: customers.n === body.ids.length
  })
}
async function approve({id}) {
  let customer = await CUSTOMER.findOne({_id: id});
  if (!customer) {
    this.throw404();
    return;
  }
  if (![
      'NEW_REGISTER',
      'EKYC_FAILED',
      'EKYC_SUCCESS'
    ].includes(customer.status)) {
      this.throw403('This customer already was approved');
      return;
  }
  if (!validateAccount(customer)) {

    this.throw403('This customer was not enough information to approve');

    return;
  }
  let account = {};

  if (!customer.account_number) {
    account = await getAccountNumber();
  }
  if (!customer.active_email) {
    account.active_email = true;
    await F.SERVICE("rabbit").sendMail(JSON.stringify({ contracts: getContractsByUser(customer), email: customer.email, name: customer.name, type: "contracts" }));
  }

  await CUSTOMER.updateOne({ _id: id}, {
    ...account,
    status: 'CS_CONFIRM'
  }, { upsert: false, new: false });

  
  await F.SERVICE("rabbit").sendContract(JSON.stringify({
    hash: customer.hash, type: 'generate_pdf'
  }));

  this.json({ status: 200, success: true});
}
function validateAccount(customer) {
  let { email, name, phone, id_number, id_issue_date, id_issue_place, address, date_of_birth, gender } = customer;

  return email && name && phone && id_number && id_issue_date && id_issue_place && address && date_of_birth && gender;
}
async function getList(_, req) {
    try {
        let query = req.query;
        let customers = await CUSTOMER.find(query).sort({createdAt: 1});
        this.json({ status: 200, data: {customers} });
    } catch (err) {
        this.json({ status: 200, data: {
            customers: []
        }});
    }
}
async function exportExcel(_, req, res) {
    try {
        
        let query = req.query;

        let customers = await CUSTOMER.find({
          ...query,
          status: { $in: [ 'CS_CONFIRM', 'COMPLETED_CONTRACT' ] }
        }).sort({createdAt: 1});
        
        let dataset = customers.map(customer => customer.toObject());
        const report = excel.buildExport(
            [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
              {
                name: 'Report', // <- Specify sheet name (optional)
                heading: [], // <- Raw heading array (optional)
                specification: specification, // <- Report specification
                data: dataset // <-- Report data
              }
            ]
          );
          
          // You can then return this straight
          res.attachment(`${moment(new Date).format('YYYYMMDD')}-Danh-sach-KH-EKYC.xlsx`); // This is sails.js specific (in general you need to set headers)
          return res.send(report);
    } catch (err) {
        console.error(err)
        this.json({ status: 200, data: {
            customers: []
        }});
    }
}

async function detail({id}) {
    try {
        let customer = await CUSTOMER.findOne({_id: id})
        this.json({ status: 200, data: {
            customer: customer || null
        }});
    } catch (err) {
        this.json({ status: 200, data: {
            customer: null
        }});
    }
}
async function getAccountNumber() {
  let file = './resource/account.json';

  let account = await FileUtil.readFilePromise(file);

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

F.MIDDLEWARE("validate-id", F.Validate422([
    checkParam("id").not().isEmpty().withMessage("Param 'id' is empty")
]))

F.MIDDLEWARE("validate-update", F.Validate422([
    checkBody("name").not().isEmpty().withMessage("Body 'name' is empty"),
    checkBody("date_of_birth").not().isEmpty().withMessage("Body 'date_of_birth' is empty"),
    checkBody("gender").not().isEmpty().withMessage("Body 'gender' is empty"),
    checkBody("email").not().isEmpty().withMessage("Body 'email' is empty"),
    checkBody("id_number").not().isEmpty().withMessage("Body 'id_number' is empty"),
    checkBody("id_issue_date").not().isEmpty().withMessage("Body 'id_issue_date' is empty"),
    checkBody("id_issue_place").not().isEmpty().withMessage("Body 'id_issue_place' is empty"),
    checkBody("address").not().isEmpty().withMessage("Body 'address' is empty"),
]))


F.MIDDLEWARE("validate-ids", F.Validate422([
  checkBody("ids")
  .custom((value, { req }) => {
    if(!Array.isArray(value)) {
        throw new Error("Body 'ids' must be an array");
    }
    return true;
  })
]))


const styles = {
    header: {
        fill: {
            fgColor: {
              rgb: 'FFFFFF00'
            }
          },
          font: {
            color: {
              rgb: 'FF000000'
            },
            sz: 12,
            bold: true,
            name: 'Times New Roman'
          }
    },
    cell: {
        font: {
            color: {
              rgb: 'FF000000'
            },
            sz: 12,
            name: 'Times New Roman'
          }
    }
}
const specification = {
    account_number: {
        displayName: 'STK',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property
            return value || '';
          },
        width: 150
      },
    name: {
        displayName: 'Họ Tên KH',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        width: 200
      },
      date_of_birth: { // <- the key should match the actual data key
        displayName: 'Ngày tháng năm sinh',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property
          return value || '';
        },  // <- Here you specify the column header
        width: 150
      },
      gender: {
          displayName: 'Giới tính',
          headerStyle: styles.header,
          cellStyle: styles.cell,
          cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property
            return (value == 'MALE') ? 'Nam' : 'Nữ';
          },
          width: 100 // <-
      },
      id_number: {
          displayName: 'Số CMND',
          headerStyle: styles.header,
          cellStyle: styles.cell,
          cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property
            return value || '';
          },
          width: 100
      },
      id_issue_date: {
          displayName: 'Ngày cấp',
          headerStyle: styles.header,
          cellStyle: styles.cell,
          cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property
            return value || '';
          },
          width: 100
      },
      id_issue_place: {
          displayName: 'Nơi Cấp',
          headerStyle: styles.header,
          cellStyle: styles.cell,
          cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property
            return value || '';
          },
          width: 100
      },
      address: {
          displayName: 'Địa chỉ nhận thư',
          headerStyle: styles.header,
          cellStyle: styles.cell,
          cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property
            return value || '';
          },
          width: 250
      },
      manage_by: {
          displayName: 'ID MG',
          headerStyle: styles.header,
          cellStyle: styles.cell,
          cellFormat: function(value, row) {
            if (row.manage_by) {
                if (row.manage_by.broker) {
                    return row.manage_by.broker.user_name || ''
                }
            }
          return '';
        },
          width: 100
      },
      otp_number: {
          displayName: 'Số OTP',
          headerStyle: styles.header,
          cellStyle: styles.cell,
          cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property
            return '';
          },
          width: 100
      },
      contract_online: {
          displayName: 'HĐ Trực tuyến',
          headerStyle: styles.header,
          cellStyle: styles.cell,
          cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property
            return 'X';
          },
          width: 100
      },
      contract_ut: {
          displayName: 'HĐ Ứng Trước',
          headerStyle: styles.header,
          cellStyle: styles.cell,
          cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property
            return 'X';
          },
          width: 100
      },
      allow_margin_trade: {
          displayName: 'HĐ Ký Quỹ',
          headerStyle: styles.header,
          cellStyle: styles.cell,
          cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property
            return value ? 'X' : '';
          },
          width: 100
      },
      bank_account: {
          displayName: 'Số Tài Khoản Ngân Hàng 1',
          headerStyle: styles.header,
          cellStyle: styles.cell,
          cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property
            return value || '';
          },
          width: 150
      },
      bank_name_1: {
          displayName: 'Tên Ngân Hàng 1',
          headerStyle: styles.header,
          cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property
            return '';
          },
          cellStyle: styles.cell,
          width: 200
      },
      bank_branch_name_1: {
          displayName: 'Chi nhánh ngân hàng 1',
          headerStyle: styles.header,
          cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property
            return '';
          },
          cellStyle: styles.cell,
          width: 200
      },
      bank_brand: {
          displayName: 'Mã bank Vbos VCSC 1',
          headerStyle: styles.header,
          cellStyle: styles.cell,
          cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property
            return value || '';
          },
          width: 200
      },
      bank_brand_bidv_1: {
        displayName: 'Mã bank Vbos BIDV 1',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property
          return '';
        },
        width: 200
    },
      bank_owner: {
          displayName: 'Tên người thụ hưởng 1',
          headerStyle: styles.header,
          cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property
            return CommonUtil.removeUnicode(row.name);
          },
          cellStyle: styles.cell,
          width: 200
      },
      
      bank_account_2: {
        displayName: 'Số Tài Khoản Ngân Hàng 2',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property
            return '';
          },
        width: 150
    },
    bank_name_2: {
        displayName: 'Tên Ngân Hàng 2',
        headerStyle: styles.header,
        cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property
          return '';
        },
        cellStyle: styles.cell,
        width: 200
    },
    bank_branch_name_2: {
        displayName: 'Chi nhánh ngân hàng 2',
        headerStyle: styles.header,
        cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property
          return '';
        },
        cellStyle: styles.cell,
        width: 200
    },
    bank_brand_2: {
        displayName: 'Mã bank Vbos VCSC 2',
        cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property
          return '';
        },
        headerStyle: styles.header,
        cellStyle: styles.cell,
        width: 200
    },
     bank_brand_bidv_2: {
        displayName: 'Mã bank Vbos BIDV 2',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property
          return '';
        },
        width: 200
    },
    bank_owner_2: {
        displayName: 'Tên người thụ hưởng 2',
        headerStyle: styles.header,
        cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property
          return '';
        },
        cellStyle: styles.cell,
        width: 200
    },
    fee: {
        displayName: 'Phí LK',
        headerStyle: styles.header,
        cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property
          return 'Y';
        },
        cellStyle: styles.cell,
        width: 80
    },
    group_fee: {
        displayName: 'Nhóm phí',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        width: 80
    },
    region_assign: {
        displayName: 'Chi nhanh quan ly',
        headerStyle: styles.header,
        cellFormat: function(value, row) {
            if (row.manage_by) {
                if (row.manage_by.region) {
                    return row.manage_by.region.code || ''
                }
            }
          return '';
        },
        cellStyle: styles.cell,
        width: 120
    },
    brand: {
        displayName: 'Chi nhanh mo TK',
        headerStyle: styles.header,
        cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property
          return value == 'HOCHIMINH' ? '001' : '002';
        },
        cellStyle: styles.cell,
        width: 120
    },
    brand_assign: {
        displayName: 'PGD quan ly',
        headerStyle: styles.header,
        cellFormat: function(value, row) {
            if (row.manage_by) {
                if (row.manage_by.brand) {
                    return row.manage_by.brand.code || ''
                }
            }
          return '';
        },
        cellStyle: styles.cell,
        width: 100
    },
};