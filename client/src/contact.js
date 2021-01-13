
import { h, render  } from 'preact';

import { Fragment, lazy, Suspense } from 'preact/compat'

import { useEffect, useCallback, useReducer, useState, useContext, useRef, useMemo, useLayoutEffect } from 'preact/hooks'

import { css } from 'emotion'

import { CheckBox, Dropdown, DateInput, $_ } from 'root/_components'

import { builtContext } from 'root/_context'

const STAGE = {
    PREPARE: 'PREPARE',
    LOADING: 'LOADING',
    READY: "READY"
}

const PAGE = {
    HOME: "HOME"
}

const CSS$ = css`
    text-align: center;

    div.header {
        position: relative;
        background: url(${HOST}/complete/complete_bg.svg) no-repeat;
        background-size: cover;
        background-position: top;
        img.header {
            margin-top: 32px;
            height: 310px;
            width: auto;
            @media screen and (max-width: 678px) {
                width: 100%;
                height: auto;
                padding: 16px;
            }
        }

        p.info {
            color: #666;
            margin-bottom: 16px;
        }


        div.features {
            max-width: 780px;
            width: 100%;
            display: inline-block;
            position: relative;
            margin-top: 20px;
            margin-bottom: 24px;

            ul.features {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                grid-column-gap: 16px;
                height: 135px;
                max-width: 780px;

                li {
                    position: relative;
                    border-radius: 12px;
                    box-shadow: 0px 4px 20px -5px rgba(0,55,123,1);
                    cursor: pointer;
                    > img {
                        object-fit: contain;
                        object-position: center;
                        width: 100%;
                        height:100%;
                    }

                    &:nth-child(1){
                        background-size: contain;
                        /* background-image: url(${HOST}/complete/1.svg); */
                        background-repeat: no-repeat;
                        background-color: #00377B ;
                        background-position: center;
                    }
                    &:nth-child(2){
                        background-size: contain;
                        /* background-image: url(${HOST}/complete/2.svg); */
                        background-repeat: no-repeat;
                        background-color: #00377B ;
                        background-position: center;
                    }
                    &:nth-child(3){
                        background-repeat: no-repeat;
                        background-color: #00377B ;
                        /* background-image: url(${HOST}/complete/3.svg); */
                        background-position: center;
                        background-size: contain;

                    }
                    
                    &:nth-child(4){
                        /* background-image: url(${HOST}/complete/4.svg); */
                        background-repeat: no-repeat;
                        background-color: #00377B ;
                        background-position: center;
                        background-size: contain;
                    }

                    &.active {
                        background-color: #C42127;
                        transform: translateY(-10px);
                        box-shadow: 0px 4px 20px -5px #C42127;
                        background-position: center;
                        background-size: contain;
                    }
                }

                @media screen and (max-width: 678px) {
                        grid-template-columns: repeat(2, 1fr);
                        grid-row-gap: 16px;
                        padding: 0 16px;
                        height: 335px;
                        li.active {
                            transform: translateY(0px);
                        }
                        li {
                            /* &:nth-child(1){
                                background-image: url(${HOST}/complete/1.svg);
                            }
                            &:nth-child(2){
                                background-image: url(${HOST}/complete/2.svg);
                            }
                            &:nth-child(3){
                                background-image: url(${HOST}/complete/3.svg);
                            }
                            &:nth-child(4){
                                background-image: url(${HOST}/complete/4.svg);
                            } */
                            background-attachment: unset;
                        }
                    }
            }
        }
    }

    div.body {
        margin-top: 48px;
        height: 480px;
        background: url(${HOST}/complete/complete_bg_bubble.svg) no-repeat;
        background-position: top;
        background-size: cover;
        max-width: 80%;
        border-radius: 16px;
        width: 100%;
        display: inline-block;
        position: relative;

        @media screen and (max-width: 768px) {
            max-width: calc(100% - 32px);
        }

        div.content {
            position: relative;

            h2 {
                margin-top: 40px;
                font-size: 32px;
                color: #00377B;
                display: inline-block;
                position: relative;
                &:after {
                    content: '';
                    width: 50%;
                    bottom: -4px;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    border-bottom: 2px solid #C42127;
                }
            }

            p {
                text-align: center;
                width: 70%;
                color: #333333;
                display: inline-block;
                font-size: 1rem;
                line-height: 130%;
                margin: 16px 0;
            }

            button, a.button {
                cursor: pointer;
                background: #00377B;
                padding: 8px 32px;
                border-radius: 4px;
                border: 0;
                color: white;
                text-transform: uppercase;
                margin: 8px 0;
                font-size: 10px;
                height: 36px;
            }

            div.info {
                position: relative;
                > h3 {
                    padding: 0 8px;
                }
                &:after {
                    content: '';
                    position: absolute;
                    top: -50px;
                    left: calc(50% - 50px);
                    width: 100px;
                    height: 100px;
                    z-index: 20;
                }

                &.FPT:after {
                    background: url(${HOST}/complete/i_1.png);
                    background-size: contain;
                }

                &.VNM:after {
                    background: url(${HOST}/complete/i_2.png);
                    background-size: contain;
                }

                > button {
                    width: 32px;
                    height: 32px;
                    position: absolute;
                    background: #a1c1ef;
                    color: white;
                    border-radius: 50%;
                    padding: 0;
                    line-height: 32px;
                    cursor: pointer;
                    outline: none;
                    top: 100px;
                    &:first-of-type {
                        left: -48px;
                    }
                    &:last-of-type{
                        right: -48px;
                    }
                }

                min-height: 240px;
                border-radius: 4px;
                background: white;
                box-shadow: 0px 4px 10px rgba(159, 191, 243, 0.2);
                width: 70%;
                display: inline-block;
                margin-top: 90px;
                padding-top: 60px;
                padding-bottom: 24px;

                > a {
                    display: block;
                    padding-top: 8px;
                    color: #00377b;
                    text-decoration: underline;
                }

                h3  {
                    font-size: 22px;
                    font-family: 'Montserrat', sans-serif;
                }

                > p {
                    padding-top: 18px;
                    display: inline-block;
                    margin: 0;
                    width: 70%;
                    color: #333;
                    @media screen and (max-width: 768px) {
                        font-size: 11px;
                    }
                }
            }

            div.dot {
                height: 18px;
                padding-top: 14px;
                cursor: pointer;
                > span {
                    display: inline-block;
                    width: 32px;
                    height: 4px;
                    border-radius: 2px;
                    background: #eef6ff;
                    margin: 4px;

                    &.active {
                        background: #00377b;
                    }
                }
            }
        }
    }

    div.footer {
        margin-top: 48px;
        background: #222222;
        min-height: 324px;
    }

    a.cta {
        background: #C42127;
        height: 40px;
        display: inline-block;
        width: 200px;
        border-radius: 20px;
        border: 0;
        outline: none;
        cursor: pointer;
        margin: 0 8px;

        @media screen and (max-width: 768px) {
            margin-bottom: 16px;
        }

        > img {
            height: 16px;
            width: 16px;
            margin-right: 8px;
            display: inline-block;
            vertical-align: middle;
        }

        > span {
            line-height: 40px;
            vertical-align: middle;
            color: white;
            font-size: 14px;
        }
    }

`

