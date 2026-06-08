const SUPABASE_ORIGIN = 'https://pnqjpernfcxlvmjvkdqe.supabase.co';
const API_BASE = 'https://data-api.crypto-casinos.com';

const READ_ENDPOINTS = [
  {
    name: 'Brand values',
    path: '/rest/v1/api_brand_values',
    description: 'Flat, filterable casino terms datapoints with provenance.',
    example: '/rest/v1/api_brand_values?domain=eq.rakebit.com',
  },
  {
    name: 'Brand summary',
    path: '/rest/v1/api_brand_summary',
    description: 'One row per casino with normalized values aggregated as JSON.',
    example: '/rest/v1/api_brand_summary?domain=eq.rakebit.com',
  },
  {
    name: 'Crypto transaction speeds',
    path: '/rest/v1/api_crypto_transaction_speeds',
    description: 'Approximate on-chain speed ranges and ecosystem metadata for top crypto assets.',
    example: '/rest/v1/api_crypto_transaction_speeds?symbol=eq.BTC',
  },
];

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
    'Access-Control-Allow-Headers': 'apikey, authorization, content-type, prefer, range, x-client-info',
    'Access-Control-Expose-Headers': 'content-range',
    'Access-Control-Max-Age': '86400',
  };
}

function securityHeaders() {
  return {
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Content-Security-Policy': "default-src 'self'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src 'self' data:; connect-src 'self' https://pnqjpernfcxlvmjvkdqe.supabase.co; frame-ancestors 'none'; base-uri 'none'; form-action 'none'",
  };
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...corsHeaders(),
      ...securityHeaders(),
    },
  });
}

