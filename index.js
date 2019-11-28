"use strict";

/*


navigator.getUserMedia = (
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia
);

if (typeof navigator.mediaDevices.getUserMedia === 'undefined') {
    navigator.getUserMedia({
        video: true
    }, streamHandler, errorHandler);
} else {
    navigator.mediaDevices.getUserMedia({
        video: true
    }).then(streamHandler).catch(errorHandler);
}
*/

// Starte Webcam Video 

const video = document.querySelector("#video");

function getVideo() {
    navigator.mediaDevices.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => error.log( err || "Video läuft.")
    )
}

getVideo();
