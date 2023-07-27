import React, { useEffect, useRef } from 'react';

/*const CHARS = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん".split("");
const DROPS = 120;
const DROP_MAX_LENGTH = 10;
const CHAR_MAX_LIFE = 10;
const MIN_DROP_FONT_SIZE = 17;
const MAX_DROP_FONT_SIZE = 22;
const DROP_SPEED = 0.8;

const randChar = (prevChar = {}) => {
    if (prevChar.ttl && prevChar.ttl > 1) {
        return { ...prevChar, ttl: prevChar.ttl - 1 };
    }
    return {
        char: CHARS[Math.floor(Math.random() * CHARS.length)],
        ttl: Math.floor(Math.random() * CHAR_MAX_LIFE)
    };
};

const generateDrop = (canvas, prev = {}) => {
    const chars = Array.from({ length: Math.floor(Math.random() * (DROP_MAX_LENGTH - 5) + 5) }, randChar);
    const fontSize = Math.floor(Math.random() * (MAX_DROP_FONT_SIZE - MIN_DROP_FONT_SIZE) + MIN_DROP_FONT_SIZE);
    return {
        ...prev,
        x: Math.floor(Math.random() * canvas.width),
        y: Math.floor(Math.random() * (canvas.height * 2) - canvas.height * 2 - chars.length * fontSize - 200),
        chars,
        font: fontSize + "px monospace",
        timeToMove: 0
    };
};

const scrambleDrop = (drop) => {
    drop.chars = drop.chars.map(randChar);
    drop.chars.shift();
    drop.chars.push(randChar());
};

const drawText = (ctx, text, x, y, fillStyle, font, shadowBlur = 5) => {
    ctx.shadowColor = fillStyle;
    ctx.shadowOffsetX = 200;
    ctx.shadowOffsetY = 200;
    ctx.shadowBlur = 0;
    ctx.fillStyle = fillStyle;
    ctx.font = font;
    ctx.fillText(text, x, y);
};*/

const Matrix = (props) => {
    const canvasRef = useRef();


    useEffect(()=>{
        var c = canvasRef.current
        var ctx = c.getContext("2d");
        
        c.height = window.innerHeight;
        c.width = window.innerWidth;

        ctx.fillStyle = "rgb(0, 0, 30)";
            //ctx.fillRect(0, 0, c.width, c.height);

        var payload = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";
        let chinese = payload.split("");

        var font_size = 25;
        var columns = c.width/font_size; 
        var drops = [];
        for(var x = 0; x < columns; x++)
            drops[x] = 1;
        
          let lastDrawTime = 0; // temps de la dernière image
    let speed = 1; // vitesse de l'animation, 1 est la vitesse par défaut

    function draw(currentTime) {
        requestAnimationFrame(draw);

        // Pour la première frame, on initialise lastDrawTime
        if(!lastDrawTime) {
            lastDrawTime = currentTime;
            return;
        }

        // Calcul du délai écoulé depuis le dernier dessin
        const elapsed = currentTime - lastDrawTime;

        // Si le délai écoulé est inférieur à ce qu'on veut (ici 120ms/speed), on ne fait rien
        // Notez que plus la valeur de "speed" est élevée, plus l'animation sera rapide
        if(elapsed < 120 / speed) return;

        // Si on arrive ici, on peut dessiner une nouvelle frame
        // fade out old drawings
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fillRect(0, 0, c.width, c.height);

        // set compositing back to default
        ctx.globalCompositeOperation = 'source-over';

        let rn = Math.floor(Math.random() * 255);
        ctx.fillStyle = "#32C267";


        ctx.font = font_size + "px sans-serif";
        for(var i = 0; i < drops.length; i++)
        {
            var text = payload[Math.floor(Math.random()*payload.length)];
            ctx.fillText(text, i*font_size, drops[i]*font_size);
            if(drops[i]*font_size > c.height && Math.random() > 0.975)
                drops[i] = 0;
            //incrementing Y coordinate
            drops[i]++;

        }

        // On met à jour le temps de la dernière frame
        lastDrawTime = currentTime;

    }

    // On lance la boucle d'animation
    requestAnimationFrame(draw);


    },[])

   /* useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d", { alpha: true });

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const drops = Array.from({ length: DROPS }, () => generateDrop(canvas));

        let prevTime = 0;

        const draw = (timestamp) => {
            const passedTime = timestamp - prevTime;
            prevTime = timestamp;
            ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drops.forEach((drop, i) => {
                const fontSize = parseInt(drop.font);
                drop.chars.forEach((char, k) => {
                    let color = k === drop.chars.length - 1 ? "rgba(112, 172, 142, 0.5)" : "#32C267";
                    drawText(ctx, char.char, drop.x, drop.y + k * fontSize, color, drop.font);
                });
                drop.timeToMove--;
                if (drop.timeToMove <= 0) {
                    scrambleDrop(drop);
                    drop.y += fontSize;
                    drop.timeToMove = fontSize ** -6.5 / (DROP_SPEED * 10 ** -9);
                }
                if (drop.y >= canvas.height) drops[i] = generateDrop(canvas, drop);
            });
            window.requestAnimationFrame(draw);
        };

        window.requestAnimationFrame(draw);

        const onResize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, []);*/

    return (
       <div id="containerMatrix">
            <canvas id="canvasMatrix" ref={canvasRef}></canvas>
        </div>
    );
};

export default Matrix;
