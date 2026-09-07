# HÜİST Stant Oyunları - Kapsamlı Teknik Mimari ve Geliştirici Dokümantasyonu

Bu belge, "HÜİST Stant Oyunları" (Truth or Lie & AI mı Gerçek mi?) projesinin sıfırdan inşa edilebilmesi için gereken tüm teknik altyapıyı, mimari kararları, kullanılan teknolojileri ve algoritmik tercihlerin arka planını detaylı bir şekilde açıklamaktadır.

---

## 1. Mimari Felsefe ve Temel Tasarım Kararları

Projenin temel kullanım senaryosu, kalabalık bir etkinlik alanında (stantta) kurulacak bir kiosk/tablet ekranıdır. Bu senaryo, mimarinin şekillenmesinde kritik rol oynamıştır.

### 1.1. Neden Backend Yok? (Offline-First Yaklaşımı)
Etkinlik alanlarında internet bağlantısı genellikle kararsızdır veya güvenlik duvarlarına takılabilir. Oyunun kesintisiz çalışabilmesi için sistem tamamen **Offline-First (Çevrimdışı Öncelikli)** olarak tasarlanmıştır. Herhangi bir Node.js, Python, PHP sunucusuna veya harici bir veritabanına (MongoDB, SQL) ihtiyaç duyulmaz.

### 1.2. Neden Framework Yok? (Vanilla JS Tercihi)
React, Vue veya Angular gibi modern frameworkler yerine **Saf (Vanilla) ES6 JavaScript** tercih edilmiştir.
* **Performans ve Hız:** Kısıtlı donanıma sahip olabilecek kiosk cihazlarında, Virtual DOM hesaplamaları (overhead) olmaksızın en yüksek performansı elde etmek.
* **Bağımlılıkların Azaltılması:** Dış kütüphane bağımlılıklarını sıfıra indirerek bakım maliyetini düşürmek ve projenin yıllar sonra bile "npm install" hataları olmadan sadece bir tarayıcıda çalışabilmesini sağlamak.

### 1.3. Single Page Application (SPA) Tasarımı
Sayfa yenilenmesi, stant deneyimini bozan (beyaz ekran parlamaları yaratan) bir durumdur. Bu yüzden oyun **SPA (Tek Sayfa Uygulaması)** mantığıyla kurulmuştur. `index.html` üzerinde tüm ekranlar (Menü, Oyun, Sonuç, Çark) birer `<div>` bloğu olarak bulunur ve JavaScript ile class manipülasyonu yapılarak (`display: none` / `display: flex`) geçişler pürüzsüzce sağlanır.

---

## 2. Kullanılan Teknolojiler ve Tercih Nedenleri

### 2.1. Veri Yönetimi ve CORS Çözümü
Veriler (sorular ve resim adresleri) standart bir `.json` dosyasından `fetch()` API ile çekilmek yerine, `.js` dosyaları içinde global `window` objesine bağlanarak (`window.QUESTIONS = [...]`) tutulmuştur.
* **Neden?** Lokal dosya sisteminden (`file://` protokolü) çalıştırılan HTML dosyalarında, tarayıcıların güvenlik politikaları (CORS) nedeniyle lokal JSON dosyalarına `fetch` veya `XHR` isteği yapılamaz. Verileri JS objesi olarak DOM yüklenirken entegre etmek, sunucusuz (serverless ve local) çalışmanın en güvenilir yoludur.

### 2.2. CSS3 ve UI/UX Mühendisliği
* **Kiosk Korumaları:** Kullanıcıların ekrana uzun basıp metinleri seçmesini, sağ tıklamasını veya yanlışlıkla zoom yapmasını engellemek için CSS seviyesinde `user-select: none;`, `-webkit-user-select: none;` ve `touch-action: manipulation;` kuralları uygulanmıştır.
* **Glassmorphism:** Arayüzde `backdrop-filter: blur(25px);` kullanılarak, arkadaki hareketli "bubble" (baloncuk) yapısının üzerine buzlu cam efekti verilmiş, derinlik hissi artırılmıştır.
* **Flash Geri Bildirimleri:** Doğru/Yanlış cevaplarda ekranın yeşil/kırmızı yanıp sönmesi JavaScript ile dinamik class eklenerek (`flash-success`, `flash-error`) ve CSS animasyonları ile (box-shadow ve background geçişleri) donanım hızlandırmalı (GPU-accelerated) olarak çözülmüştür.

---

## 3. Ana Oyun Motoru: `GameApp` State Manager

Oyunun tüm mantığı, kapsüllenmiş bir obje olan `GameApp` üzerinden yürütülür. Bu yapı, global scope'u kirletmeden bir State (Durum) makinesi gibi çalışır.

