
import { h  } from 'preact';

import { useEffect, useCallback, useReducer, useState, useContext, useRef, useMemo, useLayoutEffect } from 'preact/hooks'

import { css } from 'emotion';

import {  $_ } from 'root/_components';

import { builtContext } from 'root/_context';

import { ConfirmUnderstand } from 'root/shared/alert';

import { VCIButton } from 'root/shared/button';

import { accessCamera, getCameraDevices, capture, stopCamera, clearImageCanvas, drawImage, convertCanvasToImageFile, sendFile }  from './core';

import { ErrorMessagePopup, WarningOcrDialog } from 'root/shared/alert';

const CSS$ = css`
    .row {
        &.top {
            margin-top: 20px;
            .col-6 {
                display: grid;
                justify-content: center;
                label {
                    font-weight: 600;
                    font-size: 13px;
                    line-height: 16px;
                    text-align: center;
                    text-transform: uppercase;
                }
                img {
                    width: 134px;
                    height: 90px;
                    margin-top: 10px;
                }
            }
        }
        &.bottom {
            .col-6 {
                justify-content: center;
                display: flex;
                .card {
                    video {
                        display: none;
                    }
                    width: 320px;
                    height: 200px;

                    background: #F8F8F8;
                    border: 1px dashed #E3E5EC;
                    box-sizing: border-box;
                    border-radius: 4px;
                    display: grid;
                    align-items: center;
                    justify-content: center;
                    .explain {
                        font-style: normal;
                        font-weight: 500;
                        font-size: 13px;
                        line-height: 16px;
                        text-align: center;
                        color: #666666;
                    }
                    .buttons-group {
                        display: flex;
                        margin-top: 10px;
                    }
                    position: relative;
                    canvas {
                        position: absolute;
                        border: 1px dashed #E3E5EC;
                        box-sizing: border-box;
                        border-radius: 4px;
                        display: none;
                        &.desktop { 
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .ic-close {
                        width: 24px;
                        height: 24px;
                        position: absolute;
                        right: 5px;
                        top: 5px;
                        cursor: pointer;
                    }
                    &.is-dragover {
                        border: 2px dashed #E3E5EC;
                    }
                }
                button, .button {
                            background: #F6C04B;
                            width: 100px;
                            margin: 0 10px;
                            height: 30px;
                            font-size: 12px;
                            vertical-align: top;
                            font-weight: 600;
                            text-transform: uppercase;
                            cursor: pointer;
                            border-radius: 4px;
                            padding: 8px 16px;
                            color: white;
                            border: none;
                            &.btn-capture {
                                position: absolute;
                                bottom: 10px;
                                left: 100px;
                            }
                        }
            }
        }
    }
    .d-block {
                        display: block !important;
    }
    input[type="file"] {
        display: none;
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
                &.reset { 
                    right: 13px;
                }
                &.switch { 
                    left: 13px;
                }
            }
        }
        .body {
            position: absolute;
            top: 90px;
            height: calc(100vw * 0.75);
            min-width: 100vw;
            left: 0;
            width: 100%;
            
            > div.video_box {
                height: calc(100vw * 0.75);
                width: 100%;
                overflow: hidden;
                position: relative;

                
                &.fade-in {
                    animation: fadeIn ease .5s;
                    -webkit-animation: fadeIn ease .5s;
                    -moz-animation: fadeIn ease .5s;
                    -o-animation: fadeIn ease .5s;
                    -ms-animation: fadeIn ease .5s;
                }
            }

            canvas {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                /* background: rgba(0, 0, 0, 0.35); */
                width: 100%;
                height: 100%;
                display: none;
            }
            video {
                /* width: 100vw;
                max-height: 100%; */
                height: auto;
                min-width: 100vw;
                min-height: 100vw;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
        }
        .footer-bar {
            padding: 20px;
            position: absolute;
            /* bottom: 20px; */
            p {
                font-style: normal;
                font-weight: normal;
                font-size: 14px;
                line-height: 21px;
                /* or 150% */

                text-align: center;

                color: #FFFFFF;
            }
            img {
                width: 70px; height: 70px;
                margin: 30px auto 0;
                cursor: pointer;
            }
            &.buttons-group {

            }
        }
        .d-none {
            display: none;
        }
    }
    .description {
        .list {
            font-size: 14px;
            margin: 0 40px;
            display: grid;
            p { 
                display: inline-flex;
                span {
                    margin-left: 10px;
                }
            }
        }
    }
    .warning-box {
        background: rgba(159, 191, 243, 0.2);
        border: 1px solid #9FBFF3;
        box-sizing: border-box;
        border-radius: 4px;
        display: flex;
        align-items: center;
        width: calc(100% - 106px);
        margin: 0 auto;
        font-size: 12px;
        padding: 10px 15px;
        text-align: left;
        line-height: 16px;
        img { 
            width: 20px;
            margin-right: 10px;
        }
        p { margin: 0}
        strong { font-weight: bold}
    }
    .box-preview {
        height: 100%;
        width: 100%;
        position: relative;
        .buttons-group {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            margin-bottom: 20px;
            .warning {
                margin-right: 20px;
            }
        }
    }
`;

