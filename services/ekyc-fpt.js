const axios = require('axios');

const FileUtil = require('../utils/file.util');

const CommonUtil = require('../utils/common');

const CUSTOMER = F.MODEL("customer.entity").schema;

const DRAFT = F.MODEL("draft.entity").schema;
let instance = null;

const _ = require('lodash');

let HOST = F.CONFIG("app").config.host;

function init() {
    instance = axios.create({
        baseURL: process.env.EKYC_FPT_HOST,
        timeout: 60000,
        headers: {
            token: process.env.EKYC_FPT_TOKEN,
            code: process.env.EKYC_FPT_CODE,
            // "Content-Type": "application/json;charset=utf-8"
        }
    });
    instance.interceptors.request.use(request => {
        console.log('[EKYC] Starting Request with header', request.headers)
        return request
    });
      
    // instance.interceptors.response.use(response => {
    //     console.log('[EKYC] Response:', JSON.stringify(response, null, 2))
    //     return response
    // });
    

    console.log('------------Created instance EKYC_FPT Service  ---------')
}

async function ocrCard(front, back, ref = null, transaction_code) {
    try {
        let body = {
            anhMatTruoc: front,
            anhMatSau: back,
            maGiayTo: "cmtnd"
        }
        front = await FileUtil.convertImageToBase64(front);
        back = await FileUtil.convertImageToBase64(back);

        body.anhMatTruoc = front;
        body.anhMatSau = back;

        let log = {
            url: '/public/all/doc-noi-dung-ocr',
            ref,
            type: 'OCR',
            request_data: body
        }

        if (!transaction_code) {
            transaction_code = await getTransactionCode();
        
            if (ref) {
                await DRAFT.findOneAndUpdate({ _id: ref }, {transaction_code}, { upsert: true, new: false }).exec();
            }

        }
        
        if (transaction_code) {
            instance.defaults.headers.common['code_transaction'] = transaction_code;
        }

        let res =  await instance.post('/public/all/doc-noi-dung-ocr', body).catch(async (error) => {
            await trackingErrorLog(log, error);
            // return null;
        });
        
        let result = res.data;

        let response = result.data;

        if (ref && ref != 'null') {
            let modelCustomer = {
                step: 'EKYC_OCR',
                status_ekyc: 'OCR_FAILED',
                status: 'EKYC_FAILED',
                is_ekyc: true
            }
            let condition = { draftId: ref};
            if (result && response) {
                let { 
                    hoVaTen,
                    queQuan,
                    noiTru,
                    dacDiemNhanDang,
                    noiCap,
                    gioiTinh,
                } = response;
                response = {
                    ...response,
                    hoVaTen: CommonUtil.capitalizeFirstLetter(hoVaTen),
                    queQuan: CommonUtil.capitalizeFirstLetter(queQuan),
                    noiTru: CommonUtil.capitalizeFirstLetter(noiTru),
                    dacDiemNhanDang: CommonUtil.capitalizeFirstLetter(dacDiemNhanDang),
                    noiCap: CommonUtil.capitalizeFirstLetter(noiCap),
                };
                response.min_score = calculateAverageOCRScore(response);
                modelCustomer = { 
                    ...modelCustomer,
                    step: 'EKYC_FACE_AUTH',
                    status_ekyc: 'OCR_SUCCESS',
                    // confirm by a Quang
                    // status: 'EKYC_SUCCESS',
                    name: response.hoVaTen,
                    date_of_birth: response.namSinh,
                    id_number: response.soCmt,
                    id_issue_date: response.ngayCap,
                    id_issue_place: response.noiCap,
                    ocr_score: response.score,
                    address_permermanent: response.noiTru,
                    ocr_success: true
                }
                if (gioiTinh) {
                    modelCustomer.gender = gioiTinh == 'NAM' ? 'MALE' : 'FEMALE';
                }
                
                let checkId = await checkNationalId(response.soCmt);
                if (checkId) {
                    let csCheck = await CUSTOMER.findOne({id_number: response.soCmt});
                    if (csCheck) {
                        condition = {id_number: response.soCmt};
                        modelCustomer.draftId = ref;
                    }
                } else {
                    DRAFT.deleteOne({ _id: ref }).exec();
                    CUSTOMER.deleteOne(condition).exec();
                    condition = null;
                    response.error = `${response.loaiCmt.includes('old') ? 'Số CMND' : 'Thẻ CCCD'} '${response.soCmt}' này đã được dùng để mở tài khoản tại công ty CK Bản Việt. Cần lấy lại thông tin tài khoản đã mở, Quý nhà đầu tư vui lòng liên hệ Tổng đài (+84) 28 3914 3588 hoặc đến trực tiếp các chi nhánh VCSC để được hỗ trợ.`
                }
            }
            if (condition) {
                await CUSTOMER.updateOne(condition, modelCustomer,
                    { upsert: false, new: false })
            }
        }

        // Save log 
        await trackingSuccessLog(log, result);

        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
   
}
function checkValidNumber(v) {
    if (!v || Number.isNaN(+v)) return 0;
   return +v;
}
function calculateLiveDetectionScore(res) {
    if (!res) { return 0 };
    if (!res.score) { return 0 };
    return +(checkValidNumber(res.score) * 100).toFixed(2)
}
function calculateAverageOCRScore(response) {
    if (!response) { return 0 };
    let { 
        soCmtScore,
        hoVaTenScore,
        namSinhScore,
        ngayCapScore,
        noiCapScore
     } = response;
     
     return Math.min(
        checkValidNumber(soCmtScore),
        checkValidNumber(hoVaTenScore),
        checkValidNumber(namSinhScore),
        checkValidNumber(ngayCapScore),
        checkValidNumber(noiCapScore),
     )
}
async function trackingErrorLog(log, error) {
    let err = error.toJSON();
    await F.SERVICE('tracking').saveLog({
        ...log,
        response: {
            error: {
                code: err.code,
                message: err.message
            }
        },
        success: false
    });
    if (log.ref) {
        await CUSTOMER.updateOne({ draftId: log.ref }, {
            ekyc_status: `EKYC_${log.type}_FAILED`,
            status: 'EKYC_FAILED',
            step: `EKYC_${log.type}`,
            is_ekyc: true
        }, { upsert: false, new: false }).exec();
    }
}
async function trackingSuccessLog(log, response) {
    await F.SERVICE('tracking').saveLog({
        ...log,
        response,
        success: true
    });
}
async function getActions(ref, transaction_code) {
    try {
        if (!transaction_code) {
            transaction_code = await getTransactionCode();
            if (ref) {
                await DRAFT.findOneAndUpdate({ _id: ref }, {transaction_code}, { upsert: true, new: false }).exec();
            }
        }
        if (transaction_code) {
            instance.defaults.headers.common['code_transaction'] = transaction_code;
        }
        let res =  await instance.get('/public/all/danh-sach-hanh-dong?loai=huong&soHanhDong=2');
        
        let result = res.data;

        return result.data.hanhDong
    } catch (error) {
        console.error(error);
        return {};
    }
}
async function faceAuth(body, ref = null, transaction_code) {
    try {
        
        let { anhVideo, anhMatTruoc } = body;

        let listPath = await FileUtil.saveAllFile(anhVideo);

        anhVideo = anhVideo.map(video => {
            return { 
                ...video,
                anh: FileUtil.dataBase64(video.anh)
            }
        });
        anhMatTruoc = await FileUtil.convertImageToBase64(anhMatTruoc);

        body = { 
            ...body,
            anhMatTruoc,
            anhVideo
        }
        let log = {
            ref,
            type: 'FACE_AUTH',
            url: '/public/all/xac-thuc-khuon-mat',
            request_data: body
        }

        if (!transaction_code) {
            transaction_code = await getTransactionCode();

            if (ref) {
                await DRAFT.findOneAndUpdate({ _id: ref }, {transaction_code}, { upsert: true, new: false }).exec();
            }
        }
        if (transaction_code) {
            instance.defaults.headers.common['code_transaction'] = transaction_code;
        }
        let res = await instance.post('/public/all/xac-thuc-khuon-mat', body).catch(async (error) => {
            await trackingErrorLog(log, error);
        });
        let result = res.data;

        if (ref && ref != 'null') {
            let modelCustomer = {
                step: 'EKYC_FACE_AUTH',
                status_ekyc: 'FACE_AUTH_FAILED',
                status: 'EKYC_FAILED'
            }
            if (result && result.status == 200) {
                let file_auth = listPath ? HOST + listPath[0].replace(/public/g, '') : null;
                modelCustomer = { 
                    ...modelCustomer,
                    step: 'REGISTER_SERVICES',
                    status_ekyc: 'FACE_AUTH_SUCCESS',
                    // status: 'EKYC_SUCCESS',
                    live_detection_success: true,
                    live_detection_score: calculateLiveDetectionScore(result.data),
                    file_auth
                }
            }
            await CUSTOMER.updateOne({ draftId: ref}, modelCustomer,
                 { upsert: false, new: false }) 
        }
        
        // Save log 
        await trackingSuccessLog(log, result);

        return result;
    } catch (error) {
        console.error(error);
        return {};
    }
}
async function checkNationalId(value) {
    // let result = await axios.post('https://invest.vcsc.com.vn/api/v2/equity/account/checkNationalId', {
    //     nationalId: value
    // });
    return new Promise((resolve, reject) => {
        axios.post('https://invest.vcsc.com.vn/api/v2/equity/account/checkNationalId', {
            nationalId: value
        }).then(result => resolve(true))
        .catch(error => resolve(false))
    })
    // console.log(result);

}
async function getTransactionCode() {
    try {
        let res =  await instance.get('/public/all/ma-giao-dich');
        
        let result = res.data;

        return result.data || null;
    } catch (error) {
        return null;
    }
}

exports.install = init;
exports.ocrCard = ocrCard;
exports.faceAuth = faceAuth;
exports.checkNationalId = checkNationalId;
exports.getActions = getActions;
exports.getTransactionCode = getTransactionCode;
exports.name = 'ekyc';