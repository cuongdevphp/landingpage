
import { h, createElement  } from 'preact';

import { Fragment, lazy, Suspense } from 'preact/compat'

import { useEffect, useCallback, useReducer, useState, useContext, useRef, useMemo, useLayoutEffect } from 'preact/hooks'

import { css } from 'emotion'

import { CheckBox, Dropdown, DateInput, $_, Input, Textarea } from 'root/_components'

// import { locations as DataLocations } from 'root/_static'

import { builtContext } from 'root/_context'
// import { result } from 'lodash';

import { postAPI } from 'root/shared/api'

import CompletePage from 'root/validated'
import {BlockFooter} from 'root/blocks/BlockFooter'
import {BlockAwardPartner} from 'root/blocks/BlockAwardPartner'
import {BlockIntro} from 'root/blocks/BlockIntro'
import { BlockWhy } from 'root/blocks/BlockWhy';
import { BlockHeader } from 'root/blocks/BlockHeader';
import { BlockContent } from 'root/blocks/BlockContent';
import { FailMessage, SuccessMessage} from 'root/shared/alert';
import { EKYCPage } from '../ekyc';
import { EKYCReady } from '../ekyc/ready';

import { ConfirmOTP } from '../ekyc/confirm-otp';

import { VCIButton } from 'root/shared/button';

import { setCookie, getCookie } from 'root/shared/storage';

const STAGE = {
    PRELOAD: 'PRELOAD',
    LOADING: 'LOADING',
    DONE: "DONE"
}

const PAGE = {
    HOME: "HOME",
    COMPLETE: "COMPLETE",
    EKYC: 'EKYC'
}

const CSS$ = css`
    text-align: center;
    

    img[type='background'] {
        position: relative;
        width: 100%;
        max-height: 100%;
        position: absolute;
        object-position: left;
        object-fit: contain;
        &.left {
            top: 0;
            left: 0;
        }
    }
`

export default function Render() {
    const ref = useRef();

    let [stage, __SETSTAGE] = useState({ current: STAGE.PRELOAD });
    let [page, __SETPAGE] =  useState({ current: PAGE.HOME });
    let [payload, setPayload] = useState({draftId: null, userInput: null});

    const setSTAGE = (nextStage, nextPayload) => __SETSTAGE({ current: nextStage, payload: nextPayload });
    const setPAGE = (nextPage, nextPayload) => __SETPAGE({ current: nextPage, payload: nextPayload });

    if (page.current == PAGE.HOME) {
        window.scrollTo(0,0); 
        return <div className={CSS$} ref={ref}>
            <BlockHeader/>
            <BlockContent>
                <Form onComplete={ (pl) => {
                    setPayload(pl);
                    setPAGE(PAGE.EKYC);
                    // setPAGE(PAGE.COMPLETE);
                }} />
            </BlockContent>
            <BlockWhy/>
            <BlockIntro/>
            <BlockAwardPartner/>
            <BlockFooter />
        </div>
    }

    if (page.current == PAGE.COMPLETE) {
        window.scrollTo(0,0); 
        return <CompletePage validated={false} />
    }
    
    if (page.current == PAGE.EKYC) {
        window.scrollTo(0,0); 
        return <EKYCPage {...payload} onExit={ () => {
            setPAGE(PAGE.HOME);
        }} />
    }
}

