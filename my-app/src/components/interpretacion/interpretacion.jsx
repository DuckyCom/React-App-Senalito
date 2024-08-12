import React, { useEffect, useState } from 'react';
import * as tmImage from '@teachablemachine/image';
import Navbar from '../navbar/navbar';
import './interpretacion.css';
import '../img/Button.png'
import '../img/flechaaas.png'
const InterpretacionPage = () => {
    const [model, setModel] = useState(null);
    const [webcam, setWebcam] = useState(null);
    const [maxPredictions, setMaxPredictions] = useState(0);
    const [concatenatedText, setConcatenatedText] = useState('');
    const [detectedLetters, setDetectedLetters] = useState(new Set());

    useEffect(() => {
        loadFromCookies();
    }, []);

    const init = async () => {
        const modelURL = "./modelo/model.json";
        const metadataURL = "./modelo/metadata.json";

        const model = await tmImage.load(modelURL, metadataURL);
        setModel(model);
        setMaxPredictions(model.getTotalClasses());

        const webcam = new tmImage.Webcam(324, 185, true);
        await webcam.setup();
        await webcam.play();
        setWebcam(webcam);

        document.getElementById("start-area").style.display = "none";
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        document.querySelector('.webcam-container').style.display = 'block';

        setInterval(() => {
            document.getElementById("webcam-container").classList.remove('border-green');
            document.getElementById("webcam-container").classList.add('border-red');
            predict();
        }, 1000);
    };

    const predict = async () => {
        const prediction = await model.predict(webcam.canvas);
        let highestPrediction = { className: '', probability: 0 };

        for (let i = 0; i < maxPredictions; i++) {
            if (prediction[i].probability > highestPrediction.probability) {
                highestPrediction = prediction[i];
            }
        }

        const className = highestPrediction.className;
        const probability = highestPrediction.probability.toFixed(2);

        const classThresholds = {
            'Yo': 0.80,
            'O': 0.95,
            'I': 0.30,
            'Como': 0.35,
            'L': 0.40,
            'T': 0.70,
            'Estas': 0.50,
        };

        const classThreshold = classThresholds[className] || 0.85;

        if (highestPrediction.probability >= classThreshold && !detectedLetters.has(className)) {
            detectedLetters.add(className);
            setConcatenatedText(prevText => `${prevText} ${className}`);
            saveToCookies();
        }

        document.getElementById("webcam-container").classList.remove('border-red');
        document.getElementById("webcam-container").classList.add('border-green');
    };

    const removeLastPrediction = () => {
        setConcatenatedText(prevText => {
            const newText = prevText.slice(0, -1);
            detectedLetters.delete(newText[newText.length - 1]);
            return newText;
        });
        saveToCookies();
    };

    const clearAllPredictions = () => {
        setDetectedLetters(new Set());
        setConcatenatedText('');
        saveToCookies();
    };

    const speakText = () => {
        const utterance = new SpeechSynthesisUtterance(concatenatedText);
        utterance.lang = 'es-ES';
        window.speechSynthesis.speak(utterance);
    };

    const swapText = () => {
        const seña = document.querySelector('.switch-label:nth-of-type(1)');
        const vozTexto = document.querySelector('.switch-label:nth-of-type(2)');
        const temp = seña.textContent;
        seña.textContent = vozTexto.textContent;
        vozTexto.textContent = temp;
    };

    const saveToCookies = () => {
        document.cookie = `concatenatedText=${concatenatedText}; path=/; max-age=31536000;`;
    };

    const loadFromCookies = () => {
        const cookieArr = document.cookie.split(';');
        cookieArr.forEach(cookiePair => {
            const [key, value] = cookiePair.split('=');
            if (key.trim() === 'concatenatedText') {
                setConcatenatedText(value);
            }
        });
    };

    return (
        <div>
            {/* Implementar el diseño similar al HTML original con JSX */}
            <img src="Notificatiion bar.png" alt="Arriba" className="Arriba" />
            <div className="container">
                <div className="header">
                    <div className="title">
                        <img src="arrow-left.png" alt="atras" className="arrow-left" />
                        <h1 className="interpretacion">Interpretación</h1>
                    </div>
                    <p className="interpretation-text">Formato de interpretación</p>
                    <div className="switch-container">
                        <div className="switch switch1">
                            <h1 className="switch-label">Señas</h1>
                        </div>
                        <img src="flechaaas.png" alt="Flechas" className="flecha" onClick={swapText} />
                        <div className="switch switch2">
                            <h1 className="switch-label">Voz y texto</h1>
                        </div>
                    </div>
                    <div className="buttons">
                        <div id="start-area" className="start-area">
                            <button type="button" onClick={init} className="start-button">
                                <img src="Button.png" alt="Iniciar cámara" className="Boton" />
                            </button>
                        </div>
                        <div id="webcam-container" className="webcam-container"></div>
                    </div>
                    <div id="label-container" className="label-container">
                        <div id="concatenated-text">{concatenatedText}</div>
                        <img src="Altavoz.png" alt="Altavoz" className="altavoz" onClick={speakText} />
                        <button className="union-button" onClick={removeLastPrediction}>
                            <img src="Union.png" alt="Union" className="button-img" />
                        </button>
                        <button className="borrar-button" onClick={clearAllPredictions}>
                            <img src="Borrar.png" alt="Borrar" className="button-img" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterpretacionPage;
