import { NextRequest } from 'next/server';
import { openai } from '@/lib/ai/openai';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const { prompt, messages = [], system, temperature, maxTokens, stream = true } = await req.json();

  const response = await openai.responses.create({
    model: 'gpt-5.2',
    instructions: system ?? 'You are a helpful coding tutor. Produce minimal, runnable code with brief comments.',
    input: [{ role: 'user', content: prompt }, ...messages],
    temperature,
    max_output_tokens: maxTokens,
    stream,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const ev of (response as any)) {
        if (ev.type === 'response.output_text.delta') {
          controller.enqueue(encoder.encode(ev.delta as string));
        }
      }
      controller.close();
    }
  });

  return new Response(readable, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
