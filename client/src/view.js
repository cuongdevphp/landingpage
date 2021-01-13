import { h, render, Fragment } from 'preact';

import { injectGlobal } from 'emotion';
import { useState } from 'preact/hooks';

import {css} from 'emotion'

injectGlobal`
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    * {
        box-sizing: border-box;
        font-size: 100%;
    }

    html, body {
        font-family: 'Montserrat', sans-serif;
        font-weight: 400;
        touch-action: manipulation;
        color: var(--black);
    }

    input::placeholder {
        font-family: 'Montserrat', sans-serif;
    }

    h5 {
        font-weight: 600;
    }

    h3 {
        font-family: 'Judson', serif;
        font-weight: 700;
    }

    a { 
        color: inherit; 
        text-decoration: none; 
    }

    img {
        width: 100%;
        height: 100%;
    }

    :scope {
        black: #333333;
    }

    @media screen and (min-width: 25em){
        html { 
            font-size: calc(12px + (12 - 10) * (100vw - 320px) / (800 - 320) ); 
        }
    }

    @keyframes blink-color {
        50% { border-color: transparent; }
    }

    input::placeholder {
        color: #999999;
    }

`

export function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const STAGE = {
    PRELOAD: "PRELOAD",
    VALIDATING: "VALIDATING",
    DONE: "DONE"
}

async function postAPI(path, data) {
    
    const url = new window.URL(`${HOST}/${path}`)

    let params = new FormData();

    Object.keys(data).map(key => {
        if (data[key] instanceof Array) {
            data[key].forEach( i => params.append(`${key}`, i))
        } else {
            params.append(`${key}`, `${data[key]}`);
        }
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            // credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                // 'Content-Type': 'multipart/form-data;',
            },
            referrerPolicy: 'no-referrer',
            body: params
        });
        
        if (response.status != 200) {
            response.json().then( result => console.log(result.errors) );
            return { error: response.status }
        }

        return await response.json();
    }catch (err) {
        return { error: -1 }
    }
}

async function getAPI(path, data) {
    console.log(`${HOST}`)
    
    const url = new window.URL(`${HOST}/${path}`)

    try {

        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            referrerPolicy: 'no-referrer',
        });

        
        if (response.status != 200) {
            response.json().then( result => console.log(result.errors) );
            return { error: response.status }
        }

        return await response.json();
    }catch (err) {
        console.log(err)
        return { error: -1 }
    }
}

//52bc069e906403427896d9a7cda9718e75d073a787f0d8943401593d9830f20e

let data;

let $$CSS = css`
    td {
        padding: 4px 0;
    }

    tr {
        border-bottom: 1px solid #eee;
    }

    img {
        margin-top: 24px;
        width: 200px;
        height: auto;
    }

    margin: 24px;
    margin: 0 auto;
    margin-top: 52px;
    h3 {
        font-size: 24px;
    }
`

function HTML () {
    let token = getParameterByName("token");

    let [_STAGE, setSTAGE] = useState({ current: STAGE.PRELOAD })

    if (_STAGE.current == STAGE.PRELOAD) {
        async function getTokenData () {
            data = await getAPI(`v1/view/${token.toLowerCase()}`)
            
            if (data.error == null) {
                setSTAGE({ current: STAGE.DONE })
            } 

        }

        getTokenData();

        return <>LOADING</>
    }

    if (_STAGE.current == STAGE.DONE){

        let rows = Object.keys(data.data).map( r => {
            return <tr><td>- {r}</td><td style={{ textAlign: "right" }}>{data.data[r] != null && data.data[r].toString()}</td></tr>
        })

        return <>
            <table className={$$CSS}>
                <tr><td colSpan="2"><h3>{data.data.name}</h3></td></tr>
                { rows }
                {/* <tr><td>Tên:</td><td>{data.data.name}</td></tr>
                <tr><td>Email:</td><td>{data.data.email}</td></tr>
                <tr><td>Phone:</td><td>{data.data.phone}</td></tr>
                <tr><td>Country:</td><td>{data.data.country}</td></tr>
                <tr><td>Dob:</td><td>{data.data.dob}</td></tr> */}
                <tr><td><img src={`${HOST}/v1/image/${token}/0`}  /></td><td><img src={`${HOST}/v1/image/${token}/1`} /></td></tr>
            </table>
        </>
    }
}

render(<HTML />, document.getElementById("__paradox"))