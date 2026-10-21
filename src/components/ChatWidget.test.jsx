import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import ChatWidget from './ChatWidget';

afterEach(() => {
  vi.unstubAllGlobals();
  window.sessionStorage.clear();
});

test('opens the chat with suggested topics and sends a selected topic to n8n', async () => {
  const fetchMock = vi.fn().mockResolvedValue({
    ok: true,
    text: async () => JSON.stringify({ output: 'Kami siap membantu reservasi Anda.' }),
  });
  vi.stubGlobal('fetch', fetchMock);
  render(<ChatWidget />);

  fireEvent.click(screen.getByRole('button', { name: 'Buka chat' }));

  expect(await screen.findByText('Halo! Selamat datang di Ruang Pulih. Ada yang bisa kami bantu?')).toBeDefined();
  expect(screen.getByRole('button', { name: 'Saya ingin membuat reservasi' })).toBeDefined();
  expect(screen.getByRole('textbox', { name: 'Tulis pesan' })).toBeDefined();

  fireEvent.click(screen.getByRole('button', { name: 'Saya ingin membuat reservasi' }));

  await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());
  const [url, request] = fetchMock.mock.calls[0];
  expect(url).toBe('https://sidikhealth.app.n8n.cloud/webhook/5c664ccb-b97a-42fc-8d07-ebd5546ea2f5/chat');
  expect(JSON.parse(request.body)).toMatchObject({
    action: 'sendMessage',
    chatInput: 'Saya ingin membuat reservasi',
  });
  expect(await screen.findByText('Kami siap membantu reservasi Anda.')).toBeDefined();
});
