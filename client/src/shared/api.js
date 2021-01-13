export async function postAPI(path, data, body = null, headers = {}) {
    // const host = 'https://invest.vcsc.com.vn/mo-tai-khoan-online'
    // const url = new window.URL(`${host}/${path}`);
    const url = new window.URL(`${HOST}/${path}`);

    if (!body) {
        let params = new FormData();

        Object.keys(data).map(key => {
            if (data[key] instanceof Array) {
                data[key].forEach( i => params.append(`${key}`, i))
            } else {
                params.append(`${key}`, `${data[key]}`);
            }
        });
        body = params;
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            // mode: 'cors',
            cache: 'no-cache',
            // credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                ...headers
                // 'Content-Type': 'multipart/form-data;',
            },
            // referrerPolicy: 'no-referrer',
            body
        });
        
        if (response.status != 200 && response.status != 422) {
            return { status: response.status }
        }

        return await response.json();
    }catch (err) {
        return { status: -1 }
    }
}
export async function getAPI(path) {
    try {
        const url = new window.URL(`${HOST}/${path}`);
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            referrerPolicy: 'no-referrer',
        });
        
        if (response.status != 200 && response.status != 422) {
            return { status: response.status }
        }

        return await response.json();
    }catch (err) {

        return { status: -1 }
    }
}