### 3.1. Durum (State) Yönetimi
```javascript
state: {
    questions: [],      // O anki seansın soru dizisi
    currentIndex: 0,    // Kaçıncı soruda olunduğu
    score: 0,           // Doğru sayısı
    timeLeft: 0,        // Kalan süre
    timerInterval: null,// Geri sayım referansı
    idleTimeout: null,  // Boşta kalma referansı
    isLocked: false     // Çift tıklama/spam engelleme kilidi
}
```
* **`isLocked` Bayrağı:** Kullanıcı bir butona bastığında animasyon sürerken diğer butona basıp sistemi çökertmesin veya puanı manipüle etmesin diye devreye girer. İşlem bitene kadar DOM'daki butonları CSS (`pointer-events: none`) ve JS seviyesinde kilitler.

### 3.2. Zamanlayıcılar (Timers)
* **Geri Sayım (`setInterval`):** Sorular için verilen süre `setInterval` ile her saniye azaltılır ve CSS'teki `timer-bar` genişliği `%` olarak güncellenir. Son 10 saniyede CSS `danger-pulse` animasyonu tetiklenerek kullanıcıda aciliyet hissi (urgency) yaratılır.
* **Boşta Kalma (Idle) Denetleyicisi (`setTimeout`):** Oyuncu ekran başında oyunu yarım bırakıp giderse diye `idleTimeout` mekanizması kurulmuştur. Ekrana yapılan her dokunuş (`touchstart`, `click`) bu sayacı sıfırlar (`clearTimeout`). Eğer belirtilen süre (örn: 180s) boyunca etkileşim olmazsa oyun otomatik olarak Ana Menüye resetlenir.

---

## 4. Kullanılan Özel Algoritmalar

### 4.1. Fisher-Yates Karıştırma (Shuffle) Algoritması
Oyun her başladığında 35+ soruluk havuzdan rastgele 5 sorunun seçilmesi gerekmektedir. JS'de yaygın yapılan `array.sort(() => Math.random() - 0.5)` yöntemi, tarayıcı motorlarına (V8, SpiderMonkey) göre düzensiz (biased) sonuçlar ürettiği için tercih edilmemiştir.
Bunun yerine **O(n) zaman karmaşıklığına** sahip, kusursuz rastgelelik sunan *Fisher-Yates (Knuth) Shuffle* algoritması implemente edilmiştir.
```javascript
for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // ES6 Destructuring Assignment
}
```

### 4.2. Çark Modülü (`wheel.js`)
Çark yapısı ana oyundan tamamen bağımsız, modüler (Component) bir yapı olarak tasarlanmıştır. 
* **HTML5 Canvas:** Çarkın çizimi ve dilimlerin hesaplanması DOM elementleri yerine `Canvas API` (`arc`, `lineTo`, `fill`) kullanılarak milimetrik olarak çizdirilir.
* **Fizik Simülasyonu:** Çarkın dönme hareketi için CSS `transform: rotate` yerine JavaScript tabanlı sönümlemeli (friction) bir fizik hesaplaması kullanılır. Hız (velocity) rastgele belirlenir ve her frame'de sürtünme katsayısı ile yavaşlatılır, bu sayede hangi ödülde duracağı önceden bilinmez, tamamen tarayıcının rastgelelik motoruna (RNG) bağlı doğal bir fizik hissiyatı verilir.

---

## 5. Proje Dizin Hiyerarşisi

Her oyun (Örn: `truth-or-lie` ve `ai-mi-gercek-mi`) kendi içinde tamamen bağımsız bir ekosisteme sahiptir. Okuyucu 0'dan kurmak isterse şu yapıyı örnek almalıdır:

```text
/oyun-adi/
├── index.html        (View: Kiosk Layout ve Containerlar)
├── style.css         (Design: Glassmorphism, Animations, Kiosk Rules)
├── script.js         (Controller: GameApp State Machine ve Logic)
├── /data
│   └── questions.js  (Model: window.QUESTIONS = [{...}] veri havuzu)
├── /components
│   ├── wheel.js      (Bağımsız Çark Canvas Render modülü)
│   └── confetti.js   (Başarı durumunda tetiklenen partikül motoru)
└── /assets           (Medya: Görseller, logolar ve sesler)
```

## 6. Güvenlik ve Moderasyon
Stant görevlisinin acil durumlarda oyuna müdahale edebilmesi için, UI'da gizlenmiş veya köşeye iliştirilmiş bir **"Moderatör Başa Dön"** butonu (`btnReset`) bulunur. Bu buton tetiklendiğinde `GameApp.resetToMenu()` çalışır; tüm `Interval` ve `Timeout` objeleri Memory Leak (bellek sızıntısı) yaratmamak adına `clearInterval/clearTimeout` ile temizlenir ve State sıfırlanarak oyun başlangıç anına geri döndürülür.
