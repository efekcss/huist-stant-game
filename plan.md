# HÜİST Stant Oyunları Teknik Plan ve Yapılanlar

## 1. Mimari ve Teknik Altyapı Özeti

Proje, internet gereksinimini ortadan kaldırmak için **Çevrimdışı (Offline-first)** ve **SPA (Single Page Application)** mantığı ile Vanilla JS kullanılarak geliştirilmiştir. Dışa bağımlılık veya backend (Node.js/Python vb.) kullanılmamış olup, CORS hatalarını engellemek için veriler saf JavaScript dosyaları halinde tutulmaktadır. 

Kullanılan Teknolojiler:
* **HTML5:** Kiosk ekran formatına uygun, esnek kutu (flexbox) yerleşimleri.
* **CSS3:** Kullanıcıların metinleri kazara seçmesini önleyen `user-select: none` özellikleri, dokunmatik yakınlaştırmayı engelleyen `touch-action` kuralları ve donanım hızlandırmalı pürüzsüz geçiş animasyonları.
* **Vanilla ES6 JavaScript:** Modüler fonksiyonlar, Fisher-Yates karıştırma algoritması, `requestAnimationFrame` veya `setInterval` tabanlı sayaç mekanizmaları.

## 2. Dizin Yapısı ve Dosyaların İşlevleri

Projede şu anda "Truth or Lie" (Gerçek mi Yalan mı?) oyunu kodlanmıştır. İlgili dizin ve dosyaların teknik detayları şu şekildedir:

```text
/huist-stant-game
│
└── /truth-or-lie/
    ├── index.html       : Uygulamanın giriş noktası. Karşılama, Oyun, Sonuç ve Çark ekranlarını içeren tek sayfalık iskelet.
    ├── style.css        : Temel stil dosyası. Kiosk korumaları, buton kilitleri, karanlık tema renk paletleri ve temel yerleşimleri içerir.
    ├── script.js        : Ana oyun motorudur. DOM manipülasyonu, geri sayım yöneticisi, soru yükleme mantığı ve State (Durum) yönetimini yapar. 
    ├── /data
    │   └── questions.js : Oyunun sorularının tutulduğu veri havuzudur. JSON yerine 'window.QUESTIONS' adlı global bir dizi kullanılarak tarayıcı güvenlik politikalarına (CORS) takılmadan verilerin yüklenmesi sağlanmıştır.
    ├── /components
    │   └── wheel.js     : Tamamen izole edilmiş, canvas veya DOM tabanlı animasyonlu çark sistemidir. Ana oyundan bağımsız çalışabilecek şekilde modüler yazılmıştır.
    └── /assets          : Gelecek aşamada kullanılacak olan ikon, ses veya arka plan görsellerinin barındırılacağı statik klasör.
```

## 3. Şu Ana Kadar Gerçekleştirilen Teknik Adımlar

* **Veri Yönetimi:** JSON dosyasındaki 35+ yeni soru parse edilerek `data/questions.js` dosyasına, sisteme uygun yapıya (id, question, isTrue, fact) dönüştürülerek eklendi.
* **Oyun Motoru ve Durum Yönetimi:** `script.js` dosyasında havuzdan rastgele soru çekme, çift tıklamayı önlemek (debounce/button lock) ve moderatörün (stant görevlisinin) herhangi bir anda oyunu sıfırlayabilmesi mantıkları hedeflendi ve altyapı oluşturuldu.
* **Çark Modülü Ayrıştırması:** Oyun kazananları için çark mekanizması, ayarlardan (`ENABLE_WHEEL`) tek tuşla açılıp kapatılabilecek şekilde modüler bir bileşen olarak ayrıştırıldı.

## 4. Sıradaki Hedef: Görsel Tasarım ve Arayüz (UI/UX) İyileştirmeleri

Oyunun temel teknik altyapısı ve veri kaynakları tamamlandığına göre sıradaki geliştirme aşaması **Tam Ekran Stant Tasarımı** ve **Çarkın Görsel İyileştirmesidir**. 

Bu adımda yapılacaklar:
1. `style.css` kullanılarak modern, ilgi çekici (veri bilimi temasına uygun) karanlık/teknolojik bir temanın oluşturulması.
2. Çark modülünün (`wheel.js` ve CSS bağlantıları) görsel olarak çekici, dönme hissiyatını gerçekçi veren ve dilimleri düzgün hesaplanmış bir arayüze kavuşturulması.
3. Geçiş efektleri, doğru/yanlış cevaplarda beliren görsel geri bildirimler (yeşil/kırmızı ışıklandırmalar) ve butonların etkileşim durumlarının cilalanması.
4. Oyun ve sonuç ekranlarındaki hiyerarşinin stant ortamında uzaktan bile rahatça okunabilecek şekilde boyutlandırılması.

---

## 5. OYUN 2: "AI mı Değil mi?"

Bu aşamada geliştirilecek 2. oyun olan "AI mı Değil mi?" (Is it AI or Real?), yapısal olarak `truth-or-lie` dizinindeki mimarinin neredeyse aynısını (aynı zamanlayıcı, kiosk kilidi, moderatör paneli ve çark bağlantısı) kullanacaktır. Temel farklılık, oyun mekaniğinin soru metinleri yerine görsellerin (yapay zeka tarafından üretilmiş veya gerçek) kullanılması üzerine kurulu olmasıdır.
