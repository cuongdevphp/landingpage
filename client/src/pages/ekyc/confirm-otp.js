import { h, createElement  } from 'preact';

import { css } from 'emotion';

import { useState, useEffect } from 'preact/hooks'

import { Fragment, lazy, Suspense } from 'preact/compat';

import { VCIButton } from 'root/shared/button';

import { Spinner } from 'root/shared/spinner';

import { InputOtp } from 'root/shared/input-otp';

import { postAPI } from 'root/shared/api';

const CSS$ = css`
    .resend {
        margin-top: 20px;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 16px;
        text-align: center;
        color: #333333;
        span {
            cursor: pointer;
            color: #00377B;
            font-weight: 600;
        }
    }
    .inputs-group {
        margin: 20px 0;
    }
    h3 { color: #00377B !important; font-size: 18px !important }
    .error {
        text-align: center;
        color: #c42127;
        margin-bottom: 10px;
    }
    .success {
        color: #46ab00;
    }
`;
export function ConfirmOTP({onSuccess, onCancel, payload}) {
    let [loading, setLoading] = useState(false);
    
    let [resending, setResending] = useState(false);

    let [enableResend, setEnableResend] = useState(false);

    let [resendSuccess, setResendSuccess] = useState(false);

    let [timeCountDown, setTimeCountDown] = useState(60);
    
    let [code, setCode] = useState('');
    
    let [error, setError] = useState(null);

    async function onClickConfirm(otp = code) {
        if (otp.length < 6) {
            return;
        }
        setLoading(true);
        setError(null);
        setResendSuccess(false);
        let body = {
            code: otp,
            key: payload.otpKey,
            draft_id: payload.draft_id,
        }
        let result = await postAPI("v1/otp/confirm", null, JSON.stringify(body), {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         });
         if (result.data && result.status == 200) {
            onSuccess();
         } else {
             setError('Mã OTP không đúng hoặc đã hết hạn!')
         }
         setLoading(false);
    }
    async function onChangeOtp(e) {
        setCode(e);
        if (e.length === 5) {
           await onClickConfirm(e);
        }
    }
    async function onFinish(e) {
        await onClickConfirm(e);
    }
    async function resend() {
        if (!enableResend) return;
        setError(null);
        setResendSuccess(false);
        let result = await postAPI("v1/otp/resend", null, JSON.stringify({phone: payload.phone, key: payload.otpKey}), {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         });
         if (result.data && result.status == 200) {
            setResendSuccess(true);
            setEnableResend(false);
            setTimeCountDown(60);
         } else {
            setError('Không gửi lại được mã xác nhận');
         }
    }
    useEffect(() => {
        if(timeCountDown === 0){
           setTimeCountDown(null)
        }
        if (!timeCountDown) return;
    
        const intervalId = setInterval(() => {
            if (timeCountDown === 1) {
                setEnableResend(true);
            }
            setTimeCountDown(timeCountDown - 1);
        }, 1000);
    
        return () => clearInterval(intervalId);
      }, [timeCountDown]);
    return <>
        <div className={CSS$}>
            <img src={`${HOST}/imgs/ic_mobile.svg`} />
            <h3 className="primary">Xác nhận mã OTP</h3>
            <p className="text">
                Vui lòng nhập mã xác thực OTP được gửi đến số điện thoại <br/>
                <strong>{payload.phone}</strong> của Quý khách để xác thực.           
            </p>
            <div className="inputs-group">
                <InputOtp disabled={loading} isInputNum={true} numInputs={6} onFinish={e => onFinish(e)} onChange={ e => onChangeOtp(e) }   />
            </div>
            { error ? <p className="error">{error}</p> : null }
            { resendSuccess ? <p className="success">VCSC đã gửi lại mã xác nhận cho bạn!</p> : null }
            <VCIButton loading={loading} className='primary' onClick={(e) => onClickConfirm()}>Xác thực</VCIButton>
            <p className="resend">
    Không nhận được mã OTP? <span onClick={() => resend()}>Gửi lại {timeCountDown ? '('+timeCountDown+'s)' : ''} </span>
            </p>
        </div>
    </>
}