const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const RESEND_URL = 'https://api.resend.com/emails';

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'invalid-json' }, 400);
  }

  const name = typeof body?.name === 'string' ? body.name.trim() : '';
  const email = typeof body?.email === 'string' ? body.email.trim() : '';
  const message = typeof body?.message === 'string' ? body.message.trim() : '';
  const token = typeof body?.token === 'string' ? body.token : '';

  if (!name || !email || !message || !token) {
    return json({ ok: false, error: 'missing-fields' }, 400);
  }
  if (name.length > 100 || email.length > 254 || message.length > 5000) {
    return json({ ok: false, error: 'too-long' }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: 'invalid-email' }, 400);
  }

  if (!env.TURNSTILE_SECRET_KEY) {
    return json({ ok: false, error: 'server-not-configured' }, 500);
  }

  const verifyRes = await fetch(TURNSTILE_VERIFY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: env.TURNSTILE_SECRET_KEY,
      response: token,
      remoteip: request.headers.get('CF-Connecting-IP') || '',
    }),
  });
  const verify = await verifyRes.json();

  if (!verify.success) {
    return json({ ok: false, error: 'turnstile-failed', codes: verify['error-codes'] || [] }, 403);
  }

  if (!env.RESEND_API_KEY) {
    return json({ ok: false, error: 'server-not-configured' }, 500);
  }

  const mailRes = await fetch(RESEND_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.RESEND_FROM || 'onboarding@resend.dev',
      to: [env.CONTACT_TO || 'ivanalfa647@gmail.com'],
      reply_to: email,
      subject: `Portfolio: pesan dari ${name}`,
      text: `${message}\n\n— ${name} (${email})`,
    }),
  });

  if (!mailRes.ok) {
    const detail = await mailRes.text().catch(() => '');
    console.log('Resend error:', mailRes.status, detail);
    return json({ ok: false, error: 'send-failed' }, 502);
  }

  return json({ ok: true });
}