const $$FORM = css`
    margin-top: 40px;
    display: inline-block;
    width: 100%;
    padding: 16px 24px;
    border-radius: 12px;
    background-color: #ffffff;
    position: absolute;
    left: -80px;
    text-align: center;
    width: 100%;
    .line {
            background-color: #46ab00;
            height: 5px;
            position: absolute;
            top: 0px;
            left: 5px;
            border-radius: 12px;
            width: 33.333%;
            max-width: calc(100% - 10px);
            &.step-2 {
                width: 66.667%;
            }
            &.step-3 {
                width: 100%;
            }
        }

    > div.content {
        max-width: 800px;
        width: 100%;
        display: inline-block;
        z-index: 2;
        position: relative;
    }
    
    h3 {
        font-family: Montserrat;
        font-size: 32px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #00377b;
        strong {
            font-weight: 600;  
        }
    }
    .radio-wrapper {
        input {
            width: 20px !important;
            height: 20px;
            margin-top: 0 !important;
        }
        display: inline-flex;
        align-items: center;
        margin-right: 10px;
        margin-top: 5px;
    }
    
    div.form {
        display: none;
        margin-top: 10px;

        &.active {
            display: block;
        }

        h5 {
            text-align: left;
        }

        div.colspan {
            &.inactive {
                display: none;
            }

            margin-bottom: 6px;

            > .left {
                width: 50%;
                padding-right: 4px;
                display: inline-block;
            }
            > .right {
                width: 50%;
                padding-left: 4px;
                display: inline-block;
            }
        }


    }

    button {
        cursor: pointer;
        border-radius: 4px;
        padding: 8px 16px;
        color: white;
        width: 100%;
        height:  48px;
        text-transform: uppercase;
        border: 0;
        font-size: 14px;
        vertical-align: top;
    }

    button[type='next'] {
        background: #00377B;
        &.loading {
            background: repeating-linear-gradient(-45deg,#eee,#eee 20px,white 20px,white 40px);
            background-size: 56px 56px;/* This is unique for this background, need to find a pattern and develop a formula */
            background-position-x:0%;
            color: #333;
            animation: slide 8s infinite linear forwards;
        }
    }

    button[type='back'] {
        background: #666;
        margin-right: 8px;
    }

    @media screen and (max-width: 576px) {
        button {
            // width: 50%;
            margin: 0!important;
            min-width: unset;
            vertical-align: top;
        }
        button[type='back'] {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }
        button[type='next'] {
            // border-top-left-radius: 0;
            // border-bottom-left-radius: 0;
            &.loading {
                background: repeating-linear-gradient(-45deg,#eee,#eee 20px,white 20px,white 40px);
                background-size: 56px 56px;/* This is unique for this background, need to find a pattern and develop a formula */
                background-position-x:0%;
                color: #333;
                animation: slide 8s infinite linear forwards;
            }
        }
    }

    div.errors {
        margin-top: 4px;
        font-size: 0.8rem;
        color: crimson;
        li {
            padding: 4px;
        }
    }
    @media screen and (max-width: 1100px) {
        h3 {
            font-size: 25px;
        }
    }
    @media screen and (max-width: 965px) {
        margin-top: 10px;
        h3 {
            font-size: 20px;
        }
    }
    @media screen and (max-width: 850px) {
        top: -100px;
        left: unset;
        h3 {
            font-size: 30px;
        }
    }
    @media screen and (max-width: 650px) {
        top: -70px;
        left: 5%;
        width: 90%;
    }
    span.error-text {
            display: none;
            font-size: 11px;
        }
    .invalid {
        .date-input {
            text-align: left;
            input {
                margin-bottom: -5px;
            }
            span.error-text {
                display: block;
            }
        }
    }
    .group-type {
        display: inline-flex;
    }
    @media screen and (max-width: 460px) {
        .group-type {
            display: flex;
            justify-content: space-around
        }
    }
    
`

