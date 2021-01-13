import { h  } from 'preact';

import { useState, useContext } from 'preact/hooks'

import { css } from 'emotion'

import {  $_ } from 'root/_components';

import { checkHaveCamera, checkIsMobile } from './core';


const CSS$ = css`
    padding: 16px 10px;
    position: relative;
    .help-link {
        position: absolute;
        right: 5px;
        top: -10px;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        color: #00377B;
    }
    .icon-webcam {
        width: 80px;
        height: 80px;
        margin: 0 auto;
    }
    p {
        text-align: left;
        font-size: 14px;
        line-height: 24px;
        color: #333333;  
        
        position: relative;      
        &.sub-title {
            font-weight: 600;
            position: relative;
        }
        .icon-info {
            width: 16px;
            height: 16px;
            margin-bottom: -2px;
            margin-left: 5px;
            cursor: pointer;
            &:hover ~ .tooltip {
                display: block;
            }
            &:focus ~ .tooltip {
                display: block;
            }
        }
        .icon-warning {
            width: 24px;
            height: 24px;
        }
        .icon-ok {
            margin-bottom: -3px;
            margin-left: 5px;
            width: 16px;
            height: 16px;
        }
        a {
            cursor: pointer;
            color: rgba(0, 55, 123, 1);
        }
        strong {
            font-weight: 600;
        }
    }
     button {
            min-width: 150px;
            font-weight: 600;
            font-size: 12px !important;
            
        font-family: Montserrat;
            &.default {
                 background: #666;
                margin-right: 25px;
            }
            &.primary {
                background: #00377B;
            }
    }
    .d-inline-flex {
        display: inline-flex;
    }
    .buttons-group {
        margin: 20px 0;
        @media screen and (max-width: 576px) {
            button, a {
                width: 140px;
                &.default {
                    margin: 0 10px 0 -10px !important;
                }
            }
        }
        a {
            cursor: pointer;
            border-radius: 4px;
            padding: 8px 16px;
            color: white;
            width: 50%;
            height: 48px;
            text-transform: uppercase;
            border: 0;
            font-size: 14px;
            vertical-align: top;
            background: #666;
            font-weight: 600;
            margin-right: 25px;
            min-width: 150px;
            font-size: 12px !important;
            display: flex;
            align-items: center;
            justify-content: center;
            
        font-family: Montserrat;
        }
    }
    .tooltip {
        display: none;
        position: absolute;
        width: 100%;
        left: 0;
        z-index: 2;
        background: #333333;
        border-radius: 4px;
        padding: 12px;
        p {
            font-style: normal;
            font-weight: 500;
            font-size: 13px;
            line-height: 24px;
            color: #FFFFFF;
        }
    }
    .icon-info:active ~ .tooltip {
        display: block;
    }
`;

export function EKYCReady({onContact, onReady}) {

    const [isMobile, setIsMobile] = useState(checkIsMobile());
    const [camera, setCamera] = useState(false);
    
    async function readyClick() {
        if (camera && typeof onReady === 'function') {
            onReady();
            return;
        }
        const allow = await requestCamera();
        if (allow && typeof onReady === 'function') {
            onReady();
        }
    }
    function contactClick() {
        if (typeof onContact === 'function') {
            onContact();
        }
    }
    async function checkClick() {
        if (camera) return;
        const allow = await requestCamera();
        if (allow) {
            setCamera(true);
        }
    }
    async function requestCamera() {
        return await checkHaveCamera();
    }
    return <div className={CSS$}>
            <a className="help-link" href={`${HOST}/docs/huongdan_ekyc${isMobile ? '_mobile' : ''}.pdf`} target="_blank">Xem hướng dẫn</a>
            <img className="icon-webcam" src={`${HOST}/imgs/ic-webcam.svg`}/>
            <p className="sub-title">
                Để bắt đầu xác thực điện tử, Quý khách vui lòng chuẩn bị
            </p>
            <p>
                1. CMND hoặc CCCD còn hiệu lực theo quy định.
            </p>
            <p>
                2. Máy tính hoặc Điện thoại có Camera 
                <img className="icon-info" src={`${HOST}/imgs/ic_information.svg`}/>
                <div className="tooltip">
                    <p>Trình duyệt khuyến nghị:</p>
                    <p>• Chrome (Window/Android/MacOS version 10.0.0 trở lên)</p>
                    <p>• Safari (iPhone/iPad version 12.4.1 trở lên) - Vui lòng <a style="color: #5396e9" href="app-prefs://prefs:root=Settings">cài đặt</a> theo khuyến nghị để thực hiện đăng ký</p>
                </div>
                { camera ? <img className="icon-ok" src={`${HOST}/imgs/ic_check_green.svg`}/>
                   : <a style="color: #00adfc; font-style: italic" onClick={() => checkClick()}>(Kiểm tra)</a>
                }
            </p>

            <p className="d-inline-flex">
                <img className="icon-warning" src={`${HOST}/imgs/ic_warning.svg`}/>
                <div style="margin-left: 5px">Nếu không thể định danh điện tử, vui lòng chọn <strong>LIÊN HỆ TƯ VẤN</strong> để Chuyên viên tư vấn VCSC hướng dẫn quý khách qua điện thoại</div>
            </p>
            <div className="buttons-group d-inline-flex">
                <a className="default" href={`${HOST}/lien-he`}>
                    Liên hệ tư vấn
                </a>
                <button className="primary" onClick={() => readyClick() }>Sẵn sàng</button>
            </div>
    </div>
}