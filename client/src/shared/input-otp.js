import { h, createElement  } from 'preact';

import { Fragment, lazy, Suspense } from 'preact/compat';


import { useState, useRef, useEffect } from 'preact/hooks'

import { css } from 'emotion';

import { $_ } from 'root/_components';
// keyCode constants
const BACKSPACE = 8;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const DELETE = 46;
const SPACEBAR = 32;
const ENTER = 13;

const CSS$ = css`
    display: inline-flex;
    input {
        margin-right: 12px;
        background: #F2F2F2;
        border-radius: 6px;
        width: 60px;
        max-width: 60px;
        font-weight: 600;
        font-size: 24px;
        line-height: 29px;
        text-align: center;
        text-transform: uppercase;
        color: #333333;
        max-height: 80px;
        height: 80px;
        &:last-child {
            margin-right: 0;
        }
    } 
    @media screen and (max-width: 610px) {
        input {
            width: 100%;height:unset;

        }
    } 
`;
export function InputOtp({className, onChange, ...props}) {
    
    let [activeInput, setActiveInput] = useState(0);
    let [code, setCode] = useState([]);

    function getOtpValue() {
        return props.value ? props.value.toString().split('') : [];
    };

    function handleOtpChange(otp){
        
        if (typeof onChange === 'function') {
            const otpValue = otp.join('');
            onChange(otpValue);
        }
    };

    function isInputValueValid(value) {
        const isTypeValid = props.isInputNum
          ? !isNaN(parseInt(value, 10))
          : typeof value === 'string';
    
        return isTypeValid && value.trim().length === 1;
    };

     // Focus on input by index
     function focusInput(input){
        const { numInputs } = props;
        const active = Math.max(Math.min(numInputs - 1, input), 0);

        setActiveInput(active);
    };

    // Focus on next input
    function focusNextInput(){

        focusInput(activeInput + 1);
        
    };

    // Focus on previous input
    function focusPrevInput(){
        focusInput(activeInput - 1);
    };

      // Change OTP value at focused input
      function changeCodeAtFocus (value, i) {
        // const otp = getOtpValue();
        // otp[activeInput] = value[0];
        let otp = code; otp[i] = value;
        setCode(otp);
        handleOtpChange(otp);
    };

    // Handle pasted OTP
    function handleOnPaste(e){
        // e.preventDefault();
        // return;
        const { numInputs } = props;
        const otp = getOtpValue();

        // Get pastedData in an array of max size (num of inputs - current position)
        const pastedData = e.clipboardData
        .getData('text/plain')
        .slice(0, numInputs - activeInput)
        .split('');

        // Paste data from focused input onwards
        for (let pos = 0; pos < numInputs; ++pos) {
            if (pos >= activeInput && pastedData.length > 0) {
                otp[pos] = pastedData.shift();
            }
        }

        handleOtpChange(otp);
    };

    function handleOnChange (e, i){
        const { value } = e.target;
    
        if (isInputValueValid(value)) {
          changeCodeAtFocus(value, i);
        }
    };

    function clearValue(e) {
        e.target.value = '';
    }
    function onEnter(e, i) {
        // console.log(e.target.value, code);
        let values = code.filter(x => x != '');
        if (i == props.numInputs - 1) {
            values[i] = e.target.value;
        }
        if (values.length == props.numInputs) {
            if (typeof props.onFinish === 'function') {
                props.onFinish(values.join(''));
            }
        }
    }

     // Handle cases of backspace, delete, left arrow, right arrow, space
     function handleOnKeyDown(e, i){
        if (e.keyCode === BACKSPACE || e.key === 'Backspace') {
            e.preventDefault();
            changeCodeAtFocus('', i);
            focusPrevInput();
            clearValue(e);
        } else if (e.keyCode === DELETE || e.key === 'Delete') {
            e.preventDefault();
            changeCodeAtFocus('', i);
            clearValue(e);
        } else if (e.keyCode === LEFT_ARROW || e.key === 'ArrowLeft') {
            e.preventDefault();
            focusPrevInput();
        } else if (e.keyCode === RIGHT_ARROW || e.key === 'ArrowRight') {
            e.preventDefault();
            focusNextInput();
        } else if (e.keyCode === ENTER || e.key === 'Enter') {
            e.preventDefault();
            onEnter(e, i);
        } else if (
            e.keyCode === SPACEBAR ||
            e.key === ' ' ||
            e.key === 'Spacebar' ||
            e.key === 'Space'
        ) {
            e.preventDefault();
        }
    };

     // The content may not have changed, but some input took place hence change the focus
     function handleOnInput(e, i){
        if (isInputValueValid(e.target.value)) {
            focusNextInput();       
        } else {
        // This is a workaround for dealing with keyCode "229 Unidentified" on Android.
            if (!props.isInputNum) {
                const { nativeEvent } = e;

                if (
                    nativeEvent.data === null &&
                    nativeEvent.inputType === 'deleteContentBackward'
                ) {
                    e.preventDefault();
                    changeCodeAtFocus('', i);
                    focusPrevInput();
                }
            }
        }
    };
    function renderInputs(){
        const {
            numInputs,
            disabled
        } = props; 
        const otp = getOtpValue();
        const inputs = [];
        for (let i = 0; i < numInputs; i++) {
            inputs.push(
                <SingleInput
                    key={i}
                    index={i}
                    focus={activeInput === i}
                    onChange={(e) => handleOnChange(e, i)}
                    onKeyDown={(e) => handleOnKeyDown(e, i)}
                    onInput={(e) => handleOnInput(e, i)}
                    onPaste={(e) => handleOnPaste(e)}
                    onFocus={e => {
                        setActiveInput(i);
                        e.target.select();
                    }}
                    onBlur={() => setActiveInput(-1)}
                    shouldAutoFocus={true}
                    disabled={disabled}
                />
            )
        }
        return inputs;
    };

    return <div className={$_(CSS$, className)}>
        {renderInputs()}
    </div>
}
function SingleInput({focus, shouldAutoFocus, ...props}) {
    const input = useRef();
    const mounted = useRef();
    const prevProps = usePrevious(input);

    useEffect(() => {
        if (!mounted.current) {
          // do componentDidMount logic
          mounted.current = true;
          if (input && focus && shouldAutoFocus) {
            input.current.focus();
          }
        } else {
          // do componentDidUpdate logic
            if (prevProps.focus !== focus && (input && focus)) {
                if (!props.disabled) {
                    input.current.focus();
                    input.current.select();
                }
            }
        }
    });

    return <input 
        type="tel"
        ref={input}
        maxLength={1}
        autoComplete="off"
        {...props}
    />
}
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}