function Form ({ onComplete }) {
    let [stageNo, setStageNo] = useState(1);

    let [errors, setErrors]= useState([]);

    
    let [error, setError]= useState(null);

    let [isLoading, setLoading] = useState(false);

    let [otpSuccess, setOtpSuccess] = useState(false);
    
    let [userInputPayload, setUserInputPayload] = useState(null);
    
    const {state, dispatch} = useContext(builtContext);

    const ref = useRef();

    function $_dot(no){
        return stageNo > no ? "complete" : stageNo == no ? "active" : false;
    }

    function handleHistory (event) {
        const state = event.state;
        if (state) {
            setStageNo(state)
        }
    }

    useLayoutEffect( () => {
        window.addEventListener("popstate", handleHistory)
        return () => window.removeEventListener("popstate", handleHistory)
    })

    function onAccept() {
        setStageNo(1);
        dispatch({ type: "message", data: null })
    }
 
    function onCancel() {

    }
    function onReady() {
        onComplete({
            draftId: getCookie('draft_id'),
            userInput: userInputPayload
        });
    }
    function onConfirmOTPSuccess() {
        dispatch({ type: "message", data: null });
        setOtpSuccess(true);
    }
    function showModalOtp(payload) {
        setUserInputPayload(payload);
        dispatch({ type: "message", data: { type: "custom", className: 'otp', iconClose: true, text: <ConfirmOTP payload={payload} phone={payload.phone} onSuccess={() => onConfirmOTPSuccess()} />, onAccept, onCancel } });
    }
    function nextForm () {
        if (stageNo == 3) {
            return submit();
        }
        // setStageNo(stageNo + 1);
        // return;

        setError(null);
        let form = ref.current.querySelector('div.form.active');
        let inputs = form.querySelectorAll("input:not(:disabled)");
        let textareas = form.querySelectorAll("textarea");
        let dropdowns = form.querySelectorAll("div[data-type='dropdown-input']");
        let dateInputs = form.querySelectorAll("div[data-type='date-input']");
        let capchaInputs = form.querySelectorAll("p[data-type='capcha-input']");

        let _all_valid = true;
        let error;
        let nextErrors = [];

        dateInputs.forEach( d => {
            let isRequire = d.getAttribute("data-required")
            isRequire = (isRequire == "" || isRequire == "true" || isRequire == true) ? true : false;
            let value = d.getAttribute("data-value");
            
            if (isRequire && value.trim() == "" || value.match(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/) == null) {
                d.parentNode.style.color = "crimson"
                _all_valid = false;
                d.style.border = "1px solid crimson";
                if (!d.parentNode.classList.contains('invalid')) {
                    d.parentNode.classList.add("invalid");
                }
                if (error == null) {
                    error = d;
                }
            }
            else {
                d.parentNode.style.color = ""
                d.style.border = "";
                d.parentNode.classList.remove("invalid");
            }
            
            for (let i in d.attributes) {
                if (d.attributes[i].name && d.attributes[i].name.startsWith("data-valid-")) {
                    if (d.attributes[i].value == "false") {
                        _all_valid = false;
                        d.style.border = "1px solid crimson";
                        d.classList.add("invalid");
                        if (error == null) {
                            error = d;
                        }
                        if (nextErrors.findIndex( e => e.code == 300) < 0) {
                            nextErrors.push({ code: 300, message: "Bạn không đủ 18 tuổi để tham gia!" })
                            // setErrors([...errors, { code: 300, message: "Bạn không đủ 18 tuổi để tham gia!" }])
                        } 
                    } else {
                        nextErrors = nextErrors.filter( e => e.code != 300)
                        // setErrors([...errors])
                    }
                }
            }

        })

        inputs.forEach( i => {
            let isRequire = i.getAttribute("required")
            isRequire = (isRequire == "" || isRequire == "true" || isRequire == true) ? true : false;
            let type = i.getAttribute("type");
            let name = i.getAttribute("name");
            let minlength = i.getAttribute("data-minlength");
            let _is_valid = true;
            if (type== "file") {
                if (isRequire && i.files[0] == null) {
                    _all_valid = false;
                    i.parentNode.style.border = "1px solid crimson";
                    if (error == null) {
                        error = i.parentNode;
                    }
                } else {
                    i.parentNode.style.border = "";
                }
            } else {

                if (isRequire && i.value.trim() == "") {
                    _all_valid = false;
                    _is_valid = false;
                    i.parentNode.style.color = "crimson";
                    if (!i.parentNode.classList.contains('invalid')) {
                        i.parentNode.classList.toggle("invalid");
                    }
                    i.style.border = "1px solid crimson";
                    if (error == null) {
                        error = i.parentNode;
                    }
                    if (nextErrors.findIndex( e => e.code == 400) < 0) {
                        nextErrors.push({ code: 400, message: "Vui lòng nhập " + i.placeholder })
                    } 
                }

                if (minlength != null && i.value.trim().length < parseInt(minlength)){
                    _all_valid = false;
                    _is_valid = false;
                    i.parentNode.style.color = "crimson"
                    i.style.border = "1px solid crimson";
                    if (!i.parentNode.classList.contains('invalid')) {
                        i.parentNode.classList.add("invalid");
                    }
                    if (error == null) {
                        error = i.parentNode;
                    }

                    if (nextErrors.findIndex( e => e.code == 400) < 0) {
                        nextErrors.push({ code: 400, message: "Phone ít nhất phải có 4 số" })
                    } 
                } 

                if ( _is_valid ) {
                    if (i.parentNode) {
                        i.parentNode.style.color = "";
                        i.parentNode.classList.remove("invalid");
                    }
                    i.style.border = ""
                }
                
                if (_all_valid) {
                    if (i.parentNode) {
                        i.parentNode.style.color = "";
                        i.parentNode.classList.remove("invaid");
                    }
                    i.style.border = ""
                }
                
                if (type == "email" && i.value.trim().length) {
                    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                    console.log(i.value)
                    if (!re.test(i.value.trim().toLowerCase())) {
                        _all_valid = false;
                        i.style.border = "1px solid crimson";
                        if (i.parentNode) {
                            i.parentNode.style.color = "crimson"
                            i.parentNode.classList.add("invalid");
                        }
                        if (error == null) {
                            error = i;
                        }
                        if (nextErrors.findIndex( e => e.code == 100) < 0) {
                            nextErrors.push({ code: 100, message: "Email sai định dạng" })
                        }
                    } else {
                        nextErrors = nextErrors.filter( e => e.code != 100);
                        if (i.parentNode) {
                            i.parentNode.style.color = ""
                            i.parentNode.classList.remove("invalid");
                        }
                    }
                } 
                if (name == 'phone' && i.value.trim().length) {
                    let validPhone = /^\s*(\+?\b0{0,1}[3|5|7|8|9][0-9]{8}?)*$/gm.test(i.value.trim());
                    if (validPhone) {
                        if (i.parentNode) {
                            i.parentNode.style.color = ""
                            i.parentNode.classList.remove("invalid");
                        }
                    } else {
                        i.style.border = "1px solid crimson";
                        if (i.parentNode) {
                            i.parentNode.style.color = "crimson"
                            i.parentNode.classList.add("invalid");
                        }
                    }
                }

            }
        })

        textareas.forEach( t => {
            let isRequire = t.getAttribute("required")
            isRequire = (isRequire == "" || isRequire == "true" || isRequire == true) ? true : false;
            if (isRequire && t.value.trim() == "") {
                _all_valid = false;
                t.parentNode.style.color = "crimson"
                t.style.border = "1px solid crimson";
                if (error == null) {
                    error = t.parentNode;
                }
            } else {
                t.parentNode.style.color = ""
                t.style.border = ""
            }
        })

        dropdowns.forEach( d => {
            let isRequire = d.getAttribute("data-required")
            isRequire = (isRequire == "" || isRequire == "true" || isRequire == true) ? true : false;
            let value = d.getAttribute("data-value")
            if (isRequire && value.trim() == "") {
                _all_valid = false;
                d.style.border = "1px solid crimson";
                if (error == null) {
                    error = d;
                }
            } else {
                d.style.border = ""
            }
        })

        capchaInputs.forEach( c => {
            let isRequire = c.getAttribute("data-required")
            isRequire = (isRequire == "" || isRequire == "true" || isRequire == true) ? true : false;
            let value = c.getAttribute("data-value");

            if (isRequire && value == null) {
                _all_valid = false;
                c.style.color = "crimson"
                // c.style.border = "1px solid crimson"
                if (error == null) {
                    error = c;
                }

                if (nextErrors.findIndex( e => e.code == 200) < 0) {
                    nextErrors.push({ code: 200, message: `Vui lòng hãy chọn chọn vào ô "Tôi không phải là người máy"` })
                }
            } else {
                nextErrors = nextErrors.filter( e => e.code != 200)
                c.style.color = ""
                c.style.border = ""
            }

        })

        if (_all_valid == true) {
            if (stageNo == 1) {
                submit();
            } else {
        
                // if (stageNo == 2) {
                //     return onCheckIdNumber();
                // }
                setErrors([])
                setStageNo(stageNo + 1);
                                
                window.scrollTo({
                    top: document.getElementById("_form").scrollIntoView({ behavior: 'smooth' }), behavior: 'smooth'
                })
            }
        } else {
            
            setErrors([...nextErrors])
            if (error){
                const y = error.getBoundingClientRect().top + window.scrollY;
                window.scroll({
                    top: y - 80,
                    behavior: 'smooth'
                });
            }
        }

        window.history.pushState(stageNo, document.title, window.location.pathname)
    }

    function previousForm () {
        setStageNo(stageNo - 1)
    }
    async function onCheckIdNumber() {
        let idNumberRef = document.querySelectorAll("input[name='id_number']");
        let nationalId = null;
        idNumberRef.forEach(d => {
            nationalId = d.value;
        })
        const response = await fetch('https://rest.vcsc.com.vn/api/v1/equity/account/checkNationalId', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            // credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({ nationalId }),
            rejectUnauthorized: false
        });
        let err = [];
        if (response.status != 200) {
            idNumberRef.forEach(i => {
                i.parentNode.style.color = "crimson"
                i.style.border = "1px solid crimson";
                err = [{
                   code: 700,
                   message: "Giấy tờ tùy thân này đã được đăng ký trước đó" 
                }]
            })
        } else {
            idNumberRef.forEach(i => {
                i.parentNode.style.color = "inherit;"
                i.style.border = "1px solid #e3e5ec";
            });
            setStageNo(3)
        }
        setErrors([...err])
        // return x;
    }

    function onSendMail() {
        let emailDom = ref.current.querySelector('input[type="email"]');
        let value;
        if (emailDom) {
            value = emailDom.value
        }
        postAPI("v1/validate/resend", { email: value });
        grecaptcha.reset();
        onAccept();
    }
    async function submit () {
        
        // showModalOtp({phone: '0383133822', key: '121212', draftId: '1212121'});
        // return;
        setLoading(true);
        let form = ref.current.querySelectorAll('div.form');
        let inputs = [];
        let textareas = [];
        let dropdowns = [];
        
        let payload = {};

        form.forEach( f => {
            inputs = [ ...inputs, ...f.querySelectorAll("input:not(:disabled)")];
            let _inputs = f.querySelectorAll("input:not(:disabled)");

            _inputs.forEach( i => {
                if (["email", "phone", "text", "number"].includes(i.type)){
                    payload[i.getAttribute("name")] = i.value;
                }

                if (["file"].includes(i.type)) {
                    if (payload[i.getAttribute("name")] == null) {
                        payload[i.getAttribute("name")] = [];
                    }
                    payload[i.getAttribute("name")].push(i.files[0]);
                }

                if (["radio"].includes(i.type)) {
                    payload[i.getAttribute("name")] = i.getAttribute(`data-value`);
                }
            })
        });

        form.forEach( f => {
            textareas = [ ...textareas, ...f.querySelectorAll("textarea")];
            let _inputs = f.querySelectorAll("textarea");
            _inputs.forEach( i => {
                if (["text"].includes(i.getAttribute("type"))){
                    payload[i.getAttribute("name")] = i.value;
                }
            })
        });

        form.forEach( f => {
            dropdowns = [ ...dropdowns, ...f.querySelectorAll("div[data-type='dropdown-input']")];
            let _inputs = f.querySelectorAll("div[data-type='dropdown-input']");

            _inputs.forEach( i => {
                payload[i.getAttribute("name")] = i.getAttribute("data-value");
            })
        });
        
        form.forEach( f => {
            let _inputs = f.querySelectorAll("div[data-type='date-input']");
            _inputs.forEach( i => {
                let name = i.getAttribute("data-name");
                payload[name] = i.getAttribute("data-value");
            })
        })

        form.forEach( f => {
            let _inputs = f.querySelectorAll("span[data-type='checkbox-input']");

            _inputs.forEach( f => {
                let name = f.getAttribute("data-name");
                let isChecked = f.getAttribute("data-check");
                isChecked = (isChecked == "false" || isChecked == null || isChecked == false) ? false : true
                payload[name] = isChecked;
            })
            
        })

        form.forEach( f => {
            let _input = f.querySelector("p[data-type='capcha-input']");
            if (_input) {
                payload["capcha"] = _input.getAttribute("data-value");
            }
        })
        delete payload.null;

        let result = await postAPI("v1/register/step-1", null, JSON.stringify(payload), {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         });
        if (result && result.status == 200) {
            payload = {
                ...payload,
                ...result.data
            };
            showModalOtp(payload);
            setCookie('draft_id', result.data.draft_id);
        } else if (result && result.status == 422) {
            dispatch({ type: "message", data: { type: "fail", text: <FailMessage status="422" data={result.errors} />, onAccept, onCancel } })
        } else if (result && result.status == 403) {
            setError(result.message);
        } else {
            dispatch({ type: "message", data: { type: "fail", text: <FailMessage status={result.status} />, onAccept, onCancel } })
        }

        setLoading(false)
    }

    return <div className={$$FORM} ref={ref} id="_form">
            {
            
                otpSuccess ? <EKYCReady onContact={_ => setOtpSuccess(false)} onReady={() => onReady()} /> : 
                <div>

                    <div className="content">
                        <h3>
                            Thao tác đơn giản <br/> <strong>Nhận ngay tài khoản</strong> 
                        </h3> 

                        <div className={$_('form', stageNo==1&&"active")}>
                            <Form_1 error={error} nextForm={nextForm} loading={isLoading}/>
                        </div>
                    </div>
                </div>
            }
    </div>
}

