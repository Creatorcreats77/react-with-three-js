import {useState, Suspense} from 'react'
import {Canvas} from '@react-three/fiber'
import Loader from '../components/Loader'
import HomeInfo from '../components/HomeInfo'
import CoffeCup from '../models/GBMcoffeCupSeed'
import  Sky  from '../models/Sky'

{/* <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
POPUP
</div> */}
const Home = () => {

  const [currentStage, setCurrentStage] = useState(1);
  const [isRotating, setIsRotating] = useState(false);

  const adjustCoffeCupForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -18, -43];
    let rotation = [0, 0, 0];

    if (window.innerWidth < 768) {
      screenScale = [10, 10, 10];
    } else {
      screenScale = [11, 11, 11];
    }

    return [screenScale, screenPosition, rotation];
  };

  const [coffeCupScale, coffeCupPosition, coffeCupRotation] = adjustCoffeCupForScreenSize();

  return (
    <section className='w-full h-screen relative'>
      <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>
      <Canvas
          className={`w-full h-screen bg-transparent ${
            isRotating ? "cursor-grabbing" : "cursor-grab"
          }`}
          camera={{ near: 0.1, far:1000}}
      >
        <Sky/>
        <Suspense fallback={<Loader/>}>
             <directionalLight position={[1, 1, 1]} intensity={3}/>
             <ambientLight intensity={1}/>
             {/* <pointLight/>
             <spotLight/> */}
             <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1}/>

             <CoffeCup 
              position={coffeCupPosition}
              scale={coffeCupScale}
              rotation={coffeCupRotation}
              isRotating={isRotating}
              setIsRotating={setIsRotating}
              setCurrentStage={setCurrentStage}
             />              
        </Suspense>

      </Canvas>
    </section>
  )
}

export default Home
