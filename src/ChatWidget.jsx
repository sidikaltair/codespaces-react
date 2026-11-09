import { useState } from 'react';

const webhookUrl = import.meta.env.VITE_N8N_CHAT_WEBHOOK_URL || '';

function createSessionId() {
  const storageKey = 'ruang-pulih-chat-session';
  const existingSession = window.sessionStorage.getItem(storageKey);
  if (existingSession) return existingSession;

  const sessionId = window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  window.sessionStorage.setItem(storageKey, sessionId);
  return sessionId;
}

function ChatWidget() {
  const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, '');
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const [sessionId] = useState(createSessionId);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: webhookUrl
        ? 'Halo, saya asisten Ruang Pulih. Ada yang ingin kamu tanyakan?'
        : 'Chat belum tersambung. Silakan gunakan formulir reservasi atau hubungi klinik.',
    },
  ]);

  async function handleSubmit(event) {
    event.preventDefault();
    const chatInput = message.trim();
    if (!chatInput || !webhookUrl || isSending) return;

    setMessages((currentMessages) => [...currentMessages, { role: 'user', content: chatInput }]);
    setMessage('');
    setError('');
    setIsSending(true);

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'sendMessage', sessionId, chatInput }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const responseText = await response.text();
      let responseData = responseText;
      try {
        responseData = JSON.parse(responseText);
      } catch {
        // Webhook n8n may return plain text or JSON.
      }

      const replyData = Array.isArray(responseData) ? responseData[responseData.length - 1] : responseData;
      const reply = typeof replyData === 'string'
        ? replyData
        : replyData?.output || replyData?.text || replyData?.message || replyData?.response;
      if (!reply) throw new Error('Respons bot tidak berisi pesan.');

      setMessages((currentMessages) => [...currentMessages, { role: 'assistant', content: reply }]);
    } catch {
      setError('Pesan belum terkirim. Coba lagi atau lanjutkan melalui WhatsApp.');
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="chat-widget">
      {isOpen && (
        <section className="chat-panel" aria-label="Chat Ruang Pulih">
          <header className="chat-header">
            <div><span className="chat-status-dot" /><div><strong>Ruang Pulih</strong><span>Asisten reservasi</span></div></div>
            <button className="chat-close" type="button" aria-label="Tutup chat" onClick={() => setIsOpen(false)}>×</button>
          </header>
          <div className="chat-messages" aria-live="polite">
            {messages.map((chatMessage, index) => (
              <p className={`chat-message chat-message-${chatMessage.role}`} key={`${chatMessage.role}-${index}`}>{chatMessage.content}</p>
            ))}
            {isSending && <p className="chat-typing">Sedang membalas...</p>}
          </div>
          {!webhookUrl && whatsappNumber && <a className="chat-whatsapp-link" href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">Hubungi melalui WhatsApp ↗</a>}
          {error && <p className="chat-error" role="alert">{error}</p>}
          <form className="chat-compose" onSubmit={handleSubmit}>
            <input
              aria-label="Tulis pesan"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder={webhookUrl ? 'Tulis pesan...' : 'Chat belum tersedia'}
              disabled={!webhookUrl || isSending}
            />
            <button type="submit" aria-label="Kirim pesan" disabled={!webhookUrl || !message.trim() || isSending}>↗</button>
          </form>
        </section>
      )}
      <button className="chat-launcher" type="button" aria-label={isOpen ? 'Tutup chat' : 'Buka chat'} aria-expanded={isOpen} onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? <span aria-hidden="true">×</span> : <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H5l1.7-3A7.5 7.5 0 1 1 20 11.5Z" /></svg>}
      </button>
    </div>
  );
}

export default ChatWidget;