function Form_1 ({ nextForm, loading, error }) {
    let [errorMsgPhone, setErrorMsgPhone] = useState("Vui lòng nhập số điện thoại")
    let [groupType, setGroupType] = useState('individual');
    function validatePhone(evt) {
        var theEvent = evt || window.event;
        
        // Handle paste
        if (theEvent.type === 'paste') {
            key = event.clipboardData.getData('text/plain');
        } else {
        // Handle key press
            var key = theEvent.keyCode || theEvent.which;
            key = String.fromCharCode(key);
        }
        var regex = /[0-9]|\./;
        if( !regex.test(key) ) {
            theEvent.returnValue = false;
            if(theEvent.preventDefault) theEvent.preventDefault();
        }
    }
    function onChangePhone(v) {
        if (v) {
            setErrorMsgPhone("Số điện thoại không hợp lệ");
        } else {
            setErrorMsgPhone("Vui lòng nhập số điện thoại");
        }
    }
    return <>
        <div className="row" >
            <div className="col-6">
                <Dropdown heading="Quốc tịch" className="dropdown" name="country" data={[{ text: "Việt Nam", value: "VIETNAM" }]} value="VIETNAM" required={true}/>
            </div>
            <div className="col-6 group-type">
                <label className="radio-wrapper"><input type="radio" name="type" onChange={e => setGroupType(e.target.value)} checked={groupType === 'individual'} value="individual" /> Cá nhân</label>
                <label className="radio-wrapper"><input type="radio" name="type" onChange={e => setGroupType(e.target.value)} checked={groupType === 'corp'} value="corp" /> Tổ chức</label>
            </div>
        </div>
        <div className="row" style="margin-bottom: 8px">
            <div className="col-3">
                <Dropdown className="dropdown" name="sex" data={[{ text: "Ông", value: "MALE" }, { text: "Bà", value: "FEMALE" }]} value="MALE" required={true}/>
            </div>
            <div className="col-9">
                <Input label="Họ và tên" name="name" required={true} type="text" placeHolder="Họ và tên" />
            </div>
        </div>
        <div className="row">
            <div className="col-6">
                <Input label="Số điện thoại"
                 name="phone"
                 required={true}
                 type="number"
                 placeHolder="Số điện thoại"
                 errorMsg={errorMsgPhone}
                 onChange={e => onChangePhone(e.target.value)}
                 onKeyPress={validatePhone}
                data-minlength="4" />
            </div>
            <div className="col-6">
                <Input label="Email" name="email" type="email" required={true} placeHolder="Email" />
            </div>
        </div>

        <div className="row">
            <div className="col-6">
                <Dropdown heading="Phòng giao dịch" className="dropdown" name="brand" data={[{ text: "Hồ Chí Minh", value: "HOCHIMINH" }, { text: "Hà Nội", value: "HANOI" }]} value="HOCHIMINH" required={true}/>
            
                {/* <Input label="Địa chỉ" type="text" name="address" required={true} placeHolder="Địa chỉ" /> */}
            </div>
            <div className="col-6">
                <Input label="Môi giới liên hệ" name="ref" type="text" placeHolder="Môi giới liên hệ (nếu có)" />
            </div>
        </div>

        <div className="row">
            <div className="col-12">
                { error ? <p style="color: crimson; font-size: 13px;">{error}</p> : null }
                <VCIButton className="btn-open primary" loading={loading} onClick={nextForm}>MỞ TÀI KHOẢN NGAY</VCIButton>
                {/* <button disabled={loading} className="btn-open" type="next" onClick={nextForm}>MỞ TÀI KHOẢN NGAY</button> */}
            </div>
        </div>
    </>
}

