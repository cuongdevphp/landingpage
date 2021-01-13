const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const moment = require('moment');
const fetch = require('node-fetch');
const exphbs = require('express-handlebars');

F.app.engine('handlebars', exphbs());
F.app.set('view engine', 'handlebars');

let HOST = F.CONFIG("app").config.host;
const _ = require('lodash');

const { body: checkBody, param: checkParam } = require('express-validator');

const version = "v1";

const DRAFT = F.MODEL("draft.entity").schema;
const CUSTOMER = F.MODEL("customer.entity").schema;
exports.install = function () {
    F.ROUTE(`/${version}/ekyc/ocr/card`, orcCard, ["cors", "multipart", "@ocr-card", "post"]);
    F.ROUTE(`/${version}/ekyc/face-auth/actions/:ref?`, getActions, ["cors", "get"]);
    F.ROUTE(`/${version}/ekyc/face-auth`, faceAuth, ["cors", "@face-auth", "post"]);
}
async function orcCard(_, { body }) {
    try {
        const picturesPath = await await F.SERVICE('upload').images(body.files);
    
        const { ref } = body;

        let transaction_code = null;

        if (ref && ref != 'null') {
            let files = picturesPath.map(p => {
                return HOST + p.replace(/public/g, '')
            })
            let draft = await DRAFT.findOneAndUpdate({ _id: body.ref }, {images: picturesPath}, { upsert: false, new: false }).exec();
            await CUSTOMER.updateOne({ draftId: body.ref }, {files}, { upsert: false, new: false }).exec();

            transaction_code = draft ? draft.transaction_code : null;
        }
        const result = await F.SERVICE('ekyc').ocrCard(picturesPath[0], picturesPath[1], ref || null, transaction_code);
        
        this.json({
            status: 200,
            data: {
                frontImg: picturesPath[0],
                userData: result
            },
            score: result ? result.min_score : 0,
            error: result ? result.error : null
        })
    } catch (error) {
        console.error(error);
        this.throw500("500");
    }
}
async function faceAuth(_, { body }) {
    try {
        const { ref } = body;
        let transaction_code = null;

        if (ref && ref != 'null') {

            let draft = await DRAFT.findOne({ _id: ref });

            transaction_code = draft ? draft.transaction_code : null;
        }
        const result = await F.SERVICE('ekyc').faceAuth(body, ref || null, transaction_code);
        this.json({
            status: 200,
            data: result.status == 200,
            message: result.message,
        })
    } catch (error) {
        this.throw500("500");
    }
}

async function getActions({ ref = null}) {
    let transaction_code = null;
    if (ref && ref != 'null') {
        let draft = await DRAFT.findOne({ _id: ref });

        transaction_code = draft ? draft.transaction_code : null;
    }
    const result = await F.SERVICE('ekyc').getActions(ref, transaction_code);

    this.json({
        status: 200,
        data: result
    })
}

F.MIDDLEWARE("ocr-card", F.Validate422([
    checkBody("files")
        .custom((value, {req}) => {
            try {
                if (!value) throw new Error("Body 'files' is empty")
                let valid = Object.keys(value).length

                if (valid > 0){
                    return true;
                }

                throw new Error("Body 'files' is empty")
            } catch(err) {
                console.error(err);
                throw new Error("Body 'files' is empty")
            }
    })
]))
F.MIDDLEWARE("face-auth", F.Validate422([
    checkBody("anhVideo")
    .isArray({ min: 1}).withMessage("Body 'anhVideo' must be an array"),
    checkBody("anhMatTruoc")
    .custom((value, {req}) => {
        if (value === undefined || value === null || value === "") throw new Error("Body 'anhMatTruoc' cannot empty");
        return true;
    }),
    checkBody("hanhDong")
    .custom((value, {req}) => {
        try {
            if (!value) throw new Error("Body 'hanhDong' is empty")
            let valid = Object.keys(value).length
            console.log(valid)
            if (valid > 0){
                return true;
            }

            throw new Error("Body 'hanhDong' is empty")
        } catch(err) {
            console.error(err);
            throw new Error("Body 'hanhDong' is empty")
        }
    })
]))