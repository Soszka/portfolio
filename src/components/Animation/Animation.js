import React, { useEffect, useRef } from 'react';
import styles from './Animation.module.scss';
import aboutPhoto from '../../assets/HomePhotos/aboutPhoto1.png';

const Animation = () => {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null); // Add this line
  const minWidth = window.innerWidth < 1200 ? 5 : 10;
  const maxWidth = window.innerWidth < 1200 ? 1 : 3;
  const minHeight = 360;
  const maxHeight = 750;
  const minTTL = 200;
  const maxTTL = window.innerWidth < 768 ? 20 : 40;
  const backgroundColor = '#000000';

  useEffect(() => {
    let canvas, ctx, lines, lineCount;

    const fadeInOut = (t, m) => {
      let hm = 0.5 * m;
      return Math.abs(((t + hm) % m) - hm) / hm;
    };

    const setCanvas = () => {
      canvas = canvasRef.current;
      ctx = canvas.getContext('2d');
      resizeReset();
    };

    const resizeReset = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.drawImage(canvas, 0, 0);

      lines = [];
      lineCount = canvas.width / minWidth;

      for (let i = 0; i < lineCount; i++) {
        lines.push(new Line());
      }
    };

    const animationLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < lines.length; i++) {
        lines[i].update();
        lines[i].draw();
      }

      ctx.save();
      ctx.filter = 'blur(13px)';
      ctx.globalCompositeOperation = 'lighter';
      ctx.drawImage(canvas, 0, 0);
      ctx.restore();

      // Store the animation frame ID
      animationFrameId.current = requestAnimationFrame(animationLoop);
    };

    class Line {
      constructor() {
        this.x = getRandomInt(0, canvas.width);
        this.y = canvas.height / 2 + minHeight;
        this.width = getRandomInt(minWidth, maxWidth);
        this.height = getRandomInt(minHeight, maxHeight);
        this.hue = getRandomInt(200, 230);
        this.ttl = getRandomInt(minTTL, maxTTL);
        this.life = 0;
      }

      draw() {
        let gradient;
        gradient = ctx.createLinearGradient(
          this.x,
          this.y - this.height,
          this.x,
          this.y
        );
        gradient.addColorStop(0, `hsla(${this.hue}, 100%, 65%, 0)`);
        gradient.addColorStop(
          0.5,
          `hsla(${this.hue}, 100%, 65%, ${fadeInOut(this.life, this.ttl)})`
        );
        gradient.addColorStop(1, `hsla(${this.hue}, 100%, 65%, 0)`);

        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = this.width;
        ctx.moveTo(this.x, this.y - this.height);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
      }

      update() {
        this.life++;
        if (this.life > this.ttl) {
          this.life = 0;
          this.x = getRandomInt(0, canvas.width);
          this.width = getRandomInt(minWidth, maxWidth);
        }
      }
    }

    const getRandomInt = (min, max) => {
      return Math.round(Math.random() * (max - min)) + min;
    };

    setCanvas();
    animationLoop();

    window.addEventListener('resize', resizeReset);

    return () => {
      window.removeEventListener('resize', resizeReset);
      // Cancel the animation frame on cleanup
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <div className={styles.animationContainer} data-aos="slide-left">
      <img className={styles.image} src={aboutPhoto} alt="Myphoto" />
      <canvas
        ref={canvasRef}
        id="canvas"
        className={styles.animationCanvas}
      ></canvas>
    </div>
  );
};

export default Animation;