// function Form_2 ({ previousForm, nextForm }) {
//     let [pageType, setPaperType] = useState("CMND")

//     return <>
//         <div className="row">
//             <div className="col-6">
//                 <DateInput heading="Ngày sinh" placeholder="Ngày sinh" className="date-input" name="dob" required={true} />
//             </div>
//             <div className="col-6">
//                 <Dropdown heading="Nơi Sinh" className="dropdown" name="birth_place" value={'79'} data={DataLocations} item_height="36">
//                     <span style="color: #999999">
//                         Nơi Sinh
//                     </span>
//                 </Dropdown>
//             </div>
//         </div>
//         <div className="row" style="margin-top: 8px">
//             <div className="col-12">
//                 <Dropdown 
//                     className="dropdown"
//                      name="id_type"
//                      heading="Giấy tờ tùy thân"
//                       data={[{value: 'CMND', text: 'Chứng minh nhân dân'}, {value: 'CCCD', text: 'Căn cước công dân'}]}
//                        value={pageType}
//                        dispatch={(e) => setPaperType(e.value)}
//                          />
//             </div>
//         </div>
//         <div className="row">
//             <div className="col-6">
//                 <Input label={'Số ' + pageType} name="id_number" required={true} type="text" placeholder={'Số ' + pageType} />
//             </div>
//             <div className="col-6">
//                 <DateInput heading="Ngày cấp" placeHolder="Ngày cấp" className="date-input" name="id_issue_date" required={true} />
//             </div>
//         </div>
        
