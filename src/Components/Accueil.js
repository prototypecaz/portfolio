import React, { useEffect, useRef, useState } from 'react';
import Matrix from './Matrix';
import Header from './Header';
import PixelPart from './PixelPart';
import MenuBurger from './MenuBurger';
import RainMatrix from './RainMatrix';

function Accueil() {
    const accueil = useRef(null)
    const sousAccueil = useRef(null)
    const [taille, setTaille] = useState(window.innerWidth >= 1281)

    useEffect(() => {
        const scrollHandler = (e) => {
            let scrollPosition = window.scrollY || document.documentElement.scrollTop;
            let degre = (Math.floor(scrollPosition / 20) * 0.7)

            if (degre <= 70) {
                sousAccueil.current.style.transform = `perspective(1500px) rotateY(${degre}deg) translateY(${-degre*2}px)`;
            }
        }

        const resizeHandler = () => setTaille(window.innerWidth >= 1281);

        window.addEventListener('scroll', scrollHandler);
        window.addEventListener('resize', resizeHandler);

        // Clean up the effect on unmount
        return () => {
            window.removeEventListener('scroll', scrollHandler);
            window.removeEventListener('resize', resizeHandler);
        }
    }, [])


    console.log(taille)
    return (
        <div ref={accueil} id="accueil">
            <div ref={sousAccueil} id="sousAccueil">
                <Header/>
                <div id="sousHeader" >
                    <div style={{width:'50%',position:'relative',height:'100%',display:'flex',justifyContent:'center'}}>
                        <div className='blocTitre'>
                            <div>
                                <h1 id="titreAccueil">Développeur Web <br/> et Web Mobile</h1>
                            </div>
                            <div>
                                <svg id="arrowBottom" viewBox="0 0 92 92">
                                    <path d="M73.8 57.9l-25 24.9C48 83.6 47 84 46 84s-2-.4-2.8-1.2l-25-24.9c-1.6-1.6-1.6-4.1 0-5.7 1.6-1.6 4.1-1.6 5.7 0L42 70.4V12c0-2.2 1.8-4 4-4s4 1.8 4 4v58.4l18.2-18.1c1.6-1.6 4.1-1.6 5.7 0 1.5 1.5 1.5 4-.1 5.6z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className='blocPhoto'>
                        <PixelPart/>
                        {taille && <RainMatrix/>}
                    </div>
                </div>
                <MenuBurger/>
            </div>
        </div>
    );
}

export default Accueil;
