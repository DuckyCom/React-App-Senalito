import React, { useEffect, useRef, useState } from 'react';
import { GestureRecognizer, FilesetResolver, DrawingUtils } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest";
import model from "./ModelMediapipe.task"
import "./interpretacion.css"

const HandGestureRecognizer = () => {
  const webcamRef = useRef(null); // Cambiado a webcamRef
  const canvasRef = useRef(null);
  const [gestureRecognizer, setGestureRecognizer] = useState(null);
  const [webcamRunning, setWebcamRunning] = useState(false);
  const gestureOutputRef = useRef(null);
  const [runningMode, setRunningMode] = useState("IMAGE");
  const [lastVideoTime, setLastVideoTime] = useState(-1);

  const videoWidth = 480;
  const videoHeight = 360;

  // Initialize GestureRecognizer once when the component mounts
  useEffect(() => {
    const createGestureRecognizer = async () => {
      const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm");
      const recognizer = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: model,
          delegate: "GPU",
          imageDimensions: { width: videoWidth, height: videoHeight } // Especifica las dimensiones
        },
        runningMode: "IMAGE"
      });
      setGestureRecognizer(recognizer);
    };

    createGestureRecognizer();
  }, []);

  useEffect(() => {
    const hasGetUserMedia = () => {
        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    };

    if (hasGetUserMedia()) {
        console.log("Webcam access is supported.");
    } else {
        console.warn("getUserMedia() is not supported by your browser");
    }
  }, []);

  const enableCam = async () => {
    if (!gestureRecognizer) {
        alert("Please wait for gestureRecognizer to load");
        return;
    }

    setWebcamRunning(prev => !prev);

    const constraints = { video: true };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (webcamRef.current) {
        webcamRef.current.srcObject = stream;  // Set the stream to the video element using ref
        webcamRef.current.addEventListener("loadeddata", predictWebcam);  // Call the predictWebcam function when video is loaded
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
    }
  };

  const predictWebcam = async () => {
    console.log("prueba")
    const canvasCtx = canvasRef.current.getContext("2d");
    const video = webcamRef.current; // Cambiado a webcamRef

    if (runningMode === "IMAGE") {
        setRunningMode("VIDEO");
        await gestureRecognizer.setOptions({ runningMode: "VIDEO" });
    }

    console.log(runningMode)

    let nowInMs = Date.now();
    if (video.currentTime !== lastVideoTime) {
        setLastVideoTime(video.currentTime);
        const results = await gestureRecognizer.recognizeForVideo(video, nowInMs);
        console.log(results)
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        const drawingUtils = new DrawingUtils(canvasCtx);

        if (results.landmarks) {
            for (const landmarks of results.landmarks) {
                drawingUtils.drawConnectors(landmarks, GestureRecognizer.HAND_CONNECTIONS, {
                    color: "#00FF00",
                    lineWidth: 5,
                });
                drawingUtils.drawLandmarks(landmarks, {
                    color: "#FF0000",
                    lineWidth: 2,
                });
            }
        }
        canvasCtx.restore();

        if (results.gestures.length > 0) {
            gestureOutputRef.current.style.display = "block";
            const categoryName = results.gestures[0][0].categoryName;
            const categoryScore = parseFloat(results.gestures[0][0].score * 100).toFixed(2);
            const handedness = results.handednesses[0][0].displayName;

            gestureOutputRef.current.innerText = `GestureRecognizer: ${categoryName}\n Confidence: ${categoryScore} %\n Handedness: ${handedness}`;
            console.log(`GestureRecognizer: ${categoryName}\n Confidence: ${categoryScore} %\n Handedness: ${handedness}`)
        } else {
            gestureOutputRef.current.style.display = "none";
        }

        // Keep predicting if webcam is running
        if (webcamRunning) {
            console.log("running")
            window.requestAnimationFrame(predictWebcam);
        }
    }
  };

  return (
    <div>
      <h1>Recognize hand gestures using the MediaPipe HandGestureRecognizer</h1>

      <section>
        <h2>Webcam continuous hand gesture detection</h2>
        <p>Use your hand to make gestures in front of the camera to get gesture classification.</p>
        <button onClick={enableCam} className="mdc-button mdc-button--raised">
          {webcamRunning ? "DISABLE WEBCAM" : "ENABLE WEBCAM"}
        </button>

        <div style={{ position: 'relative' }}>
          <video ref={webcamRef} autoPlay playsInline width={videoWidth} height={videoHeight} />
          <canvas ref={canvasRef} width={videoWidth} height={videoHeight} style={{ position: 'absolute', top: 0, left: 0 }} />
        </div>
        <p ref={gestureOutputRef} className="output" style={{ display: 'none', width: videoWidth }}></p>
      </section>
    </div>
  );
};

export default HandGestureRecognizer;
