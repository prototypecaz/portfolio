import React, { useState } from 'react';
import RowBurger from './RowBurger';

function Burger(props) {


    const [clique,setClique] = useState(false)

    const handleClic = ()=>{
        let containeBurger = document.querySelector("#containerBurger")
        //let body = document.querySelector('body')
        containeBurger.style.willChange = 'clip-path'
        containeBurger.classList.toggle('expanded')
        

        //body.classList.toggle('overBody')
            /*let anime = document.querySelectorAll('.anime')

            anime.forEach(element => {
                element.classList.toggle('animeTransition')
            });*/

            setClique(!clique)

    }




    return (
        <div onClick={handleClic}  id='burger'>
            <RowBurger clique={clique} nameClass='firstRow'/>
            <RowBurger clique={clique} nameClass='secondRow'/>
            <RowBurger clique={clique} nameClass='thirdRow'/>
        </div>
    );
}

export default Burger;