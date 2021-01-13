
import { h  } from 'preact';

import { useEffect, useState, useContext, useRef } from 'preact/hooks'

import { builtContext } from 'root/_context'

import { css } from 'emotion';

import {  $_, Input, CheckBox, Dropdown } from 'root/_components';

import { fetchData, postData } from './core';

import { SuccessMessage } from 'root/shared/alert';

const CSS$ = css`
    max-width: 528px;
    font-size: 15px;
    .body {
        position: relative;
        text-align: left;
        margin-top: 16px;
        .card {
            background: #FFFFFF;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.03);
            border-radius: 6px;
            padding: 16px 24px;
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
            .font-bold {
                font-weight: 600;
            }
            a {color: #00377B}
        }
        p.checkbox {
            line-height: 22px;
            vertical-align: middle;
            > span {
                vertical-align: top;
                margin-right: 4px;
            }
        }
        .bank-wrapper {
            margin-top: 24px;
        }
        p {
            line-height: 24px;
        }
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
`;

export function EKYCRegisterService({isSubmit, draftId, userData, onSuccess, onLoading}) {
    const {dispatch} = useContext(builtContext);

    const branchDropdownRef = useRef(null);

    const boxAgree = useRef();

    const [agree, setAgree] = useState(false);

    let [bankChecked, setBankChecked] = useState(false);

    let [states, setStates] = useState({
        allow_banking: false,
        allow_margin_trade: false,
        allow_derivative_trade: false,
        bank_account: null,
        bank_brand: null
    });

    let [banks, setBanks] = useState([]);
    
    let [branches, setBranches] = useState([]);

    useEffect(() => {
        const fetchBanks = async () => {
            let result = await fetchData('v1/banks');
            if (result) {
                setBanks(result);
            }
        };
        fetchBanks();
    }, []);

    async function getBranchesByBank(bankCode) {
        let result = await fetchData(`v1/bank/${bankCode}/branches`);
        if (result) {
            setBranches(result);
            branchDropdownRef.current.base.click()
        }
    }
    function onAccept() {
        dispatch({ type: "message", data: null })
        onSuccess();
    }

    useEffect(async () => {
        if (isSubmit < 1) return;
        let { 
            allow_banking,
            bank_account,
            bank_brand
        } =  states;
        
        if (allow_banking) {
            if (!bank_account || !bank_brand) {
                alert('Vui lòng nhập thông tin tài khoản ngân hàng');
                return;
            }
        }
        if (!agree) {
            const y = document.getElementById("agree-checkbox").getBoundingClientRect().top + window.scrollY;
                window.scroll({
                    top: y - 280,
                    behavior: 'smooth'
                });
            boxAgree.current.base.style = 'border-color: #c42127';
            return;
        } else {
            boxAgree.current.base.style = 'border-color: #bbb';
        }
        let body = {
            ...userData,
            ...states,
            draftId
        }
        onLoading(true);

        let result = await postData('v3/register', body);
        onLoading(false);
        if (result && result.status == 200) {
            dispatch({ type: "message", data: { type: "ok", text: <SuccessMessage />, onAccept } });
        }
    }, [isSubmit]);

    async function onChangeBank(e) {
        await getBranchesByBank(e.value);
    }
    function onCheckBox(e, key) {
        let cpStates = states;
        if (key == 'allow_banking') {
            setBankChecked(e);
            if (!e) {
                cpStates.bank_account = null;
                cpStates.bank_brand = null;
            }
        }
        cpStates[key] = e;
        setStates(cpStates);
    }
    function onChangeBranch(e) {
        let cpStates = states;
        cpStates.bank_brand = e.value;
        setStates(cpStates);
    }
    function onChangeInput(e) {
        let cpStates = states;
        cpStates.bank_account = e.target.value;
        setStates(cpStates);
    }
    return <div className={CSS$}>
        <h5 className="title">
            Đăng ký dịch vụ và tài khoản
        </h5>

        <div className="body">
            <div className="card">
                
            <p className="checkbox"><CheckBox checked={true} disabled={true} /> Đăng ký Giao dịch CK cơ sở</p>
                <p className="checkbox"><CheckBox onCheck={e => onCheckBox(e, 'allow_margin_trade')} /> Đăng ký Giao dịch ký quỹ (Margin)</p>
                <p className="checkbox"><CheckBox onCheck={e => onCheckBox(e, 'allow_derivative_trade')} /> Đăng ký Giao dịch CK phái sinh</p>
                <p className="checkbox"><CheckBox onCheck={e => onCheckBox(e, 'allow_banking')} /> Đăng ký Tài khoản ngân hàng nhận chuyển khoản</p>
                { !bankChecked ? null : 
                
                    <div className="bank-wrapper">
                        <div className="row">
                            <div className="col-6">
                                <Input onChange={e => onChangeInput(e)} label="Số TK Ngân hàng" placeholder="VD: 1232132132" type="text" name="bank_account" required={true} isBootstrap={true}  />
                            </div>
                            <div className="col-6">
                                <Input disabled={true} type="text" label="Tên chủ TK" isBootstrap={true} value={userData.hoVaTen} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-6">
                                <Dropdown isSearch={true} heading="Ngân hàng" dispatch={e => onChangeBank(e)} className="dropdown" isBootstrap={true} data={banks} item_height="36">
                                    <span style="color: #999999">
                                        Ngân hàng
                                    </span>
                                </Dropdown>
                            </div>
                            <div className="col-6">
                                <Dropdown ref={branchDropdownRef} dispatch={e => onChangeBranch(e)} isSearch={true} heading="Chi nhánh" className="dropdown" name="bank_brand" isBootstrap={true} data={branches} item_height="36">
                                    <span style="color: #999999">
                                        Chi nhánh
                                    </span>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                }
            </div>

            <div className="card">
                <div className="row">
                    <p>Quý khách vui lòng hoàn thiện hồ sơ bản cứng, nếu sau 14 ngày VCSC vẫn chưa nhận được hồ sơ, Quý khách đồng ý những điều khoản sau:</p>
                    <p >• Chưa được chuyển tiền ra khỏi tài khoản chứng khoán</p>
                    <p >• Chưa được cấp tài khoản Giao dịch kỹ quỹ (Margin) và tài khoản Giao dịch chứng khoán phái sinh</p>
                    <p >• Tự động khóa tài khoản chứng khoán sau 14 ngày</p>
                </div>
                <div className="row">
                    <p id="agree-checkbox" className="checkbox">
                        <CheckBox ref={boxAgree} checked={agree} onCheck={e => setAgree(e)}  name="agree" />
                        Tôi đã đọc, hiểu và đồng ý với <a className="font-bold" href="https://www.vcsc.com.vn/userfiles/upload/file/VCSC/bieu-mau/mo_tk_ca_nhan.pdf" target="_blank">Điều khoản dịch vụ</a> của VCSC</p>
                </div>
            </div>
        </div>
    </div>

}