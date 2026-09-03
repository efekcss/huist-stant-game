# HÜİST Stant Oyunları Proje Planı (Local WebApp)

## 1. Proje Özeti ve Çalışma Ortamı
Bu proje, Hacettepe Üniversitesi İstatistik ve Veri Bilimi Topluluğu (HÜİST) tanıtım günlerinde stantta kullanılmak üzere geliştirilecek **çevrimdışı (offline-first)** bir yerel WebApp'tir.
* **Çalışma Şekli:** Hiçbir sunucu kurulumu gerektirmeden, `index.html` dosyasına çift tıklanarak (`file://` protokolü ile) doğrudan tarayıcıda tam ekran çalışacaktır.
* **Oyun Kapsamı:** Proje iki bağımsız mini oyundan oluşacaktır. Geliştirmeye ve önceliğe **"Truth or Lie" (Gerçek mi Yalan mı?)** oyunu ile başlanacaktır. "AI mı Gerçek mi?" oyunu ayrı bir faz olarak ele alınacaktır.

---

## 2. Mimari ve Dosya Yapısı

CORS hatasını önlemek ve internet gereksinimini sıfırlamak için JSON yerine doğrudan `.js` veri dosyaları ve modüler bir yapı kullanılacaktır.

```text
/huist-oyunlar
│
├── index.html              # Kiosk SPA iskeleti (Menü, Oyun Ekranı, Sonuç Ekranı)
├── style.css               # Kiosk CSS (Büyük butonlar, karanlık tema, touch ve seçim kilitleri)
├── script.js               # Ana oyun motoru, soru akışı, zamanlayıcı ve moderatör kontrolleri
│
├── /data
│   └── questions.js        # window.QUESTIONS havuzu (40+ soru içerecek JS formatı)
│
├── /components
│   └── wheel.js            # Modüler / Bağımsız Çark Modülü (İstenirse tek tuşla/konfigle devreden çıkarılabilir)
│
└── /assets
    ├── /img                # Logolar ve görseller
    ├── /fonts              # Offline font dosyaları
    └── /audio              # Doğru/yanlış/zafer ses efektleri (opsiyonel)
```

---

## 3. Modülerlik & Ayarlar (config.js / script.js içinde)
Çark veya oyun parametrelerinin projeyi bozmadan kolayca açılıp kapatılabilmesi için ayar değişkenleri tanımlanacaktır:
```javascript
const GAME_CONFIG = {
  QUESTIONS_PER_SESSION: 5,   // Her oyunda havuzdan rastgele seçilecek soru sayısı
  WIN_THRESHOLD: 3,           // Ödül/Çark kazanmak için gereken minimum doğru sayısı (örn: 5'te 3)
  QUESTION_TIMEOUT_SEC: 60,   // Soru başına verilen süre (saniye)
  ENABLE_WHEEL: true,         // false yapılırsa çark tamamen devreden çıkar; doğrudan "Ödülü Görevliden Al" ekranı gelir
  FEEDBACK_DELAY_MS: 1500     // Cevap verildikten sonraki açıklama/renk bekleme süresi
};
```

---

## 4. OYUN 1: "Truth or Lie" (Gerçek mi Yalan mı?) — ÖNCELİKLİ PLAN

### 4.1. Veri Yapısı (`data/questions.js`)
Kullanıcı tarafından 40+ adet soru havuzu sağlanacaktır. Şablon:
```javascript
window.QUESTIONS = [
  {
    id: 1,
    question: "Python dili adını Monty Python komedi grubundan almıştır.",
    isTrue: true,
    fact: "Guido van Rossum, dili geliştirirken Monty Python's Flying Circus senaryolarını okuyordu."
  },
  // ... diğer 40+ soru
];
```

### 4.2. Oyun Akışı ve Mekanikleri
1. **Başlangıç:**
   - Havuzdan rastgele belirlenen adette (örn: 5 adet) soru seçilir ve karıştırılır (Fisher-Yates shuffle). Skor sıfırlanır.
2. **Soru Ekranı ve 60 Saniye Sayacı:**
   - Ekranda soru metni, "Gerçek" ve "Yalan" butonları ve 60 saniyelik görsel geri sayım çubuğu/sayacı yer alır.
   - **Zaman Aşımı Kuralı:** Eğer oyuncu 60 saniye içinde cevap vermezse süre biter; soru **otomatik olarak YANLIŞ** sayılır, kırmızı uyarı verilir ve sonraki soruya geçilir.
3. **Tıklama / Spam Koruması (Debounce & Button Lock):**
   - Oyuncu bir butona bastığı anda butonlar kilitlenir (çift tıklama engellenir).
   - Doğru/Yanlış görsel dönütü (yeşil/kırmızı ışık/animasyon) ve kısa bilgi notu (`fact`) gösterilir.
   - `FEEDBACK_DELAY_MS` (1.5 sn) sonra sayaç sıfırlanarak sıradaki soruya geçilir.
