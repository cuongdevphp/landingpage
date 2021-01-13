
import { h  } from 'preact';

import { useEffect, useCallback, useReducer, useState, useContext, useRef, useMemo, useLayoutEffect } from 'preact/hooks'

import { builtContext } from 'root/_context';
import {  $_ } from 'root/_components';
import { css } from 'emotion'
import { EKYCOcr } from './ocr';
import { EKYCLiveness } from './liveness';
import { EKYCConfirmInfo } from './confirm-info';
import { EKYCRegisterService } from './register-service';
import { EKYCHeader } from './header';
import { checkIsMobile } from './core';

import { VCIButton } from 'root/shared/button';

import { PopupLoading } from 'root/shared/loading';


const CSS$ = css`
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    background: url('${HOST}/imgs/bg_ekyc.png') no-repeat;
    background-size: cover;
    background-position: bottom;
    overflow: hidden;
    min-height: 100vh;
    .content {
        text-align: center;
        max-width: 853px;
        margin: 15px auto;
        display: flex;
        justify-content: center;
        .title {
            font-weight: 600;
            font-size: 24px;
            line-height: 29px;
            color: #333333;
        }
        .description {
            font-size: 16px;
            line-height: 22px;
            color: #333333;
        }
        &.mobile {
            margin: 0;
        }
    }
    .footer {
        
        .row {
            max-width: 400px;
            margin: 10px auto;
            &.buttons-group {
                margin-bottom: 50px;
                z-index: 222222;
                position: relative;
                justify-content: center;
            }
            .error {
                color: #c42127;
                margin: 5px auto;
            }
        }
        button {
            outline: none;
        }

        button[type='back'] {
            background: #666;
            margin-right: 8px;
        }
        hr {
            width: 200px;
            background-color: #CCCCCC;
            border: 0.5px solid #CCCCCC;
        }
        p {
            font-family: Montserrat;
            font-style: normal;
            font-weight: normal;
            font-size: 11px;
            line-height: 13px;
            text-align: center;
            color: #999999;
            
            margin: 10px auto;
        }
    }
    .d-block {
        display: block !important;
    }
    @media screen and (max-width: 700px) {
        .row {
            margin-bottom: 0 !important;
            .col-6 {
                margin-bottom: 10px; 
            }
        }
        .content {
           &.mobile {
            &.margin {
                margin: 5px 10px;
            }
           }
       }
       .footer {
            padding: 0 5px;
            max-width: 310px;
             margin: 0 auto;
            .buttons-group {
                margin-bottom: 30px !important;
            }
       }
    }
    .blue-box {
        width: 24px;
        height: 24px;
        background: #43C4FF;
        border-radius: 4px;
        font-size: 14px;
        line-height: 17px;
        text-align: center;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export function EKYCPage({draftId, userInput, onExit}) {
    const {dispatch} = useContext(builtContext);

    const [isSubmit, setIsSubmit] = useState(0);

    const [loading, setLoading] = useState(false);

    let [userData, setUserData] = useState({});

    const [isMobile, setIsMobile] = useState(checkIsMobile());

    
    const [step, setStep] = useState(1);
    const [anhMatTruoc, setAnhMatTruoc] = useState(null);

    const [errors, setErrors] = useState(null);
    
    function next() {
        if (step == 4) return;
        scrollTop();
        setIsSubmit(0);
        setErrors(null);
        setStep(step + 1);
    }
    function scrollTop() {
        window.scroll(0, 0);
    }

    function back() {
        if (step == 1) {
            onExit();
            return;
        };
        console.log(userData)
        scrollTop();
        setIsSubmit(0);
        setErrors(null);
        setStep(step - 1);
    }
    function ocrSuccess(e) {
        setAnhMatTruoc(e.frontImg);
        setUserData({ 
            ...e.userData,
            ...userInput
        });
        next();
    }
    function authFaceSuccess() {
        next();
    }
    function confirmInfoSuccess(e) {
        setUserData(e);
        next();
    }
    function onLoading(e) {
        setLoading(e);
        if (e && isMobile) {
            dispatch({ type: "message", data: { className: 'loading', type: "custom", text: <PopupLoading /> } });
        }
        if (!e && isMobile) {
            dispatch({ type: "message", data: null });
        }
    }
    function onError(e) {
        setErrors(e);
    }
    function renderContentStep() {
        switch (step) {
            case 1:
                return <EKYCOcr isSubmit={isSubmit}
                                draftId={draftId}
                                onLoading={e => onLoading(e)}
                                onSuccess={e => ocrSuccess(e)}
                                onError={e => onError(e)}
                                onIncreaseSubmit={e => setIsSubmit(isSubmit + 1)}
                                isMobile={isMobile}
                />;
            case 2:
                return <EKYCLiveness isSubmit={isSubmit}
                                    draftId={draftId}
                                    anhMatTruoc={anhMatTruoc}
                                    onLoading={e => onLoading(e)}
                                    onSuccess={e => authFaceSuccess(e)}
                                    onError={e => onError(e)}
                                    onIncreaseSubmit={e => setIsSubmit(isSubmit + 1)}
                                    isMobile={isMobile}
                />
            case 3:
                return <EKYCConfirmInfo isSubmit={isSubmit}
                                        userData={userData}
                                        draftId={draftId}
                                        onLoading={e => onLoading(e)}
                                        onSuccess={e => confirmInfoSuccess(e)}
                                        isMobile={isMobile}
                />
            case 4:
                return <EKYCRegisterService isSubmit={isSubmit}
                                            userData={userData}
                                            draftId={draftId}
                                            onLoading={e => onLoading(e)}
                                            onSuccess={e => onExit()}
                                            isMobile={isMobile}
                />
            default:
                return null;
        }
    }
    let classNameContent = 'content';
    if (isMobile) {
        classNameContent += ' mobile';
        if (step > 2) {
            classNameContent += ' margin';
        }
    }

    return <div className={CSS$}>
        {isMobile && step < 3 ? null : 
            <EKYCHeader active={step} isMobile={isMobile} /> }
        <div className={classNameContent}>
            { renderContentStep() }
        </div>
        { isMobile && step < 3 ? null : 
            <div className="footer">
                { !errors ? null : 
                    <div className="row">
                        <p className="error">{errors}</p>
                    </div>
                }
                <div className="row buttons-group">
                    {step != 3 ?
                        <div className="col-6 mw-50">
                            <VCIButton type="back" onClick={() => back()}>Quay Lại</VCIButton>
                        </div> : null
                    }
                    <div className="col-6 mw-50">
                        <VCIButton loading={loading} className="primary" type="next" onClick={() => setIsSubmit(isSubmit + 1)}>Tiếp Tục</VCIButton>
                    </div>
                </div>
                <div className="row">
                    <hr />
                    <p>Bản quyền © 2020 Công Ty Cổ Phần Chứng Khoán Bản Việt.</p>
                </div>
            </div>
        }
    </div>

}