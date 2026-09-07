/**
 * HÜİST Stant Oyunu - Ana Motor
 */

const GAME_CONFIG = {
    QUESTIONS_PER_SESSION: 5,   // Her oyunda sorulacak soru sayısı
    WIN_THRESHOLD: 3,           // Çark çevirmek için gereken minimum doğru sayısı
    QUESTION_TIMEOUT_SEC: 35,   // Soru başına verilen süre (saniye)
    ENABLE_WHEEL: true,         // Çark modülü aktif mi?
    FEEDBACK_DELAY_MS: 5000,    // Cevap sonrası bekleme süresi (milisaniye)
    IDLE_TIMEOUT_SEC: 180       // Ekran boşta kalırsa başa dönme süresi (saniye)
};

const GameApp = {
    state: {
        questions: [],
        currentIndex: 0,
        score: 0,
        timeLeft: 0,
        timerInterval: null,
        idleTimeout: null,
        isLocked: false
    },

    init() {
        // Boşta kalma (idle) sayacını başlat
        this.resetIdleTimer();
        document.addEventListener('click', () => this.resetIdleTimer());
        document.addEventListener('touchstart', () => this.resetIdleTimer());

        // Çarkı hazırla (eğer aktifse)
        if (GAME_CONFIG.ENABLE_WHEEL && window.WheelModule) {
            window.WheelModule.init('wheelCanvas', (prize) => {
                this.onWheelStop(prize);
            });
        }
    },

    resetIdleTimer() {
        clearTimeout(this.state.idleTimeout);
        this.state.idleTimeout = setTimeout(() => {
            this.resetToMenu();
        }, GAME_CONFIG.IDLE_TIMEOUT_SEC * 1000);
    },

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
    },

    resetToMenu() {
        this.clearTimers();
        if(window.Confetti) window.Confetti.stop();
        this.showScreen('screen-menu');
        // Çark ekranını da sıfırla
        document.getElementById('prizeResult').innerText = '';
        document.getElementById('btnSpin').style.display = 'inline-block';
        document.getElementById('btnFinish').style.display = 'none';
        if (window.WheelModule) {
             window.WheelModule.currentAngle = 0;
             window.WheelModule.draw();
        }
    },

    clearTimers() {
        clearInterval(this.state.timerInterval);
    },

    shuffleArray(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    },

    startGame() {
        if (!window.QUESTIONS || window.QUESTIONS.length === 0) {
            alert("Soru havuzu bulunamadı!");
            return;
        }

        // Soruları karıştır ve seç
        const shuffled = this.shuffleArray(window.QUESTIONS);
        this.state.questions = shuffled.slice(0, GAME_CONFIG.QUESTIONS_PER_SESSION);
        
        if (this.state.questions.length === 0) return;

        this.state.currentIndex = 0;
        this.state.score = 0;
        
        this.showScreen('screen-game');
        this.loadQuestion();
    },

    loadQuestion() {
        this.state.isLocked = false;
        
        // UI Sıfırlama
        const feedbackBox = document.getElementById('feedbackBox');
        feedbackBox.classList.remove('show');
        document.getElementById('feedbackContent').innerHTML = '';
        document.getElementById('btnNextQuestion').style.display = 'none';
        feedbackBox.style.color = 'inherit';
        
        document.getElementById('choiceA').classList.remove('disabled', 'selected-correct', 'selected-wrong');
        document.getElementById('choiceB').classList.remove('disabled', 'selected-correct', 'selected-wrong');
        
        // Flash temizle
        document.getElementById('screen-game').classList.remove('flash-success', 'flash-error');

        const q = this.state.questions[this.state.currentIndex];
        document.getElementById('imgA').src = q.imageA;
        document.getElementById('imgB').src = q.imageB;

        this.startTimer();
    },

    startTimer() {
        this.clearTimers();
        this.state.timeLeft = GAME_CONFIG.QUESTION_TIMEOUT_SEC;
        this.updateTimerUI();

        this.state.timerInterval = setInterval(() => {
            this.state.timeLeft--;
            this.updateTimerUI();

            if (this.state.timeLeft <= 0) {
                this.clearTimers();
                this.handleTimeout();
            }
        }, 1000);
    },

    updateTimerUI() {
        const percentage = (this.state.timeLeft / GAME_CONFIG.QUESTION_TIMEOUT_SEC) * 100;
        const timerBar = document.getElementById('timerBar');
        
        timerBar.style.width = percentage + '%';
        document.getElementById('timerText').innerText = `Kalan Süre: ${this.state.timeLeft}s`;

        if (this.state.timeLeft <= 10) {
            timerBar.classList.add('danger-pulse');
        } else {
            timerBar.classList.remove('danger-pulse');
        }
    },

    handleTimeout() {
        if (this.state.isLocked) return;
        this.state.isLocked = true;
        
        document.getElementById('choiceA').classList.add('disabled');
        document.getElementById('choiceB').classList.add('disabled');
        document.getElementById('timerBar').classList.remove('danger-pulse');
        
        this.triggerFlash('screen-game', 'flash-error');
        this.showFeedback(false);
    },

    handleAnswer(userAnswer) {
        if (this.state.isLocked) return;
        this.state.isLocked = true;
        this.clearTimers();

        document.getElementById('choiceA').classList.add('disabled');
        document.getElementById('choiceB').classList.add('disabled');
        document.getElementById('timerBar').classList.remove('danger-pulse');

        const currentQ = this.state.questions[this.state.currentIndex];
        const isCorrect = (userAnswer === currentQ.isAi);

        // Seçilen görsele class ekle
        const selectedId = userAnswer === 'A' ? 'choiceA' : 'choiceB';
        document.getElementById(selectedId).classList.add(isCorrect ? 'selected-correct' : 'selected-wrong');

        if (isCorrect) {
            this.state.score++;
            this.triggerFlash('screen-game', 'flash-success');
        } else {
            this.triggerFlash('screen-game', 'flash-error');
        }

        this.showFeedback(isCorrect);
    },

    triggerFlash(screenId, className) {
        const screen = document.getElementById(screenId);
        screen.classList.add(className);
    },

    showFeedback(isCorrect) {
        const feedbackBox = document.getElementById('feedbackBox');
        feedbackBox.classList.add('show');
        
        const title = isCorrect ? "✅ DOĞRU!" : "❌ YANLIŞ!";
        feedbackBox.style.color = isCorrect ? "#2ecc71" : "#e74c3c";
        
        document.getElementById('feedbackContent').innerHTML = `<strong>${title}</strong>`;
        document.getElementById('btnNextQuestion').style.display = 'inline-block';
    },

    nextQuestion() {
        this.state.currentIndex++;
        
        if (this.state.currentIndex >= this.state.questions.length) {
            this.endGame();
        } else {
            this.loadQuestion();
        }
    },

    endGame() {
        this.showScreen('screen-result');
        
        const total = this.state.questions.length;
        const isSuccess = this.state.score >= GAME_CONFIG.WIN_THRESHOLD;
        
        document.getElementById('resultTitle').innerText = isSuccess ? "Tebrikler! 🎉" : "Oyun Bitti!";
        document.getElementById('resultScore').innerText = `${total} sorudan ${this.state.score} tanesini doğru bildin.`;

        // Sonuç ekranına genel flaş efekti uygula
        const resultScreen = document.getElementById('screen-result');
        resultScreen.classList.remove('flash-success', 'flash-error'); // Temizle
        this.triggerFlash('screen-result', isSuccess ? 'flash-success' : 'flash-error');

        const actionContainer = document.getElementById('resultActionContainer');
        actionContainer.innerHTML = ''; // Temizle

        if (isSuccess) {
            if(window.Confetti) window.Confetti.start(4000); // Başarı ekranında kısa konfeti
            
            if (GAME_CONFIG.ENABLE_WHEEL && window.WheelModule) {
                const btn = document.createElement('button');
                btn.className = 'btn-primary';
                btn.innerText = '🎁 Çarkı Çevir!';
                btn.onclick = () => {
                    if(window.Confetti) window.Confetti.stop();
                    this.showScreen('screen-wheel');
                };
                actionContainer.appendChild(btn);
            } else {
                actionContainer.innerHTML = `
                    <p style="color:var(--btn-true); font-weight:bold;">Ödülünü stant görevlisinden alabilirsin!</p>
                    <button class="btn-primary" onclick="GameApp.resetToMenu()">Tamamla</button>
                `;
            }
        } else {
            const btn = document.createElement('button');
            btn.className = 'btn-primary';
            btn.innerText = '🏠 Ana Menü';
            btn.onclick = () => this.resetToMenu();
            actionContainer.appendChild(btn);
        }
    },

    spinWheel() {
        document.getElementById('btnSpin').style.display = 'none';
        document.getElementById('prizeResult').innerText = 'Çark dönüyor...';
        window.WheelModule.spin();
    },

    onWheelStop(prize) {
        if (prize === "Kazanamadın") {
            document.getElementById('prizeResult').innerHTML = `<strong>Maalesef, ${prize} 😢</strong>`;
        } else {
            document.getElementById('prizeResult').innerHTML = `<strong>Tebrikler, ${prize} kazandın! 🎁</strong>`;
        }
        document.getElementById('btnFinish').style.display = 'inline-block';
        
        if (prize !== "Kazanamadın" && window.Confetti) {
            window.Confetti.start(0); // Sonsuz konfeti, baştan başla deyinceye kadar
        }
    }
};

// Sayfa yüklendiğinde başlat
window.addEventListener('DOMContentLoaded', () => {
    GameApp.init();
});
