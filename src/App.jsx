import { useState } from 'react';
import './App.css';
import ChatWidget from './components/ChatWidget';

const testimonials = [
  {
    quote: 'Setelah lama takut olahraga lagi, akhirnya saya bisa lari pagi tanpa khawatir. Timnya sabar banget menjelaskan setiap langkah.',
    name: 'Nadia P.',
    service: 'Pasien rehabilitasi olahraga',
    recommendation: 'Cocok untuk kamu yang ingin kembali aktif dengan langkah yang bertahap.',
  },
  {
    quote: 'Saya jadi lebih paham penyebab pegal di punggung dan punya latihan sederhana yang bisa dilakukan di rumah. Sesi terapinya terasa nyaman.',
    name: 'Dimas A.',
    service: 'Pasien fisioterapi muskuloskeletal',
    recommendation: 'Direkomendasikan untuk yang ingin memahami tubuh dan bergerak lebih nyaman.',
  },
  {
    quote: 'Dari awal saya merasa didengarkan. Programnya disesuaikan dengan keseharian saya, jadi lebih mudah konsisten dan semangat bergerak.',
    name: 'Sari M.',
    service: 'Pasien terapi gerak & postur',
    recommendation: 'Pilihan yang menyenangkan untuk memulai kebiasaan gerak yang lebih baik.',
  },
];

const services = [
  {
    number: '01',
    title: 'Fisioterapi muskuloskeletal',
    description: 'Pendampingan untuk nyeri punggung, leher, sendi, dan pemulihan pascacedera.',
    tag: 'Nyeri & cedera',
  },
  {
    number: '02',
    title: 'Rehabilitasi olahraga',
    description: 'Kembali ke aktivitas favorit dengan program pemulihan yang bertahap dan terukur.',
    tag: 'Aktif kembali',
  },
  {
    number: '03',
    title: 'Terapi gerak & postur',
    description: 'Bangun kebiasaan bergerak yang lebih nyaman untuk keseharian dan pekerjaan.',
    tag: 'Gerak lebih baik',
  },
];

const painFactors = [
  {
    number: '01',
    title: 'Beban yang berubah',
    description: 'Aktivitas yang meningkat mendadak, gerakan berulang, atau waktu istirahat yang kurang dapat membuat tubuh kesulitan beradaptasi.',
  },
  {
    number: '02',
    title: 'Riwayat cedera atau operasi',
    description: 'Setelah cedera, tubuh bisa mengubah cara bergerak. Kekuatan, kelenturan, dan kepercayaan diri mungkin perlu dibangun kembali secara bertahap.',
  },
  {
    number: '03',
    title: 'Kapasitas gerak belum pulih',
    description: 'Kekakuan, kelemahan, atau keterbatasan gerak dapat memengaruhi aktivitas. Penyebab dan latihan yang sesuai berbeda untuk setiap orang.',
  },
  {
    number: '04',
    title: 'Banyak faktor saling terkait',
    description: 'Kualitas tidur, stres, kondisi kesehatan, serta tuntutan pekerjaan juga dapat memengaruhi pengalaman nyeri dan proses pemulihan.',
  },
];

const visitSteps = [
  {
    number: '01',
    title: 'Ceritakan keluhanmu',
    description: 'Kapan mulai terasa, apa yang memperberat atau meringankan, serta aktivitas apa yang ingin kamu lakukan kembali.',
  },
  {
    number: '02',
    title: 'Pemeriksaan gerak',
    description: 'Fisioterapis menilai gerak, kekuatan, dan fungsi sesuai keluhanmu, lalu menjelaskan temuan dengan bahasa yang mudah dipahami.',
  },
  {
    number: '03',
    title: 'Susun rencana bersama',
    description: 'Latihan dan pendampingan disesuaikan dengan kondisi, tujuan, serta kemampuanmu. Kamu bisa bertanya dan menyampaikan kekhawatiran.',
  },
  {
    number: '04',
    title: 'Pantau dan sesuaikan',
    description: 'Kemajuan ditinjau bersama. Program dapat diubah berdasarkan respons tubuh dan aktivitas sehari-hari.',
  },
];

