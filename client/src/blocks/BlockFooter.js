import { h } from 'preact';
import { css } from 'emotion'
const $$BLOCK_BOTTOM = css`
/* height: 324px; */
// background: #222;
position: relative;

.gototop {
    position: absolute;
    right: 64px;
    top: -26px;
    width: 48px;
    height: 48px;
    cursor: pointer;
}

p[type="icon"] {
    cursor: pointer;
}

h1 {
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
    padding-top: 30px;
    padding-bottom: 44px;
    background-color: rgba(0, 0, 0, 0.2);
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
.row {
    display: flex;
    flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-around;
    p {
        color: white;
        margin: 8px 0;
        font-size: 1rem;
    }

    img {
        width: 48px;
        height: 48px;
        margin-bottom: 4px;
    }
    .col-4 {
        margin: 0 10px;
        flex: 0 0 50% !important;
    }
}
@media screen and (min-width: 400px) {
    .show-mobile {
        display: none;
    }
}
@media screen and (max-width: 400px) {
    .hidden-mobile {
        display: none;
    }
    .show-mobile {
        justify-content: space-around;
        display: flex;
        margin-top: 15px;
    }
}


p.copy {
    line-height: 48px;
    color: #999;
    font-size: 11px;
    margin: 0;
}

`

function BlockBottom () {
return <div className={$$BLOCK_BOTTOM}>
    <div className="container">
        <img className="gototop" onClick={ () => window.scrollTo({ top: 0, behavior: "smooth" })} src={`${HOST}/imgs/back_to_top.svg`} />
        {/* <span className="gototop" onClick={ () => window.scrollTo({ top: 0, behavior: "smooth" })}>&uarr;</span> */}
        <h1>
            Liên hệ      
        </h1>
        <div className="row">
            {/* <div className="col-4">
                <div className="block">
                    <p type="icon"><img src={`${HOST}/imgs/ic_phone.svg`} /></p>
                    <p>HÀ NỘI</p>
                    <p>(+84) 24 6262 6999</p>
                </div>
            </div> */}
            <div className="col-4">
                <div className="block">
                    <p type="icon"><img src={`${HOST}/imgs/ic_email.svg`} /></p>
                    <p>EMAIL</p>
                    <p><a href="mailto:info@vcsc.com.vn">info@vcsc.com.vn</a></p>
                </div>
            </div>
            <div className="col-4">
               <div className="block">
                    <p type="icon"><img src={`${HOST}/imgs/ic_phone.svg`} /></p>
                    <p>HOTLINE</p>
                    <p><a href="tel:02839143588">(+84) 28 3914 3588</a></p>
               </div>
            </div>
        </div>
        {/* <div className="row show-mobile">
            <div className="col-4">
                <div className="block">
                    <p type="icon"><img src={`${HOST}/imgs/ic_email.svg`} /></p>
                    <p style="height: 13px"></p>
                    <p>info@vcsc.com.vn</p>
                </div>
            </div>
        </div> */}
        
    </div>
    <p className="copy">Bản quyền © 2020 Công Ty Cổ Phần Chứng Khoán Bản Việt.</p>
</div>
}
const $$BLOCK_CONTAINER = css`
    background: url('${HOST}/imgs/bg_footer.png') no-repeat;
    background-color: #151616;
    background-size: cover;
    @media screen and (max-width: 527px) {
        // background-position: top;
    }
    .top {
        padding: 90px 10px;
        h3 {
            font-family: Montserrat;
            font-size: 28px;
            font-weight: 600;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            color: #ffffff;
            text-align: center;
            margin-bottom: 24px;
        }
        .btn-open {
            width: 180px;
            height: 44px;
            border-radius: 22px;
            background-color: #c42127;
            font-size: 14px;
            font-weight: 600;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            cursor: pointer;
        }
    }
    
`
export function BlockFooter() {
    return <section id="section-contact" className={$$BLOCK_CONTAINER}>
        <div className="top">
            <h3>Đầu tư cùng <br/>Chứng khoán Bản Việt ngay bây giờ!</h3>
            <div className="btn-open" onClick={ $ => window.scrollTo({ top: 10, behavior: "smooth" }) }>
                MỞ TÀI KHOẢN
            </div>
        </div>
        <BlockBottom />
    </section>
}