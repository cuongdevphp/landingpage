import { h } from 'preact';
import { css } from 'emotion'

const $$CSS = css`
    background: #f0f6ff;
    position: relative;
    font-family: Montserrat;
    margin-top: -74px;
    z-index: 1;
    padding-top: 55px;
    >.container {
        margin-top: 40px;
        max-width: 1200px;
        margin-bottom: 25px;
        display: inline-block;
    }
    .bg {
        position: absolute;
        bottom: 0;
        top: 0;
        &.bg-left {
            left: 0;
        }
        &.bg-right {
            right: -41px;
        }
    }
    hr {
        width: 60px;
        height: 4px;
        background-color: #00377b;
        position: relative;
    }
    .row {
        display: flex;
        position: relative;
        margin-top: -40px;
    }

    h1 {
        color: #333333;
        padding: 16px 16px 0 16px;
        font-family: Montserrat;
        font-size: 28px;
        font-weight: 600;
        
        position: relative;
    }
    
    div.left, div.right {
        margin-top: 64px;
        width: 50%;
        display: inline-block;

        &.left {
            padding-right: 64px;
        }

        &.right {
            padding-right: 16px;
        }


        @media screen and (max-width: 976px) {
            width: 100%;
            display: block;
            padding: 16px!important;
            text-align: center;
            margin-top: 20px;
        }
    }

    ul {
        text-align: left;
        position: relative;
        margin-left: 64px;

        li {
            position: relative;
            h3 {
                margin-top: 16px;
                font-size: 20px;
                line-height: 26px;
                color: #333333;
                font-weight: 500;
                font-stretch: normal;
                font-style: normal;
                line-height: normal;
                letter-spacing: normal;
            }
            p {
                margin-top: 4px;
                color: #666666;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.57;
                letter-spacing: normal;
            }
            &:before {
                content: url('${HOST}/imgs/ic_check.svg');
                position: absolute;
                left: -48px;
                height: 26px;
                top: 0;
            }
        }
    }
    @media screen and (max-width: 1100px) {
        padding-top: 60px;
        .ic-chat {
            top: 130px;
        }
        .left {
            img {
                height: auto;
            }
        }
    }
    @media screen and (max-width: 850px) {
        .container {
            margin-top: 0;
        }
        padding-top: 420px;
        .row {
            margin-top: 0;
            .left {
                margin-top: 0;
                display: flex;
                align-items: center;
                img {
                    height: auto;
                }
            }
            .right {
                margin-top: 0;
            }
        }
    }
    @media screen and (max-width: 700px) {
        .row {
            flex-wrap: wrap;
            .left {
                img {
                    width: 90%;
                    margin: 0 auto;
                    height: 100%;
                }
            }
        }
    }
    @media screen and (max-width: 501px) {
        padding-top: 434px;
        .ic-chat {
            display: none;
        }
    }
    @media screen and (max-width: 450px) {
        padding-top: 660px;
    }
    @media screen and (max-width: 400px) {
        padding-top: 680px;
       
    }
    // @media screen and (max-width: 370px) {
    //     padding-top: 750px;
       
    // }
    
`

export function BlockWhy() {
    return <section id="section-why" className={$$CSS}>
        <div className="bg bg-left">
                <img src={`${HOST}/imgs/bg_why_left.svg`}  />
        </div>
        <div className="bg bg-right">
                <img src={`${HOST}/imgs/bg_why_right.svg`}  />
        </div>
        <div className="container">
            <h1>
                Vì sao bạn nên mở <br/>
                tài khoản chứng khoán ngay bây giờ?
            </h1>
            <hr/>
            
            <div className="row">
                <div className="left">
                    <img src={`${HOST}/imgs/bg_why.png`}/>
                </div>

                <div className="right">
                    <ul>
                        <li>
                            <h3>Thủ tục nhanh chóng</h3>
                            <p>Trong vòng 24h ngay sau khi đăng ký mở tài khoản tại đây bạn sẽ được nhân viên môi giới liên hệ hỗ trợ đầu tư</p>
                        </li>
                        <li>
                            <h3>Thời gian là tiền bạc</h3>
                            <p>Bạn sẽ có lợi thế về thời gian hơn, nếu bạn bắt đầu đầu tư sớm hơn.</p>
                        </li>
                        <li>
                            <h3>Kênh đầu tư hiệu quả</h3>
                            <p>Hệ thống môi giới hỗ trợ, tài nguyên các báo cáo phân tích chất lượng, hướng dẫn giao dịch hiệu quả có thể giúp bạn tìm hiểu tất cả những gì bạn cần biết về đầu tư. </p>
                        </li>
                        <li>
                            <h3>Có thể bắt đầu với số vốn nhỏ</h3>
                            <p>Bạn không cần đợi đến khi có 1 số vốn đủ lớn để bắt đầu đầu tư. Đầu tư vào cổ phiếu cho phép bắt đầu với số vốn nhỏ.</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
}