const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER || '6285697237655').replace(/\D/g, '');
const whatsappUrl = (message) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
const firstSessionWhatsappUrl = whatsappUrl('Halo Pulih di rumah, saya ingin mengatur sesi pertama.');

function App() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonial = testimonials[activeTestimonial];

  function showPreviousTestimonial() {
    setActiveTestimonial((current) => (current - 1 + testimonials.length) % testimonials.length);
  }

  function showNextTestimonial() {
    setActiveTestimonial((current) => (current + 1) % testimonials.length);
  }

  return (
    <>
      <main>
      <header className="site-header">
        <a className="wordmark" href="#beranda" aria-label="Pulih di rumah, beranda">
          Pulih <span>di rumah</span><i>.</i>
        </a>
        <nav className="main-nav" aria-label="Navigasi utama">
          <a href="#nyeri">Tentang nyeri</a>
          <a href="#layanan">Layanan</a>
          <a href="#pendekatan">Pendekatan</a>
          <a href="#pertanyaan">FAQ</a>
        </nav>
        <a className="header-cta" href={whatsappUrl('Halo Pulih di rumah, saya ingin menjadwalkan sesi.')} target="_blank" rel="noreferrer">Jadwalkan sesi <span aria-hidden="true">↗</span></a>
      </header>

      <section className="hero" id="beranda">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> KLINIK FISIOTERAPI · Kota Bandung, Jawa Barat</p>
          <h1>Kembali bergerak.<br /><em>Tanpa takut.</em></h1>
          <p className="hero-description">
            Tubuhmu punya cerita. Kami mendengarkan, memahami, lalu menyusun jalan pulih yang terasa pas untukmu. Tunggu kami datang ke rumahmu, atau datang ke klinik untuk sesi tatap muka
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href={whatsappUrl('Halo Pulih di rumah, saya ingin memulai konsultasi.')} target="_blank" rel="noreferrer">Mulai konsultasi <span aria-hidden="true">↗</span></a>
            <a className="text-link" href="#layanan">Lihat layanan <span aria-hidden="true">↓</span></a>
          </div>
          <div className="hero-proof">
            <div className="avatar-stack" aria-hidden="true"><span>R</span><span>A</span><span>D</span></div>
            <p><strong>Dipercaya 1.200+ pasien</strong><br />untuk kembali aktif setiap hari</p>
          </div>
        </div>
        <div className="hero-visual">
          <img
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1400&q=85"
            alt="Sesi latihan gerak dengan pendampingan profesional"
          />
          <div className="image-caption"><span>01 / 03</span><span>Gerak adalah bagian dari pulih.</span></div>
          <div className="hero-note"><span className="note-mark">✳</span><span>Pelan-pelan<br /><strong>tetap maju.</strong></span></div>
        </div>
      </section>

      <div className="trust-strip" aria-label="Keunggulan klinik">
        <span>TERAPI BERBASIS BUKTI</span><i />
        <span>FOKUS PADA DIRIMU</span><i />
        <span>LANGKAH KECIL, PROGRES NYATA</span><i />
        <span>TERAPI BERBASIS BUKTI</span>
      </div>

      <section className="services section-wrap" id="layanan">
        <div className="section-heading">
          <div>
            <p className="eyebrow">BAGAIMANA KAMI MEMBANTU</p>
            <h2>Gerak lebih nyaman,<br /><em>mulai dari sini.</em></h2>
          </div>
          <p className="section-intro">Setiap tubuh punya kebutuhan berbeda. Kami mulai dengan mendengarkan, bukan menebak.</p>
        </div>
        <div className="service-list">
          {services.map((service) => (
            <article className="service-row" key={service.number}>
              <span className="service-number">{service.number}</span>
              <div className="service-main">
                <span className="service-tag">{service.tag}</span>
                <h3>{service.title}</h3>
              </div>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pain-education section-wrap" id="nyeri">
        <div className="section-heading">
          <div>
            <p className="eyebrow">MEMAHAMI NYERI BERKEPANJANGAN</p>
            <h2>Nyeri yang menetap<br /><em>layak diperiksa.</em></h2>
          </div>
          <p className="section-intro">Nyeri yang berlangsung atau berulang selama berbulan-bulan sering disebut nyeri persisten. Nyeri adalah pengalaman yang nyata, tetapi tidak selalu berarti ada kerusakan yang terus memburuk.</p>
        </div>
        <div className="pain-factor-grid">
          {painFactors.map((factor) => (
            <article className="pain-factor-card" key={factor.number}>
              <span>{factor.number}</span>
              <h3>{factor.title}</h3>
              <p>{factor.description}</p>
            </article>
          ))}
        </div>
        <p className="education-note">
          <strong>Perlu diingat:</strong> ini adalah informasi umum, bukan diagnosis. Nyeri baru, berat, terus memburuk, atau mengganggu tidur dan kegiatan sehari-hari sebaiknya dinilai oleh tenaga kesehatan.
        </p>
      </section>

      <section className="approach" id="pendekatan">
        <div className="approach-image">
          <img
            src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1100&q=85"
            alt="Latihan peregangan untuk membantu tubuh bergerak lebih leluasa"
            loading="lazy"
          />
          <span className="photo-index">RUANG GERAK 02 — 03</span>
        </div>
        <div className="approach-copy">
          <p className="eyebrow">BUKAN CUMA MEREDAKAN NYERI</p>
          <h2>Kenali tubuhmu.<br /><em>Pulih dengan yakin.</em></h2>
          <p className="approach-description">Kami percaya pemulihan terbaik terjadi saat kamu paham apa yang sedang terjadi di tubuhmu. Jadi, setiap sesi adalah ruang untuk bertanya, mencoba, dan tumbuh lebih kuat.</p>
          <div className="approach-points">
            <div><span>01</span><p><strong>Didengar sepenuhnya</strong><br />Kami mulai dari ceritamu dan tujuan yang ingin kamu capai.</p></div>
            <div><span>02</span><p><strong>Rencana yang personal</strong><br />Program disusun bersama, sesuai kondisi dan ritmemu.</p></div>
            <div><span>03</span><p><strong>Progres yang terasa</strong><br />Kita ukur kemajuan dari hal yang berarti buatmu.</p></div>
          </div>
        </div>
      </section>

      <section className="visit-process section-wrap" id="proses">
        <div className="section-heading">
          <div>
            <p className="eyebrow">APA YANG TERJADI SAAT FISIOTERAPI?</p>
            <h2>Langkahnya jelas,<br /><em>kamu tetap terlibat.</em></h2>
          </div>
          <p className="section-intro">Fisioterapi bukan sekadar diberi latihan. Kamu dan fisioterapis bekerja sama memahami masalah gerak dan memilih langkah yang sesuai.</p>
        </div>
        <div className="visit-step-grid">
          {visitSteps.map((step) => (
            <article className="visit-step" key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
        <div className="safety-note">
          <span className="safety-mark" aria-hidden="true">!</span>
          <p><strong>Cari pertolongan medis segera</strong> jika nyeri disertai sesak atau nyeri dada, kelemahan mendadak, hilangnya kendali buang air kecil/besar, demam tinggi, atau terjadi setelah cedera berat. Untuk keadaan darurat, hubungi layanan darurat setempat.</p>
        </div>
      </section>

      <section className="faq-section section-wrap" id="pertanyaan">
        <div className="section-heading">
          <div>
            <p className="eyebrow">PERTANYAAN YANG SERING MUNCUL</p>
            <h2>Masih ada yang<br /><em>ingin ditanyakan?</em></h2>
          </div>
          <p className="section-intro">Setiap kondisi berbeda. Jawaban berikut membantu memberi gambaran awal—fisioterapis akan menilai kebutuhanmu secara individual.</p>
        </div>
        <div className="faq-list">
          <details>
            <summary>Apakah nyeri harus hilang dulu sebelum mulai fisioterapi?</summary>
            <p>Tidak selalu. Setelah pemeriksaan, fisioterapis dapat membantu menentukan aktivitas dan latihan yang aman untuk kondisimu. Sampaikan jika suatu gerakan membuat gejala memburuk.</p>
          </details>
          <details>
            <summary>Apakah fisioterapi hanya untuk cedera olahraga?</summary>
            <p>Tidak. Fisioterapi juga dapat membantu mengevaluasi dan menangani masalah gerak seperti nyeri punggung atau leher, kekakuan sendi, pemulihan setelah operasi, dan keterbatasan aktivitas—sesuai hasil pemeriksaan dan kompetensi layanan.</p>
          </details>
          <details>
            <summary>Berapa kali saya perlu menjalani sesi?</summary>
            <p>Jumlah sesi bergantung pada kondisi, tujuan, respons tubuh, dan rencana yang disepakati. Setelah evaluasi, tanyakan perkiraan program dan kapan kemajuan akan ditinjau kembali.</p>
          </details>
          <details>
            <summary>Apakah saya perlu membawa hasil rontgen atau MRI?</summary>
            <p>Jika sudah memiliki hasil pemeriksaan atau surat rujukan, siapkan untuk dibahas. Pemeriksaan pencitraan tidak selalu diperlukan; kebutuhan pemeriksaan lanjutan ditentukan tenaga kesehatan berdasarkan kondisi.</p>
          </details>
          <details>
            <summary>Apa yang perlu disiapkan untuk sesi pertama?</summary>
            <p>Kenakan pakaian yang nyaman untuk bergerak. Catat kapan keluhan muncul, aktivitas yang terpengaruh, obat atau pemeriksaan yang relevan, dan tujuan yang ingin kamu capai.</p>
          </details>
        </div>
      </section>

      <section className="testimonial section-wrap" id="cerita">
        <p className="eyebrow">CERITA DARI PULIH DI RUMAH</p>
        <button className="testimonial-arrow testimonial-arrow-previous" type="button" onClick={showPreviousTestimonial} aria-label="Testimoni sebelumnya">
          <span aria-hidden="true">←</span>
        </button>
        <div className="testimonial-content" aria-live="polite" aria-atomic="true">
          <blockquote>“{testimonial.quote}”</blockquote>
          <div className="quote-byline"><span className="quote-line" /><span><strong>{testimonial.name}</strong> · {testimonial.service}</span></div>
          <p className="quote-recommendation"><span aria-hidden="true">✳</span><strong>Rekomendasi:</strong> {testimonial.recommendation}</p>
        </div>
        <button className="testimonial-arrow testimonial-arrow-next" type="button" onClick={showNextTestimonial} aria-label="Testimoni berikutnya">
          <span aria-hidden="true">→</span>
        </button>
        <div className="testimonial-pagination" aria-label={`Testimoni ${activeTestimonial + 1} dari ${testimonials.length}`}>
          {testimonials.map((item, index) => (
            <button
              key={item.name}
              type="button"
              className={index === activeTestimonial ? 'testimonial-dot is-active' : 'testimonial-dot'}
              onClick={() => setActiveTestimonial(index)}
              aria-label={`Lihat testimoni ${index + 1}`}
              aria-current={index === activeTestimonial ? 'true' : undefined}
            />
          ))}
        </div>
        <span className="quote-decoration" aria-hidden="true">“</span>
      </section>

      <section className="contact" id="kontak">
        <div className="contact-copy">
          <p className="eyebrow">LANGKAH PERTAMAMU DIMULAI DI SINI</p>
          <h2>Siap merasa lebih<br /><em>baik dalam bergerak?</em></h2>
        </div>
        <div className="contact-action">
          <p>Ceritakan apa yang kamu rasakan. Kami bantu cari tahu sesi yang paling sesuai.</p>
          <a className="button button-light" href={firstSessionWhatsappUrl} target="_blank" rel="noreferrer">Atur sesi pertamamu <span aria-hidden="true">↗</span></a>
          <span className="contact-hours">Senin–Sabtu, 08.00–19.00 · Bandung, Jawa Barat</span>
        </div>
        <span className="contact-spark" aria-hidden="true">✳</span>
      </section>

      <footer className="site-footer">
        <a className="wordmark" href="#beranda">Pulih <span>di rumah</span><i>.</i></a>
        <p>Ruang untuk kembali menjadi dirimu.</p>
        <span>© 2025 Pulih di rumah Fisioterapi</span>
      </footer>
      </main>
      <ChatWidget />
    </>
  );
}

export default App;
