
import { h  } from 'preact';

import { useEffect, useState, useRef } from 'preact/hooks'

import { css } from 'emotion';

import {  $_, Input, Textarea, Dropdown } from 'root/_components';

const CSS$ = css`
    max-width: 528px;
    .body {
        position: relative;
        text-align: left;
        .card {
            background: #FFFFFF;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.03);
            border-radius: 6px;
            padding: 24px;
            h6 { 
                font-family: Montserrat;
                font-style: normal;
                font-weight: 500;
                font-size: 18px;
                line-height: 16px;
                margin-bottom: 20px;
            }
            &:nth-child(2) {
                margin: 20px 0;
            }
            .row {
                margin-bottom: 16px;
            }
        }
        
    }
    
`;

export function EKYCConfirmInfo({isSubmit, userData, onSuccess}) {
    const { country, sex, email, phone, hoVaTen, namSinh, loaiCmt, soCmt, ngayCap, noiCap, noiTru, address } = userData;
    
    // Check if CMND can edit gender, then no edit
    let isCanEditGender = loaiCmt.includes('old');
    let typeIssue = isCanEditGender ? 'Chứng minh nhân dân' : 'Căn cước công dân';

    const ref = useRef();
    const [emailInput, setEmailInput] = useState(email);
    let [errorMsgEmail, setErrorMsgEmail] = useState('Vui lòng nhập Email');
    
    let [errorMsgAddress, setErrorMsgAddress] = useState('Vui lòng nhập địa chỉ liên hệ');
    const [genderInput, setGenderInput] = useState(sex);
    const [contactInput, setContactInput] = useState(address ? address : noiTru);
    
    useEffect(() => {
        if (isSubmit < 1) return;

        let data = { 
            ...userData,
            email: emailInput,
            gender: genderInput,
            sex: genderInput,
            address: contactInput
        };
        if (validate()) {
            onSuccess(data);
        }
    }, [isSubmit]);

    function onChangeEmail(v) {
        let i = v.target;
        let e = i.value.trim();
        setEmailInput(e);
        if (e) {
            if (!checkIsEmail(e)) {
                setErrorMsgEmail('Email không đúng định dạng');
                i.style.border = "1px solid crimson";
                if (i.parentNode) {
                    i.parentNode.style.color = "crimson"
                    i.parentNode.classList.add("invalid");
                }
            } else {
                i.style.border = "";
                if (i.parentNode) {
                    i.parentNode.style.color = ""
                    i.parentNode.classList.remove("invalid");
                }
            }
        } else {
            setErrorMsgEmail('Vui lòng nhập Email');
            i.style.border = "1px solid crimson";
            if (i.parentNode) {
                i.parentNode.style.color = "crimson"
                i.parentNode.classList.add("invalid");
            }
        }
    }
    function onChangeAddress(v) {
        let i = v.target;
        let e = i.value.trim();
        setContactInput(e);
        if (e) {
            if (e.length > 0 && e.length < 16) {
                setErrorMsgAddress('Vui lòng ghi đầy đủ, chi tiết Địa chỉ liên hệ của Quý khách');
                i.style.border = "1px solid crimson";
                if (i.parentNode) {
                    i.parentNode.style.color = "crimson"
                    i.parentNode.classList.add("invalid");
                }
            } else {
                i.style.border = "";
                if (i.parentNode) {
                    i.parentNode.style.color = ""
                    i.parentNode.classList.remove("invalid");
                }
            }
        } else {
            setErrorMsgAddress('Vui lòng nhập địa chỉ liên hệ');
            i.style.border = "1px solid crimson";
            if (i.parentNode) {
                i.parentNode.style.color = "crimson"
                i.parentNode.classList.add("invalid");
            }
        }
    }
    function validate() {
        let form = ref.current.querySelector('div.form');
        let inputs = form.querySelectorAll("input:not(:disabled)");
        let textareas = form.querySelectorAll("textarea");

        let _all_valid = true;
        let error;
        let nextErrors = [];

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
                    if (!checkIsEmail(i.value)) {
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
            
            let minlength = t.getAttribute("data-minlength");
            isRequire = (isRequire == "" || isRequire == "true" || isRequire == true) ? true : false;
            
            if (isRequire && t.value.trim() == "") {
                _all_valid = false;
                t.parentNode.style.color = "crimson"
                t.style.border = "1px solid crimson";
                t.parentNode.classList.add("invalid");
                if (error == null) {
                    error = t.parentNode;
                }
            } else {
                console.log(minlength);
                if (minlength != null && t.value.trim().length < parseInt(minlength)){
                    _all_valid = false;
                    t.parentNode.style.color = "crimson"
                    t.style.border = "1px solid crimson";
                    if (!t.parentNode.classList.contains('invalid')) {
                        t.parentNode.classList.add("invalid");
                    }
                    if (error == null) {
                        error = t.parentNode;
                    }
                } else {
                    t.parentNode.style.color = ""
                    t.style.border = "";
                    t.parentNode.classList.remove("invalid");
                }
            }
            
        })
        if (_all_valid == true) {
            return true;
        } else {
            if (error){
                const y = error.getBoundingClientRect().top + window.scrollY;
                window.scroll({
                    top: y - 80,
                    behavior: 'smooth'
                });
            }
            return false;
        }
    }
    function checkIsEmail(v) {
        const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return re.test(v.trim().toLowerCase());
    }
    return <div className={CSS$} ref={ref} id="_form">
        <h5 className="title">
            Xác thực thông tin
        </h5>
        <div className="description">
            <p>Vui lòng kiểm tra và bổ sung thông tin cá nhân</p>
        </div>

        <div className="body form">
            <div className="card">
                <h6>Thông tin cá nhân</h6>
                <div className="row">
                    <div className="col-6">
                        <Input icon={true} disabled={true} type="text" label="Họ và tên" isBootstrap={true} value={hoVaTen} />
                    </div>
                    <div className="col-6">
                        <Input icon={true} disabled={true} type="text" label="Quốc tịch" isBootstrap={true} value={country == 'VIETNAM' ? 'Việt Nam' : 'Khác'} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        {isCanEditGender ? 
                            <Dropdown dispatch={e => setGenderInput(e.value)} isBootstrap={true} heading="Giới tính" className="dropdown" name="sex" data={[{ text: "Nam", value: "MALE" }, { text: "Nữ", value: "FEMALE" }]} value={sex} required={true}/>
                                :
                            <Input icon={true} disabled={true} type="text" label="Giới tính" isBootstrap={true} value={sex == 'MALE' ? 'Nam' : 'Nữ'} />
                        }
                    </div>
                    <div className="col-6">
                        <Input icon={true} disabled={true} type="text" label="Ngày sinh" isBootstrap={true} value={namSinh} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <Input icon={true} disabled={true} type="text" label="Giấy tờ tùy thân" isBootstrap={true} value={typeIssue} />
                    </div>
                    <div className="col-6">
                        <Input icon={true} disabled={true} type="text" label="Số CMND/CCCD" isBootstrap={true} value={soCmt} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <Input icon={true} disabled={true} type="text" label="Ngày cấp" isBootstrap={true} value={ngayCap} />
                    </div>
                    <div className="col-6">
                        <Input style="padding-right: 26px" icon={true} disabled={true} type="text" label="Nơi cấp" isBootstrap={true} value={noiCap} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Textarea icon={true} disabled={true} type="text" label="Địa chỉ thường trú" isBootstrap={true} value={noiTru} />
                    </div>
                </div>
            </div>

            <div className="card">
                <h6>Thông tin liên hệ</h6>
                <div className="row">
                    <div className="col-12">
                        <Textarea 
                            data-minlength={15}
                            errorMsg={errorMsgAddress} required={true} type="text" label="Địa chỉ liên hệ" isBootstrap={true} value={contactInput} onChange={e => onChangeAddress(e)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <Input disabled={true} type="text" label="Số điện thoại" isBootstrap={true} value={phone} />
                    </div>
                    <div className="col-6">
                        <Input type="email"
                         required={true}
                          label="Email"
                           isBootstrap={true}
                            errorMsg={errorMsgEmail}
                            onChange={e => onChangeEmail(e)}
                            value={emailInput}
                              />
                    </div>
                </div>
            </div>
        </div>
    </div>

}