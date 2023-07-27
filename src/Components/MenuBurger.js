import React from 'react';

function MenuBurger(props) {






    return (

            <div id="containerBurger">


                <nav>

                        <ul id="navMenu">
                                <li><a className="ancre">Accueil</a></li>
                                <li><a className="ancre">A propos</a></li>
                                <li><a className="ancre">Mon histoire</a></li>
                                <li><a className="ancre">Projets</a></li>
                                <li><a className="ancre">Contact</a></li>
                        </ul>

                </nav>


                <div>
                        <div id='blocInformations'>
                               <div className='coordonnees'>
                                    <div><span className="coordonnee">06 89 76 62 44</span></div>
                                    <div><span className="coordonnee">guillaume.cazes21@gmail.com</span></div>

                               </div>
                               <div >
                                <ul className='reseauSociaux'>
                                        <li><img src="/images/facebook.png" alt="" className="reseau" /></li>
                                        <li><img src="/images/github.png" alt="" className="reseau" /></li>
                                        <li><img src="/images/instagram.png" alt="" className="reseau" /></li>
                                        <li>  <img src="/images/linkedin.png" alt="" className="reseau" /></li>
                                </ul>

                               </div>
                        </div>
                        <div>

                        </div>
                </div>

            </div>


    );
}

export default MenuBurger;