// Basit Çevrimdışı Konfeti Modülü (Bağımlılık içermez)
const Confetti = {
    canvas: null,
    ctx: null,
    particles: [],
    animId: null,
    colors: ['#2ecc71', '#3498db', '#e67e22', '#e74c3c', '#9b59b6', '#f1c40f'],
    
    init() {
        if (this.canvas) return;
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100vw';
        this.canvas.style.height = '100vh';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '9999';
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        window.addEventListener('resize', () => this.resize());
        this.resize();
    },
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    },
    
    start(duration = 3000) {
        this.init();
        this.particles = [];
        for (let i = 0; i < 150; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height - this.canvas.height,
                size: Math.random() * 10 + 5,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                speed: Math.random() * 3 + 2,
                angle: Math.random() * 360,
                spin: Math.random() * 5 - 2.5
            });
        }
        
        this.animate();
        if (duration) {
            setTimeout(() => this.stop(), duration);
        }
    },
    
    stop() {
        cancelAnimationFrame(this.animId);
        if (this.ctx && this.canvas) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        this.particles = [];
    },
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let active = false;
        
        this.particles.forEach(p => {
            p.y += p.speed;
            p.x += Math.sin(p.angle * Math.PI / 180) * 2;
            p.angle += p.spin;
            
            if (p.y < this.canvas.height) active = true;
            
            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.angle * Math.PI / 180);
            this.ctx.fillStyle = p.color;
            this.ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
            this.ctx.restore();
        });
        
        if (active) {
            this.animId = requestAnimationFrame(() => this.animate());
        }
    }
};
window.Confetti = Confetti;