export function EKYCOcr({isSubmit, onSuccess, onLoading, draftId, onError, isMobile, onIncreaseSubmit}) {
    const MIN_SCORE_EXPECT = 85;
    
    const { dispatch } = useContext(builtContext);

    const [cameraDevices, setCameraDevices] = useState([]);

    const [cameraIndex, setCameraIndex] = useState(0);

    const [isCamera, setIsCamera] = useState(false);
    
    const [cameraFor, setCameraFor] = useState(null);
    
    const [images, setImages] = useState({
        front: null,
        back: null
    });
    const videoBoxRef = useRef();

    const [videoStream, setVideoStream] = useState(null);
    
    const [warning, setWarning] = useState(false);

    const [tempData, setTempData] = useState(null);

    const [mobileState, setMobileState] = useState('front');

    const [imagePreview, setImagePreview] = useState(null);

    async function openCamera(type, options = window.constraints) {
        setCameraFor(type);
        setIsCamera(true);
        stopCamera();
        const video = await accessCamera(type, options);
        setVideoStream(video);
    }
    async function captureImage(idCanvas) {
        const canvas = capture(idCanvas, videoStream, isMobile);
        setIsCamera(false);
        let stateImages = images;
        if (idCanvas.indexOf('front') > -1) {
            stateImages.front = canvas; 
        } else {
            stateImages.back = canvas; 
        }
        setImages(stateImages)
        if (isMobile) {
            setImagePreview(canvas);
            setCanvasPreview(canvas);
            // let _dom = document.querySelector("div.video_box");
            videoBoxRef.current.classList.add('fade-in');
            setTimeout(() => {
                videoBoxRef.current.classList.remove('fade-in');
            }, 500)
            // if (mobileState === 'front') {
            //     setMobileState('back');
            // } else {
            //     // await submitOcr(stateImages);
            //     onIncreaseSubmit();
            // }
        } else {
            stopCamera();
        }
    }
    function setCanvasPreview(dataCanvas) {
        const canvas = document.getElementById('canvas-preview');

        if (!canvas) {
            return null;
        }
        canvas.width = 960;
        canvas.height = 720;
        const canvasContext = canvas.getContext('2d');
        if (dataCanvas) {
            canvasContext.drawImage(dataCanvas, 0, 0, canvas.width, canvas.height);
        } else {
            canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    function clearImage(key) {
        setWarning(false);
        setTempData(null);
        clearImageCanvas(images[key]);
        setImages({
            ...images,
            [key]: null,
        })
    }
    function onDrop(e, key) {
        return;
        preventDefaults(e);
        let dt = e.dataTransfer;
        let files = dt.files;
        e.target.classList.remove('is-dragover');
        drawFileImageToCanvas(files[0], key)

    }
    function drawFileImageToCanvas(file, key) {
        const reader = new FileReader();
        reader.onload = (r) => {
            const img = new Image();
            img.src = r.target.result;
            img.onload = () => {
                const cv = drawImage(`card-${key}-img`, img);
                setImages({
                    ...images,
                    [key]: cv,
                })
            }
            
        }
        reader.readAsDataURL(file);
    }
    function preventDefaults (e) {
        e.preventDefault()
        e.stopPropagation()
    }
    function onDragOver(e) {
        preventDefaults(e);
        
        e.target.classList.add('is-dragover');
    }
    function onDragEnter(e) {
        preventDefaults(e);
        // e.target.classList.remove('is-dragover');
    }
    function onDragLeave(e) {
        preventDefaults(e);
        e.target.classList.remove('is-dragover');
    }
    async function onClickConfirm() {
        dispatch({ type: "message", data: null });
        if (window.stream) {
            return;
        }
        await openCamera('card-mobile');
    }
    function showDialogReady() {
        let list = [
            'Ảnh rõ nét, chụp trong môi trường đủ sáng, không quá tối, không chói sáng',
            'Ảnh gốc, không phải ảnh photo, chụp từ màn hình thiết bị khác',
            'Ảnh không mất góc, bị cắt xén, chỉnh sửa'
        ];
        dispatch({ type: "message", data: {
            type: "custom", 
            className: 'confirm',
            text: <ConfirmUnderstand title="Chụp ảnh giấy tờ tùy thân"
                                    subTitle="Vui lòng chụp mặt trước và mặt sau của
                                    Chứng minh nhân dân/Căn cước công dân"
                                    list={list}
                                    onClickConfirm={e => onClickConfirm()}
              />
        } });
    }
    async function onChangeFile(e, key) {
        return;
        const { files } = e.target;
        if (files.length) {
            drawFileImageToCanvas(files[0], key);
            // const body = new FormData();
            

            // body.append('files', files[0]);

            // const result = await sendFile('v1/ekyc/ocr/card', body);
            // console.log(result);
        }
    }
    function reset() {
        dispatch({ type: "message", data: null });
        setMobileState('front');
        setImages({ 
            front: null,
            back: null
        });
        showDialogReady();
    }
    useEffect(async () => {
        await submitOcr();
    }, [isSubmit]);

    async function submitOcr(imgs = images) {
        if (warning && tempData) {
            onSuccess(tempData);
            return;
        }
        const { front, back } = imgs;
        
        if (front == null || back == null) {
            return;
        }
        setWarning(false);

        const body = new FormData();
        let frontImg =  await convertCanvasToImageFile(front, 'front');

        body.append('front', frontImg);
        
        let backImg =  await convertCanvasToImageFile(back, 'back');

        body.append('back', backImg);

        body.append('ref', draftId);

        onLoading(true);

        onError(null);
        const result = await sendFile('v1/ekyc/ocr/card', body);

        onLoading(false)
        
        if (result && result.status == 200 && result.data && result.data.userData && !result.error) {
            if (result.score >= MIN_SCORE_EXPECT) {
                onSuccess(result.data);
            } else {
                setWarning(true);
                setTempData(result.data);
                if (isMobile) {
                    dispatch({ 
                        type: "message",
                        data: {
                            type: "custom",
                            className: 'error',
                            text: <WarningOcrDialog onReTake={() => onReTakeAll()} onContinue={() => onContinue(true)} />
                        }
                    });
                }
            }
        } else {
            let err = "Ảnh bạn cung cấp không đúng hoặc quá mờ.";
            if (result.error) {
                err = result.error;
            }
            onError(err);
            if (isMobile) {
                if (isMobile) {
                    dispatch({ 
                        type: "message",
                        data: {
                            type: "custom",
                            className: 'error',
                            text: <ErrorMessagePopup text={err} onRetry={() => reset()} />
                        }
                    });
                }
            }
        }
    }
    
    useEffect(async () => {
        if (!isMobile) return;
        showDialogReady();
        let devices = await getCameraDevices();
        setCameraDevices(devices);
        if (devices.length > 1) {
            await switchCamera(devices[1]);
        }
    }, []);
    async function switchCamera(device = null) {
        if (!device) {
            device = cameraDevices[cameraIndex == 1 ? 0 : 1];
        }
        // stopCamera();
        await openCamera('card-mobile', {
            video: {deviceId: device ? {exact: device.deviceId} : undefined },
            audio: false
        });
    }
    function onReTake(state) {
        let stateImages = images;
        stateImages[state] = null;
        setImages(stateImages);
        setImagePreview(null);
    }
    function onReTakeAll() {
        dispatch({ type: "message", data: null });
        setMobileState('front');
        setImages({ 
            front: null,
            back: null
        });
    }
    function onContinue(hidePopup = false) {
        setImagePreview(null);
        if (hidePopup) {
            dispatch({ type: "message", data: null });
        }
        if (mobileState === 'front') {
                setMobileState('back');
        } else {
            onIncreaseSubmit();
        }
    }
    const scopeMobile = (active) => {
        return <div className={active ? 'active' : 'd-none'}>
            <div className="header-bar">
                {cameraDevices.length > 1 ? <img className="switch" onClick={() => switchCamera()} src={`${HOST}/imgs/flip_camera.svg`}/> : null}
                <span>Mặt {mobileState === 'front' ? 'trước' : 'sau'}</span>
                <img className="reset" onClick={() => reset()}src={`${HOST}/imgs/close.svg`}/>
            </div>
            <div className="body">
                <div className="video_box" ref={videoBoxRef}>
                    <video id={`card-mobile`} playsinline autoPlay></video>
                </div>
                <canvas id={`card-front-img`}></canvas>
                <canvas id={`card-back-img`}></canvas>
                {/* <div className="bg-grey"></div> */}
                <div className="footer-bar">
                    <p>Vui lòng đặt CMND/Thẻ căn cước của bạn vào khung hình chữ nhật, đảm bảo hình ảnh rõ ràng, không bị mờ, nhòe.</p>
                    <img onClick={e => captureImage(`card-${mobileState}-img`)} src={`${HOST}/imgs/capture.svg`}/>
                </div>
            </div>
           
        </div>
    }
    if (isMobile) {
        return <div className={$_(CSS$, 'mobile')}>
            {scopeMobile(imagePreview ? false : true)}
            <div className={imagePreview ? 'd-block box-preview' : 'd-none'}>
                    <div className="header-bar">
                        <span>Mặt {mobileState === 'front' ? 'trước' : 'sau'}</span>
                    </div>
                    <div className="body">
                        <div className="video_box">
                            <canvas id="canvas-preview" style="display: block"></canvas>
                        </div>
                        <div className="footer-bar buttons-group">
                            <VCIButton className="warning" onClick={() => onReTake(mobileState)}>
                                    Chụp lại
                            </VCIButton>

                            <VCIButton className="primary" onClick={() => onContinue()}>
                                    Tiếp tục
                            </VCIButton>
                        </div>
                    </div>
                </div>
        </div>
    }


    return <div className={CSS$}>
        <h5 className="title">
            Chụp ảnh giấy tờ tùy thân
        </h5>
        <div className="description">
            <p>Vui lòng chụp mặt trước và mặt sau của Chứng minh nhân dân/Căn cước công dân:</p>
            <div className="list">
                <p><div className="blue-box">1</div> <span>Ảnh rõ nét, chụp trong môi trường đủ sáng, không quá tối, không chói sáng</span></p>
                <p><div className="blue-box">2</div> <span>Ảnh gốc, không phải ảnh photo, chụp từ màn hình thiết bị khác</span></p>
                <p><div className="blue-box">3</div> <span>Ảnh không mất góc, bị cắt xén, chỉnh sửa</span></p>
            </div>
        </div>

        <div className="row top">
            <div className="col-6">
                <label>Mặt trước</label>
                <img src={`${HOST}/imgs/id_card_front.png`}/>
            </div>
            <div className="col-6">
            <label>Mặt sau</label>
                <img src={`${HOST}/imgs/id_card_back.png`}/>
            </div>
        </div>

        <div className="row bottom">
            <div className="col-6">
               <div className="card" onDrop={(e) => onDrop(e, 'front')} onDragLeave={(e) => onDragLeave(e)}  onDragOver={(e) => onDragOver(e)} onDragEnter={(e) => onDragEnter(e)}>
                    <video id="card-front" class={$_(isCamera && cameraFor === 'card-front' ? "d-block": null)} playsinline autoPlay width="320" height="200"></video>
                    { !(isCamera && cameraFor === 'card-front') ? <div>
                        {/* <div className="explain">
                            <p>Kéo thả ảnh vào đây</p>
                            <span>hoặc</span>
                        </div> */}
                        <div className="buttons-group">
                            <input onChange={(e) => onChangeFile(e, 'front')} type="file" id="input-file-front" accept="image/*" />
                            {/* <label for="input-file-front" class="button">
                                Tải lên
                            </label> */}
                            <button onClick={() => openCamera('card-front')}>
                                Chụp ảnh
                            </button>
                        </div>
                    </div> : <button className="btn-capture" onClick={() => captureImage('card-front-img')}>
                                Chụp ảnh
                            </button>}
                            <canvas class={$_(images.front ? "d-block desktop": null)} id="card-front-img" width="320" height="200"></canvas>
                            { images.front ?  <img onClick={() => clearImage('front')} className="ic-close" src={`${HOST}/imgs/ic_close.svg`}/> : null }
                    
               </div>
            </div>
            <div className="col-6">
                <div className="card" onDrop={(e) => onDrop(e, 'back')} onDragLeave={(e) => onDragLeave(e)}  onDragOver={(e) => onDragOver(e)} onDragEnter={(e) => onDragEnter(e)}>
                    <video id="card-back" class={$_(isCamera && cameraFor === 'card-back' ? "d-block": null)} playsinline autoPlay width="320" height="200"></video>
                    { !(isCamera && cameraFor === 'card-back') ? <div>
                        {/* <div className="explain">
                            <p>Kéo thả ảnh vào đây</p>
                            <span>hoặc</span>
                        </div> */}
                        <div className="buttons-group">
                            <input onChange={(e) => onChangeFile(e, 'back')} type="file" id="input-file-back" accept="image/*" />
                            {/* <label for="input-file-back" class="button">
                                Tải lên
                            </label> */}
                            <button onClick={() => openCamera('card-back')}>
                                Chụp ảnh
                            </button>
                        </div>
                    </div> : <button className="btn-capture" onClick={() => captureImage('card-back-img')}>
                                Chụp ảnh
                            </button>}
                            <canvas class={$_(images.back ? "d-block desktop": null)} id="card-back-img" width="320" height="200"></canvas>
                           { images.back ?  <img onClick={() => clearImage('back')} className="ic-close" src={`${HOST}/imgs/ic_close.svg`}/> : null }
                </div>
            </div>
            
        </div>
        
        {
            warning ? 
            <div className="warning-box">
                <img src={`${HOST}/imgs/ic_light-blue.svg`}/>
            <p>Ảnh CMND/ Thẻ CCCD của Quý khách chưa đủ rõ ràng, sắc nét (dưới <strong>90/100</strong> điểm).
    Quý khách nên <strong>chụp lại</strong> ảnh để tăng kết quả định danh.</p>
            </div> : null
        }
    </div>

}