import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the physiotherapy landing page and consultation link', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /kembali bergerak/i })).toBeDefined();
  expect(screen.getByRole('link', { name: /mulai konsultasi/i }).getAttribute('href')).toBe('#kontak');
});
