const readXlsxFile = require('read-excel-file/node');
const fs = require('fs');

const rootPath = require('path');

init();

async function init() {
    const rows = await readXlsxFile('./tool/files/20201026.xlsx', { sheet: 2 });
    let listBank = {}, branches = {};
    for (var i = 1; i < rows.length; i++) {
        let bankArr = rows[i];
        let bank_code = bankArr[0].replace(/\s/g, '_');
        if (!listBank[bank_code]) {
            listBank[bank_code] = { value: bank_code, text: bankArr[2] };
        }
        let branch = { text: bankArr[4], value: bankArr[5] };
        if (!branches[bank_code]) {
            branches[bank_code] = [branch];
        } else {
            branches[bank_code].push(branch);
        }
    }
    writeFile(`resource/bank/index.json`, JSON.stringify(Object.values(listBank)));
    console.log('\x1b[32m', `-- Created resource/bank/index.json --`);
    let keysBank = Object.keys(listBank);
    for (var i = 0; i < keysBank.length; i++) {
        let key = keysBank[i];
        let path = `resource/bank/branch/${key}.json`;
        let data = JSON.stringify(branches[key]);
        writeFile(path, data);
        console.log('\x1b[32m', `-- Created ${ path } --`)
    }
    
}



function writeFile(filePath, data) {
    try {
        fs.writeFileSync(rootPath.join(filePath), data);
    } catch (error) {
        console.error(error);
    }
}