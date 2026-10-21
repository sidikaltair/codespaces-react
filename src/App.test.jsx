import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the physiotherapy landing page and consultation link', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /kembali bergerak/i })).toBeDefined();
  expect(screen.getByRole('link', { name: /mulai konsultasi/i }).getAttribute('href')).toBe('/reservasi');
});

test('renders the reservation form at /reservasi', () => {
  window.history.pushState({}, '', '/reservasi');
  render(<App />);
  expect(screen.getByRole('heading', { name: /mulai dari ceritamu/i })).toBeDefined();
  expect(screen.getByRole('button', { name: /lanjutkan ke whatsapp/i })).toBeDefined();
});
