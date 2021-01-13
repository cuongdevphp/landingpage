import { h, createElement  } from 'preact';

import { Fragment, lazy, Suspense } from 'preact/compat'

import { useEffect, useReducer, useState, useContext, useRef, useMemo, useLayoutEffect } from 'preact/hooks'

import { css } from 'emotion'

import { Provider, context, builtContext, reducer } from 'root/_context'

import Landing from 'root/pages/landing'

const CSS$ = css`
    height: 100%;
    position: relative;
    text-align: center;

    div.message-box {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 10001;

        ._bg {
            background: rgba(0, 0, 0, 0.7);
            width: 100%;
            height: 100%;
            opacity: 0.5;
        }

        .content {
            box-shadow: 0 0 20px -5px rgba(0, 0, 0, 0.4);
            img.icon-close {
                width: 23px !important;
                height: 23px !important;
                right: 6px;
                top: 6px;
                position: absolute;
            }
            strong {
                font-weight: 600;
            }
            div.md {
                overflow-y: scroll;
                height: 100%;
                width: 100%;
                padding: 48px;
            }

            position: absolute;
            height: 100vh;
            width: calc(100% - 60px);
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background: white;
            border-radius: 0px;
            text-align: left;

            &[data-type="text"] {
                h1 {
                    margin-bottom: 24px;
                    color: var(--black);
                }
            }

            &[data-type="confirm"] {
                width: 80%;
                max-width: 400px;
                min-width: unset;
                height: 200px;
                border-left: 4px solid rgb(119, 185, 103);

                span.btOk {
                    display: inline-block;
                }
                span.btCancel {
                    display: inline-block;
                }

                p.text {
                    height: calc(100% - 58px);
                    max-height: calc(100% - 58px);
                }
            }

            > span.btClose {
                position: absolute;
                right: -10px;
                top : 10px;
                background: var(--very-lightgray);
                cursor: pointer;
                user-select: none;
                z-index: 2;
                width: 40px;
                height: 40px;
                transform: translateX(100%);
                border-radius: 4px;
                &:after {
                    content: '+';
                    height: 100%;
                    width: 100%;
                    position: absolute;
                    top: 0px;
                    right: 0px;
                    color: var(--black);
                    line-height: 34px;
                    font-size: 2.4rem;
                    text-align: center;
                    transform: rotateZ(45Deg);
                }
            }

            > span.btOk, span.btCancel {
                display: none;

                &.btOk {
                    position: absolute;
                    border-radius: 4px;
                    left: 51%;
                    bottom: 8px;
                    height: 42px;
                    background: rgb(119, 185, 103);
                    width: 128px;
                    text-align: center;
                    color: white;
                    line-height: 42px;
                    text-align: center;
                    user-select: none;
                    cursor: pointer;
                    &:hover {
                        background: rgba(119, 185, 103, 0.5)
                    }
                }
                &.btCancel {
                    border-radius: 4px;
                    position: absolute;
                    left: 50%;
                    bottom: 8px;
                    height: 42px;
                    background: var(--lightgray);
                    width: 128px;
                    color: white;
                    line-height: 42px;
                    text-align: center;
                    user-select: none;
                    cursor: pointer;
                    transform: translateX(-101%);
                    &:hover {
                        background: var(--gray);
                    }
                }
            }


            &[data-type="ok"], &[data-type="fail"] {
                width: 80%;
                max-width: 540px;
                min-width: unset;
                height: auto;
                min-height: 288px;
                border-radius: 8px;
                text-align: center;
                font-size: 14px;
                padding: 32px;

                img {
                    width: 64px;
                    height: 64px;
                }
                h3 { margin: 16px 0; color: #46AB00; &.primary { color: #00377B } }
                p { line-height: 130%; color: #333333; }

                .btClose {
                    display: none;
                }

                span.btOk {
                    margin-top: 24px;
                    display: inline-block;
                    transform: none;
                    top: unset;
                    bottom: unset;
                    left: unset;
                    background: #00377B;
                    position: relative;
                    &:hover {
                        background: #00377B;
                    }
                }
            }

            &[data-type="fail"], &[data-type="custom"] {
                width: 80%;
                max-width: 540px;
                min-width: unset;
                height: auto;
                min-height: 288px;
                border-radius: 8px;
                text-align: center;
                font-size: 14px;
                padding: 32px;
                h3 { margin: 16px 0; color: #C42127; }
                img {
                    width: 64px;
                    height: 64px;
                }
            }
            &.loading {
                display: grid;
                align-items: center;
                justify-content: center;
                width: 12em;
                min-height: 8em;
                padding: 10px 0 0;
            }
            &.confirm {
                padding: 20px;
                width: 95%;
            }
            &.otp {
                padding: 20px;
                width: 94%;
            }
            &.error {
                padding: 20px;
                width: 78%;
                min-height: 153px;
            }

            @media screen and (min-width: 768px) {
                width: auto;
                min-width: 600px;
                max-height: 80vh;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                border-radius: 4px;
                > span.btClose {
                    top: 0px;
                }
            }

            @media screen and (min-width: 992px) {
                min-width: 800px;
            }
        }
        h3 { 
            &.primary { color: #00377B !important } 
        }
    }
    
    
`

function MessageBox () {
    const {state, dispatch} = useContext(builtContext);
    let message;

    if (state.message == null) {
        document.body.style.overflow = "auto";
        return;
    }

    if (["text","confirm"].includes(state.message.type)) {
        message = <p className="text">
            {state.message.text}
        </p>
    }

    if (["ok", "fail"].includes(state.message.type)) {
        message = state.message.text
    }
    function onClose($) {
        if (typeof state.message.onCancel === "function") {
            state.message.onCancel($);
        }
        dispatch({ type: "message", data: null });
    }

    if (["custom"].includes(state.message.type)) {
        return <div className="message-box">
            <div className="_bg"/>
            <div className={'content ' + state.message.className || ''} data-type={state.message.type}>
               { state.message.iconClose ?
                <img onClick={ $ => onClose($) } className="icon-close" src={`${HOST}/imgs/ic_close.svg`} /> : null }
                { state.message.text }
            </div>
        </div>
    }

    //Lock Scroll
    document.body.style.overflow = 'hidden';

    return <div className="message-box">
        <div className="_bg"/>
        <div className="content" data-type={state.message.type}>
            <span className="btClose" onClick={ $ => dispatch({ type: "message", data: null }) }></span>
            { message }
            <span className="btOk" onClick={ $ => state.message.onAccept && state.message.onAccept($) }>Chấp nhận</span>
            <span className="btCancel" onClick={ $ => state.message.onCancel && state.message.onCancel($) }>Bỏ qua</span>
        </div>
    </div>
}   

export default function Render() {

    const [state, dispatch] = useReducer(reducer, context);
    
    let pages = [Landing];

    return <Provider value={{ state, dispatch }}>
        <div className={CSS$}>
            { pages.map( Component => <Component /> ) }
            <MessageBox />
        </div>
    </Provider>
}