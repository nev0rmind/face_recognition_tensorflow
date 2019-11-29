"use strict";

/*
COPYPASTECOPYPASTE
Import API & Monkeypatch aus Python for NodeJS 

Uncaught (in promise) Error: ENOENT: no such file or directory, 
open './assets/shards/tiny_face_detector_model-weights_manifest.json'
*/
/*
import * as faceapi from 'face-api.js';

faceapi.env.monkeyPatch({
    Canvas: HTMLCanvasElement,
    Image: HTMLImageElement,
    ImageData: ImageData,
    Video: HTMLVideoElement,
    createCanvasElement: () => document.createElement('canvas'),
    createImageElement: () => document.createElement('img')
  });

*/

// Starte video Stream

const video = document.querySelector("#video");

// Alternativer Videostart mit asynchroner Funktion

let loadVideo = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {}
    });
    video.srcObject = stream;
    return new Promise((resolve => {
        video.onloadmetadata = () => {
            resolve(video)
        }
    }))
};

// Einbinden der Models

const MODEL_URL = "/assets/shards"

Promise.all([
    //Nur der Tiny Face Detector läuft im Browser
    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
]).then(loadVideo())

/*
await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
await faceapi.loadFaceLandmarkModel(MODEL_URL);
await faceapi.loadFaceRecognitionModel(MODEL_URL);

"Default: SSD Mobilenet V1 Face Detector"

const detectionSSD = await faceapi.detectAllFaces(input, new faceapi.SsdMobilenetv1Options())
const detectionsTinyFace = await faceapi.detectAllFaces(input, new faceapi.TinyFaceDetectorOptions())
const detectionsMtcnn = await faceapi.detectAllFaces(input, new faceapi.MtcnnOptions())
*/

// Define Input: Accepted Values: html-images, canvas & video


video.addEventListener("play", async () => {
    let detectedFaces = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
    console.log(detectedFaces);
});
