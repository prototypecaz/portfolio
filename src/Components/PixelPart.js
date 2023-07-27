/*import React, { useEffect, useRef } from 'react';

function PixelPart(props) {

    const containerLoad = useRef(null)
    const canvasLoad = useRef(null)



    useEffect(()=>{
        const container = containerLoad.current
        const canvas = canvasLoad.current
        const context = canvas.getContext("2d");

        function throttle(func, limit) {
            let lastFunc;
            let lastRan;
            return function() {
              const context = this;
              const args = arguments;
              if (!lastRan) {
                func.apply(context, args);
                lastRan = Date.now();
              } else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(function() {
                  if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                  }
                }, limit - (Date.now() - lastRan));
              }
            }
          }

        // Load the image
        const image = new Image();
        image.src = "/pngegg(4).png";

        let imageParts = [];
        let imageDestroyed = false;
        let imagePartOriginalPositions = [];
        let transition = 0.1

        image.onload = function() {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
            context.drawImage(image, 0, 0, canvas.width, canvas.height);

            let numParts = 5 // Reglage carré
            if (window.innerWidth >= 768) { // Adjust this value as needed
                numParts = 5;
                transition = 0.2 // Less parts for mobile screens
              }
            const partWidth = Math.floor(canvas.width / numParts);
            const partHeight = Math.floor(canvas.height / numParts+1);

            for (let row = 0; row < numParts; row++) {
                for (let col = 0; col < numParts; col++) {
                    const x = Math.floor(col * partWidth);
                    const y = Math.floor(row * partHeight);
                    const imageData = context.getImageData(x, y, partWidth, partHeight);
                    const imagePart = { x, y, imageData };
                    imageParts.push(imagePart);

                    imagePartOriginalPositions.push({ x, y });


                }
            }


            let prevScrollTop = 0;
            let scrollSpeed = 0.04;
            let isScrolling = false;


            function updateImageParts() {
                if (isScrolling) {
                    const scrollTop = window.pageYOffset;
                    const scrollDirection = scrollTop > prevScrollTop ? "down" : "up";
                    let parentHeight = document.querySelector("#accueil").offsetHeight;



                    if (scrollDirection === "down" && scrollTop < parentHeight) {

                        const splitHeight = Math.round(canvas.height * (scrollTop / (document.documentElement.scrollHeight - window.innerHeight)));
console.log(transition)

                        if (splitHeight >= canvas.height) {
                            context.clearRect(0, 0, canvas.width, canvas.height);
                            imageDestroyed = true;
                        } else {
                            context.clearRect(0, 0, canvas.width, canvas.height);



                            imageParts.forEach(function(imagePart) {
                                const randomX = Math.random() * canvas.width;
                                const randomY = splitHeight + Math.random() * (canvas.height - splitHeight);
                                const dx = randomX - imagePart.x;
                                const dy = randomY - imagePart.y;

                                imagePart.x -= dx * transition;
                                imagePart.y -= dy * transition;

                                context.putImageData(imagePart.imageData, imagePart.x, imagePart.y);


                            });
                        }
                    } else if (scrollDirection === "up") {
                        context.clearRect(0, 0, canvas.width, canvas.height);

                        imageParts.forEach(function(imagePart, index) {
                            const originalX = imagePartOriginalPositions[index].x;
                            const originalY = imagePartOriginalPositions[index].y;
    
                            const dx = originalX - imagePart.x;
                            const dy = originalY - imagePart.y;

                            const threshold = 10;

                            if (Math.abs(dx) <= threshold && Math.abs(dy) <= threshold) {
                                imagePart.x = originalX;
                                imagePart.y = originalY;



                            }
                                imagePart.x += dx * scrollSpeed;
                                imagePart.y += dy * scrollSpeed;


                            context.putImageData(imagePart.imageData, imagePart.x, imagePart.y);
                        });
                    }

                    prevScrollTop = scrollTop;
                }

                // Request the next animation frame
                requestAnimationFrame(updateImageParts);
            }

            // Listen to scroll events
            const handleScroll = throttle(function () {
                isScrolling = true;
            }, 200); // Adjust this value as needed
            window.addEventListener("scroll", handleScroll);

            // Clean up the event listener when the component unmounts


            updateImageParts();

            return () => {
                window.removeEventListener("scroll", handleScroll);
            };
        };
    })
    return (
        <>
            <div ref={containerLoad} id="image-container">
                    <canvas ref={canvasLoad} id="image-canvas"></canvas>
            </div>
        </>
    );
}

export default PixelPart;*/


import React, { useEffect, useRef } from 'react';