//         <div className="row">
//             <div className="col-12">
//                 <Dropdown heading="Nơi cấp" className="dropdown" name="id_issue_place" data={DataLocations} value={'79'} item_height="36">
//                     <span style="color: #999999">
//                         Nơi cấp
//                     </span>
//                 </Dropdown>
//             </div>
//         </div>

//         <div className="row" style="margin-top: 10px">
//             <div className="col-6 mw-50">
//                 <button type="back" onClick={previousForm}>Quay Lại</button>
//             </div>
//             <div className="col-6 mw-50">
//              <button type="next" onClick={nextForm}>Tiếp Tục</button>
//             </div>
//         </div>
//     </>
// }

// const $$FORM_3 = css`
//     text-align: left;
//     width: 100%;
//     margin-bottom: 48px;

//     p.checkbox {
//         line-height: 22px;
//         vertical-align: middle;
//         > span {
//             vertical-align: top;
//             margin-right: 4px;
//         }
//     }
// `

// function Form_3 ({ previousForm, nextForm, active, isLoading }) {
//     const [isBankChecked, setBackChecked] = useState(false);
//     // // let capchaRef = useRef();
//     // let [capcha, setCapcha] = useState(null);
//     let [banks, setBanks] = useState([])

//     // window.__onloadCapchaCallback = function(){
//     //     if (active && capcha == null && !window.__grecaptcha) {
//     //         window.__grecaptcha = grecaptcha
//     //         grecaptcha.render(capchaRef.current, {
//     //             'sitekey' : '6LdoB7IZAAAAAOz5nWzr_5guw0z2X5_d_7AIGRf_',
//     //             'callback' : capchaVerifiedCallBack,
//     //             'hl': "vi"
//     //         });
//     //     }
//     // }

