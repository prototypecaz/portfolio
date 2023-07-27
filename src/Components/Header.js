import React, { useEffect, useRef } from 'react';
import Burger from './Burger';
import MenuBurger from './MenuBurger';

function Header() {


    return (
        <header>
            <div>
                <span id="logo">GC</span>
            </div>


        <Burger/>
     
        </header>
    );
}

export default Header;