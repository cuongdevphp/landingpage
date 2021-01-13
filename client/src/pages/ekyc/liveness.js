
import { h  } from 'preact';

import { useEffect, useState, useContext } from 'preact/hooks'

import { css } from 'emotion';

import {  $_ } from 'root/_components';

import { builtContext } from 'root/_context'

import { accessCamera, stopCamera, captureToBase64, getActions, sendFile }  from './core';

import { VCIButton } from 'root/shared/button';

import { ConfirmUnderstand, ErrorMessagePopup } from 'root/shared/alert';

const CSS$ = css`
    .body {
        position: relative;
        height: 500px;
        .bg {
            position: absolute;
            width: 666.67px;
            height: 500px;
            background: #000000;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
        }
        .circle-border {
            position: absolute;
            width: 420px;
            height: 420px;
            border: 2px solid #FFFFFF;
            box-sizing: border-box;
            border-radius: 50%;
            top: 40px;
            left: 124px;
            z-index: 2;
        }
        video {
            max-width: 533px;
            width: 100%;
            /* width: var(--width); */
            width: calc(var(--height) * 1.5);
            max-height: 400px;
            height: 100%;
            z-index: 3;
            position: absolute;
            top: 50px;
            left: 69px;
            shape-outside: circle();
            clip-path: circle();
        }
        canvas {
            display: none;
        }
    }
    .d-block {
        display: block !important;
    }
    .actions {
            margin: 10px 0;
            &__item {
                font-weight: 600;
                line-height: 1.5;
                display: flex;
                align-items: center;
                justify-content: center;
                img {
                    width: 13px;height: 13px; margin-left: 10px;
                }
            }
            button {
                background-color: #c42127;
                max-width: 160px;
                height: 30px;
                font-size: 11px;
                margin: 10px 0;
            }
        }
    &.mobile {
        background: #040404; 
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        .header-bar {
            height: 90px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 500;
            position: relative;
            width: 100%;
            span {
                font-size: 20px;
                line-height: 120%;
                /* identical to box height, or 24px */


                text-align: center;
                letter-spacing: 0.16px;

                color: #FFFFFF;
            }
            img {
                width: 24px;
                position: absolute;
                right: 13px;
            }
        }
        .body {
            position: absolute;
            top: calc(50% - 60px);
            height: 50vh;
            left: 50%;
            width: 50vh;
            max-width: 90vw;
            max-height: 90vw;
            -webkit-transform: translate(-50%,-50%);
            -ms-transform: translate(-50%,-50%);
            transform: translate(-50%,-50%);
            .circle-border {
                position: absolute;
                width: 100%;
                height: 100%;
                border: double;
                box-sizing: border-box;
                border-radius: 50%;
                top: 0;
                left: 50%;
                transform: translateX(-50%);
                border-right: double;
                border-bottom: double;
                border-left: double;
                border-top: double;
                &.quarter {
                    border-right: 4px solid #46AB00
                }
                &.haft {
                    border-right: 4px solid #46AB00;
                    border-bottom: 4px solid #46AB00;
                }
                &.haft-quarter {
                    border-right: 4px solid #46AB00;
                    border-bottom: 4px solid #46AB00;
                    border-left: 4px solid #46AB00
                }
                &.done {
                    border-right: 4px solid #46AB00;
                    border-bottom: 4px solid #46AB00;
                    border-left: 4px solid #46AB00;
                    border-top: 4px solid #46AB00;
                }
            }
            video {
                height: auto;
                max-height: unset;
                position: unset;
                width: 90%;
                max-width: unset;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
        }
        .footer-bar {
            position: absolute;
            bottom: -120px;
            width: 100%;
            p {
                font-style: normal;
                font-weight: normal;
                text-align: center;
                
                font-size: 18px;
                line-height: 21px;
                color: #F44336;
                font-weight: 800;
            }
            img {
                width: 70px; height: 70px;
                margin: 30px auto 0;
                cursor: pointer;
            }
            .count-down {
                margin: 8px auto 0;
                border: 1px solid #FFFFFF;
                box-sizing: border-box;
                width: 70px;
                height: 70px;
                border-radius: 50%;
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 600;
            }
        }
        .d-none {
            display: none;
        }
    }
    .description {
        font-size: 14px;
            margin: 0 30px;
            display: grid;
            .list {
                display: grid;
                margin: 0 auto;
            }
            p { 
                display: inline-flex;
                span {
                    margin-left: 10px;
                }
                &.sub {
                    font-style: italic;
                    font-weight: normal;
                    line-height: 22px;
                    text-align: center;
                    a { 
                        color: #00377b
                    }
                }
            }
    }
`;

