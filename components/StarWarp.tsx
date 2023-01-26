import { useRef, useEffect, useState } from 'react';

// credits due https://codepen.io/nodws/pen/pejBNb
const StarWarp = () => {
    const ref = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        if (ref.current) {
            let canvas = ref.current;

            var numStars = 1900;
            var radius = '0.' + Math.floor(Math.random() * 9) + 1;
            var focalLength = canvas.width * 2;
            var warp = 0;
            var centerX: any, centerY: any;

            var stars: any = [],
                star;
            var i;

            var animate = true;
            const initializeStars = () => {
                const canvas = ref.current as HTMLCanvasElement;
                centerX = canvas.width / 2;
                centerY = canvas.height / 2;
                let star: any, i: number;
                for (i = 0; i < numStars; i++) {
                    star = {
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        z: Math.random() * canvas.width,
                        o: '0.' + Math.floor(Math.random() * 99) + 1,
                    };
                    stars.push(star);
                }
            };

            const moveStars = () => {
                const canvas = ref.current as HTMLCanvasElement;
                let i, star;
                for (i = 0; i < numStars; i++) {
                    star = stars[i];
                    star.z--;

                    if (star.z <= 0) {
                        star.z = canvas.width;
                    }
                }
            };

            const drawStars = () => {
                const canvas = ref.current as HTMLCanvasElement;
                const c = canvas.getContext('2d') as CanvasRenderingContext2D;
                let pixelX, pixelY, pixelRadius;

                // Resize to the screen
                if (
                    canvas.width != window.innerWidth ||
                    canvas.width != window.innerWidth
                ) {
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                    initializeStars();
                }
                if (warp == 0) {
                    c.fillStyle = 'rgba(0,10,20,1)';
                    c.fillRect(0, 0, canvas.width, canvas.height);
                }
                c.fillStyle = 'rgba(209, 255, 255, ' + radius + ')';
                let i, star;
                for (i = 0; i < numStars; i++) {
                    star = stars[i];

                    pixelX = (star.x - centerX) * (focalLength / star.z);
                    pixelX += centerX;
                    pixelY = (star.y - centerY) * (focalLength / star.z);
                    pixelY += centerY;
                    pixelRadius = 1 * (focalLength / star.z);

                    c.fillRect(pixelX, pixelY, pixelRadius, pixelRadius);
                    c.fillStyle = 'rgba(209, 255, 255, ' + star.o + ')';
                    //c.fill();
                }
            };

            initializeStars();

            const executeFrame = () => {
                if (ref.current) {
                    if (animate) window.requestAnimationFrame(executeFrame);
                    moveStars();
                    drawStars();
                }
            };
            executeFrame();
        }
        return () => {
            animate = false;
        };
    }, []);

    return (
        <canvas
            ref={ref}
            id="space"
            style={{ position: 'fixed', zIndex: -2 }}
        />
    );
};

export default StarWarp;
