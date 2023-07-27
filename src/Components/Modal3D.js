import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, extend, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { ShaderMaterial, Color, BackSide, AdditiveBlending, MeshBasicMaterial, MeshStandardMaterial, TextureLoader, FrontSide, Clock } from 'three';
import { Bloom, DepthOfField, EffectComposer, Glitch, GodRays, Noise, SMAA, ToneMapping, Vignette } from '@react-three/postprocessing';

// Extend permet d'utiliser Three.js native ShaderMaterial dans react-three-fiber
extend({ ShaderMaterial });

// Code du shader pour l'effet de lueur de halo
const GlowShaderMaterial = {
  uniforms: {
    glowColor: { value: new Color('white') },
    mapTexture: { type: 't', value: null }
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal; // Déclarez vNormal ici.
    void main() 
    {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal); // Assignez une valeur à vNormal ici.
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,
  fragmentShader: `
    varying vec2 vUv;
    varying vec3 vNormal; // Maintenant, vous pouvez l'utiliser ici.
    uniform vec3 glowColor;
    uniform sampler2D mapTexture;
    void main() 
    {
      vec4 texColor = texture2D(mapTexture, vUv);
      float intensity = 0.12 + 0.8 * pow(abs(dot(vNormal, vec3(1.0, 0.0, 0.0))), 8.0);
      gl_FragColor = vec4(glowColor * texColor.rgb, 5.0) * intensity;
    }`,
  side: FrontSide,
  transparent: true,
  blending: AdditiveBlending
};


const Model = () => {
  const ref = useRef();
  const object = useLoader(OBJLoader, '/portfolio/MaleHologram.obj');
  const texture = useLoader(TextureLoader, '/portfolio/teste4.png'); // Chargez votre texture comme avant.


  object.traverse((child) => {
    if (child.isMesh) {
      child.material = new ShaderMaterial({ ...GlowShaderMaterial, uniforms: { ...GlowShaderMaterial.uniforms, mapTexture: { value: texture } } });
    }
  });


  

  useFrame(({clock}) => {




    if (ref.current ) {
     
  
      ref.current.rotation.y = -clock.getElapsedTime()*1.3
      
      ref.current.position.y = -0.92;
      
    }
  });

  

  return <primitive  object={object} ref={ref} />;
 
};
export default function Modal3D() {




  return (
    <>

    <Canvas style={{height:'100%'}}
     camera={{ position: [0, 1, 1.8] }}
    >
      
    <OrbitControls enableZoom={false}  maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
      <EffectComposer   multisampling={0} // Désactive l'anti-aliasing pour éviter les pixels indésirables
      depthTexture={true} // Active la texture de profondeur pour des effets plus précis
      renderToScreen={true}> // Affiche le résultat final à l'écran
    <SMAA />
        <Bloom luminanceThreshold={0} kernelSize={0} luminanceSmoothing={0.1} intensity={1} />
      
      </EffectComposer>
      
    
     

      <Model/>


    </Canvas>


</>
    
  );
}
