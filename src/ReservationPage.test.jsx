import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import ReservationPage from './ReservationPage';

afterEach(() => {
  vi.restoreAllMocks();
});

test('submits reservation details through the configured WhatsApp channel', () => {
  const openWindow = vi.spyOn(window, 'open').mockImplementation(() => null);
  render(<ReservationPage />);

  fireEvent.change(screen.getByLabelText('Nama lengkap'), { target: { value: 'Dina' } });
  fireEvent.change(screen.getByLabelText('Nomor WhatsApp'), { target: { value: '08123456789' } });
  fireEvent.change(screen.getByLabelText('Layanan yang dibutuhkan'), {
    target: { value: 'Fisioterapi muskuloskeletal' },
  });
  fireEvent.change(screen.getByLabelText('Tanggal pilihan'), {
    target: { value: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10) },
  });
  fireEvent.change(screen.getByLabelText('Waktu pilihan'), { target: { value: '08.00–11.00' } });
  fireEvent.change(screen.getByLabelText(/keluhan atau tujuan terapi/i), {
    target: { value: 'Nyeri punggung' },
  });
  fireEvent.click(screen.getByRole('button', { name: /lanjutkan ke whatsapp/i }));

  const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, '');
  if (whatsappNumber) {
    expect(openWindow).toHaveBeenCalledOnce();
    const [url, target, features] = openWindow.mock.calls[0];
    const whatsappUrl = new URL(url);
    expect(whatsappUrl.origin + whatsappUrl.pathname).toBe(`https://wa.me/${whatsappNumber}`);
    expect(whatsappUrl.searchParams.get('text')).toContain('Nama: Dina');
    expect(whatsappUrl.searchParams.get('text')).toContain('Keluhan/tujuan: Nyeri punggung');
    expect(target).toBe('_blank');
    expect(features).toContain('noopener');
  } else {
    expect(openWindow).not.toHaveBeenCalled();
    expect(screen.getByText(/reservasi whatsapp belum tersedia/i)).toBeDefined();
  }
});
