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
  const endpointCards = READ_ENDPOINTS.map((endpoint) => `
    <article class="endpoint-card">
      <div>
        <p class="eyebrow">${endpoint.path}</p>
        <h3>${endpoint.name}</h3>
        <p>${endpoint.description}</p>
      </div>
      <a href="${endpoint.example}" aria-label="Open example for ${endpoint.name}">Open example</a>
    </article>
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
      --bg: #07080a;
      --panel: #101319;
      --panel-2: #161b23;
      --ink: #f4f0e8;
      --muted: #a9b0bd;
      --soft: #737b8a;
      --line: rgba(244, 240, 232, .12);
      --accent: #e8c36a;
      --accent-2: #81e6d9;
      --danger: #ff7a90;
      --radius: 22px;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      color: var(--ink);
      background:
        radial-gradient(circle at top left, rgba(232,195,106,.20), transparent 34rem),
        radial-gradient(circle at 80% 20%, rgba(129,230,217,.12), transparent 32rem),
        linear-gradient(180deg, #08090c 0%, #0b0d12 58%, #050608 100%);
    }
    a { color: inherit; }
    .shell { width: min(1120px, calc(100% - 32px)); margin: 0 auto; }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      padding: 28px 0;
    }
    .brand { display: flex; align-items: center; gap: 12px; font-weight: 720; letter-spacing: -.02em; }
    .mark {
      width: 38px; height: 38px; border-radius: 12px;
      display: grid; place-items: center;
      background: linear-gradient(145deg, var(--accent), #9c6b24);
      color: #111; font-weight: 900;
      box-shadow: 0 16px 40px rgba(232,195,106,.18);
    }
    .status {
      display: inline-flex; align-items: center; gap: 8px;
      border: 1px solid var(--line); border-radius: 999px;
      padding: 9px 13px; color: var(--muted); font-size: 14px;
      background: rgba(255,255,255,.03);
    }
    .status::before { content: ''; width: 8px; height: 8px; border-radius: 999px; background: #41d978; box-shadow: 0 0 18px #41d978; }
    .hero {
      padding: 72px 0 40px;
      display: grid;
      grid-template-columns: minmax(0, 1.05fr) minmax(320px, .95fr);
      gap: 42px;
      align-items: center;
    }
    .kicker { color: var(--accent); text-transform: uppercase; letter-spacing: .16em; font-size: 12px; font-weight: 800; }
    h1 { font-size: clamp(44px, 7vw, 86px); line-height: .91; letter-spacing: -.065em; margin: 14px 0 22px; text-wrap: balance; }
    .lead { color: var(--muted); font-size: clamp(18px, 2vw, 22px); line-height: 1.55; max-width: 680px; margin: 0 0 30px; }
    .actions { display: flex; gap: 12px; flex-wrap: wrap; }
    .button {
      display: inline-flex; align-items: center; justify-content: center; gap: 8px;
      min-height: 46px; padding: 0 18px; border-radius: 999px;
      text-decoration: none; font-weight: 760; border: 1px solid var(--line);
      background: rgba(255,255,255,.04); color: var(--ink);
    }
    .button.primary { background: var(--accent); color: #141008; border-color: transparent; }
    .terminal {
      border: 1px solid var(--line); border-radius: var(--radius); overflow: hidden;
      background: rgba(12,15,20,.86); box-shadow: 0 28px 80px rgba(0,0,0,.42);
    }
    .terminal-bar { display: flex; gap: 7px; padding: 15px 17px; background: rgba(255,255,255,.04); border-bottom: 1px solid var(--line); }
    .dot { width: 10px; height: 10px; border-radius: 999px; background: #ff6b6b; }
    .dot:nth-child(2) { background: #feca57; } .dot:nth-child(3) { background: #1dd1a1; }
    pre { margin: 0; padding: 20px; overflow: auto; color: #dce3ed; font: 13.5px/1.65 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
    .token { color: var(--accent-2); } .comment { color: var(--soft); } .url { color: var(--accent); }
    .grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; padding: 36px 0; }
    .endpoint-card {
      min-height: 250px; padding: 22px; border: 1px solid var(--line); border-radius: var(--radius);
      background: linear-gradient(180deg, rgba(255,255,255,.055), rgba(255,255,255,.026));
      display: flex; flex-direction: column; justify-content: space-between; gap: 24px;
    }
    .endpoint-card h3 { margin: 8px 0 10px; font-size: 21px; letter-spacing: -.025em; }
    .endpoint-card p { margin: 0; color: var(--muted); line-height: 1.55; }
    .endpoint-card a { color: var(--accent); text-decoration: none; font-weight: 720; }
    .eyebrow { font: 12px/1.4 ui-monospace, SFMono-Regular, Menlo, monospace; color: var(--soft) !important; word-break: break-all; }
    .docs {
      display: grid; grid-template-columns: .9fr 1.1fr; gap: 18px; padding: 18px 0 80px;
    }
    .panel { border: 1px solid var(--line); border-radius: var(--radius); background: rgba(255,255,255,.035); padding: 24px; }
    .panel h2 { margin: 0 0 14px; font-size: 25px; letter-spacing: -.035em; }
    .panel p, .panel li { color: var(--muted); line-height: 1.65; }
    .panel code { color: #fff0bc; background: rgba(255,255,255,.07); border: 1px solid var(--line); padding: 2px 6px; border-radius: 8px; }
    footer { border-top: 1px solid var(--line); padding: 22px 0 34px; color: var(--soft); font-size: 14px; }
    @media (max-width: 860px) {
      .hero, .docs { grid-template-columns: 1fr; }
      .grid { grid-template-columns: 1fr; }
      h1 { font-size: clamp(42px, 13vw, 72px); }
    }
  </style>
</head>
<body>
  <div class="shell">
    <header>
      <div class="brand"><div class="mark">CC</div><span>Crypto Casinos Data API</span></div>
      <div class="status">Read-only API online</div>
    </header>

    <main>
      <section class="hero">
        <div>
          <div class="kicker">crypto-casinos.com</div>
          <h1>Casino terms data with source-backed fields.</h1>
          <p class="lead">A read-only Supabase/PostgREST API for normalized casino terms, payment methods, country restrictions, game counts, and approximate crypto transaction-speed metadata.</p>
          <div class="actions">
            <a class="button primary" href="/rest/v1/api_brand_values?limit=5">Explore brand values</a>
            <a class="button" href="/rest/v1/api_crypto_transaction_speeds?symbol=eq.BTC">Check BTC speed</a>
          </div>
        </div>
        <div class="terminal" aria-label="API example">
          <div class="terminal-bar"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>
          <pre><span class="comment"># Example request</span>
curl <span class="url">${API_BASE}/rest/v1/api_crypto_transaction_speeds?symbol=eq.BTC</span> \\
  -H <span class="token">"apikey: YOUR_PUBLIC_VALUE"</span> \\
  -H <span class="token">"Authorization: same public value"</span>
<span class="comment"># Data includes</span>
{
  "symbol": "BTC",
  "ecosystem": "Bitcoin",
  "transaction_speed_range": "10 min to 1 hr"
}</pre>
        </div>
      </section>

      <section class="grid" aria-label="API endpoints">
        ${endpointCards}
      </section>

      <section class="docs">
        <div class="panel">
          <h2>Authentication</h2>
          <p>Use the Supabase publishable key for read-only browser/client access. Never use the service-role key in frontend code.</p>
          <ul>
            <li><code>apikey: YOUR_PUBLIC_VALUE</code></li>
            <li><code>Authorization: same public value</code></li>
          </ul>
        </div>
        <div class="panel">
          <h2>Notes on crypto speed data</h2>
          <p>Transaction speeds are approximate on-chain inclusion/confirmation/finality ranges. They are not exchange withdrawal times, casino processing times, or guaranteed settlement SLAs.</p>
          <p>Use <code>ecosystem</code>, <code>transaction_speed_range</code>, <code>min_seconds</code>, and <code>max_seconds</code> for UI display and filtering.</p>
        </div>
      </section>
    </main>

    <footer>
      © ${new Date().getFullYear()} crypto-casinos.com · API backed by Supabase read-only views.
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
