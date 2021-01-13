'use strict';
import { postAPI, getAPI } from 'root/shared/api';

// Put variables in global scope to make them available to the browser console.
const constraints = window.constraints = {
    audio: false,
    video: true
  };
  
function handleSuccess(stream, idVideo) {
    // const video = document.querySelector('video');
    const video = document.getElementById(idVideo);
    const videoTracks = stream.getVideoTracks();
    console.log('Got stream with constraints:', constraints);
    console.log(`Using video device: ${videoTracks[0].label}`);
    window.stream = stream; // make variable available to browser console
    video.srcObject = stream;

    return video;
}
  
function handleError(error) {
    if (error.name === 'ConstraintNotSatisfiedError') {
      const v = constraints.video;
      errorMsg(`The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`);
    } else if (error.name === 'PermissionDeniedError' || error.name === 'NotAllowedError') {
      errorMsg('Chúng tôi cần sử dụng camera của bạn để việc mở tài khoản nhanh hơn. Vui lòng chọn Cho phép/ Allow');
    } else {
        errorMsg('Chúng tôi không thể truy xuất vào camera do bảo mật của thiết bị. Vui lòng xem và làm theo hướng dẫn cụ thể tại đây.', true);
    }
}
  
function errorMsg(msg, forceHelp = false) {
    alert(msg);
    if (forceHelp) {
        let link = `${HOST}/docs/huongdan_ekyc${checkIsMobile() ? '_mobile' : ''}.pdf`;
        window.open(link);
    }
  }
  
export async function accessCamera(idVideo, options = constraints) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(options);
      if (!idVideo) {
          return stream;
      }
      return handleSuccess(stream, idVideo);
    //   e.target.disabled = true;
    } catch (err) {
      handleError(err);
      return null;
    }
}
export async function checkHaveCamera() {
    try {
      const stream = await accessCamera(null)
      if (!stream) {
          return false;
      }
      stopCamera(stream);
      return true;
    } catch (err) {
        return false;
    }
}
export function captureToBase64(videoStream, options = { width: 320, height: 240 }) {
    if (!videoStream) {
        return null;
    }    // const canvas = document.createElement("CANVAS");

    const canvas = window.canvas = document.querySelector('canvas');

    canvas.width = 960;
    canvas.height = 720;


    // if (width > height) {

    //} else {

    //}
    // canvas.width = 960;

    // canvas.height = 640;

    canvas.getContext('2d').drawImage(videoStream, 0, 0, canvas.width, canvas.height);
   
    return canvas.toDataURL('image/jpeg', 1.0)
}
export function capture(idCanvas, videoStream, isMobile = false) {
    return drawImage(idCanvas, videoStream, isMobile);
}
export function drawImage(id, data, isMobile = false) {
    const canvas = document.getElementById(id);

    if (!canvas) {
        return null;
    }
    canvas.width = 960;
    canvas.height = 720;
    const canvasContext = canvas.getContext('2d');
    
    if (isMobile) {
        let _dom = document.querySelector("div.video_box");

        let _size = _dom.getBoundingClientRect();
        let image_x_offset = Math.abs(_size.width - data.videoWidth) * 0.5;
        let image_y_offset = Math.abs(_size.height - data.videoHeight) * 0.5;

        canvasContext.drawImage(data,
                image_x_offset, image_y_offset,   // Start at 10 pixels from the left and the top of the image (crop),
                _size.width, _size.height,   // "Get" a `80 * 30` (w * h) area from the source image (crop),
                0, 0,     // Place the result at 0, 0 in the canvas,
                960, 720); // With as width / height: 160 * 60 (scale)
    } else {
        canvasContext.drawImage(data, 0, 0, canvas.width, canvas.height);
    }

    return canvas;
}

export function clearImageCanvas(canvas) {
    if (!canvas) return;
    const context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);
}

export function stopCamera(stream = window.stream) {
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(function(track) {
            track.stop();
        });
    }
}

export async function convertCanvasToImageFile(canvas, filename) {
    if (!canvas) {
        return null;
    }
    // const context = canvas.getContext('2d');
    return new Promise((resolve, reject) => {
        // resolve(dataURItoBlob(canvas.toDataURL()));
        resolve(dataURLtoFile(canvas.toDataURL('image/jpeg', 1.0), filename))
        // canvas.toBlob(function(blob){
        //     resolve(blob);
        // }, 'image/jpeg', 0.95)
    })
    // return dataURItoBlob(canvas.toDataURL())
}
export async function getCameraDevices() {
    let gotDevices = await navigator.mediaDevices.enumerateDevices();
    let body = {
        camera: gotDevices.filter(device => device.kind == 'videoinput'),
        width: window.innerWidth,
        height: window.innerHeight
    }
    return gotDevices.filter(device => device.kind == 'videoinput');
}
export function checkIsMobile() {
    let ua = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    return ua || window.innerWidth <= 800;
}


function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type:mimeString});
}

export async function sendFile(path, body, headers = {}) {
    return await postAPI(path, null, body, headers)
}

export async function getActions(draftId) {
    const { data } = await getAPI("v1/ekyc/face-auth/actions/" +draftId);
    if (!data) {
        return null;
    }
    let { noiDungHanhDongs, thoiGianQuayVideo, soAnhGuiLenTrong1s } = data;
    let totalTime = +thoiGianQuayVideo + 1;

    let i = noiDungHanhDongs.length - 1;
    let actions = [];
    while (i > -1) {
        let action = noiDungHanhDongs[i];
        action = { 
            ...action,
            thoiGianHanhDong: +action.thoiGianHanhDong,
            thoiGianThucHien: totalTime - +action.thoiGianHanhDong
        }
        actions.unshift(action);
        totalTime = +action.thoiGianHanhDong;
        i--;
    }
    return { 
        original: data,
        thoiGianQuayVideo: +thoiGianQuayVideo,
        soAnhGuiLenTrong1s: +soAnhGuiLenTrong1s,
        noiDungHanhDongs: actions
    }

}

function dataURLtoFile(dataurl, filename) {
 
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }

    var ext  = mime.split('/')[1];
    
    return new File([u8arr], filename + '.' + ext, {type:mime});
}

export async function fetchData(path) {
    try {
        let url = new window.URL(`${HOST}/${path}`);

        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                // 'Content-Type': 'multipart/form-data;',
            },
            referrerPolicy: 'no-referrer',
        });

        let result = await response.json();

        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
}
export async function postData(path, body) {
    return await postAPI(path, null, JSON.stringify(body), {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    });
}