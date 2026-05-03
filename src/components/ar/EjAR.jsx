//Ejemplo de un cubo en RA
import { Canvas} from "@react-three/fiber";
import XrCone from './XrCone';
import XrCube from './XrCube';
import { ARButton, XR } from "@react-three/xr";


function EjAR(){


    return(
        <>
            <ARButton/>
            <Canvas>
                <XR>
                    <XrCone /> {/* Sustituimos el XrCube para renderizar el cono */}
                   
                </XR>
            </Canvas>
        </>
)

}

export default EjAR;