//     // function capchaVerifiedCallBack(response) {
//     //     setCapcha(response.toString());
//     //     capchaRef.current.setAttribute("data-value", response.toString())
//     // }

//     // useLayoutEffect(() => {
//     //     if (active && capcha == null) {
//     //         let script = document.createElement("script");
//     //         script.src = `https://www.google.com/recaptcha/api.js?onload=__onloadCapchaCallback&render=explicit`
//     //         document.body.appendChild(script);
//     //     }
//     // })
//     useEffect(() => {
//         const fetchBanks = async () => {
//             try {
//                 let url = new window.URL(`${HOST}/v1/banks`);
//                 // let url = `http://10.11.0.113:5002/v1/banks`;

//                 const response = await fetch(url, {
//                     method: 'GET',
//                     mode: 'cors',
//                     cache: 'no-cache',
//                     headers: {
//                         // 'Content-Type': 'multipart/form-data;',
//                     },
//                     referrerPolicy: 'no-referrer',
//                 });
        
//                 let result = await response.json();
//                 console.log(result)
//                 setBanks(result);
//             } catch (error) {
//             }
//         };
     
//         fetchBanks();
//       }, []);
//     function submit (e) {
//         nextForm(e)
//     }

//     return <>
//         <div className={$_("colspan", $$FORM_3)} style="padding: 0 6px;">
//             <p className="checkbox"><CheckBox onCheck={setBackChecked} name="allow_banking" /> Đăng ký Tài khoản ngân hàng</p>
            