4. **Sonuç Ekranı:**
   - 5 soru bittiğinde skor ekrana yansıtılır (Örn: "5 üzerinden 4 Doğru!").
   - **Baraj Geçilirse (`score >= WIN_THRESHOLD`):**
     - Eğer `ENABLE_WHEEL = true` ise: "Çarkı Çevir!" butonu aktif olur ve dahili çark ekranına geçilir.
     - Eğer `ENABLE_WHEEL = false` ise: Doğrudan "Tebrikler! Stand görevlisinden ödülünü alabilirsin!" mesajı ve görevli onay butonu çıkar.
   - **Baraj Geçilemezse:**
     - "Tebrikler, tekrar denemek ister misin?" ekranı ve "Yeniden Oyna" butonu gelir.

### 4.3. Stant & Moderatör Kontrolleri
* **Moderatör Reset Butonu:** Ekranın sağ/sol üst köşesinde stant görevlisine özel şık bir "Oyunu Sıfırla / Başa Dön" butonu bulunur. Oyuncu standı terk ettiğinde görevli tek tıkla oyunu başlangıç ekranına sıfırlayabilir.
* **Kiosk Korumaları:**
  - `user-select: none`: Yanlışlıkla metinlerin mavi seçilmesini engeller.
  - `touch-action: manipulation`: Dokunmatik ekranda çift tık ile ekranın yakınlaşmasını (zoom) engeller.
  - Sağ tık menüsü stant modunda engellenebilir.

---

## 5. BAĞIMSIZ ÇARK BİLEŞENİ (`components/wheel.js`)
* **Gevşek Bağlantı (Loose Coupling):** Çark, oyun mantığından tamamen izole bir Canvas/CSS bileşeni olacaktır.
* **Çıkarılabilirlik:** Eğer çark istenmezse:
  - `index.html`'den `<script src="components/wheel.js"></script>` satırı ve ilgili div kaldırılabilir veya `GAME_CONFIG.ENABLE_WHEEL = false` yapılarak tek satırla sistemden düşürülebilir.
  - Kodda hiçbir bağımlılık kırılması yaşanmaz; sonuç ekranı çark yerine statik ödül tebriğine bağlanır.
* **Ödül Dilimleri:** Çark dilimleri yerel olarak yapılandırılabilir (örn: "Sticker", "HÜİST Rozet", "Not Defteri", "Kahve Kuponu", "Tekrar Çevir").

---

## 6. OYUN 2: "AI mı Gerçek mi?" (Görsel Karşılaştırma) — 2. FAZ (AYRI PLAN)
*Bu oyun şu an kodlanmayacak, Truth or Lie tamamlandıktan sonra devreye alınacaktır.*
* **Konsept:** Yan yana iki görsel sunulur (biri yapay zeka üretimi, biri gerçek).
* **Veri:** `data/images.js` üzerinden görsel çiftleri ve doğru cevap anahtarı tutulacaktır.
* **Ayrı Modül:** Truth or Lie ile aynı çekirdek sayaç ve kiosk yapısını kullanacak, ancak arayüzü görsel odaklı ayrı bir ekran olacaktır.

---

## 7. Geliştirme Yol Haritası (Roadmap - Sadece Faz 1 / Truth or Lie)

* **Adım 1: Klasör Yapısı ve Veri Şablonu**
  - Dosya ağacının kurulması.
  - `data/questions.js` dosyasının şablonunun oluşturulması (kullanıcı 40+ soruyu dolduracak).
* **Adım 2: Arayüz İskeleti ve Kiosk CSS**
  - Modern, karanlık temalı, stant ekranına uygun büyük tipografi ve butonlar.
  - Moderatör sıfırlama butonu, sayaç çubuğu ve sonuç kartı tasarımı.
  - Touch ve metin seçim engelleri.
* **Adım 3: Truth or Lie Oyun Motoru (JS)**
  - Fisher-Yates soru karıştırma ve 5 soru seçimi.
  - 60 saniyelik geri sayım motoru ve zaman aşımı mekanizması.
  - Debounce/çift tık kilidi ve açıklama (fact) gecikmesi.
* **Adım 4: Sonuç Ekranı ve Ayrılabilir Çark Entegrasyonu**
  - Baraj kontrolü ve sonuç değerlendirmesi.
  - `ENABLE_WHEEL` bayrağı ile kolayca devreden çıkabilen modüler çark bileşeni.
* **Adım 5: Yerel Test & Doğrulama**
  - `file://` protokolü üzerinden tarayıcıda doğrudan test edilmesi.
  - Süre aşımı, moderatör butonu ve çark aç/kapa durumlarının doğrulanması.