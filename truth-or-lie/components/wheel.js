// Modüler Çark Bileşeni (Canvas)
// Gevşek bağlı (loosely coupled): İstenirse projeden tamamen çıkarılabilir.

const WheelModule = {
  canvasId: 'wheelCanvas',
  prizes: [
    "1. Hediye", "Kazanamadın", 
    "2. Hediye", "Kazanamadın", 
    "3. Hediye", "Kazanamadın", 
    "4. Hediye", "Kazanamadın",
    "5. Hediye", "Kazanamadın"
  ],
  colors: [
    "#2ecc71", "#e74c3c", 
    "#3498db", "#e74c3c", 
    "#9b59b6", "#e74c3c", 
    "#f1c40f", "#e74c3c", 
    "#e67e22", "#e74c3c"
  ],
  isSpinning: false,
  currentAngle: 0,
  spinTimeout: null,
  
  init(canvasId, callback) {
    this.canvasId = canvasId;
    this.callback = callback; // Çark durduğunda çağrılacak fonksiyon
    this.draw();
  },

  draw() {
    const canvas = document.getElementById(this.canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    const arc = Math.PI / (this.prizes.length / 2);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Çarkı çiz
    for (let i = 0; i < this.prizes.length; i++) {
      const angle = this.currentAngle + i * arc;
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, angle, angle + arc, false);
      ctx.lineTo(centerX, centerY);
      ctx.fillStyle = this.colors[i % this.colors.length];
      ctx.fill();
      ctx.save();
      
      // Metni yaz
      ctx.translate(centerX, centerY);
      ctx.rotate(angle + arc / 2);
      ctx.fillStyle = "white";
      ctx.font = "bold 22px sans-serif";
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillText(this.prizes[i], radius - 20, 0);
      ctx.restore();
    }

    // Ortadaki gösterge (Ok)
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(centerX - 10, centerY - radius - 15);
    ctx.lineTo(centerX + 10, centerY - radius - 15);
    ctx.lineTo(centerX, centerY - radius + 5);
    ctx.fill();
    
    // Orta yuvarlak
    ctx.beginPath();
    ctx.arc(centerX, centerY, 15, 0, 2 * Math.PI, false);
    ctx.fillStyle = "#fff";
    ctx.fill();
  },

  spin() {
    if (this.isSpinning) return;
    this.isSpinning = true;

    // Rastgele dönüş hızı ve süresi
    const spinAngleStart = Math.random() * 10 + 10;
    const spinTimeTotal = Math.random() * 2000 + 3000;
    let spinTime = 0;

    const rotateWheel = () => {
      spinTime += 30;
      if (spinTime >= spinTimeTotal) {
        this.stopRotateWheel();
        return;
      }
      const spinAngle = spinAngleStart - (spinAngleStart * (spinTime / spinTimeTotal)); // Yavaşlama
      this.currentAngle += (spinAngle * Math.PI / 180);
      this.draw();
      this.spinTimeout = requestAnimationFrame(rotateWheel);
    };

    rotateWheel();
  },

  stopRotateWheel() {
    cancelAnimationFrame(this.spinTimeout);
    this.isSpinning = false;
    
    // Kazananı hesapla
    const degrees = this.currentAngle * 180 / Math.PI + 90;
    const arcd = 360 / this.prizes.length;
    const index = Math.floor((360 - degrees % 360) / arcd);
    
    const winningPrize = this.prizes[index];
    if (this.callback) {
      this.callback(winningPrize);
    }
  }
};

window.WheelModule = WheelModule;