function landingPage() {
  const endpointRows = READ_ENDPOINTS.map((endpoint, index) => `
    <a class="endpoint-row" href="${endpoint.example}" aria-label="Open example for ${endpoint.name}">
      <span class="row-num">${String(index + 1).padStart(2, '0')}</span>
      <span class="row-main">
        <strong>${endpoint.name}</strong>
        <small>${endpoint.description}</small>
      </span>
      <code>${endpoint.path}</code>
      <span class="arrow">→</span>
    </a>
  `).join('');

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Crypto Casinos Data API</title>
  <meta name="description" content="Read-only casino terms and crypto payment metadata API for crypto-casinos.com.">
  <style>
    :root {
      color-scheme: dark;
      --bg: #060606;
      --surface: #111111;
      --surface-2: #151515;
      --line: #2a2a2a;
      --line-soft: #1d1d1d;
      --text: #f3f3f1;
      --muted: #a2a2a0;
      --faint: #686866;
      --accent: #6aa9ff;
      --ok: #6ee79a;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      font-size: 16px;
    }
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      margin: 0;
      min-height: 100vh;
      color: var(--text);
      background: var(--bg);
      text-rendering: optimizeLegibility;
    }
    a { color: inherit; }
    .wrap { width: min(1120px, calc(100% - 48px)); margin: 0 auto; }
    .topbar {
      height: 56px;
      border-bottom: 1px solid var(--line-soft);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
    }
    .brand {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      font: 14px/1 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      letter-spacing: -.02em;
    }
    .mark {
      width: 24px;
      height: 24px;
      border-radius: 5px;
      display: grid;
      place-items: center;
      background: var(--text);
      color: #050505;
      font-weight: 800;
      font-size: 11px;
    }
    nav { display: flex; align-items: center; gap: 28px; }
    nav a {
      color: var(--muted);
      text-decoration: none;
      font: 13px/1 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    nav a:hover { color: var(--text); }
    .hero {
      padding: 108px 0 70px;
      max-width: 760px;
    }
    .pill {
      display: inline-flex;
      align-items: center;
      gap: 9px;
      padding: 7px 11px;
      border: 1px solid #213857;
      border-radius: 4px;
      background: #102033;
      color: #8fc2ff;
      font: 12px/1 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    .pill::before {
      content: '';
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--accent);
    }
    h1 {
      margin: 24px 0 22px;
      max-width: 720px;
      font-size: clamp(42px, 7vw, 72px);
      line-height: .96;
      letter-spacing: -.06em;
      font-weight: 760;
      text-wrap: balance;
    }
    .lead {
      max-width: 720px;
      margin: 0;
      color: var(--muted);
      font-size: clamp(17px, 2vw, 20px);
      line-height: 1.6;
    }
    .sublead {
      max-width: 720px;
      margin: 18px 0 0;
      color: var(--faint);
      font-size: 14px;
      line-height: 1.65;
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 18px;
      align-items: center;
      margin-top: 40px;
    }
    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 40px;
      padding: 0 20px;
      border-radius: 4px;
      border: 1px solid var(--line);
      background: transparent;
      color: var(--muted);
      text-decoration: none;
      font: 13px/1 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    .button.primary {
      background: var(--text);
      color: #050505;
      border-color: var(--text);
      font-weight: 700;
    }
    .button:hover { color: var(--text); border-color: #454545; }
    .button.primary:hover { color: #050505; background: #ffffff; }
    .section {
      border-top: 1px solid var(--line-soft);
      padding: 72px 0;
    }
    .label {
      margin: 0 0 18px;
      color: var(--faint);
      text-transform: uppercase;
      letter-spacing: .12em;
      font: 12px/1 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    .two-col {
      display: grid;
      grid-template-columns: minmax(0, .86fr) minmax(420px, 1.14fr);
      gap: 48px;
      align-items: start;
    }
    h2 {
      margin: 0 0 14px;
      font-size: clamp(26px, 4vw, 38px);
      line-height: 1.08;
      letter-spacing: -.045em;
    }
    .copy p {
      margin: 0 0 14px;
      color: var(--muted);
      line-height: 1.65;
    }
    .terminal {
      border: 1px solid var(--line);
      border-radius: 6px;
      background: var(--surface);
      overflow: hidden;
    }
    .terminal-head {
      padding: 13px 18px;
      border-bottom: 1px solid var(--line-soft);
      color: var(--faint);
      font: 12px/1 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      text-transform: uppercase;
      letter-spacing: .08em;
    }
    pre {
      margin: 0;
      padding: 20px;
      overflow: auto;
      color: #d8d8d6;
      font: 13px/1.75 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      white-space: pre;
    }
    .dim { color: var(--faint); }
    .blue { color: #8fc2ff; }
    .endpoints {
      border: 1px solid var(--line);
      border-radius: 6px;
      overflow: hidden;
      background: #0b0b0b;
    }
    .endpoint-row {
      display: grid;
      grid-template-columns: 44px minmax(220px, 1fr) minmax(220px, auto) 28px;
      gap: 18px;
      align-items: center;
      min-height: 82px;
      padding: 18px 20px;
      text-decoration: none;
      border-bottom: 1px solid var(--line-soft);
    }
    .endpoint-row:last-child { border-bottom: 0; }
    .endpoint-row:hover { background: var(--surface); }
    .row-num, .arrow {
      color: var(--faint);
      font: 12px/1 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    .row-main { display: grid; gap: 7px; }
    .row-main strong { font-size: 16px; letter-spacing: -.01em; }
    .row-main small { color: var(--muted); line-height: 1.45; }
    .endpoint-row code {
      color: var(--muted);
      font: 12px/1.45 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      word-break: break-all;
    }
    .note-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 16px;
    }
    .note {
      min-height: 180px;
      border: 1px solid var(--line);
      border-radius: 6px;
      background: var(--surface);
      padding: 22px;
    }
    .note h3 {
      margin: 0 0 14px;
      font-size: 18px;
      letter-spacing: -.025em;
    }
    .note p, .note li {
      color: var(--muted);
      line-height: 1.6;
      font-size: 14px;
    }
    .note p { margin: 0; }
    .note ul { margin: 0; padding-left: 18px; }
    code.inline {
      color: #e6e6e3;
      background: #171717;
      border: 1px solid var(--line);
      border-radius: 4px;
      padding: 2px 5px;
      font: 12px/1 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    footer {
      border-top: 1px solid var(--line-soft);
      padding: 28px 0 42px;
      color: var(--faint);
      display: flex;
      justify-content: space-between;
      gap: 24px;
      font: 12px/1.6 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    @media (max-width: 900px) {
      .wrap { width: min(100% - 32px, 1120px); }
      .topbar { height: auto; padding: 18px 0; align-items: flex-start; }
      nav { gap: 14px; flex-wrap: wrap; justify-content: flex-end; }
      .hero { padding: 72px 0 56px; }
      .two-col { grid-template-columns: 1fr; gap: 28px; }
      .endpoint-row { grid-template-columns: 34px 1fr 24px; }
      .endpoint-row code { grid-column: 2 / -1; }
      .note-grid { grid-template-columns: 1fr; }
      footer { flex-direction: column; }
    }
  </style>
</head>
<body>
  <div class="wrap">
    <header class="topbar">
      <a class="brand" href="https://crypto-casinos.com/" aria-label="Crypto Casinos home"><span class="mark">cc</span><span>Crypto Casinos Data API</span></a>
      <nav aria-label="Primary navigation">
        <a href="#endpoints">endpoints</a>
        <a href="/openapi.json">openapi</a>
        <a href="https://crypto-casinos.com/">crypto-casinos.com</a>
      </nav>
    </header>

    <main>
      <section class="hero">
        <span class="pill">read-only casino terms api</span>
        <h1>Structured casino terms data for apps, research, and agents.</h1>
        <p class="lead">Query normalized casino data, payment methods, restricted countries, game counts, and crypto transaction-speed metadata through a clean REST API.</p>
        <p class="sublead">Source-backed datapoints from the Crypto Casinos research database. Built for lightweight frontend integrations, compliance checks, SEO workflows, and internal tools.</p>
        <div class="actions">
          <a class="button primary" href="/rest/v1/api_brand_values?limit=5">try the api →</a>
          <a class="button" href="#example">view example ↓</a>
        </div>
      </section>

      <section class="section two-col" id="example">
        <div class="copy">
          <p class="label">~/api-example</p>
          <h2>Simple REST endpoints backed by Supabase views.</h2>
          <p>Use PostgREST filters to query individual casinos, fields, or crypto assets. API responses include normalized values plus provenance fields where available.</p>
        </div>
        <div class="terminal" aria-label="API example">
          <div class="terminal-head">curl example</div>
          <pre><span class="dim">$</span> curl <span class="blue">${API_BASE}/rest/v1/api_crypto_transaction_speeds?symbol=eq.BTC</span> \
  -H "apikey: public api key" \
  -H "Authorization: same public api key"

{
  "symbol": "BTC",
  "name": "Bitcoin",
  "ecosystem": "Bitcoin",
  "transaction_speed_range": "10 min to 1 hr"
}</pre>
        </div>
      </section>

      <section class="section" id="endpoints">
        <p class="label">~/endpoints</p>
        <div class="endpoints">
          ${endpointRows}
        </div>
      </section>

      <section class="section">
        <p class="label">~/usage-notes</p>
        <div class="note-grid">
          <article class="note">
            <h3>Authentication</h3>
            <p>Use the Supabase public API key for read-only requests. Never expose a service-role key in browser or client-side code.</p>
          </article>
          <article class="note">
            <h3>Crypto speeds</h3>
            <p>Speed ranges are approximate on-chain confirmation or finality estimates, not exchange withdrawal times or casino settlement promises.</p>
          </article>
          <article class="note">
            <h3>Useful fields</h3>
            <ul>
              <li><code class="inline">ecosystem</code></li>
              <li><code class="inline">transaction_speed_range</code></li>
              <li><code class="inline">min_seconds</code> / <code class="inline">max_seconds</code></li>
            </ul>
          </article>
        </div>
      </section>
    </main>

    <footer>
      <span>© ${new Date().getFullYear()} crypto-casinos.com</span>
      <span>read-only api · cloudflare worker · supabase postgrest</span>
    </footer>
  </div>
</body>
</html>`;
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
      ...securityHeaders(),
    },
  });
}

async function proxyToSupabase(request) {
  const incoming = new URL(request.url);
  const target = new URL(incoming.pathname + incoming.search, SUPABASE_ORIGIN);

  const headers = new Headers(request.headers);
  headers.set('host', new URL(SUPABASE_ORIGIN).host);

  const init = {
    method: request.method,
    headers,
    body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
    redirect: 'manual',
  };

  const upstream = await fetch(target.toString(), init);
  const responseHeaders = new Headers(upstream.headers);
  for (const [key, value] of Object.entries(corsHeaders())) responseHeaders.set(key, value);
  responseHeaders.set('X-Data-API-Origin', 'supabase-postgrest');
  responseHeaders.delete('content-security-policy');

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders() });
    }

    if (url.pathname === '/' || url.pathname === '/docs') {
      return landingPage();
    }

    if (url.pathname === '/openapi.json') {
      return jsonResponse({
        openapi: '3.1.0',
        info: {
          title: 'Crypto Casinos Data API',
          version: '1.0.0',
          description: 'Read-only casino terms and crypto transaction-speed metadata API.',
        },
        servers: [{ url: API_BASE }],
        paths: Object.fromEntries(READ_ENDPOINTS.map((endpoint) => [endpoint.path, {
          get: {
            summary: endpoint.name,
            description: endpoint.description,
            responses: { '200': { description: 'JSON response from Supabase PostgREST view.' } },
          },
        }])),
      });
    }

    if (url.pathname.startsWith('/rest/v1/') || url.pathname.startsWith('/auth/v1/') || url.pathname.startsWith('/functions/v1/') || url.pathname.startsWith('/storage/v1/')) {
      return proxyToSupabase(request);
    }

    return jsonResponse({
      error: 'Not found',
      message: 'Use / for docs or /rest/v1/<view> for API requests.',
      endpoints: READ_ENDPOINTS,
    }, 404);
  },
};
