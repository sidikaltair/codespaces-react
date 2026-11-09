import { useEffect, useRef, useState } from 'react';
import './ChatWidget.css';

const webhookUrl = import.meta.env.VITE_N8N_CHAT_WEBHOOK_URL
  || 'https://sidikhealth.app.n8n.cloud/webhook/5c664ccb-b97a-42fc-8d07-ebd5546ea2f5/chat';

const suggestions = [
  'Saya ingin membuat reservasi',
  'Saya ingin bertanya tentang keluhan/nyeri',
  'Saya ingin tahu info paket dan biaya',
];

function getSessionId() {
  const storageKey = 'ruang-pulih-chat-session';
  const storedSessionId = window.sessionStorage.getItem(storageKey);
  if (storedSessionId) return storedSessionId;

  const sessionId = window.crypto?.randomUUID?.()
    || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  window.sessionStorage.setItem(storageKey, sessionId);
  return sessionId;
}

function getReply(responseData) {
  const response = Array.isArray(responseData)
    ? responseData[responseData.length - 1]
    : responseData;

  if (typeof response === 'string') return response.trim();
  if (!response || typeof response !== 'object') return '';

  const reply = response.output || response.text || response.message || response.response;
  return typeof reply === 'string' ? reply.trim() : '';
}

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef(null);

  useEffect(() => {
    if (isOpen && !sessionId) {
      setSessionId(getSessionId());
      setMessages([{
        role: 'assistant',
        content: 'Halo! Selamat datang di Pulih di rumah. Ada yang bisa kami bantu?',
      }]);
    }
  }, [isOpen, sessionId]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, isSending]);

  async function sendMessage(text) {
    const chatInput = text.trim();
    if (!chatInput || isSending) return;

    setMessages((currentMessages) => [...currentMessages, { role: 'user', content: chatInput }]);
    setMessage('');
    setError('');
    setIsSending(true);

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'sendMessage',
          sessionId,
          chatInput,
        }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const responseText = await response.text();
      let responseData = responseText;
      try {
        responseData = JSON.parse(responseText);
      } catch {
        // n8n may return a plain-text response.
      }

      const reply = getReply(responseData);
      if (!reply) throw new Error('Respons bot tidak berisi pesan.');

      setMessages((currentMessages) => [...currentMessages, { role: 'assistant', content: reply }]);
    } catch {
      setError('Pesan belum terkirim. Silakan coba lagi atau hubungi kami melalui WhatsApp.');
    } finally {
      setIsSending(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage(message);
  }

  return (
    <div className="rp-chat-widget">
      {isOpen && (
        <section className="rp-chat-panel" aria-label="Chat Pulih di rumah">
          <header className="rp-chat-header">
            <div className="rp-chat-brand">
              <span className="rp-chat-status" aria-hidden="true" />
              <div>
                <strong>CS Fisioterapi</strong>
                <span>Terapis kami datang ke rumah Anda</span>
              </div>
            </div>
            <button
              className="rp-chat-close"
              type="button"
              aria-label="Tutup chat"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </header>

          <div className="rp-chat-messages" aria-live="polite" ref={messagesRef}>
            {messages.map((chatMessage, index) => (
              <p
                className={`rp-chat-message rp-chat-message-${chatMessage.role}`}
                key={`${chatMessage.role}-${index}`}
              >
                {chatMessage.content}
              </p>
            ))}

            {messages.length === 1 && messages[0].role === 'assistant' && (
              <div className="rp-chat-suggestions" aria-label="Pilih topik">
                {suggestions.map((suggestion) => (
                  <button
                    className="rp-chat-suggestion"
                    key={suggestion}
                    type="button"
                    disabled={isSending}
                    onClick={() => sendMessage(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            {isSending && <p className="rp-chat-typing">Sedang membalas...</p>}
          </div>

          {error && <p className="rp-chat-error" role="alert">{error}</p>}

          <form className="rp-chat-compose" onSubmit={handleSubmit}>
            <input
              aria-label="Tulis pesan"
              autoComplete="off"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Ketik pesan Anda..."
              disabled={isSending}
            />
            <button type="submit" aria-label="Kirim pesan" disabled={!message.trim() || isSending}>
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M4 12h15m-6-6 6 6-6 6" />
              </svg>
            </button>
          </form>
        </section>
      )}

      <button
        className="rp-chat-launcher"
        type="button"
        aria-label={isOpen ? 'Tutup chat' : 'Buka chat'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? (
          <span aria-hidden="true">×</span>
        ) : (
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H5l1.7-3A7.5 7.5 0 1 1 20 11.5Z" />
            <path d="M8 11h8M8 14h5" />
          </svg>
        )}
      </button>
    </div>
  );
}

export default ChatWidget;
