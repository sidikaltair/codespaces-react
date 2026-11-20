import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from './App';

test('renders the physiotherapy landing page and consultation link', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /kembali bergerak/i })).toBeDefined();
  const consultationLink = screen.getByRole('link', { name: /mulai konsultasi/i });
  const consultationUrl = new URL(consultationLink.getAttribute('href'));
  const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER || '62895344136068').replace(/\D/g, '');
  expect(consultationUrl.origin + consultationUrl.pathname).toBe(`https://wa.me/${whatsappNumber}`);
  expect(consultationUrl.searchParams.get('text')).toBe('Halo Pulih di rumah, saya ingin memulai konsultasi.');
  const firstSessionLink = screen.getByRole('link', { name: /atur sesi pertamamu/i });
  const whatsappUrl = new URL(firstSessionLink.getAttribute('href'));
  expect(whatsappUrl.origin + whatsappUrl.pathname).toBe(`https://wa.me/${whatsappNumber}`);
  expect(whatsappUrl.searchParams.get('text')).toBe('Halo Pulih di rumah, saya ingin mengatur sesi pertama.');
  expect(firstSessionLink.getAttribute('target')).toBe('_blank');
  expect(screen.getByRole('link', { name: /jadwalkan sesi/i }).getAttribute('href')).toContain(`https://wa.me/${whatsappNumber}`);
});

test('lets visitors browse patient testimonials and recommendations', () => {
  window.history.pushState({}, '', '/');
  render(<App />);

  expect(screen.getByText(/lari pagi tanpa khawatir/i)).toBeDefined();
  fireEvent.click(screen.getByRole('button', { name: /testimoni berikutnya/i }));
  expect(screen.getByText(/latihan sederhana yang bisa dilakukan di rumah/i)).toBeDefined();
  expect(screen.getByText(/direkomendasikan untuk yang ingin memahami tubuh/i)).toBeDefined();
});

test('shows service information without WhatsApp buttons on service rows', () => {
  window.history.pushState({}, '', '/');
  render(<App />);

  expect(screen.getByRole('heading', { name: /fisioterapi muskuloskeletal/i })).toBeDefined();
  expect(screen.queryByRole('link', { name: /konsultasikan fisioterapi muskuloskeletal/i })).toBeNull();
  expect(screen.queryByRole('link', { name: /konsultasikan rehabilitasi olahraga/i })).toBeNull();
  expect(screen.queryByRole('link', { name: /konsultasikan terapi gerak & postur/i })).toBeNull();
});

test('explains persistent pain, the physiotherapy process, and urgent warning signs', () => {
  window.history.pushState({}, '', '/');
  render(<App />);

  expect(screen.getByRole('heading', { name: /nyeri yang menetap layak diperiksa/i })).toBeDefined();
  expect(screen.getByText(/bukan diagnosis/i)).toBeDefined();
  expect(screen.getByRole('heading', { name: /langkahnya jelas, kamu tetap terlibat/i })).toBeDefined();
  expect(screen.getByText(/kelemahan mendadak/i)).toBeDefined();
  expect(screen.getByText(/berapa kali saya perlu menjalani sesi/i)).toBeDefined();
});
