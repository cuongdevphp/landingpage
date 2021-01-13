require("./_embed.js")

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const { validationResult } = require('express-validator');
const fs = require('fs');
const Busboy = require('busboy');
const cluster = require('cluster');
const path = require('path');
// require('dotenv').config();
const dotenv = require('dotenv');
dotenv.config();

const { loadModule, loadConfig, Request } = require('./_internal')

//GLOBAL
global.F = {};
F._SERVICE = {};
F._MIDDLEWARE = {};
F._MODEL = {};
F._CONFIG = {}
F.app = app;

//BOOT
F.http = async function ( options = {}) {
    await loadConfig();
    await loadModule("configs", F._CONFIG);
    await loadModule("models", F._MODEL);
    await loadModule("services", F._SERVICE);
    await loadModule("controllers");

    let config = F.CONFIG('app').config;
    let port = options.port || config.port;

    if (!port) {
        console.log(`NO PORT DEFINED! EXIT WITH CODE 1`)
        return;
    }

    if (config.gzip == 'true'){
        app.use(compression())
    }

    app.listen(port, function () {
        console.log(`-------------------------------------`)
        console.log(`Server start on port: ${ port }`)
        console.log(`-------------------------------------`)
    })    
}

F.cluster = async function ( options = {}) {
    if (cluster.isMaster) {
        for (let i = 0; i < require('os').cpus().length; i++) {
            cluster.fork();
        }

        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`);
        });
    } else {
        F.http(options);
        console.log("Process run on " + process.pid)
    }
}

//EXTENDS & CONFIG
app.use(bodyParser.json({limit: '50mb'})); //json
app.use(bodyParser.urlencoded({ extended: true })); //x-www-form-urlencoded 
app.use(express.static('public'));
app.disable("x-powered-by");

//ADD
F.ROUTE = function(url, func, tags) {
    
    let args = [(req, res, next) => new Request(func, req, res, next)]
    
    let middlewares = tags.filter( tag => tag.startsWith("@"))

    //ADD MIDDLEWARE
    if (middlewares.length > 0) {
        middlewares = middlewares.reverse();
        middlewares.forEach( name => {
            let mwName = name.replace("@","");
            if (F._MIDDLEWARE[mwName] != null && ( typeof F._MIDDLEWARE[mwName] == 'function' || F._MIDDLEWARE[mwName] instanceof Array)){
                args.unshift(F._MIDDLEWARE[mwName])
            }
        })
    }

    if (tags.includes("multipart")) {
        args.unshift(Multipart)
    }

    //ADD CORS
    if (tags.includes("cors")){
        args.unshift(cors())
    }

    //REST
    if (tags.includes("get")){
        app['get'](url, ...args);
    }

    if (tags.includes("post")){
        app['post'](url, ...args);
    }

    if (tags.includes("delete")){
        app['delete'](url, ...args);
    }

    if (tags.includes("put")){
        app['put'](url, ...args);
    }
} 

F.MIDDLEWARE = function (name, func) {

    if (F._MIDDLEWARE[name] != null) {
        console.log(`module ${name} already exist`)
        return;
    }

    F._MIDDLEWARE[name] = func;
}

//GET
F.SERVICE = function(name) {
    return F._SERVICE[name];
}

F.CONFIG = function (name) {
    return F._CONFIG[name];
}

F.MODEL = function(name) {
    return F._MODEL[name];
}

//https://jsao.io/2019/06/uploading-and-downloading-files-buffering-in-node-js/
const Multipart = (req, res, next) => {
    const config = F.CONFIG("app").config;
    const fileSize = config.file_size || 20; // 300kb default
    const maxFiles = config.max_files || 2; // 2 files at once default

    let totalBytesInBuffer = 0;

    try {
        const busboy = req.busboy = new Busboy({ 
            headers: req.headers,
            limits: {
                fileSize: fileSize*1024*1024
            }
        });

        let body = {
            files: {}
        };

        let fileCount = 0;
        let errors = [];

        busboy.on('field', (fieldname, value) => {
            body[fieldname] = value;
        });
        
        busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
            
            if (fileCount > maxFiles) {
                file.resume();
                errors.push({ code: 10000, message: "Too many files" })
            }

            if (filename.length > 0) {

                if(mimetype != 'image/png' && mimetype != 'image/jpeg' && mimetype != 'image/tiff'){
                    errors.push({ code: 10003, message: `${filename} is not an image` })
                    file.resume();
                } else {
                    fileCount++;
                    let buffer = [];

                    file.on('limit', function(){
                        errors.push({ code: 10001, message: `${filename} oversize` })
                        file.resume();
                    });

                    file.on('data', chunk => {
                        totalBytesInBuffer += chunk.length;
                        buffer.push(chunk);
                    })

                    file.on('end', () => {
                        body.files[filename] = Buffer.concat(buffer, totalBytesInBuffer)
                    });
                }

            } else {
                file.resume();
            }
        });

        busboy.on('finish', () => {
            if (errors.length > 0) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ errors: errors }))
            } else {
                req.body = body;
                next();
            }
        });
        
        return req.pipe(busboy);

    }catch (er) {
        console.log(er)
        res.status(404).json({ status: 404 })
        return;
    }

}


const Validate = async (req, res, next, validations, httpCode = 500) => {
    await Promise.all(validations.map(validation => validation.run(req)));
    const report = validationResult(req);
    if (report.isEmpty()) {
        return next();
    }
    res.status(httpCode).json({ status: httpCode, errors: report.errors.map(e => e.msg) });
};

F.Validate422 = validations => (req, res, next) => Validate(req, res, next, validations, 422);
F.Validate403 = validations => (req, res, next) => Validate(req, res, next, validations, 403);