export function EKYCLiveness({isSubmit, anhMatTruoc, onSuccess, onLoading, onError, draftId, isMobile, onIncreaseSubmit}) {
    const [isCamera, setIsCamera] = useState(false);

    const {dispatch} = useContext(builtContext);

    const [loading, setLoading] = useState(false);

    
    const [error, setError] = useState(null);

    const [recording, setRecording] = useState(false);
    
    const [anhVideo, setAnhVideo] = useState([]);

    const [actions, setActions] = useState(null);

    const [timeSerious, setTimeSerious] = useState(0);

    const [videoStream, setVideoStream] = useState(null);

    const [actionCountDown, setActionCountDown] = useState(null);

    const [classNameCircle, setClassNameCircle] = useState('');

    async function openCamera() {
        setIsCamera(true);
        stopCamera();
        const video = await accessCamera("face-auth");
        setVideoStream(video);
    }
    function captureImage(video = videoStream) {
        return captureToBase64(video);
    }
    useEffect(async () => {
        if (isSubmit < 1) return;
        
        const body = {
            anhVideo,
            anhMatTruoc,
            hanhDong: actions.original,
            ref: draftId
        }
        let formBody = JSON.stringify(body);

        onLoading(true);

        setError(null);

        setLoading(true);

        onError(null);

        const result = await sendFile('v1/ekyc/face-auth', formBody,  {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         });

         onLoading(false);
         
        setLoading(false);

         if (result && result.status == 200 && result.data) {
             onSuccess();
         } else {
             let err = result.message || 'Thao tác thất bại';
             onError(err);
             setError(err);
             setActions({ 
                 ...actions,
                 noiDungHanhDongs: actions.noiDungHanhDongs.map(action => {
                    return  { ...action, xong: false, countTime: 0 };
                })
             });
             if (isMobile) {
                dispatch({ 
                    type: "message",
                    data: {
                        type: "custom",
                        className: 'error',
                        text: <ErrorMessagePopup text={err} onRetry={() => close()} />
                    }
                });
             }
         }
    }, [isSubmit])

    useEffect(async () => {
        let result = await getActions(draftId);
        setActions(result);
        if (isMobile) {
            showDialog(result);
        } else {
            await openCamera();
        }
    }, [])

    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, []);
    function close() {
        stopCamera();
        showDialog();
        setActionCountDown(null);
        setClassNameCircle('');
    }
    async function onClickConfirm(acts, video) {
        dispatch({ type: "message", data: null });
        await openCamera();
        setActionCountDown(acts.noiDungHanhDongs[0]);
        video = document.getElementById('face-auth');
        start(acts, video);
    }
    function showDialog(acts = actions) {
        let list = [
            'Khuyến khích không đeo kính khi xác minh',
            'Không che mặt khi xác minh',
            'Môi trường không quá sáng, quá tối'
        ];
        let subTitle = acts.noiDungHanhDongs.map(action => '<span style="color: #f71111; font-weight: bold; font-size: 16px;">' + action.tenHanhDong + ' trong vòng ' + '<b>'+action.thoiGianThucHien+'s</b>.</span>').join('<br/>')
        dispatch({ type: "message", data: {
            type: "custom", 
            className: 'confirm',
            text: <ConfirmUnderstand title="Xác thực khuôn mặt"
                                    subTitle={subTitle}
                                    list={list}
                                    type="capture"
                                    onClickConfirm={() => onClickConfirm(acts, videoStream)}
              />
        }});
    }

    function start(acts = actions, video = videoStream) {
        let i = 0, j = 0, actionCountDownTimer = 0, splitTime = acts.thoiGianQuayVideo / 4;
        let cloneAction = acts;
        let timePoint = cloneAction.noiDungHanhDongs[j].thoiGianThucHien;
        let anhVideoClone = [];
        let actionCountDownTemp = cloneAction.noiDungHanhDongs[j];
        setRecording(true);
        let timeRangesCheck = [
            {time: splitTime * 1, className: 'quarter'},
            {time: splitTime * 2, className: 'haft'},
            {time: splitTime * 3, className: 'haft-quarter'},
            {time: splitTime * 4, className: 'done'}
        ]
        let timeCheckIndex = 0;
        let timeCheck = timeRangesCheck[timeCheckIndex]; 
        let timer = setInterval(() => {
            i++;
            actionCountDownTimer++;
            setTimeSerious(i);
            anhVideoClone.push({ 
                anh: captureImage(video),
                thoiGian: `${i}`
            });
            if (i >= timeCheck.time) {
                setClassNameCircle(timeCheck.className);
                timeCheckIndex++;
                timeCheck = timeRangesCheck[timeCheckIndex]; 
            }
            setActionCountDown({ 
                ...actionCountDownTemp,
                countTime: actionCountDownTimer
            });
            cloneAction.noiDungHanhDongs[j].countTime = actionCountDownTimer;
            if (timePoint === i) {
                cloneAction.noiDungHanhDongs[j].xong = true;
                setActions(cloneAction);
                j++;
                if (j < acts.noiDungHanhDongs.length) {
                    timePoint = i + cloneAction.noiDungHanhDongs[j].thoiGianThucHien;
                    // if (isMobile) {
                    //     actionCountDownTemp = cloneAction.noiDungHanhDongs[j];
                    //     setActionCountDown(actionCountDownTemp);
                    //     actionCountDownTimer = 0;
                    // }
                    actionCountDownTemp = cloneAction.noiDungHanhDongs[j];
                    setActionCountDown(actionCountDownTemp);
                    actionCountDownTimer = 0;
                }
            }
            if (i === acts.thoiGianQuayVideo) {
                clearInterval(timer);
                setRecording(false);
                setAnhVideo(anhVideoClone);
                setClassNameCircle('done');
                onIncreaseSubmit();
            }
        }, 1000);
    }
    if (isMobile) {
        return <div className={$_(CSS$, 'mobile')}>
            <div className="header-bar">
                <span>Xác thực khuôn mặt</span>
                <img onClick={_ => close()} src={`${HOST}/imgs/close.svg`}/>
            </div>
            <div className="body">
                <div className={$_('circle-border', classNameCircle)}></div>
                <video id="face-auth" playsinline autoPlay></video>
                <canvas></canvas>
                { !actionCountDown ? null : 
                <div className="footer-bar">
                    <p>{actionCountDown.tenHanhDong}</p>
                    <div className="count-down">
                        {actionCountDown.thoiGianThucHien - (actionCountDown.countTime || 0)}s
                    </div>
                </div>
            }
            </div>
            
        </div>
    }
    return <div className={CSS$}>
        <h5 className="title">
        Xác thực khuôn mặt
        </h5>
        <div className="description">
            <div className="list">
                <p><div className="blue-box">1</div> <span>Môi trường không quá sáng, quá tối</span></p>
                <p><div className="blue-box">2</div> <span>Khuyến khích không đeo kính khi xác minh</span></p>
                <p><div className="blue-box">3</div> <span>Không che mặt khi xác minh</span></p>
            </div>
            <p className="sub">
            (Nếu bạn dùng iPhone, iPad Quý khách cài đặt theo hướng dẫn &nbsp; <a href="app-prefs://prefs:root=Settings">tại đây</a>)
            </p>
        </div>

        { !actions ? null : 
            <div className={'actions'}>
                {actions.noiDungHanhDongs.map(action => {
                    return  <p className={'actions__item'}>
                        {action.tenHanhDong} 
                            
                        {action.xong === true ?
                         <img src={`${HOST}/imgs/ic_check_green.svg`} /> :
                         <strong>&nbsp;trong&nbsp;
                            <span style="color: #00377B">{action.thoiGianThucHien - (action.countTime | 0)}s</span>
                        </strong>}
                    </p>
                })}
                <VCIButton loading={recording || loading} className="btn-start" onClick={() => start()}>
                    {recording ? 'Đang quay...' : (loading ? 'Đang xử lý...' : (error ? 'Thử lại' : 'Bắt đầu'))}
                </VCIButton>
            </div>
        }

        <div className="body">
            <div className="bg"></div>
            <div className="circle-border"></div>
            <video id="face-auth" playsinline autoPlay></video>
            <canvas></canvas>
        </div>
    </div>

}