export default function Render({ validated = true }) {
    const ref = useRef();

    let [tab, setTAB] = useState("vpro")
    let [slide, setSlide] = useState(0);

    function slideBack (e) {
        if (slide > 0) {
            setSlide(slide-1);
        } else {
            setSlide(2)
        }
    }

    function slideForward (e) {
        if (slide < 1) {
            setSlide(slide+1);
        } else {
            setSlide(0)
        }
    }

    return <div className={CSS$} ref={ref}>
        <div className="header">
            <div style="padding: 10px; display: grid;">
                <img style=" height: 48px; " className="logo" src={`${HOST}/imgs/ic_logo.svg`} />
                <img style=" height: 120px; margin: 20px 0; " className="tick" src={`${HOST}/imgs/ic_tick_green.svg`} />
                <h2 style=" color: rgb(0, 55, 123); ">Cảm ơn Quý khách đã để lại thông tin tư vấn.</h2>
                <p style=" line-height: 1.5; ">Trong vòng 24 giờ làm việc, Chuyên viên tư vấn của VCSC sẽ<br/> liên lạc với Quý khách qua điện thoại để hỗ trợ thủ tục Mở tài khoản</p>
            </div>
            <div className="features">
                <ul className="features">
                    <li className={$_(tab == "vpro" && "active")} onClick={ () => setTAB("vpro") }>
                        <img src={`${HOST}/complete/1.svg`} ></img>
                    </li>
                    <li className={$_(tab == "vweb" && "active")} onClick={ () => setTAB("vweb") }>
                        <img src={`${HOST}/complete/2.svg`} ></img>
                    </li>
                    <li className={$_(tab == "vmobile" && "active")} onClick={ () => setTAB("vmobile") }>
                        <img src={`${HOST}/complete/3.svg`} ></img>
                    </li>
                    <li className={$_(tab == "vbond" && "active")} onClick={ () => setTAB("vbond") }>
                        <img src={`${HOST}/complete/4.svg`} ></img>
                    </li>
                </ul>
            </div>
            <br />
            <br />
            {
                tab == "vpro" && <>
                    <h1>V-Pro</h1>
                    <p className="info">Phần mềm giao dịch chuyên nghiệp, tốc độ nhanh chóng, tự thiết lập cấu hình, <br/> biểu đồ phân tích kỹ thuật, bảo mật và tính năng đa dạng.</p>
                    <a className="cta" href="https://www.vcsc.com.vn//userfiles/upload/file/VCSC/V_Pro_full.zip" target="_blank">
                        <img src={`${HOST}/complete/ic_download.svg`} />
                        <span>Tải xuống V-PRO</span>
                    </a>
                    <a className="cta" href="https://www.vcsc.com.vn/userfiles/upload/file/VCSC/VPRO_Manual.zip" target="_blank">
                        <img src={`${HOST}/complete/ic_file.svg`} />
                        <span>Hướng dẫn sử dụng</span>
                    </a>
                </>
            }
            {
                tab == "vweb" && <>
                    <h1>V-Web</h1>
                    <p className="info">Hệ thống giao dịch cổ phiếu đơn giản, tiện lợi không cần cài đặt, đáp ứng đa trình <br/> duyệt: Firefox, IE (>=IE9), Chrome, Safari,…có thể giao dịch mọi lúc mọi nơi.</p>
                    <a className="cta" href="https://trading.vcsc.com.vn/">
                        <img src={`${HOST}/complete/ic_link.svg`} />
                        <span>Truy cập V-Web</span>
                    </a>
                    <a className="cta" href="https://www.vcsc.com.vn/userfiles/upload/file/VCSC/guide%20WTS%20-%20VCSC.docx">
                        <img src={`${HOST}/complete/ic_file.svg`} />
                        <span>Hướng dẫn sử dụng</span>
                    </a>
                </>
            }
            {
                tab == "vmobile" && <>
                    <h1>V-Mobile</h1>
                    <p className = "info">Phần mềm hỗ trợ thiết bị di động chạy trên nền iOS và Android với những tính <br/> năng đáp ứng nhu cầu giao dịch cần thiết nhất.</p>
                    <a className="cta" href="https://apps.apple.com/us/app/v-mobile-new/id1492065191">
                        <img src={`${HOST}/complete/ic_apple.svg`} />
                        <span>Apple Store</span>
                    </a>
                    <a className="cta" href="https://play.google.com/store/apps/details?id=com.tradex.vcsc&hl=en">
                        <img src={`${HOST}/complete/ic_googlestore.svg`} />
                        <span>Google Store</span>
                    </a>
                    <a className="cta" href="https://www.vcsc.com.vn/userfiles/upload/file/VCSC/vmobile/HDSD-V-Mobile-New-VN1.pdf">
                        <img src={`${HOST}/complete/ic_file.svg`} />
                        <span>Hướng dẫn sử dụng</span>
                    </a>
                </>
            }
            {
                tab == "vbond" && <>
                    <h1>V-Bond</h1>
                    <p className = "info">Hệ thống giao dịch trái phiếu đơn giản, tiện lợi không cần cài đặt, đáp ứng đa <br/> trình duyệt: Firefox, IE (>=IE9), Chrome, Safari,…có thể giao dịch mọi lúc mọi nơi.</p>
                    <a className="cta" href="https://bond.vcsc.com.vn/login">
                        <img src={`${HOST}/complete/ic_link.svg`} />
                        <span>Truy cập V-Bond</span>
                    </a>
                    <a className="cta" href="https://www.youtube.com/watch?v=1qiMNF4OPRY?autoplay=1&mute=1">
                        <img src={`${HOST}/complete/ic_file.svg`} />
                        <span>Hướng dẫn sử dụng</span>
                    </a>
                </>
            }

        </div>
        <div className="body">
            {/* <img src="/complete/complete_bg_bubble.svg" /> */}
            <div className="content">
                <div><h2>Bạn có biết</h2></div>
                <div>
                    <p>Báo cáo phân tích của VCSC từ lâu đã được đánh giá là chất lượng hàng đầu trên thị trường. Tại sao bạn không thử ghé thăm và tham khảo bài phân tích của đội ngũ nghiên cứu của chúng tôi?</p>
                </div>
                <div>
                    <a href="http://ra.vcsc.com.vn" className="button">Khám Phá Ngay</a>
                </div>

                <div>
                    <div className={$_("info", slide==0 && "FPT", slide==1 && "VNM")}>
                        {
                            slide == 0 && <>
                                <h3>Công ty Cổ phần FPT</h3>
                                <a href="http://ra.vcsc.com.vn/?lang=vi-VN&ticker=FPT">HOSE:FPT</a>
                                <p>Chúng tôi duy trì khuyến nghị MUA dành cho CTCP FPT (FPT) khi nâng giá mục tiêu thêm 3% và điều chỉnh tăng nhẹ dự báo LNST sau lợi ích CĐTS 2020/2021/2022 thêm 4%/1%/1%. Các điều chỉnh này chủ yếu đến từ tăng trưởng doanh thu trong mảng Xuất khẩu Phần mềm (XKPM) duy trì ổn định hơn dự kiến.</p>
                            </>
                        }

                        {
                            slide == 1 && <>
                                <h3>Công ty Cổ phần Sữa Việt Nam</h3>
                                <a href="http://ra.vcsc.com.vn/?lang=vi-VN&ticker=VNM">HOSE:VNM</a>
                                <p>Tăng trưởng lợi nhuận kém khả quan trong quý 4, phù hợp với kỳ vọng của chúng tôi. CTCP Sữa Việt Nam (VNM) công bố KQKD quý 4/2019, trong đó doanh thu tăng 9% YoY trong khi LNST sau lợi ích CĐTS giảm 4%. Tính chung cả năm 2019, doanh thu tăng 7% trong khi LNST sau lợi ích CĐTS tăng nhẹ 3% YoY.</p>
                            </>
                        }

                        {/* {
                            slide == 2 && <>
                                <h3>Công ty Cổ phần Sữa Việt Nam</h3>
                                <a href="#">HOSE:VNM</a>
                                <p>Tăng trưởng lợi nhuận kém khả quan trong quý 4, phù hợp với kỳ vọng của chúng tôi. CTCP Sữa Việt Nam (VNM) công bố KQKD quý 4/2019, trong đó doanh thu tăng 9% YoY trong khi LNST sau lợi ích CĐTS giảm 4%. Tính chung cả năm 2019, doanh thu tăng 7% trong khi LNST sau lợi ích CĐTS tăng nhẹ 3% YoY.</p>
                            </>
                        } */}
                        <button onClick={slideBack}>&larr;</button>
                        <button onClick={slideForward}>&rarr;</button>
                    </div>
                </div>

                <div className="dot">
                    <span className={$_(slide == 0 && "active")} onClick={ () => setSlide(0) }></span>
                    <span className={$_(slide == 1 && "active")} onClick={ () => setSlide(1) }></span>
                    {/* <span className={$_(slide == 2 && "active")} onClick={ () => setSlide(2) }></span> */}
                </div>
            </div>
        </div>
        <Block_3 />
    </div>
}

