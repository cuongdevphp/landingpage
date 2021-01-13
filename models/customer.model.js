
const mongoose = require('mongoose')

let SchemaManageBy = new mongoose.Schema({
    broker: {
        name: String,
        user_name: String,
        email: String,
        brand: String,
        region: String
    },
    brand: {
        name: String,
        code: String,
        display_name: String,
    },
    region: {
        name: String,
        code: String,
        display_name: String,
    }
});

let SchemaContract = new mongoose.Schema({
    type: {
        type: String,
        enum: ["hdmtk","hdtt", "dkng", "hdkq", "hdckps"],
    },
    name: String,
    file_name: String,
    link: String,
    link_pdf: String
});
let Schema = new mongoose.Schema({
    account_number: {
        type: String,
        unique: true
    },
    name: String,
    email: String, //encrypt
    phone: String, // encrypt
    brand: {
        type: String,
        enum: ["HOCHIMINH","HANOI"],
        default: 'HOCHIMINH'
    },
    hash: String,
    country: {
        type: String,
        enum: ["VIETNAM","OTHER"],
        default: 'VIETNAM'
    },
    date_of_birth: String,
    gender: {
        type: String,
        enum: ["MALE","FEMALE"],
    },
    id_number: {
        type: String,
        // unique: true
    },
    id_issue_date: String,
    id_issue_place: String,
    address: String,
    address_permermanent: String,
    bank_account: String,
    bank_owner: String,
    bank_brand: String,
    bank_name: String,
    bank_code_vbos_vcsc: String,
    bank_code_vbos_bidv: String,
    files: [String],
    contracts: [SchemaContract],
    file_auth: String,
    account_number: String,
    otp_success: Boolean,
    ocr_success: Boolean,
    ocr_score: Number,
    live_detection_success: Boolean,
    live_detection_score: Number,
    active_email: Boolean,
    phone_number_check: Boolean,
    ekyc_score: Number,
    is_ekyc: {
        type: Boolean,
        default: false
    },
    broker: String,
    agency: String,
    draftId: String,
    group_fee: {
        type: String,
        default: '04' 
    },
    manage_by: {
        type: SchemaManageBy
    },
    allow_margin_trade: {
        type: Boolean,
        default: false
    },
    allow_derivative_trade: {
        type: Boolean,
        default: false
    },
    allow_banking: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: [
            'NEW_REGISTER',
            'EKYC_FAILED',
            'EKYC_SUCCESS',
            'CS_CONFIRM',
            'WAITING_COMPLETE',
            'COMPLETED_CONTRACT',
            'CANCEL',
            'COMPLETED'
        ],
        default: 'NEW_REGISTER' 
    },
    step: {
        type: String,
        enum: [
            'INPUT_FORM',
            'CONFIRM_OTP',
            'EKYC_OCR',
            'EKYC_FACE_AUTH',
            'REGISTER_SERVICES',
            'WAITING_ACTIVE',
            'FINISHED'
        ],
        default: 'INPUT_FORM'
    },
    status_ekyc: {
        type: String,
        enum: [
            'OCR_FAILED',
            'OCR_SUCCESS',
            'FACE_AUTH_FAILED',
            'FACE_AUTH_SUCCESS'
        ]
    }
},
{
    timestamps: true,
})

exports.schema = mongoose.model('Customer', Schema);
exports.name = "customer.entity";