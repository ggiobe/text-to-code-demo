'use client';
import { useState } from 'react';

export default function Page() {
  const [prompt, setPrompt] = useState('Create a responsive landing page with header and hero.');
  const [out, setOut] = useState('');
  const [loading, setLoading] = useState(false);

  async function onGenerate() {
    setLoading(true);
    setOut('');
    const res = await fetch('/api/generate', {
      method: 'POST',
      body: JSON.stringify({ prompt, stream: true }),
    });
    const reader = res.body!.getReader();
    const decoder = new TextDecoder();
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      setOut(prev => prev + decoder.decode(value));
    }
    setLoading(false);
  }

  return (
    <main style={{ padding: 24, maxWidth: 1000, margin: '0 auto' }}>
      <h1>Text‑to‑Code (OpenAI only)</h1>
      <p style={{ color: '#6b7280' }}>Streams output from the OpenAI Responses API.</p>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: '100%', height: 140, padding: 8 }}
      />
      <div style={{ marginTop: 8 }}>
        <button
          onClick={onGenerate}
          disabled={loading}
          style={{ padding: '8px 12px', background: '#059669', color: '#fff', borderRadius: 6 }}
        >
          {loading ? 'Generating…' : 'Generate'}
        </button>
      </div>
      <h3 style={{ marginTop: 16 }}>Output</h3>
      <pre style={{ whiteSpace: 'pre-wrap', border: '1px solid #e5e7eb', borderRadius: 8, padding: 12, minHeight: 200 }}>
        {out || 'Output will appear here…'}
      </pre>
    </main>
  );
}
