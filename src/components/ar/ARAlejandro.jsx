import Dashboard from '../Dashboard';
// Si el archivo lo creas dentro de la carpeta 'ar', 
// puede que necesites importar Dashboard así: import Dashboard from '../Dashboard';
// Depende de dónde lo guardes, ¡fíjate en tus otras importaciones!

import { Canvas } from "@react-three/fiber";
import { ARButton, XR } from "@react-three/xr";
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Suspense } from 'react';

// Componente que carga el conejo
function ModeloConejo() {
    const gltf = useLoader(GLTFLoader, '/Bunny.glb');
    
    // Lo posicionamos a la altura de los ojos (Y=0) y un poco hacia atrás (Z=-5)
    return <primitive object={gltf.scene} position={[0, -1, -5]} scale={1.5} />;
}

// Componente principal de la página
export default function ARAlejandro() {
    return (
        <>
            <Dashboard />
            <div style={{ padding: '20px' }}>
                <h3>Modelo 3D de Alejandro (Bunny) en Realidad Aumentada</h3>
            </div>
            
            {/* Altura del Canvas*/}
            <div style={{ height: '600px', width: '100%' }}>
                <ARButton />
                <Canvas>
                    <XR>
                        <ambientLight intensity={1.5} />
                        <directionalLight position={[10, 10, 10]} intensity={2} />
                        
                        {/* Suspense es obligatorio en React al cargar cosas asíncronas como modelos 3D */}
                        <Suspense fallback={null}>
                            <ModeloConejo />
                        </Suspense>
                    </XR>
                </Canvas>
            </div>
        </>
    );
}