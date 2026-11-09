import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from './App';

test('renders the physiotherapy landing page and consultation link', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /kembali bergerak/i })).toBeDefined();
  expect(screen.getByRole('link', { name: /mulai konsultasi/i }).getAttribute('href')).toBe('/reservasi');
});

test('lets visitors browse patient testimonials and recommendations', () => {
  window.history.pushState({}, '', '/');
  render(<App />);

  expect(screen.getByText(/lari pagi tanpa khawatir/i)).toBeDefined();
  fireEvent.click(screen.getByRole('button', { name: /testimoni berikutnya/i }));
  expect(screen.getByText(/latihan sederhana yang bisa dilakukan di rumah/i)).toBeDefined();
  expect(screen.getByText(/direkomendasikan untuk yang ingin memahami tubuh/i)).toBeDefined();
});

test('renders the reservation form at /reservasi', () => {
  window.history.pushState({}, '', '/reservasi');
  render(<App />);
  expect(screen.getByRole('heading', { name: /mulai dari ceritamu/i })).toBeDefined();
  expect(screen.getByRole('button', { name: /lanjutkan ke whatsapp/i })).toBeDefined();
});