const $$BLOCK_3 = css`
    /* height: 324px; */
    background: #222;

    p[type="icon"] {
        cursor: pointer;
    }

    h1 {
        font-family: 'Judson', serif;
        color: white;
        font-size: 2.57rem;
        margin-bottom: 40px;
    }

    >.container {
        margin-top: 24px;
        max-width: 1200px;
        width: 100%;
        display: inline-block;
        position: relative;
        z-index: 2;
        padding-bottom: 64px;
    }

    ul {
        display: grid;
        grid-template-columns: repeat(3, 1fr);

        li p {
            color: white;
            margin: 8px 0;
            font-size: 1rem;
        }

        img {
            width: 48px;
            height: 48px;
            margin-bottom: 4px;
        }

        @media screen and (max-width: 576px) {
            grid-template-columns: repeat(1, 1fr);
            text-align: left;
            li { padding: 0 16px; }
            li p {
                font-size: 1.1rem;
                display: inline-block;
                vertical-align: middle;
                padding-right: 16px;
            }
        }
    }

    hr {
        margin: 0 64px;
        border: 0;
        border-bottom: 1px solid #333333;
    }

    p.copy {
        line-height: 48px;
        color: #999;
        font-size: 11px;
    }

`

function Block_3 () {
    return <div className={$$BLOCK_3}>
        <div className="container">
            <h1>
                Liên hệ      
            </h1>
            <ul>
                <li>
                    <p type="icon"><img src={`${HOST}/imgs/ic_phone.svg`} /></p>
                    <p>HÀ NỘI</p>
                    <p>(+84) 24 6262 6999</p>
                </li>
                <li>
                    <p type="icon"><img src={`${HOST}/imgs/ic_email.svg`} /></p>
                    <p>info@vcsc.com.vn</p>
                </li>
                <li>
                    <p type="icon"><img src={`${HOST}/imgs/ic_phone.svg`} /></p>
                    <p>HỒ CHÍ MINH</p>
                    <p>(+84) 28 3914 3588</p>
                </li>
            </ul>
        </div>
        <hr />
        <p className="copy">Bản quyền © 2020 Công Ty Cổ Phần Chứng Khoán Bản Việt.</p>
    </div>
}



import { injectGlobal } from 'emotion';

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

    html, body, span {
        font-family: 'Montserrat', sans-serif;
        font-weight: 400;
        touch-action: manipulation;
    }

    #__paradox {
        overflow-x: hidden;
    }

    h1, h2 {
        margin-top: 12px;
        margin-bottom: 18px;
        font-family: 'Judson', serif;
        font-size: 28px;
    }

    h5 {
        font-weight: 600;
        color: #333333;
    }

    h3 {
        font-family: 'Judson', serif;
        font-weight: 700;
        color: #333333;
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
        --black: #333333;
    }

    @media screen and (min-width: 25em){
        html { 
            font-size: calc(11px + (11 - 10) * (100vw - 320px) / (800 - 320) ); 
        }
    }

    @keyframes blink-color {
        50% { border-color: transparent; }
    }

    input::placeholder {
        color: #999999;
        font-family: 'Montserrat', sans-serif;
    }

    textarea::placeholder {
        color: #999999;
        font-family: 'Montserrat', sans-serif;
    }

    @keyframes slide {
        0%{
            background-position-x:0%;
        }
        100% {
            background-position-x:100%;
        }
    }

`

render(<Render />, document.getElementById("__paradox"))