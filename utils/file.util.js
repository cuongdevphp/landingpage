const ImageDataURI  = require('image-data-uri');
const fs = require('fs');
const rootPath = require('path');

async function readFilePromise(filePath) {
    let data = await fs.promises.readFile(filePath, 'utf-8');

    data = JSON.parse(data.toString());

    return data;
}

async function writeFile(filePath, data) {
    try {
        await fs.promises.writeFile(rootPath.join(filePath), data);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
async function convertImageToBase64(filePath) {
    if (!fs.existsSync(filePath)) {
        return null;
    }
    const base64 =  await ImageDataURI.encodeFromFile(filePath);

    return dataBase64(base64)
}
function dataBase64(base64) {
    if (!base64) {
        return null;
    }
    return ImageDataURI.decode(base64).dataBase64;
}
async function saveAllFile(images) {
    let filePath = `public/imgs/tracking/face-auth/${new Date().getTime()}`;
    console.log('File tracking was saved in ' + filePath);
    return Promise.all(images.map(image => {
        return ImageDataURI.outputFile(image.anh, rootPath.join(filePath + '-' + image.thoiGian))
    }))
}


exports.convertImageToBase64 = convertImageToBase64;

exports.dataBase64 = dataBase64;

exports.readFilePromise = readFilePromise;

exports.writeFilePromise = writeFile;

exports.saveAllFile = saveAllFile;