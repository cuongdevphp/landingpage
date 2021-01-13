
const METADATA = F.MODEL("metadata.entity").schema;

const crypto = require('crypto');

const FileUtil = require('../utils/file.util');

exports.name = 'tracking';

exports.saveLog = async function saveLog(log) {
    // if (!log.data) {
    //     log.data = JSON.stringify(log.data);
    // }
    // log.type = type;
    let path = await writeFile(log);

    delete log.request_data;

    log.request_log_path = path;

    const metadata = new METADATA(log);
    await metadata.save();

    return metadata;
}
async function writeFile({type, request_data}) {
    let hash = crypto.createHash('sha256').update(new Date().getTime().toString()).digest('hex');
    
    let path = `logs/${type}-${hash}.json`;
    let r = await FileUtil.writeFilePromise(path, JSON.stringify(request_data));

    if (r) {
        return path;
    }
    return null;
}