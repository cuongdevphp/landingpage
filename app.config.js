// const dotenv = require('dotenv');
// dotenv.config();
exports.config = {
    port: process.env.PORT,
    gzip: process.env.GZIP,
    file_size: process.env.FILE_SIZE,
    max_files: process.env.MAX_FILES,
    host: process.env.HOST,
    host_url: process.env.HOST_URL
}