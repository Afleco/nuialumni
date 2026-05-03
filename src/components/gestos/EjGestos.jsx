import Webcam from "react-webcam";
import { useRef, useState, useEffect } from "react";
import * as handTrack from 'handtrackjs';
import Texto from './Texto'

export default function EjGestos() {
  const [label, setLabel] = useState(null);
  // Estado para controlar el color de fondo, inicializado en 'pink'
  const [bgColor, setBgColor] = useState('pink');

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const defaultParams = {
    flipHorizontal: false,
    outputStride: 16,
    imageScaleFactor: 1,
    maxNumBoxes: 20,
    iouThreshold: 0.2,
    scoreThreshold: 0.6,
    modelType: "ssd320fpnlite",
    modelSize: "large",
    bboxLineWidth: "2",
    fontSize: 17,
  };

  // Solo carga el modelo
  const loadModel = async () => {
    const model = await handTrack.load(defaultParams);
    console.log("Model loaded");
    return model;
  };

  const runDetection = async (model) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const predictions = await model.detect(video);
      
      // Guardamos el gesto detectado en una variable ya que label congela su valor (stale closure)
      let gestoDetectado = null;
      if (predictions && predictions.length > 0) {
        gestoDetectado = predictions[0].label;
        setLabel(gestoDetectado); // Actualizamos el estado por si hiciera falta en otro lado
      }

      // Usamos 'gestoDetectado' en lugar de 'label' para comprobar qué gesto es
      if (gestoDetectado === "open") {
        console.log("scrolling down");
        window.scrollBy(0, window.innerHeight);
      } else if (gestoDetectado === "closed") {
        console.log("scrolling up");
        window.scrollBy(0, -window.innerHeight);
      } else if (gestoDetectado === "point") {
        console.log("pointing");
        setBgColor((prevColor) => prevColor === 'pink' ? 'lightblue' : 'pink');
      } else {
        console.log("detecting...");
      }
    }
  };
  

useEffect(() => {
    let intervalId; 
    let isMounted = true; // "bandera" para saber si el componente sigue vivo

    const init = async () => {
      const model = await loadModel();
      
      // 2arrancamos el temporizador si el componente no ha sido destruido por React
      if (isMounted) {
        intervalId = setInterval(() => {
          runDetection(model);
        }, 3000);
      }
    };

    init();

    return () => {
      // Si React destruye el componente, bajamos la bandera y limpiamos
      isMounted = false; 
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);
  
  return (
    <>
        <div style = {{
          alignItems: 'center',
          display: 'flex',
          // Sustituimos 'pink' por nuestra variable de estado bgColor
          backgroundColor: bgColor,
          flexDirection: 'column',
          }}>
            <div>
                <h3> Ejemplo Detección Gestos Mano: abierta, cerrada y apuntar </h3>
                <p> Tienes que conceder acceso a la webcam </p>
            </div>
            <div >
                <Webcam
                    ref={webcamRef}
                    style={{
                    width: 100,
                    height: 100,
                }}
            />
            <canvas
                ref={canvasRef}
                  style={{
                    width: 100,
                    height: 100,
                  }}
            />
        </div>
      </div>

      <Texto />
      
    </>
  );
}