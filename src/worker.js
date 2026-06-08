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
    'Content-Security-Policy': "default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'unsafe-inline'; img-src 'self' data:; connect-src 'self' https://pnqjpernfcxlvmjvkdqe.supabase.co; frame-ancestors 'none'; base-uri 'none'; form-action 'none'",
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
  const endpointTiles = READ_ENDPOINTS.map((endpoint, index) => `
    <a class="endpoint-tile" href="${endpoint.example}" aria-label="Open example for ${endpoint.name}">
      <span class="tile-icon">${['₿', '▦', '↯'][index] || '↗'}</span>
      <span class="tile-arrow">↗</span>
      <span class="tile-path">${endpoint.path}</span>
      <strong>${endpoint.name}</strong>
      <small>${endpoint.description}</small>
    </a>
  `).join('');

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Crypto Casinos Data API</title>
  <meta name="description" content="Read-only casino terms and crypto payment metadata API for crypto-casinos.com.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inconsolata:wght@500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      color-scheme: dark;
      --bg: #0f1012;
      --bg-2: #111315;
      --card: #1a1d1f;
      --card-2: #202326;
      --line: rgba(255,255,255,.105);
      --line-strong: rgba(255,255,255,.18);
      --text: #ffffff;
      --muted: #b8b8b8;
      --soft: #7f8286;
      --teal: #18d2c1;
      --orange: #ff563d;
      --yellow: #ffc72c;
      --purple: #6757ff;
      --radius: 22px;
      --shadow: 0 22px 70px rgba(0,0,0,.44);
      font-family: "Space Grotesk", Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
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
      letter-spacing: -.01em;
    }
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      pointer-events: none;
      background:
        radial-gradient(circle at 84% 8%, rgba(255,86,61,.08), transparent 26rem),
        radial-gradient(circle at 8% 26%, rgba(24,210,193,.06), transparent 34rem);
      opacity: .9;
    }
    a { color: inherit; }
    .wrap { width: min(1180px, calc(100% - 80px)); margin: 0 auto; position: relative; }
    .announce {
      border-bottom: 1px solid var(--line);
      min-height: 52px;
      display: grid;
      place-items: center;
      color: #f2f2f2;
      font-weight: 700;
      letter-spacing: .01em;
      text-align: center;
    }
    .announce span { color: var(--orange); margin-right: 8px; }
    .topbar {
      height: 72px;
      border-bottom: 1px solid var(--line);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
    }
    .brand {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      color: #fff;
      text-decoration: none;
      font-weight: 700;
      letter-spacing: -.03em;
    }
    .mark {
      width: 26px;
      height: 26px;
      border-radius: 7px;
      display: grid;
      place-items: center;
      background: #fff;
      color: #0f1012;
      font: 900 15px/1 "Space Grotesk", sans-serif;
      transform: rotate(-7deg);
    }
    nav { display: flex; align-items: center; gap: 30px; }
    nav a {
      color: #d2d2d2;
      text-decoration: none;
      font-size: 15px;
      font-weight: 500;
    }
    nav a:hover { color: #fff; }
    .hero {
      padding: 72px 0 56px;
      display: grid;
      grid-template-columns: minmax(0, 1.05fr) minmax(300px, .72fr);
      gap: 52px;
      align-items: center;
    }
    .trust-pill {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      border: 1px solid var(--line);
      border-radius: 999px;
      padding: 12px 18px;
      color: #d8d8d8;
      background: rgba(255,255,255,.015);
      box-shadow: inset 0 0 0 1px rgba(0,0,0,.3);
      font-size: 14px;
    }
    .trust-pill .shield { color: var(--orange); }
    .kicker {
      margin: 44px 0 18px;
      color: var(--teal);
      font-size: 17px;
      font-weight: 500;
    }
    h1 {
      max-width: 780px;
      margin: 0;
      font-size: clamp(50px, 7.2vw, 82px);
      line-height: .94;
      letter-spacing: -.072em;
      font-weight: 700;
      text-wrap: balance;
    }
    h1 .muted-word { color: rgba(255,255,255,.48); }
    .lead {
      max-width: 680px;
      margin: 24px 0 0;
      color: #b8b8b8;
      font-size: clamp(18px, 2vw, 21px);
      line-height: 1.55;
      letter-spacing: -.018em;
    }
    .actions { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 36px; align-items: center; }
    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 54px;
      padding: 0 24px;
      border-radius: 10px;
      border: 1px solid var(--line);
      background: rgba(255,255,255,.05);
      color: #fff;
      text-decoration: none;
      font-weight: 600;
      letter-spacing: -.01em;
    }
    .button.primary {
      background: var(--orange);
      border-color: var(--orange);
      box-shadow: 0 12px 35px rgba(255,86,61,.2);
    }
    .button:hover { transform: translateY(-1px); border-color: var(--line-strong); }
    .coin-card {
      width: min(330px, 100%);
      aspect-ratio: 1;
      margin: 0 auto;
      border-radius: 48px;
      background:
        linear-gradient(145deg, rgba(255,255,255,.14), rgba(255,255,255,.02)),
        #242629;
      border: 1px solid rgba(255,255,255,.08);
      box-shadow: 0 34px 90px rgba(0,0,0,.48);
      display: grid;
      place-items: center;
      transform: rotate(14deg);
      opacity: .78;
    }
    .coin-card span {
      display: grid;
      place-items: center;
      width: 148px;
      height: 148px;
      border-radius: 50%;
      color: #0f1012;
      background: rgba(0,0,0,.54);
      font-size: 76px;
      font-weight: 800;
      transform: rotate(-14deg);
    }
    .quick-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      border: 1px solid var(--line-strong);
      border-radius: var(--radius);
      overflow: hidden;
      background:
        radial-gradient(circle at top left, rgba(255,255,255,.055), transparent 22rem),
        linear-gradient(135deg, #181b1d, #17191b 55%, #1d2022);
      box-shadow: var(--shadow), inset 0 0 0 1px rgba(0,0,0,.9);
    }
    .endpoint-tile {
      position: relative;
      min-height: 216px;
      padding: 30px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      gap: 10px;
      text-decoration: none;
      border-right: 1px solid var(--line);
      isolation: isolate;
    }
    .endpoint-tile:last-child { border-right: 0; }
    .endpoint-tile::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: radial-gradient(rgba(255,255,255,.08) 1px, transparent 1px);
      background-size: 9px 9px;
      opacity: .08;
      z-index: -1;
    }
    .endpoint-tile:hover { background: rgba(255,255,255,.035); }
    .tile-icon {
      position: absolute;
      top: 30px;
      left: 30px;
      width: 44px;
      height: 44px;
      border-radius: 12px;
      display: grid;
      place-items: center;
      color: #fff;
      background: #0e0f10;
      font-size: 22px;
      font-weight: 700;
    }
    .endpoint-tile:nth-child(2) .tile-icon { color: var(--yellow); }
    .endpoint-tile:nth-child(3) .tile-icon { color: var(--teal); }
    .tile-arrow { position: absolute; top: 28px; right: 28px; color: #d7d7d7; font-size: 18px; }
    .tile-path {
      color: var(--soft);
      font: 600 12px/1.4 Inconsolata, ui-monospace, monospace;
      word-break: break-all;
      text-transform: uppercase;
    }
    .endpoint-tile strong { font-size: 19px; line-height: 1.25; letter-spacing: -.025em; }
    .endpoint-tile small { color: #b7b7b7; font-size: 15px; line-height: 1.45; max-width: 260px; }
    .section {
      padding: 72px 0;
      border-top: 1px solid var(--line);
    }
    .section-head {
      display: flex;
      align-items: end;
      justify-content: space-between;
      gap: 24px;
      margin-bottom: 30px;
    }
    .section h2 {
      margin: 0;
      font-size: clamp(34px, 4.5vw, 46px);
      line-height: 1.08;
      letter-spacing: -.055em;
    }
    .section p { color: var(--muted); line-height: 1.6; font-size: 18px; margin: 10px 0 0; max-width: 700px; }
    .example-card {
      display: grid;
      grid-template-columns: .9fr 1.1fr;
      overflow: hidden;
      border-radius: var(--radius);
      border: 1px solid var(--line-strong);
      background:
        radial-gradient(circle at top left, rgba(24,210,193,.08), transparent 24rem),
        linear-gradient(135deg, #1a1d1f, #17191b);
      box-shadow: var(--shadow), inset 0 0 0 1px rgba(0,0,0,.86);
    }
    .example-copy { padding: 38px; border-right: 1px solid var(--line); }
    .example-copy .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 7px 10px;
      border-radius: 999px;
      background: rgba(24,210,193,.12);
      color: var(--teal);
      font: 700 12px/1 Inconsolata, ui-monospace, monospace;
      text-transform: uppercase;
    }
    .example-copy h3 { margin: 24px 0 14px; font-size: 30px; line-height: 1.12; letter-spacing: -.04em; }
    .terminal { min-width: 0; background: rgba(10,11,12,.58); }
    .terminal-head {
      padding: 18px 22px;
      border-bottom: 1px solid var(--line);
      color: var(--soft);
      font: 700 13px/1 Inconsolata, ui-monospace, monospace;
      text-transform: uppercase;
      letter-spacing: .04em;
    }
    pre {
      margin: 0;
      padding: 24px;
      overflow: auto;
      color: #e5e5e5;
      font: 500 14px/1.75 Inconsolata, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      white-space: pre;
    }
    .dim { color: #7c8085; }
    .teal { color: var(--teal); }
    .orange { color: var(--orange); }
    .notes {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 14px;
    }
    .note {
      min-height: 210px;
      border: 1px solid var(--line-strong);
      border-radius: var(--radius);
      background:
        radial-gradient(circle at top left, rgba(255,255,255,.05), transparent 20rem),
        linear-gradient(135deg, #1b1e20, #17191b);
      padding: 30px;
      box-shadow: inset 0 0 0 1px rgba(0,0,0,.9);
    }
    .note-icon {
      width: 48px;
      height: 48px;
      display: grid;
      place-items: center;
      border-radius: 14px;
      background: rgba(255,255,255,.06);
      color: var(--teal);
      font-size: 24px;
      margin-bottom: 34px;
    }
    .note:nth-child(2) .note-icon { color: var(--orange); }
    .note:nth-child(3) .note-icon { color: var(--yellow); }
    .note h3 { margin: 0 0 12px; font-size: 24px; line-height: 1.15; letter-spacing: -.04em; }
    .note p, .note li { color: #b8b8b8; line-height: 1.55; font-size: 15px; }
    .note p { margin: 0; }
    .note ul { margin: 0; padding-left: 18px; }
    code.inline {
      color: #fff;
      background: #0f1012;
      border: 1px solid var(--line);
      border-radius: 999px;
      padding: 4px 8px;
      font: 600 13px/1 Inconsolata, ui-monospace, monospace;
    }
    .cta-strip {
      margin: 10px 0 76px;
      padding: 30px;
      border: 1px solid rgba(255,255,255,.12);
      border-radius: var(--radius);
      background-image: radial-gradient(rgba(255,255,255,.20) 1px, transparent 1px);
      background-size: 8px 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 24px;
    }
    .cta-strip p { margin: 0; color: #c4c4c4; max-width: 560px; line-height: 1.55; }
    footer {
      border-top: 1px solid var(--line);
      padding: 34px 0 48px;
      color: #8b8b8b;
      display: flex;
      justify-content: space-between;
      gap: 24px;
      font-size: 14px;
    }
    @media (max-width: 960px) {
      .wrap { width: min(100% - 32px, 1180px); }
      .announce { padding: 12px 16px; }
      .topbar { height: auto; padding: 18px 0; align-items: flex-start; }
      nav { gap: 16px; flex-wrap: wrap; justify-content: flex-end; }
      .hero { grid-template-columns: 1fr; padding-top: 52px; }
      .coin-card { display: none; }
      .quick-grid, .notes, .example-card { grid-template-columns: 1fr; }
      .endpoint-tile { border-right: 0; border-bottom: 1px solid var(--line); }
      .endpoint-tile:last-child { border-bottom: 0; }
      .example-copy { border-right: 0; border-bottom: 1px solid var(--line); }
      .section-head, .cta-strip, footer { flex-direction: column; align-items: flex-start; }
      h1 { font-size: clamp(46px, 12vw, 72px); }
    }
  </style>
</head>
<body>
  <div class="announce"><span>🚀</span> Crypto-Casinos.com Data API — normalized casino terms, payment metadata and crypto speed ranges.</div>

  <div class="wrap">
    <header class="topbar">
      <a class="brand" href="https://crypto-casinos.com/" aria-label="Crypto Casinos home"><span class="mark">✣</span><span>Crypto-Casinos.com</span></a>
      <nav aria-label="Primary navigation">
        <a href="#endpoints">Endpoints</a>
        <a href="#example">Example</a>
        <a href="/openapi.json">OpenAPI</a>
        <a href="https://crypto-casinos.com/">Main site</a>
      </nav>
    </header>

    <main>
      <section class="hero">
        <div>
          <div class="trust-pill"><span class="shield">♢</span> Read-only API for verified crypto casino data</div>
          <div class="kicker">Crypto Casinos Data API</div>
          <h1>Unlock source-backed <span class="muted-word">casino terms</span> and crypto payment data.</h1>
          <p class="lead">Skip the bullshit and query normalized casino terms, payment methods, restricted countries, game counts, and approximate crypto transaction-speed metadata.</p>
          <div class="actions">
            <a class="button primary" href="/rest/v1/api_brand_values?limit=5">Explore API</a>
            <a class="button" href="#endpoints">Browse endpoints</a>
          </div>
        </div>
        <div class="coin-card" aria-hidden="true"><span>✣</span></div>
      </section>

      <nav class="quick-grid" id="endpoints" aria-label="API endpoints">
        ${endpointTiles}
      </nav>

      <section class="section" id="example">
        <div class="section-head">
          <div>
            <h2>API example</h2>
            <p>Simple PostgREST endpoints backed by read-only Supabase views.</p>
          </div>
          <a class="button" href="/openapi.json">OpenAPI spec</a>
        </div>
        <div class="example-card">
          <div class="example-copy">
            <span class="badge">Live endpoint</span>
            <h3>Filter by casino, field, domain, or crypto asset.</h3>
            <p>Responses include normalized values and provenance fields where available, so apps and agents can show caveats instead of guessing.</p>
          </div>
          <div class="terminal" aria-label="API example">
            <div class="terminal-head">~/crypto-speed-request</div>
            <pre><span class="dim">$</span> curl <span class="teal">${API_BASE}/rest/v1/api_crypto_transaction_speeds?symbol=eq.BTC</span> \
  -H <span class="orange">"apikey: public api key"</span> \
  -H <span class="orange">"Authorization: same public api key"</span>

{
  "symbol": "BTC",
  "name": "Bitcoin",
  "ecosystem": "Bitcoin",
  "transaction_speed_range": "10 min to 1 hr"
}</pre>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <div>
            <h2>Built for integrations</h2>
            <p>Use it for comparison pages, browser extensions, dashboards, compliance checks, SEO workflows and AI agents.</p>
          </div>
        </div>
        <div class="notes">
          <article class="note">
            <div class="note-icon">◎</div>
            <h3>Read-only access</h3>
            <p>Use the Supabase public API key for client-side read requests. Never expose service-role credentials in frontend code.</p>
          </article>
          <article class="note">
            <div class="note-icon">↯</div>
            <h3>Crypto speed caveat</h3>
            <p>Speed ranges are approximate on-chain confirmation or finality estimates, not exchange withdrawal times or casino settlement guarantees.</p>
          </article>
          <article class="note">
            <div class="note-icon">▦</div>
            <h3>Useful fields</h3>
            <ul>
              <li><code class="inline">ecosystem</code></li>
              <li><code class="inline">transaction_speed_range</code></li>
              <li><code class="inline">min_seconds</code> / <code class="inline">max_seconds</code></li>
            </ul>
          </article>
        </div>
      </section>

      <div class="cta-strip">
        <p>Need the public site instead? Visit Crypto-Casinos.com for casino rankings, reviews, bonuses and player guides.</p>
        <a class="button primary" href="https://crypto-casinos.com/">Go to Crypto-Casinos.com</a>
      </div>
    </main>

    <footer>
      <span>© ${new Date().getFullYear()} Crypto-Casinos.com</span>
      <span>Cloudflare Worker · Supabase PostgREST · read-only API</span>
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
