"use strict";(self.webpackChunkportfolio=self.webpackChunkportfolio||[]).push([[309],{3309:function(e,t,r){r.r(t),r.d(t,{default:function(){return f}});var n=r(3433),o=r(9439),s=r(2791),i=r(3441),c=r(184);var a=function(e){var t,r=e.mots,n=(document.querySelectorAll("span"),["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","1","2","3","4","5","6","7","8","9","0"]),a=0,u=r.split(""),l=(0,s.useRef)(),m=(0,s.useState)([]),f=(0,o.Z)(m,2),d=f[0],h=f[1],p=(0,i.YD)({threshold:.1}),v=(0,o.Z)(p,2),j=v[0],x=v[1],g=(t=[l,j],function(e){t.forEach((function(t){"function"===typeof t?t(e):null!==t&&(t.current=e)}))});function b(){a<8&&d!==[]?setTimeout((function(){a++,d.forEach((function(e,t){7!==t&&10!==t&&(e.textContent=n[Math.floor(Math.random()*n.length)])})),b()}),30):d.forEach((function(e,t){e.textContent=u[t],a=0}))}return(0,s.useEffect)((function(){var e=[];l.current.innerHTML="";for(var t=0;t<u.length;t++){var n=document.createElement("span");n.textContent=r[t],e.push(n),l.current.appendChild(n)}h(e)}),[]),(0,s.useEffect)((function(){x&&b()}),[x]),(0,c.jsx)("div",{id:"titreProjet",ref:g,style:{color:"white"}})};var u=function(e){var t=e.mots;return(0,c.jsx)("div",{className:"techno",children:t})};var l=function(e){var t=e.titreProjet,r=e.sousTitre,n=e.motsTechno,a=e.dive,l=e.handleOver,m=e.blocProjet,f=e.lien,d=(0,s.useRef)([]),h=(0,s.useState)(!1),p=(0,o.Z)(h,2),v=p[0],j=p[1],x=(0,i.YD)({triggerOnce:!0,threshold:.1}),g=(0,o.Z)(x,3),b=g[0],y=g[1],T=g[2];return(0,s.useEffect)((function(){if(window.innerWidth>=1280){var e=function(e){var t=m.getBoundingClientRect(),r=e.clientX-t.left,n=e.clientY-t.top;a.current.style.transform="translate(".concat(r,"px, ").concat(n,"px)"),a.current.style.display="block",a.current.style.transformOrigin="center center"},t=function(e){var t=m.getBoundingClientRect(),r=e.clientX-t.left,n=e.clientY-t.top;a.current.style.transform="translate(".concat(r,"px, ").concat(n,"px)")},r=function(){a.current.style.display="none",a.current.style.transform="translate(0px, 0px)"};return m.addEventListener("mouseenter",e),m.addEventListener("mousemove",t),m.addEventListener("mouseleave",r),function(){m.removeEventListener("mouseenter",e),m.removeEventListener("mousemove",t),m.removeEventListener("mouseleave",r)}}}),[]),(0,s.useEffect)((function(){y&&T&&T.boundingClientRect.y>0?j(!0):j(!1)}),[y,T]),(0,c.jsxs)("a",{ref:b,href:f,target:"_blank",className:v?"visibleProjet":"hiddenProjet",onMouseEnter:function(e){return l(e)},style:{color:"white",textDecoration:"none"},children:[(0,c.jsxs)("div",{className:"projets",children:[(0,c.jsxs)("div",{className:"sousTitreProjet",children:[(0,c.jsx)("p",{children:t}),(0,c.jsx)("span",{children:r})]}),(0,c.jsx)("div",{className:"sousTitreProjet2",children:n.map((function(e,t){return(0,c.jsx)(u,{mots:e},t)}))})]}),(0,c.jsx)("div",{ref:d,className:"hoverProject",style:{width:"100%",height:"0.05rem",transform:"scaleX(1)"}})]})},m=[{titreProjet:"Facebook",sousTitre:"Impl\xe9mentation de 10 fonctionnalit\xe9s de Facebook.",motsTechno:["php","react"],image:"images/facebookcreatif.webp",lien:"https://github.com/prototypecaz/failbook"},{titreProjet:"Acces Heure",sousTitre:"Cr\xe9ation d'une plateforme web pour la comptabilisation des heures travaill\xe9es dans une soci\xe9t\xe9.",motsTechno:["javascript","php","html","css"],image:"images/accesheure.webp",lien:"https://github.com/prototypecaz/AccesHeure"},{titreProjet:"Travaux",sousTitre:"Cr\xe9ation d'une plateforme web pour connecter les utilisateurs aux artisans locaux \xe0 proximit\xe9.",motsTechno:["javascript","php","html","css"],image:"images/travaux.webp",lien:"https://github.com/prototypecaz/Artisan"},{titreProjet:"Riva",sousTitre:"Site E-commerce pour des vetements.",motsTechno:["javascript"],image:"images/riva.webp",lien:"https://github.com/prototypecaz/Riva"}];var f=function(e){var t=(0,s.useRef)(),r=(0,s.useRef)(null),i=(0,s.useState)(),u=(0,o.Z)(i,2),f=(u[0],u[1]),d=(0,s.useState)(),h=(0,o.Z)(d,2),p=h[0],v=h[1],j=(0,s.useState)(!1),x=(0,o.Z)(j,2),g=x[0],b=x[1];(0,s.useEffect)((function(){r.current&&b(!0)}),[]);var y=function(e){if(window.innerWidth>=1280){var t=r.current.childNodes,o=(0,n.Z)(t).indexOf(e.currentTarget);v(m[o].image)}};return(0,c.jsxs)("div",{id:"sectionProjets",children:[(0,c.jsx)(a,{mots:"Projets || Work"}),(0,c.jsxs)("div",{id:"blocProjets",ref:r,style:{position:"relative"},children:[g&&m.map((function(e,n){return(0,c.jsx)(l,{blocProjet:r.current,setIndex:f,handleOver:y,dive:t,titreProjet:e.titreProjet,sousTitre:e.sousTitre,motsTechno:e.motsTechno,image:e.image,lien:e.lien},n)})),(0,c.jsx)("div",{ref:t,className:"teste",children:(0,c.jsx)("img",{className:"imageProjet",style:{borderRadius:"0.5rem",width:"22rem",height:"12rem"},src:p})})]})]})}}}]);
//# sourceMappingURL=309.07870796.chunk.js.map