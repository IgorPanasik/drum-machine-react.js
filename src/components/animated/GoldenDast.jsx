import { useEffect, useRef } from "react";
import "./GoldenDust.css";

const GoldenDust = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particlesArray = [];
    let hue = 60;

    // Устанавливаем ширину и высоту холста равной ширине и высоте родительского элемента
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1 + 0.5; // Уменьшаем размер частиц
        this.speedX = Math.random() * 2 - 1; // Уменьшаем скорость частиц
        this.speedY = Math.random() * 2 - 1; // Уменьшаем скорость частиц
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.01; // Уменьшаем скорость уменьшения размера частиц
      }

      draw() {
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.strokeStyle = "gold";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
    }

    function createParticles() {
      if (particlesArray.length < 200) {
        // Ограничиваем количество частиц
        particlesArray.push(new Particle());
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        if (particlesArray[i].size <= 0.2) {
          particlesArray.splice(i, 1);
          i--;
        }
      }
      createParticles();
      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }, []);

  return <canvas ref={canvasRef} className="golden-dust" />;
};

export default GoldenDust;
