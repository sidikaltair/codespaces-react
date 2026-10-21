import { useState } from 'react';
import './ReservationPage.css';

const services = [
  'Fisioterapi muskuloskeletal',
  'Rehabilitasi olahraga',
  'Terapi gerak & postur',
];

function ReservationPage() {
  const [status, setStatus] = useState('');
  const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, '');

  function handleSubmit(event) {
    event.preventDefault();
    if (!whatsappNumber) {
      setStatus('Reservasi WhatsApp belum tersedia. Silakan gunakan chat untuk bantuan.');
      return;
    }

    const formData = new FormData(event.currentTarget);
    const message = [
      'Halo Ruang Pulih, saya ingin membuat reservasi fisioterapi.',
      `Nama: ${formData.get('name')}`,
      `Nomor WhatsApp: ${formData.get('phone')}`,
      `Layanan: ${formData.get('service')}`,
      `Tanggal: ${formData.get('date')}`,
      `Waktu: ${formData.get('time')}`,
      `Keluhan/tujuan: ${formData.get('notes') || '-'}`,
    ].join('\n');

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setStatus('Pesan reservasi disiapkan di WhatsApp. Silakan kirim untuk mengonfirmasi permintaan.');
  }

  const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);

  return (
    <main className="reservation-page">
      <header className="site-header">
        <a className="wordmark" href="/" aria-label="Ruang Pulih, beranda">ruang<span>pulih</span><i>.</i></a>
        <a className="header-cta" href="/#layanan">Lihat layanan <span aria-hidden="true">↗</span></a>
      </header>

      <section className="reservation-layout">
        <div className="reservation-intro">
          <p className="eyebrow"><span className="eyebrow-dot" /> RESERVASI SESI</p>
          <h1>Mulai dari<br /><em>ceritamu.</em></h1>
          <p className="reservation-lede">Ceritakan kebutuhanmu dan pilih waktu yang nyaman. Tim kami akan menghubungi untuk mengonfirmasi jadwal.</p>
          <div className="reservation-details">
            <div><span className="detail-mark">01</span><p><strong>Senin–Sabtu</strong><br />08.00–19.00</p></div>
            <div><span className="detail-mark">02</span><p><strong>Kemang</strong><br />Jakarta Selatan</p></div>
          </div>
          <a className="reservation-back" href="/">← Kembali ke beranda</a>
        </div>

        <form className="reservation-form" onSubmit={handleSubmit}>
          <div className="form-heading"><span>FORM RESERVASI</span><span>01 — 06</span></div>
          <label>
            Nama lengkap
            <input name="name" type="text" autoComplete="name" placeholder="Nama kamu" required />
          </label>
          <label>
            Nomor WhatsApp
            <input name="phone" type="tel" autoComplete="tel" placeholder="08xx xxxx xxxx" required />
          </label>
          <label>
            Layanan yang dibutuhkan
            <select name="service" defaultValue="" required>
              <option value="" disabled>Pilih layanan</option>
              {services.map((service) => <option key={service} value={service}>{service}</option>)}
            </select>
          </label>
          <div className="form-row">
            <label>
              Tanggal pilihan
              <input name="date" type="date" min={today} required />
            </label>
            <label>
              Waktu pilihan
              <select name="time" defaultValue="" required>
                <option value="" disabled>Pilih waktu</option>
                <option>08.00–11.00</option>
                <option>11.00–15.00</option>
                <option>15.00–19.00</option>
              </select>
            </label>
          </div>
          <label>
            Keluhan atau tujuan terapi <span className="optional-label">opsional</span>
            <textarea name="notes" rows="3" placeholder="Ceritakan singkat agar kami bisa membantu lebih baik" />
          </label>
          <button className="button button-dark reservation-submit" type="submit">Lanjutkan ke WhatsApp <span aria-hidden="true">↗</span></button>
          <p className="reservation-status" aria-live="polite">{status}</p>
          <p className="privacy-note">Jadwal akan dikonfirmasi oleh tim kami melalui WhatsApp.</p>
        </form>
      </section>
    </main>
  );
}

export default ReservationPage;