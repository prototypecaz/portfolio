import React, { useEffect, useLayoutEffect, useRef } from 'react';
import Techno from './Techno';

function Projet({titreProjet,sousTitre,motsTechno,image,dive,setIndex,handleOver,blocProjet}) {


    const projetRef = useRef([])





    useLayoutEffect(() => {

      if(window.innerWidth >= 1280)
      {let mouseX = 0,
      mouseY = 0;
      let translateX = 0,
      translateY = 0;
      let isMouseOver = false;
      let animationId;

      const handleMouseEnter = (e) => {
        isMouseOver = true;
        dive.current.style.display = 'block';
        dive.current.style.transformOrigin = 'center center';
        dive.current.style.height = '10rem';
        dive.current.style.width = '13rem';
        var rect = blocProjet.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        translateX = mouseX;
        translateY = mouseY;

        dive.current.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${translateX}deg)`;

        animate();
      };

      const handleMouseMove = (e) => {
        if (isMouseOver) {
          var rect = blocProjet.getBoundingClientRect();
          mouseX = e.clientX - rect.left;
          mouseY = e.clientY - rect.top;
        }
      };

      const handleMouseLeave = () => {
        isMouseOver = false;
        dive.current.style.display = 'none';

        if (animationId) {
          cancelAnimationFrame(animationId);
        }
      };

      function animate() {
        if (isMouseOver) {
          translateX += (mouseX - translateX) * 0.1;
          translateY += (mouseY - translateY) * 0.1;
          dive.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
        } else {
          dive.current.style.transition = 'none';
        }

        animationId = requestAnimationFrame(animate);
      }

      blocProjet.addEventListener('mouseenter', handleMouseEnter);
      blocProjet.addEventListener('mousemove', handleMouseMove);
      blocProjet.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        blocProjet.removeEventListener('mouseenter', handleMouseEnter);
        blocProjet.removeEventListener('mousemove', handleMouseMove);
        blocProjet.removeEventListener('mouseleave', handleMouseLeave);

        if (animationId) {
          cancelAnimationFrame(animationId);
        }
      };}

      }, []);


      useEffect(()=>{
        const observer = new IntersectionObserver(([entry]) => {



          if (entry.isIntersecting) {


            entry.target.animate([{width:0}, { width: '100%'}], { duration: 800,fill:'forwards'});



          } else if (entry.target) {
            // When the element leaves the viewport, set strokeDashoffset back to the total length of the path
            entry.target.animate([{width:'100%'}, { width: 0}], { duration: 800,fill:'forwards'});


          }

        }, { root: null ,threshold: 1.0});

        if (projetRef.current) {


            observer.observe(projetRef.current);


        }

        return () => {
          if (projetRef.current) {
            observer.unobserve(projetRef.current);
          }
        };

      },[])

    return (
        <div onMouseEnter={(e)=> handleOver(e)} style={{paddingTop: '2rem'}}>

          <div className='projets'>
              <div className='sousTitreProjet'>
                  <p>{titreProjet}</p>
                  <span>{sousTitre}</span>
              </div>
              <div className='sousTitreProjet2'>
                  {motsTechno.map( x => <Techno mots={x}/>)}
              </div>

          </div>
          <div ref={projetRef} style={{width:'0',height:'0.05rem',backgroundColor:'white'}}></div>

        </div>
    );
}

export default Projet;