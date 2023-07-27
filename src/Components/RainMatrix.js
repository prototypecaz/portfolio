import React, { useRef, useEffect } from 'react';

const CHARS = "あいうえおかきくけこさしすせそたちつてとなに ねのはひふへほまみむめもやゆよらりるれろわをん".split("");
const DROPS = 60;
const DROP_MAX_LENGTH = 20;
const CHAR_MAX_LIFE = 10;
const SIZE = 20
const DROP_SPEED = 3 //navigator.userAgent.includes("Chrome") ? 4 : 4

const RainMatrix = () => {
  const canvasRef = useRef(null);
  let ctx;
  let drops;

  useEffect(() => {
    console.log('ok')
    const canvas = canvasRef.current;
    ctx = canvas.getContext('2d', { alpha: true });
    canvas.width = 1000;
    canvas.height = window.innerHeight;
    drops = Array.from({length: DROPS}, () => generateDrop());
  requestAnimationFrame(draw);

  }, []);

  const RandChar = (prevChar) => {
    if (prevChar && prevChar.ttl) {
      prevChar.ttl--;
      return prevChar;
    }
    return {
      char: CHARS[Math.floor(Math.random() * CHARS.length)],
      ttl: Math.floor(Math.random() * CHAR_MAX_LIFE)
    };
  };

  const generateDrop = (drop = {}) => {
    drop.chars = Array.from({length: Math.floor(Math.random() * (DROP_MAX_LENGTH - 5) + 5)}, () => RandChar());
    drop.font = SIZE + "px monospace";
    drop.x = Math.floor(Math.random() * canvasRef.current.width);
    drop.y = Math.floor(Math.random() * (canvasRef.current.height * 2) - canvasRef.current.height * 2 - drop.chars.length * parseInt(drop.font, 10) - 200);
    drop.timeToMove = 0;
    return drop;
  }

  const scrambleDrop = (drop) => {
    drop.chars[0] = RandChar();
    drop.chars.shift();
    drop.chars.push(RandChar());
    return drop;
  }

  const drawText = (text, x, y, fillStyle, font) => {
    ctx.fillStyle = "#32C267";
    ctx.font = font;
    ctx.fillText(text, x, y);
  }

  const draw = () => {

if(canvasRef.current !== null)
  {  ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    drops.forEach(drop => {
      const fontSize = parseInt(drop.font, 10);
      drop.chars.forEach((char, k) => {
        const s = 255 * (k / DROP_MAX_LENGTH);
        drawText(char.char, drop.x, drop.y + k * fontSize, `rgb(${s},${s},${s})`, drop.font, k === drop.chars.length - 1 ? 5 : 10);
      });
      drop.timeToMove--;
      if (drop.timeToMove <= 0) {
        scrambleDrop(drop);
        drop.y += fontSize;
        drop.timeToMove = DROP_SPEED //Math.floor(DROP_SPEED * Math.pow(fontSize, -6.5) * Math.pow(10, 9));
      }
      drop.y >= canvasRef.current.height && generateDrop(drop);
    });

    requestAnimationFrame(draw);
}

  }

  return (
    <div id="containerMatrix">
        <canvas id="canvasMatrix" ref={canvasRef}></canvas>
    </div>
    
  );
}

export default RainMatrix;