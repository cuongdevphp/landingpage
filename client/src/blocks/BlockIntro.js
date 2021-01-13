import { h } from 'preact';
import { css } from 'emotion'

const $$CSS = css`
    background: #00377b;
    position: relative;
    .header {
        position: relative;
        .bg {
            position: absolute;
            top: 20px;
            img {
                width: 50%;
            }
        }
    }
    span.ticker {
        margin-top: 32px;
        color: #00377b;
        background: #ffffff;
        padding: 4px 18px;
        border-radius: 20px;
        height: 40px;
        display: inline-block;
        line-height: 32px;
        font-family: Montserrat;
        font-size: 18px;
        font-weight: 500;
    }

    > .after {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 40px;
        background: white;
        left: 0;
    }

    >.container {
        margin-top: 24px;
        max-width: 1200px;
        display: inline-block;
        position: relative;
        z-index: 2;
    }


    h1 {
        margin-top: 12px;
        font-family: Montserrat;
        font-size: 28px;
        color: #ffffff;
    }

    ul {
        margin-top: 40px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 20px;
        padding: 0 20px;

        @media screen and (max-width: 976px) {
            grid-template-columns: repeat(2, 1fr);
        }

        @media screen and (max-width: 576px) {
            grid-template-columns: repeat(1, 1fr);
        }

        li {
            border-radius: 8px;
            padding: 32px;
            text-align: left;
            img { width: 56px; height: 56px; }
            background: white;
            box-shadow: 4px 4px 10px rgba(174, 226, 248, 0.2);
            h3 {
                font-size: 1.5rem;
                line-height: 1.5rem;
                margin: 8px 0;
            }
            p {
                line-height: 130%;
                color: #666666;
                margin-bottom: 10px;
                .font-bold {
                    font-weight: bold;
                }
            }
            a {
                font-size: 12px;
                font-weight: 500;
                font-stretch: normal;
                font-style: normal;
                line-height: normal;
                letter-spacing: normal;
                color: #00377b;
                text-transform: uppercase;
                img {
                    width: 12px;
                    height: 12px;
                    object-fit: contain;
                    margin-left: 2px;
                }
            }
            -webkit-transition: all 0.2s linear;
            -moz-transition: all 0.2s linear;
            -o-transition: all 0.2s linear;
            transition: all 0.2s linear;
            height: 267px;
            @media screen and (max-width: 576px) {
                height: unset;
            }
            &:hover {
                h3 {
                    color: #00377b
                }
                margin-top: -8px;
            }
        }
    }
`

export function BlockIntro() {
    return <section id="section-intro" className={$$CSS}>
        <div className="container">
            <div className="header">
                <span className='ticker'>VCI (HOSE)</span>
                <h1>
                    Chứng khoán Bản Việt <br/>           
                    Giải pháp tốt nhất của bạn!        
                </h1>
               <div className="bg">
                    <img src={`${HOST}/imgs/bg_intro.png`}  />
               </div>
            </div>
        <ul>
            <li>
                <p><img src={`${HOST}/imgs/ic_1.svg`} /></p>
                <h3>Đội ngũ hỗ trợ <br/> giàu kinh nghiệm</h3>
                <p>Cung cấp tin tức liên tục về thị trường cũng như các báo cáo phân tích chuyên sâu về doanh nghiệp.</p>
            </li>
            <li>
                <p><img src={`${HOST}/imgs/ic_2.svg`} /></p>
                <h3>Nhà môi giới top 3 <br/> trên HOSE</h3>
                <p>Nhiều năm liền VCSC luôn luôn nằm trong top 3 các công ty chứng khoán uy tín nhất hiện nay.</p>
                <a target="_blank" href="https://cafef.vn/thi-phan-moi-gioi-hose-quy-2-vps-vuot-mat-mirae-asset-tcbs-lot-vao-top-10-20200706190403466.chn">
                    Xem thêm
                    <img src={`${HOST}/imgs/ic_arrow.svg`} />
                </a>
            </li>
            <li>
                <p><img src={`${HOST}/imgs/ic_3.svg`} /></p>
                <h3>Báo cáo phân tích <br/> chất lượng </h3>
                <p>Các báo cáo phân tích sâu sắc và toàn diện từ bộ phận nghiên cứu phân tích, hỗ trợ nhà đầu tư ra quyết định đúng đắn và hiện quả.</p>
                <a target="_blank" href="https://www.vcsc.com.vn/trung-tam-phan-tich">Xem thêm <img src={`${HOST}/imgs/ic_arrow.svg`} /></a>
            </li>
            <li>
                <p><img src={`${HOST}/imgs/ic_4.svg`} /></p>
                <h3>Quy trình đơn giản </h3>
                <p>Chỉ với vài thao tác đăng ký online bạn đã sở hữu cho mình một tài khoản chứng khoán hoàn toàn miễn phí và được nhân viên môi giới liên hệ hỗ trợ tận tình trong vòng 24h sau khi mở tài khoản.</p>
            </li>
            <li>
                <p><img src={`${HOST}/imgs/ic_5.svg`} /></p>
                <h3>Hệ thống hoàn hảo </h3>
                <p>Không ngừng cải tiến các phương thức giao dịch, trong đó phải kể đến các phương thức tương tác trực tuyến.</p>
            </li>
            <li>
                <p><img src={`${HOST}/imgs/ic_6.svg`} /></p>
                <h3>Dịch vụ đa dạng </h3>
                <p><span class="font-bold">50.000+</span> nhà đầu tư đã tin tưởng và sử dụng dịch vụ tại VCSC. Chúng tôi cung cấp các gói dịch vụ phù hợp với từng phân khúc khách hàng, đảo bảo tính nhanh chóng, thuận lợi và bảo mật thông tin.</p>
            </li>
        </ul>
        </div>
        <div className="after" />
    </section>
}