//             <div style="margin-left: -5px;" className={$_("colspan", isBankChecked ? "active" : "inactive")}>
//                 <div className="row">
//                     <div className="col-12">
//                         <Input label="Số tài khoản Ngân hàng" placeholder="Số tài khoản Ngân hàng" type="text" name="bank_account" required={true} disabled={isBankChecked == false} />
//                     </div>
//                 </div>
//             </div>

//             <div style="margin-left: -5px;" className={$_("colspan", isBankChecked ? "active" : "inactive")}>
//                 <div className="row">
//                     <div className="col-6">
//                     <Dropdown isSearch={true} heading="Ngân hàng" className="dropdown" name="bank_brand" data={banks} value={'79323001'} item_height="36">
//                         <span style="color: #999999">
//                             Ngân hàng
//                         </span>
//                     </Dropdown>
// {/* <p>{banks.length}</p> */}
//                         {/* <Input label="Ngân hàng" placeholder="Ngân hàng" type="text" name="bank_brand" required={true} disabled={isBankChecked == false} /> */}
//                     </div>
//                     <div className="col-6">
//                         <Input label="Chi nhánh" placeholder="Chi nhánh" type="text" name="bank_brand_region" required={true} disabled={isBankChecked == false} />
//                     </div>
//                 </div>
//             </div>

//             <p className="checkbox"><CheckBox name="allow_margin_trade" /> Đăng ký Giao dịch ký quỹ (Margin)</p>
//             <p className="checkbox"><CheckBox name="allow_derivative_trade" /> Đăng ký Giao dịch chứng khoán Phái sinh</p>
//             {/* <div className="colspan">
//                 <div className="input">
//                     <p data-type="capcha-input" ref={capchaRef} data-required={true}/>
//                 </div>
//             </div> */}
//         </div>
//         <div className="row" style="margin-top: 10px">
//             <div className="col-6 mw-50">
//                 <button type="back" onClick={previousForm}>Quay Lại</button>
//             </div>
//             <div className="col-6 mw-50">
//              { isLoading == false && <button type="next" onClick={submit}>Hoàn tất</button> }
//             { isLoading == true && <button type="next" className="loading"></button> }
//             </div>
//         </div>
//     </>
// }

// function Form_4 ({ previousForm, nextForm, active, isLoading }) {

//     let capchaRef = useRef();
//     let [capcha, setCapcha] = useState(null);

//     window.__onloadCapchaCallback = function(){
//         window.__grecaptcha = grecaptcha
//         grecaptcha.render(capchaRef.current, {
//             'sitekey' : '6LdoB7IZAAAAAOz5nWzr_5guw0z2X5_d_7AIGRf_',
//             'callback' : capchaVerifiedCallBack,
//             'hl': "vi"
//         });
//     }

//     function capchaVerifiedCallBack(response) {
//         capchaRef.current.setAttribute("data-value", response.toString())
//     }

//     useLayoutEffect(() => {
//         if (active && capcha == null) {
//             let script = document.createElement("script");
//             script.src = `https://www.google.com/recaptcha/api.js?onload=__onloadCapchaCallback&render=explicit`
//             document.body.appendChild(script);
//         }
//     })

//     function submit (e) {
//         nextForm(e)
//     }

//     return <>
//         <div className={$_("colspan", $$FORM_3)}>            
//             <div className="colspan">
//                 <div className="input">
//                     <h5>Yêu cầu đặc biệt</h5>
//                     <textarea name="requests" type="text" placeHolder="Nhập yêu cầu đặc biệt" />
//                 </div>
//             </div>
//             <div className="colspan">
//                 <div className="input">
//                     <p data-type="capcha-input" ref={capchaRef} data-required={true}/>
//                 </div>
//             </div>
//         </div>

//         <div className="colspan">
//             <button type="back" onClick={previousForm}>Quay Lại</button>
//             { isLoading == false && <button type="next" onClick={submit}>Tiếp Tục</button> }
//             { isLoading == true && <button type="next" className="loading"></button> }
//         </div>
//     </>
// }
