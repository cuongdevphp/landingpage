module.exports = {
    apps : [{
        name: "ONLINE_REGISTATION_EKYC",
        script: "./index.js",
        env: {
            NODE_ENV: "development"
        },
        env_production: {
            NODE_ENV: "production"
        }
    }]
}