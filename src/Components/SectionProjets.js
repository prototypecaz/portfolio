import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import TextTime from './TextTime';
import Projet from './Projet';


const projets = [

    {
        titreProjet: "projet1",
        sousTitre:'sousTitre1',
        motsTechno:['javascript','php','react'],
        image:"/images/facebook.png"
    }
,

    {
        titreProjet: "projet1",
        sousTitre:'sousTitre1',
        motsTechno:['javascript','php','react'],
        image:"/images/github.png"
    }
,

    {
        titreProjet: "projet1",
        sousTitre:'sousTitre1',
        motsTechno:['javascript','php','react'],
        image:"/images/instagram.png"
    }
,

    {
        titreProjet: "projet1",
        sousTitre:'sousTitre1',
        motsTechno:['javascript','php','react'],
        image:"/images/linkedin.png"
    }

]




function SectionProjets(props) {

    const divVerte = useRef()
    const blocProjet = useRef(null)
    const [index,setIndex] = useState()
    const [img,setImg] = useState()

    const [isBlocProjetDefined, setIsBlocProjetDefined] = useState(false);

    useEffect(() => {
      if (blocProjet.current) {
        setIsBlocProjetDefined(true);
      }
    }, []);

    const handleOver = (e) => {
        if(window.innerWidth >= 1280){
        let node = blocProjet.current.childNodes;
        const index = [...node].indexOf(e.currentTarget);

        // Utilisez l'image préchargée.
        setImg(projets[index].image);}
    }

    return (
        <div id="sectionProjets">
            <TextTime mots="Projets || Work"/>
            <div id="blocProjets" ref={blocProjet} style={{position:'relative'}}>
                {isBlocProjetDefined && projets.map((x, i) => <Projet key={i} blocProjet={blocProjet.current} setIndex={setIndex} handleOver={handleOver} dive={divVerte} titreProjet={x.titreProjet} sousTitre={x.sousTitre} motsTechno={x.motsTechno} image={x.image}/>)}
                <div ref={divVerte} className='teste'>
                    <img className='imageProjet' src={img}/>
                </div>
            </div>
        </div>
    );
}

export default SectionProjets;