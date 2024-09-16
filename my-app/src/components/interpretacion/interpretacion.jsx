import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import * as tfjs from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';
import Navbar from '../navbar/navbar';
import './interpretacion.css';
import Flechas from './imgs/FlechaCambio.png';
import Altavoz from './imgs/Altavoz.png';
import FlechaAtras from './imgs/FlechaAtras.png';
import Borrar from './imgs/Borrar.png';
import BotonC from './imgs/BotonCamara.png';
import BorrarTodo from './imgs/BorrarTodo.png';

const InterpretacionPage = () => {
  let model, webcam, maxPredictions;
  const threshold = 0.85;           
  const detectedLetters = new Set();
  const [concatenatedText, setConcatenatedText] = useState('');
  const navigate = useNavigate(); // Hook para redirección

  useEffect(() => {
    loadFromCookies(); // Cargar el texto almacenado en cookies al iniciar el componente
  }, []);

  const classThresholds = {
    'Yo': 0.80,
    'O': 0.95,
    'I': 0.90,
    'Como': 0.90,
    'L': 0.40,
    'T': 0.70,
    'Estas': 0.90,
  };

  async function init() {
    const modelURL = "./modelo/model.json";
    const metadataURL = "./modelo/metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    const flip = true;
    webcam = new tmImage.Webcam(324, 185, flip);
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(loop);

    document.getElementById("start-area").style.display = "none";
    document.getElementById("webcam-container").style.display = 'block';
    document.getElementById("webcam-container").appendChild(webcam.canvas);

    setInterval(() => {
      document.getElementById("webcam-container").classList.remove('border-green');
      document.getElementById("webcam-container").classList.add('border-red');
      predict();
    }, 1000);
  }

  async function loop() {
    webcam.update();
    window.requestAnimationFrame(loop);
  }

  async function predict() {
    const prediction = await model.predict(webcam.canvas);
    let highestPrediction = { className: '', probability: 0 };

    for (let i = 0; i < maxPredictions; i++) {
      if (prediction[i].probability > highestPrediction.probability) {
        highestPrediction = prediction[i];
      }
    }

    const className = highestPrediction.className;
    const classThreshold = classThresholds[className] || threshold;

    if (highestPrediction.probability >= classThreshold && !detectedLetters.has(className)) {
      detectedLetters.add(className);
      setConcatenatedText(prevText => {
        const newText = `${prevText} ${className}`.trim();
        saveToCookies(newText);
        return newText;
      });
    }

    document.getElementById("webcam-container").classList.remove('border-red');
    document.getElementById("webcam-container").classList.add('border-green');
  }

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
        onClick={() => navigate('/home')} // Redirige a /home al hacer clic
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
            <div id="start-area" className="start-area">
              <button type="button" onClick={init} className="start-button">
                <img src={BotonC} alt="Iniciar cámara" className="Boton" />
              </button>
            </div>
            <div id="webcam-container" className="webcam-container" style={{ display: 'none' }}></div>
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
