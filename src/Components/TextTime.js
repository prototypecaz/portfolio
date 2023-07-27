import { useScroll } from '@react-three/drei';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

function TextTime({mots}) {

    const texte = document.querySelectorAll('span')
    let tableauAlphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

let boucle = 0
var mot = mots.split('')
const divRef = useRef()
const [spane,setSpane] = useState([])

function time (){

console.log('ok')
    if(boucle < 8 && spane !== []){

      setTimeout(() => {
        boucle++

          spane.forEach((element,index) => {

            if(index !== 7 && index !== 10){
              element.textContent = tableauAlphabet[Math.floor(Math.random() * tableauAlphabet.length)];}

        });

       time()
      }, 30);
    }else{
      spane.forEach((element,index) => {
         element.textContent=mot[index]
        boucle = 0
        });
    }
  }


useEffect(()=>{

const spaneCopy = []
    for(var i = 0 ; i < mot.length; i++){
        let span = document.createElement('span')

        spaneCopy.push(span)
        divRef.current.appendChild(span)
    }

    setSpane(spaneCopy)



},[])


useEffect(()=>{


    const observer = new IntersectionObserver(
        ([entry]) => {
          // Logic for when the element is in view or not
          if (entry.isIntersecting) {
            time()


          }
        },
        {
          // Options for the observer
          root: null,
          threshold: 1.0
        }
      );

      if (divRef.current) {
        observer.observe(divRef.current);

      }

      return () => {
        if (divRef.current) {
          observer.unobserve(divRef.current);
        }
      };


})






    return (
        <div id='titreProjet' ref={divRef}>

        </div>
    );
}

export default TextTime;