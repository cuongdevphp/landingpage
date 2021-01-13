const fetch = require('node-fetch');

/**
 * @host https://developers.google.com/recaptcha/docs/verify
 */
exports.verify = async (value) => {
    let nextAccount = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=6LdoB7IZAAAAAD2QHRyzd8dxrURqiwe3DYGlq8Nv&response=${value}`, {
            method: "POST"
    });
    /**
     * {
        "success": true|false,
        "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
        "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
        "error-codes": [...]        // optional
        }
     */
    const response =  await nextAccount.json();

    console.log('response reCAPTCHA', response)


    return response.success;
}
exports.name = 'reCAPTCHA';