function PixelPart(props) {
    const containerLoad = useRef(null);
    const canvasLoad = useRef(null);
    const isScrolling = useRef(false);
    const prevScrollTop = useRef(0);
    const imageParts = useRef([]);
    const imagePartOriginalPositions = useRef([]);
    const occupiedPositions = useRef(new Set());
    const scrollSpeed = 0.02;

    useEffect(() => {
        const container = containerLoad.current;
        const canvas = canvasLoad.current;
        const context = canvas.getContext('2d');
        const imageLarge = new Image();
        const image = new Image();
        image.src = '/pngegg(4).png';
        imageLarge.src = '/photoProfil.png';

        function scrollDown(splitHeight) {
            if (splitHeight >= canvas.height) {
                context.clearRect(0, 0, canvas.width, canvas.height);
            } else {
                context.clearRect(0, 0, canvas.width, canvas.height);
                imageParts.current.forEach((imagePart) => {
                    let randomX, randomY;
                    do {
                        randomX = Math.floor(Math.random() * canvas.width);
                        randomY = splitHeight + Math.floor(Math.random() * (canvas.height - splitHeight));
                    } while (occupiedPositions.current.has(`${randomX},${randomY}`));

                    occupiedPositions.current.add(`${randomX},${randomY}`);

                    const dx = randomX - imagePart.x;
                    const dy = randomY - imagePart.y;

                    imagePart.x -= dx * 0.1;
                    imagePart.y -= dy * 0.1;

                    context.putImageData(imagePart.imageData, imagePart.x, imagePart.y);
                });
            }
        };

        function scrollUp() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            imageParts.current.forEach((imagePart, index) => {
                const originalX = imagePartOriginalPositions.current[index].x;
                const originalY = imagePartOriginalPositions.current[index].y;
                const dx = originalX - imagePart.x;
                const dy = originalY - imagePart.y;
                const threshold = 10;

                if (Math.abs(dx) <= threshold && Math.abs(dy) <= threshold) {
                    imagePart.x = originalX;
                    imagePart.y = originalY;
                } else {
                    imagePart.x += dx * scrollSpeed;
                    imagePart.y += dy * scrollSpeed;
                }

                context.putImageData(imagePart.imageData, imagePart.x, imagePart.y);
            });
        };

        const updateImageParts = () => {
            if (isScrolling.current) {
                const scrollTop = window.pageYOffset;
                const scrollDirection = scrollTop > prevScrollTop.current ? "down" : "up";
                let parentHeight = document.querySelector("#accueil").offsetHeight;

                if (scrollDirection === "down" && scrollTop < parentHeight) {
                    const splitHeight = Math.round(canvas.height * (scrollTop / (document.documentElement.scrollHeight - window.innerHeight)));
                    scrollDown(splitHeight);
                } else if (scrollDirection === "up") {
                    scrollUp();
                }

                prevScrollTop.current = scrollTop;
            }
            requestAnimationFrame(updateImageParts);
        };

        const handleScroll = () => {
            isScrolling.current = true;
        };

        const draw = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            const imageToDraw = window.innerWidth >= 970 || window.innerHeight <= 428 ? imageLarge : image;
            context.drawImage(imageToDraw, 0, 0, canvas.width, canvas.height);

            imageParts.current.splice(0, imageParts.current.length);
            imagePartOriginalPositions.current.splice(0, imagePartOriginalPositions.current.length);

            const numParts = window.innerWidth >= 1281 ? 20 : 5;
            const partWidth = Math.floor(canvas.width / numParts);
            const partHeight = Math.floor(canvas.height / numParts + 1);

            for (let row = 0; row < numParts; row++) {
                for (let col = 0; col < numParts; col++) {
                    const x = Math.floor(col * partWidth);
                    const y = Math.floor(row * partHeight);
                    const imageData = context.getImageData(x, y, partWidth, partHeight);
                    const imagePart = { x, y, imageData };
                    imageParts.current.push(imagePart);
                    imagePartOriginalPositions.current.push({ x, y });
                }
            }
        };

        const handleOrientationChange = () => {
            setTimeout(draw, 200);
        };

        image.onload = () => {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
            draw();
            window.addEventListener("scroll", handleScroll);
            window.addEventListener("orientationchange", handleOrientationChange, false);
            updateImageParts();
        };

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("orientationchange", handleOrientationChange);
        };
    }, [scrollSpeed]);

    return (
        <>
            <div ref={containerLoad} id="image-container">
                <canvas ref={canvasLoad} id="image-canvas"></canvas>
            </div>
        </>
    );
}

export default PixelPart;


