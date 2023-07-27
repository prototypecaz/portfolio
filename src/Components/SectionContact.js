import { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'

export default function SectionContact() {

    const ref = useRef()


    const [vue,setVue] = useState(false)


  useEffect(() => {

    //const length = path.current.getTotalLength();
    let entrer = false


    const observer = new IntersectionObserver(([entry]) => {


      if (entry.isIntersecting ) {


        setVue(true)
        entry.target.animate([{opacity:0}, { opacity:1}], { duration: 800,fill:'forwards'});
        entrer = true


      }  else if (entry.target && entrer ) {
        // When the element leaves the viewport, set strokeDashoffset back to the total length of the path
        console.log('testsorti')

       const animation =  entry.target.animate([{opacity:1}, { opacity:0}], { duration: 800,fill:'forwards'});

       animation.onfinish = () => {
        setVue(false);
        entrer = false// Définir setVue sur false à la fin de l'animation
      };
      }

    }, { root: null ,threshold: 0.5});

    if (ref.current) {


        observer.observe(ref.current);


    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };



  }, []);


  return (
    <>
    <div id='sectionContact'>
    <Canvas id='canvasStar' ref={ref} style={{height:'100%',position:'absolute',top:0}} camera={{ position: [0, 0, 1] }}>
        {vue && <Stars/>}
    </Canvas>

        <form>
            <div>
                <input className='inputContact' type="text" placeholder='Nom'/>
                <input className='inputContact' type="text" placeholder='Prenom'/>
            </div>
            <input type="text" className='inputContact inputContactObjet' placeholder='Objet'/>

            <textarea placeholder='Votre message ...'>

            </textarea>

            <button className='btnForm' type='submit'>Envoyer</button>
        </form>


    <img id='moon' src="/images/moon.png"/>
    </div>

    </>
  )
}

function Stars(props) {


  const ref = useRef()
  const [sphere] = useState(() => random.inSphere(new Float32Array(1500), { radius: 1.5 }))


  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10
    ref.current.rotation.y -= delta / 15
  })
  return (

    <group className='stars' rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref}   positions={sphere} stride={3} frustumCulled={false} {...props} >
        <PointMaterial transparent color="white" size={0.003} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  )
}