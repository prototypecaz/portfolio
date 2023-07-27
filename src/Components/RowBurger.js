import React, { useEffect, useRef } from 'react';

function RowBurger({clique,nameClass}) {


    const ref = useRef(null)


    useEffect(()=>{
       ref.current.classList.toggle(nameClass)
    },[clique])



    return (
        <div ref={ref} className='rowBurger'>

        </div>
    );
}

export default RowBurger;