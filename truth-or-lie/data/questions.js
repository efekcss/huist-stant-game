// Soru Havuzu
window.QUESTIONS = [
  {
    id: 1,
    question: "Python programlama dili adını bir yılan türünden değil, 'Monty Python' komedi grubundan almıştır.",
    isTrue: true,
    fact: "Guido van Rossum dili geliştirirken 'Monty Python's Flying Circus' senaryolarını okuyordu."
  },
  {
    id: 2,
    question: "İstatistik kelimesi Latince 'durum' anlamına gelen 'status' kelimesinden türetilmiştir.",
    isTrue: true,
    fact: "Kelime başlangıçta devlet işleri ve demografi ile ilgili verileri tanımlamak için kullanılmıştır."
  },
  {
    id: 3,
    question: "İlk bilgisayar programcısı bir erkektir.",
    isTrue: false,
    fact: "Tarihteki ilk bilgisayar programcısı, Charles Babbage'ın Analitik Makinesi için bir algoritma yazan Ada Lovelace'tir."
  },
  {
    id: 4,
    question: "Yapay zeka terimi ilk olarak 2000'li yıllarda kullanılmıştır.",
    isTrue: false,
    fact: "Yapay Zeka (Artificial Intelligence) terimi ilk kez 1956'daki Dartmouth Konferansı'nda John McCarthy tarafından kullanıldı."
  },
  {
    id: 5,
    question: "Standart bir zarda, karşılıklı yüzlerin toplamı her zaman 7'dir.",
    isTrue: true,
    fact: "Geleneksel zarlarda 1'in karşısında 6, 2'nin karşısında 5 ve 3'ün karşısında 4 bulunur."
  },
  {
    id: 6,
    question: "HTML bir programlama dilidir.",
    isTrue: false,
    fact: "HTML (HyperText Markup Language) bir işaretleme dilidir, mantıksal işlemler (if/else, döngüler) içeremez."
  }
,
  {
    id: 7,
    question: "Dünyadaki mevcut verilerin yaklaşık %90'ı son 2-3 yıl içinde üretilmiştir.",
    isTrue: true,
    fact: "Gerçek! Dijitalleşme, IoT cihazları ve sosyal medya sayesinde veri üretimi eksponansiyel olarak artmaktadır."
  },
  {
    id: 8,
    question: "İlk bilgisayar faresi (mouse) plastikten icat edilmiştir.",
    isTrue: false,
    fact: "Yalan! Douglas Engelbart tarafından icat edilen ilk bilgisayar faresi ahşaptan yapılmıştı."
  },
  {
    id: 9,
    question: "İstatistik bilimi, kelime kökeni olarak 'devlet (state)' kelimesinden türemiştir.",
    isTrue: true,
    fact: "Gerçek! İtalyanca 'statista' (devlet adamı) kelimesinden gelir, çünkü ilk zamanlarda sadece devletin nüfus ve vergi verilerini kapsıyordu."
  },
  {
    id: 10,
    question: "Bir madeni parayı 10 kere atıp 10'unda da 'yazı' bulursanız, 11. atışta 'tura' gelme olasılığı istatistiksel olarak daha yüksektir.",
    isTrue: false,
    fact: "Yalan! Buna 'Kumarbaz Yanılgısı (Gambler's Fallacy)' denir. Önceki atışlar bağımsızdır, 11. atışta olasılık hala %50'dir."
  },
  {
    id: 11,
    question: "Python programlama dili adını bir yılandan değil, bir İngiliz komedi grubundan almıştır.",
    isTrue: true,
    fact: "Gerçek! Yaratıcısı Guido van Rossum, 'Monty Python's Flying Circus' adlı komedi grubunun büyük bir hayranıydı."
  },
  {
    id: 12,
    question: "İnternette kaydedilen ilk alan adı (domain) 'google.com'dur.",
    isTrue: false,
    fact: "Yalan! İnternette kaydedilen ilk alan adı 1985 yılında alınan 'symbolics.com' idi."
  },
  {
    id: 13,
    question: "Dünya üzerindeki ilk bilgisayar programcısı bir kadındır.",
    isTrue: true,
    fact: "Gerçek! Ada Lovelace, 1840'larda Charles Babbage'ın Analitik Motor'u için ilk algoritmayı yazmıştır."
  },
  {
    id: 14,
    question: "ChatGPT gibi yapay zeka modelleri, internete bağlı oldukları için her yeni bilgiyi anında öğrenip çekirdek modellerini kalıcı olarak güncellerler.",
    isTrue: false,
    fact: "Yalan! LLM'ler statik veri setleriyle eğitilirler. İnternetten arama yapabilseler de çekirdek eğitim ağırlıkları anlık olarak değişmez."
  },
  {
    id: 15,
    question: "Sadece 23 kişinin bulunduğu bir odada, en az iki kişinin aynı gün doğmuş olma olasılığı %50'den fazladır.",
    isTrue: true,
    fact: "Gerçek! İstatistikteki meşhur 'Doğum Günü Paradoksu' bize 23 kişide bu ihtimalin %50.7 olduğunu söyler."
  },
  {
    id: 16,
    question: "İstatistiksel verilere göre uçak yolculuğu, arabayla seyahat etmekten daha tehlikelidir.",
    isTrue: false,
    fact: "Yalan! Uçaklar istatistiksel olarak dünyadaki en güvenli ulaşım araçlarıdır. Otomobil kazası ihtimali çok daha yüksektir."
  },
  {
    id: 17,
    question: "'Makine Öğrenmesi' (Machine Learning) terimi ilk kez 2010'lu yıllarda kullanılmıştır.",
    isTrue: false,
    fact: "Yalan! Bu terim ilk kez 1959 yılında, dama oynayan bir yapay zeka geliştiren Arthur Samuel tarafından kullanılmıştır."
  },
  {
    id: 18,
    question: "Dünyadaki ilk web kamerası, bir laboratuvardaki kahve makinesini izlemek için icat edilmiştir.",
    isTrue: true,
    fact: "Gerçek! 1991'de Cambridge Üniversitesi öğrencileri, kahve makinesinin boş olup olmadığını görmek için ilk kamerayı kurdular."
  },
  {
    id: 19,
    question: "Büyük veri işlemek için kullanılan 'Hadoop' teknolojisi, adını kurucusunun oğlunun oyuncak filinden almıştır.",
    isTrue: true,
    fact: "Gerçek! Doug Cutting, oğlunun oyuncak sarı filinin adını bu devasa veri platformuna vermiştir."
  },
  {
    id: 20,
    question: "Eğer iki değişken (örneğin dondurma satışları ve güneş yanığı vakaları) arasında çok güçlü bir korelasyon varsa, biri kesinlikle diğerinin nedenidir.",
    isTrue: false,
    fact: "Yalan! Korelasyon nedensellik (causation) anlamına gelmez. İkisi de üçüncü bir değişkene (yaz mevsimine) bağlı olabilir."
  },
  {
    id: 21,
    question: "QWERTY klavye dizilimi, yazım hızını yavaşlatmak ve daktilo tuşlarının birbirine sıkışmasını önlemek amacıyla tasarlanmıştır.",
    isTrue: true,
    fact: "Gerçek! Çok hızlı yazıldığında mekanik tuşlar sıkışıyordu, bu yüzden sık kullanılan harfler birbirinden uzaklaştırıldı."
  },
  {
    id: 22,
    question: "Normal dağılım (Çan eğrisi) grafiğinde, tüm verilerin %99'u ortalamadan sadece 1 standart sapma uzaklıkta yer alır.",
    isTrue: false,
    fact: "Yalan! 68-95-99.7 kuralına göre, verilerin sadece %68'i 1 standart sapma içinde yer alır. %99.7'si 3 standart sapma içindedir."
  },
  {
    id: 23,
    question: "Dünyanın ilk 1 Gigabayt (GB) kapasiteli sabit diski (hard disk) piyasaya çıktığında yaklaşık bir buzdolabı büyüklüğündeydi.",
    isTrue: true,
    fact: "Gerçek! 1980 yılında IBM tarafından tanıtılan IBM 3380, devasa boyutlarda ve 250 kilogram ağırlığındaydı."
  },
  {
    id: 24,
    question: "Bir şifrenin sonuna ünlem (!) işareti koymak, onu yapay zeka tabanlı şifre kırıcılarına karşı kesinlikle kırılamaz hale getirir.",
    isTrue: false,
    fact: "Yalan! Sonuna ünlem veya sayı eklemek en çok bilinen insan davranışıdır, yapay zeka algoritmaları bunu saniyeler içinde çözer."
  },
  {
    id: 25,
    question: "Yapay zeka kavramının bilimsel bir alan olarak kabul edilmesi 1956 yılındaki Dartmouth Konferansı'na dayanır.",
    isTrue: true,
    fact: "Gerçek! John McCarthy ve meslektaşları bu konferansta 'Yapay Zeka' terimini ilk kez literatüre sokmuştur."
  },
  {
    id: 26,
    question: "Veri biliminde 'One-Hot Encoding' yöntemi, bilgisayarların üşümesini engellemek için işlemci sıcaklığını artıran bir yazılım tekniğidir.",
    isTrue: false,
    fact: "Yalan! One-Hot Encoding, kategorik verileri (örn: kırmızı, mavi) makine öğrenmesi algoritmalarının anlayabileceği (0 ve 1) sayısal vektörlere dönüştürme işlemidir."
  },
  {
    id: 27,
    question: "P-değeri (p-value), boş hipotez doğru olduğunda, gözlemlenen test istatistiğini veya daha aşırısını elde etme olasılığıdır.",
    isTrue: true,
    fact: "Gerçek! İstatistikte anlamlılık testi için kullanılan p-değeri, sıfır hipotezi altındaki gözlem olasılığını verir."
  },
  {
    id: 28,
    question: "Lojistik regresyon algoritması, adında 'regresyon' geçmesine rağmen sürekli (sayısal) değerleri değil, kategorik sınıfları (classification) tahmin etmek için kullanılır.",
    isTrue: true,
    fact: "Gerçek! Lojistik regresyon, 'evet/hayır' veya 'spam/spam değil' gibi sınıflandırma problemleri için temel algoritmadır."
  },
  {
    id: 29,
    question: "Merkezi Limit Teoremi'ne göre, örneklem boyutu büyüdükçe verinin kendisi her zaman normal dağılıma yaklaşır.",
    isTrue: false,
    fact: "Yalan! Verinin kendisi değil, alınan 'örneklem ortalamalarının dağılımı' normal dağılıma yaklaşır. Çok kritik bir ayrımdır!"
  },
  {
    id: 30,
    question: "K-Means kümeleme (clustering) algoritması, aykırı değerlere (outliers) karşı çok hassastır ve kolayca etkilenebilir.",
    isTrue: true,
    fact: "Gerçek! K-Means, kümelerin merkezini (ortalamasını) baz aldığı için, aykırı değerler bu merkezleri kolayca kendilerine çekebilir."
  },
  {
    id: 31,
    question: "Bayes Teoremi'nde 'Prior (Önsel) olasılık', yeni veri veya kanıtları gözlemledikten sonra güncellenen olasılığı ifade eder.",
    isTrue: false,
    fact: "Yalan! Önsel (Prior) olasılık, kanıt öncesindeki inancımızdır. Kanıt sonrası güncellenen olasılığa 'Posterior (Sonsal)' denir."
  },
  {
    id: 32,
    question: "Karar Ağaçları (Decision Trees), makine öğrenmesinde 'aşırı öğrenme' (overfitting) eğilimi en düşük ve en güvenli algoritmalarından biridir.",
    isTrue: false,
    fact: "Yalan! Karar ağaçları tam tersine, eğer derinliği sınırlanmazsa eğitim verisini ezberlemeye (overfitting) çok yatkındır."
  },
  {
    id: 33,
    question: "Bir makine öğrenmesi modelinde R-kare (R²) değerinin 1'e (yani %100'e) çok yakın olması, modelin yeni veriler üzerinde de kesinlikle çok başarılı olacağını garanti eder.",
    isTrue: false,
    fact: "Yalan! R²'nin 1 olması genellikle modelin 'overfit' olduğunu (veriyi öğrendiğini değil ezberlediğini) gösterir; yeni verilerde çakılabilir."
  },
  {
    id: 34,
    question: "Tip-1 Hata (Type 1 Error), gerçekte doğru olan bir boş hipotezi (Null Hypothesis) reddetme durumudur; yani bir 'Yanlış Pozitif'tir (False Positive).",
    isTrue: true,
    fact: "Gerçek! Hasta olmayan birine 'hastasın' demek gibi, olmayan bir etkiyi var gibi görme hatasıdır."
  },
  {
    id: 35,
    question: "'Random Forest' (Rastgele Orman) algoritması, birden fazla karar ağacı (decision tree) oluşturarak ve sonuçlarının ortalamasını (veya modunu) alarak çalışır.",
    isTrue: true,
    fact: "Gerçek! Bu bir 'Ensemble' (topluluk) yöntemidir. Birden fazla ağaç birlikte karar vererek tek ağacın overfitting hatasını önler."
  },
  {
    id: 36,
    question: "Derin Öğrenme (Deep Learning) ağlarındaki 'Dropout' katmanının amacı, modeli hızlandırmak için gereksiz verileri silmektir.",
    isTrue: false,
    fact: "Yalan! Dropout, ağdaki nöronları eğitim sırasında rastgele 'kapatarak' nöronların birbirine bağımlılığını kırar ve ezberlemeyi (overfitting) engeller."
  },
  {
    id: 37,
    question: "Bir veri setinde Z-skoru (standart skor) 0 olan bir gözlem, o verinin tam olarak ortalamasında yer alıyor demektir.",
    isTrue: true,
    fact: "Gerçek! Z-skoru, bir değerin ortalamadan kaç standart sapma uzakta olduğunu gösterir. Z=0 demek, değerin ortalamaya eşit olması demektir."
  },
  {
    id: 38,
    question: "Makine öğrenmesinde 'Gradient Descent' (Gradyan İnişi) algoritmasının temel amacı, modelin kayıp fonksiyonunu (loss function) minimize eden doğru ağırlıkları (weights) bulmaktır.",
    isTrue: true,
    fact: "Gerçek! Bir dağdan aşağıya en kısa yoldan en derin vadiye inmeye çalışmak gibi, model hatasını en aza indirmeye çalışır."
  },
  {
    id: 39,
    question: "PCA (Temel Bileşenler Analizi), veri setindeki özellikleri (features) artırmak için kullanılan denetimli (supervised) bir derin öğrenme algoritmasıdır.",
    isTrue: false,
    fact: "Yalan! PCA, veri setinin boyutunu (özellik sayısını) 'azaltmak' için kullanılan geleneksel, denetimsiz (unsupervised) bir istatistiksel tekniktir."
  },
  {
    id: 40,
    question: "Zaman serisi analizinde bir serinin 'durağan' (stationary) olması, o serinin ortalamasının, varyansının ve otokorelasyon yapısının zaman içinde değişmediği anlamına gelir.",
    isTrue: true,
    fact: "Gerçek! ARIMA gibi geleneksel zaman serisi modelleri, verilerin anlamlı bir tahmin yapabilmesi için serinin durağan olmasını gerektirir."
  },
  {
    id: 41,
    question: "İstatistikte iki olay 'bağımsız (mutually exclusive)' ise, bu iki olayın aynı anda gerçekleşme olasılığı sıfırdır (0).",
    isTrue: true,
    fact: "Gerçek! Zarın aynı atışta hem 2 hem de 5 gelmesi imkansızdır. Birinin olması diğerini tamamen dışlar."
  }
];
