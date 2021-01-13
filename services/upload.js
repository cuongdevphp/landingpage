const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const saveTo = path.join('./public/upload/'); 

function init() {
    if (!fs.existsSync(path.join(saveTo))){ 
        fs.mkdirSync(path.join(saveTo));
        fs.mkdirSync(path.join(saveTo) + 'ocr');
        fs.mkdirSync(path.join(saveTo) + 'face_auth');
        console.log('\x1b[32m', `- UPLOAD SERVICE - Created folder ${ saveTo }`)
    } else {
        console.log('\x1b[32m', `- UPLOAD SERVICE - Folder ${ saveTo } existed`)
    }
}
async function images(files, uniqueText = new Date().getTime()) {
    let hashPicture = crypto.createHash('sha256').update(uniqueText.toString()).digest('hex');

    let pictures = [];

    if(files && Object.keys(files).length > 0 ) {
        pictures = Object.keys(files).map( (name, index) => {
            const tail = name.split(".");
            if (index > 1) {
                return null;
            }
            const picturePath = saveTo + `${hashPicture}_${index}.${tail[tail.length-1]}`;
            return new Promise((resolve, reject) => fs.writeFile(picturePath, files[name], null, e => {
                if (e) {  return reject(e); }
                resolve(picturePath)
            }));
        })
    }

    return await Promise.all(pictures);
}
exports.install = init;
exports.images = images;
exports.name = 'upload';