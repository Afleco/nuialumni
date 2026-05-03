import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

function XrTriangulo() {
    const trianguloRef = useRef();
    
    // Dejamos la rotación en el eje Y y X para que se vea bien el movimiento
    useFrame((state, delta) => {
        trianguloRef.current.rotation.y += delta;
        trianguloRef.current.rotation.x += delta * 0.5; // Un poco más lento en X
    });

    return (<>
        <OrbitControls />
        <ambientLight />
        
        <mesh ref={trianguloRef} position={[0, 0, -5]}>
            {/* Usamos coneGeometry. Sus parámetros (args) son:
                [radio de la base, altura, número de lados] 
                ¡Al poner 3 lados, creamos una pirámide triangular! */}
            <coneGeometry args={[1.5, 3, 32]}/>
            
            {/* Le ponemos un color llamativo, por ejemplo verde lima */}
            <meshStandardMaterial color='limegreen' />
        </mesh>
    </>)
}

export default XrTriangulo;