const fs = require('fs');
const path = require('path');

const APP_DIR = path.dirname(require.main.filename);


exports.loadModule = async function (name, PATH, execOnLoad = true){
    try {
        let list = fs.readdirSync(`${APP_DIR}/${name}`);
        if (!list || list.length == 0) {
            return;
        }

        let modulesObject = [];
        let resolvers = list.map( (file, index) => {
            let module = require(`${APP_DIR}/${name}/${file}`);
            modulesObject[index] = module;
            if (module.install != null && typeof module.install == "function"){
                if (execOnLoad){
                    return module.install();
                }
            }
        })

        let modulesAsync = await Promise.all(resolvers);

        modulesObject.forEach( module => {
            if (PATH != null && module.name != null) {
                PATH[module.name] = module;
            }
        })

        return modulesAsync;
    }catch(err) {
        console.log(err)
    }
}

exports.loadConfig = async function () {
    try {        
        let configs = require.main.require("./app.config.js")
        F._CONFIG["app"] = configs    
    }catch(error){
        console.error("Failed to Load Config, please make sure `app.config.js` is available in root folder")
    }
}

exports.Request = class {
    constructor(handler, req, res, next) {
        this.res = res;
        this.req = req;
        this.body = req.body;
        this.query = req.query;
        this.headers = req.headers;   
        handler.call(this, req.params, req, res)
    }

    json(data) {
        this.res.json(data)
    }

    throw403 (message){
        this.res.status(403).send(message)
    }

    throw404 (message) {
        this.res.status(404).send(message || 'Resource Not Found')
    }

    throw400 (message) {
        this.res.status(400).send(message || 'Invalid request parameters')
    }
    
    throw500 (message) {
        this.res.status(500).send(message)
    }
}