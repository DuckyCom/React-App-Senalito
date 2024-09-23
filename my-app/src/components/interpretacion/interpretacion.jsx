import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import { FilesetResolver, GestureRecognizer } from "@mediapipe/tasks-vision";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { HAND_CONNECTIONS } from "@mediapipe/hands";
import Navbar from '../navbar/navbar';
import './interpretacion.css';
import Flechas from './imgs/FlechaCambio.png';
import Altavoz from './imgs/Altavoz.png';
import FlechaAtras from './imgs/FlechaAtras.png';
import Borrar from './imgs/Borrar.png';
import BotonC from './imgs/BotonCamara.png';
import BorrarTodo from './imgs/BorrarTodo.png';
import Webcam from "react-webcam";

const InterpretacionPage = () => {
  const [concatenatedText, setConcatenatedText] = useState('');
  const [gestureOutput, setGestureOutput] = useState('');
  const [gestureRecognizer, setGestureRecognizer] = useState(null);
  const [webcamRunning, setWebcamRunning] = useState(false);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const detectedLetters = new Set();
  const navigate = useNavigate(); // Hook para redirección
  const threshold = 0.85;

  useEffect(() => {
    loadFromCookies();
  }, []);

  // Cargar GestureRecognizer con el modelo de prueba
  async function loadGestureRecognizer() {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );
    const recognizer = await GestureRecognizer.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task", // Ruta directa del modelo
      },
      numHands: 2,
      runningMode: "VIDEO",
    });
    setGestureRecognizer(recognizer);
  }

  useEffect(() => {
    loadGestureRecognizer();
  }, []);

  const predictWebcam = useCallback(() => {
    if (!gestureRecognizer) return;

    const nowInMs = Date.now();
    const results = gestureRecognizer.recognizeForVideo(
      webcamRef.current.video,
      nowInMs
    );

    const canvasCtx = canvasRef.current.getContext("2d");
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    webcamRef.current.video.width = videoWidth;
    webcamRef.current.video.height = videoHeight;
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    // Dibuja los landmarks y conexiones de la mano
    if (results.landmarks) {
      for (const landmarks of results.landmarks) {
        drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 5,
        });
        drawLandmarks(canvasCtx, landmarks, { color: "#FF0000", lineWidth: 2 });
      }
    }

    // Procesa las predicciones de gestos
    if (results.gestures.length > 0) {
      const gestureName = results.gestures[0][0].categoryName;
      const gestureScore = results.gestures[0][0].score;

      if (gestureScore >= threshold && !detectedLetters.has(gestureName)) {
        detectedLetters.add(gestureName);
        setConcatenatedText((prevText) => {
          const newText = `${prevText} ${gestureName}`.trim();
          saveToCookies(newText);
          return newText;
        });
      }
      setGestureOutput(gestureName);
    } else {
      setGestureOutput("");
    }

    if (webcamRunning) {
      requestAnimationFrame(predictWebcam);
    }
  }, [gestureRecognizer, webcamRunning]);

  const enableCam = useCallback(() => {
    if (!gestureRecognizer) {
      alert("Please wait for gestureRecognizer to load");
      return;
    }

    if (webcamRunning) {
      setWebcamRunning(false);
      cancelAnimationFrame(predictWebcam);
    } else {
      setWebcamRunning(true);
      requestAnimationFrame(predictWebcam);
    }
  }, [gestureRecognizer, webcamRunning, predictWebcam]);

  function removeLastPrediction() {
    setConcatenatedText(prevText => {
      const words = prevText.split(' ').filter(word => word.length > 0);
      if (words.length > 0) {
        const lastWord = words.pop();
        detectedLetters.delete(lastWord);
        const newText = words.join(' ');
        saveToCookies(newText);
        return newText;
      }
      return prevText;
    });
  }

  function clearAllPredictions() {
    detectedLetters.clear();
    setConcatenatedText('');
    saveToCookies('');
  }

  function speakText() {
    const utterance = new SpeechSynthesisUtterance(concatenatedText);
    utterance.lang = 'es-ES';
    window.speechSynthesis.speak(utterance);
  }

  function swapText() {
    const seña = document.querySelector('.switch-label:nth-of-type(1)');
    const vozTexto = document.querySelector('.switch-label:nth-of-type(2)');
    const temp = seña.textContent;
    seña.textContent = vozTexto.textContent;
    vozTexto.textContent = temp;
  }

  function saveToCookies(text) {
    document.cookie = `concatenatedText=${text}; path=/; max-age=31536000;`;
  }

  function loadFromCookies() {
    const cookieArr = document.cookie.split(';');
    for (let i = 0; i < cookieArr.length; i++) {
      const cookiePair = cookieArr[i].split('=');
      if (cookiePair[0].trim() === 'concatenatedText') {
        const text = cookiePair[1] || '';
        setConcatenatedText(text);
        text.split(' ').forEach(word => detectedLetters.add(word));
      }
    }
  }

  return (
    <div>
      <div className="container">
        <div className="header">
          <div className="title">
            <img
              src={FlechaAtras}
              alt="atras"
              className="arrow-left"
              onClick={() => navigate('/home')} 
            />
            <h1 className="interpretacion">Interpretación</h1>
          </div>
          <p className="interpretation-text">Formato de interpretación</p>
          <div className="switch-container">
            <div className="switch switch1">
              <h1 className="switch-label">Señas</h1>
            </div>
            <img src={Flechas} alt="Flechas" className="flecha" onClick={swapText} />
            <div className="switch switch2">
              <h1 className="switch-label">Voz y texto</h1>
            </div>
          </div>
          <div className="buttons">
            <button type="button" onClick={enableCam} className="start-button">
              <img src={BotonC} alt="Iniciar cámara" className="Boton" />
            </button>
            <div id="webcam-container" className="webcam-container">
              <Webcam audio={false} ref={webcamRef} className="webcam" />
              <canvas ref={canvasRef} className="webcam-canvas"></canvas>
            </div>
          </div>
          <div id="label-container" className="label-container">
            <div id="concatenated-text">{concatenatedText}</div>
            <img src={Altavoz} alt="Altavoz" className="altavoz" onClick={speakText} />
            <button className="union-button" onClick={removeLastPrediction}>
              <img src={Borrar} alt="Borrar" className="button-img" />
            </button>
            <button className="borrar-button" onClick={clearAllPredictions}>
              <img src={BorrarTodo} alt="Borrar todo" className="button-img" />
            </button>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default InterpretacionPage;