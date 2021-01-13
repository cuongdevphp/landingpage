import { h, createElement  } from 'preact';

import { Fragment, lazy, Suspense } from 'preact/compat';

import { VCIButton } from 'root/shared/button';

import { css } from 'emotion'

export function FailMessage ({ status, data }) {


    if (status == "304") {
        return <>
            <div>
                <img src={`${HOST}/imgs/ic_info.svg`} />
                <h3>CMND hoặc CCCD này đã được đăng ký trước đó!</h3>
                <p className="text">
                    Vui lòng kiểm tra lại.            
                </p>
            </div>
        </>
    }

    if (status == "405") {
        return <>
            <div>
                <img src={`${HOST}/imgs/ic_info.svg`} />
                <h3>Email này đã được đăng ký trong 30 ngày gần đây!</h3>
                <p className="text">
                    Vui lòng kiểm tra email đã đăng ký xác nhận tài khoản.            
                </p>
            </div>
        </>
    }

    if (status == "413") {
        return <>
            <div>
                <img src={`${HOST}/imgs/ic_info.svg`} />
                <h3>Hình được cung cấp quá lớn!</h3>
                <p className="text">
                    Vui lòng đăng hình có dung lượng nhỏ hơn 3mb.            
                </p>
            </div>
        </>
    }


    if (status == "422") {
        if (data != null) {
            let  error = data.find( a => a.includes("Body 'id_number' is exist"));

            if (error) {
                return <>
                    <div>
                        <img src={`${HOST}/imgs/ic_info.svg`} />
                        <h3>Số CMND này đã mở tài khoản tại <br/> CTCP Chứng khoán Bản Việt!</h3>
                        <p className="text">
                            Bạn Vui lòng liên hệ hotline để lấy lại thông tin tài khoản.            
                        </p>
                        <p><strong>HÀ NỘI</strong>(+84) 24 6262 6999</p>
                        <p><strong>HỒ CHÍ MINH</strong>(+84) 28 3914 3588</p>
                    </div>
                </>
            }
        }

        return <>
            <div>
                <img src={`${HOST}/imgs/ic_info.svg`} />
                <h3>Thông tin bạn dùng để đăng ký có thể sai định dạng!</h3>
                <p className="text">
                    Vui lòng kiểm tra lại thông tin hoặc liên hệ chúng tôi qua đường dây nóng.            
                </p>
            </div>
        </>
    }

    return <>
        <div>
            <img src={`${HOST}/imgs/ic_info.svg`} />
            <h3>Lỗi {status} đã xảy ra!</h3>
            <p className="text">
                Vui lòng kiểm tra lại thông tin hoặc liên hệ chúng tôi qua đường dây nóng.            
            </p>
        </div>
    </>
    
}

export function SuccessMessage () {
    return <>
        <div>
            <img src={`${HOST}/imgs/ic_mail.svg`} />
            <h3>Cảm ơn Quý khách đã đăng ký mở tài khoản tại VCSC!</h3>
            <p className="text">
            Vui lòng kiểm tra email để hoàn tất yêu cầu mở tài khoản và nhận<br/>
             hướng dẫn hoàn thiện hợp đồng mở tài khoản chứng khoán.<br/>
                Nếu cần hỗ trợ Quý khách vui lòng liên hệ:<br/>
                <strong style="font-weight: 600">Tổng đài</strong>: (+84) 28 3914 3588           
            </p>
        </div>
    </>
}
const CSS_CONFIRM$ = css`
    .text {
        b {
            font-weight: 600;
            line-height: 1.7;
        }
    }
    .list-group {
        margin-top: 16px;
        margin-bottom: 10px;
        text-align: left;
        .item {
            display: inline-flex;
            align-items: center;
            margin-bottom: 10px;
            &__box {
                width: 36px;
                height: 36px;
                color: #fff;
                background: #43C4FF;
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            &__text {
                margin-left: 8px;
                text-align: left;
                width: calc(100% - 43px);
            }
        }
    }

`;

export function ConfirmUnderstand({type = 'card', title = '', subTitle = '', list = [], onClickConfirm}) {
    return <>
        <div className={CSS_CONFIRM$}>
            <img src={`${HOST}/imgs/ic_${type}.svg`} />
            <h3 style="color: #00377B; font-size: 18px">{title}</h3>
            <p className="text" dangerouslySetInnerHTML={{__html: subTitle}}>
               
            </p>
            <div className="list-group">
                {list.map((item, index) => <div className="item" key={index}>
                    <span className="item__box">{index + 1}</span> <span className="item__text">{item}</span>
                </div>)}
            </div>
            <VCIButton className='primary' onClick={(e) => onClickConfirm()}>Tôi đã hiểu</VCIButton>
        </div>
    </>
}
const CSS_ERROR_MESSAGE$ = css`
    img {
        width: 48px !important;
        height: 48px !important;
    }
    button {

    }
`;
export function ErrorMessagePopup({text, onRetry}) {
    return <>
        <div className={CSS_ERROR_MESSAGE$}>
            <img src={`${HOST}/imgs/ic_info.svg`} />
            <h3>{text}</h3>
            <VCIButton className='default' onClick={(e) => onRetry()}>Thử lại</VCIButton>
        </div>
    </>
}

const CSS_WARNING_OCR$ = css`
    img {
        width: 53px;
    }
    p {
        font-size: 13px;
        strong { font-weight: bold; }
        margin: 20px 0;
        line-height: 18px;
    }
    .buttons-group {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
            bottom: 30px;
            .warning {
                margin-right: 10px;
            }
            button {
                height: 40px;
            }
    }
`;
export function WarningOcrDialog({onReTake, onContinue}) {
    return <>
        <div className={CSS_WARNING_OCR$}>
            <img src={`${HOST}/imgs/ic_light-yellow.svg`} />
            <p>
                Ảnh CMND/ Thẻ CCCD của Quý khách chưa đủ rõ ràng, sắc nét (dưới <strong>90/100</strong> điểm).
                Quý khách nên <strong>chụp lại</strong> ảnh để tăng kết quả định danh.
            </p>
            <div className="buttons-group">
                <VCIButton className='warning' onClick={(e) => onReTake()}>Chụp lại</VCIButton>
                <VCIButton className='primary' onClick={(e) => onContinue()}>Tiếp tục</VCIButton>
            </div>
        </div>
    </>
}