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

const FAVICON_SVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 256 256">
  <!-- Generator: Adobe Illustrator 30.2.1, SVG Export Plug-In . SVG Version: 2.1.1 Build 1)  -->
  <defs>
    <style>
      .st0 {
        fill: #fff;
      }
    </style>
  </defs>
  <rect class="st0" x="0" width="256" height="256" rx="70.4" ry="70.4"/>
  <path d="M195.98,88.49l25.3-25.3-28.47-28.47-25.3,25.3c-24.34-14.14-54.69-14.14-79.02,0l-25.3-25.3-28.47,28.47,25.3,25.3c-14.14,24.34-14.14,54.69,0,79.02l-25.3,25.3,28.47,28.47,25.28-25.28c11.87,6.93,25.41,10.64,39.52,10.64s27.65-3.71,39.52-10.64l25.28,25.28,28.47-28.47-25.3-25.3c14.14-24.34,14.14-54.69,0-79.02ZM100.88,155.15l-.03-.03c-14.94-14.96-14.94-39.28,0-54.23l.03-.03c7.48-7.47,17.3-11.2,27.12-11.2s19.65,3.74,27.13,11.22c14.96,14.96,14.96,39.29.02,54.25l-.03.03c-7.25,7.24-16.87,11.22-27.12,11.22s-19.87-3.99-27.12-11.22Z"/>
</svg>`;
const FAVICON_ICO_BASE64 = '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';
const TOUCH_ICON_256_BASE64 = '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';

function binaryResponseFromBase64(base64, contentType) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return new Response(bytes, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
      ...securityHeaders(),
    },
  });
}

function faviconResponse() {
  return new Response(FAVICON_SVG, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=31536000, immutable',
      ...securityHeaders(),
    },
  });
}

const BRAND_LOGO_SVG = `<svg class="brand-logo-svg" role="img" aria-label="Crypto-Casinos.com" id="Layer_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1278 138">
  
  <defs>
    <style>
      .st0 {
        fill: #f4f4f4;
      }

      .st1 {
        fill: #fff;
      }
    </style>
  </defs>
  <g>
    <rect class="st1" x=".15" y=".62" width="136.76" height="136.76" rx="37.61" ry="37.61"/>
    <path d="M104.84,47.89l13.51-13.51-15.21-15.21-13.51,13.51c-13-7.55-29.21-7.55-42.22,0l-13.51-13.51-15.21,15.21,13.51,13.51c-7.55,13-7.55,29.21,0,42.22l-13.51,13.51,15.21,15.21,13.51-13.51c6.34,3.7,13.58,5.68,21.12,5.68s14.77-1.98,21.12-5.68l13.51,13.51,15.21-15.21-13.51-13.51c7.55-13,7.55-29.21,0-42.22ZM54.04,83.5h0c-7.99-8-7.99-21,0-28.99h0c4-4,9.24-6,14.49-6s10.5,2,14.5,5.99c7.99,7.99,7.99,20.99,0,28.99h0c-3.87,3.88-9.02,6.01-14.49,6.01s-10.62-2.13-14.49-6Z"/>
  </g>
  <g>
    <path class="st0" d="M224.81,107.69c-6.22,0-11.97-1.06-17.23-3.17-5.26-2.11-9.78-5-13.56-8.67-3.78-3.67-6.72-8-8.84-13-2.11-5-3.17-10.43-3.17-16.28s1.06-11.28,3.17-16.28c2.11-5,5.06-9.34,8.84-13s8.3-6.56,13.56-8.67c5.26-2.11,11-3.17,17.23-3.17,4.15,0,7.91.43,11.28,1.28,3.37.85,6.37,1.98,9,3.39,2.63,1.41,4.93,2.98,6.89,4.72,1.96,1.74,3.65,3.54,5.06,5.39,3.33,4.3,5.74,9.19,7.23,14.67h-17.23c-1.04-2.59-2.52-4.89-4.45-6.89-1.71-1.7-3.98-3.3-6.84-4.78-2.85-1.48-6.5-2.22-10.95-2.22-3.63,0-6.97.63-10,1.89-3.04,1.26-5.67,3.02-7.89,5.28-2.22,2.26-3.97,4.95-5.22,8.06-1.26,3.11-1.89,6.56-1.89,10.34s.59,7.47,1.78,10.61c1.18,3.15,2.87,5.84,5.06,8.06,2.19,2.22,4.82,3.93,7.89,5.11,3.07,1.19,6.5,1.78,10.28,1.78,4.59,0,8.35-.81,11.28-2.45,2.93-1.63,5.24-3.41,6.95-5.33,2-2.3,3.52-4.89,4.56-7.78h17.23c-1.63,5.78-4.19,10.97-7.67,15.56-1.48,1.93-3.22,3.83-5.22,5.72-2,1.89-4.33,3.56-7,5-2.67,1.45-5.67,2.61-9,3.5-3.33.89-7.04,1.33-11.12,1.33Z"/>
    <path class="st0" d="M271.16,48.78h15.56v8.34h.56c.67-1.78,1.67-3.33,3-4.67,1.11-1.18,2.59-2.37,4.45-3.56,1.85-1.18,4.19-1.78,7-1.78h6.67v15.01h-8.34c-4.22,0-7.5,1.16-9.84,3.49-2.33,2.33-3.5,5.48-3.5,9.46v30.4h-15.56v-56.69Z"/>
    <path class="st0" d="M339.3,105.47h-12.23l-15.01-56.69h16.12l11.12,43.35h4.45l12.23-43.35h16.12l-22.79,77.81h-16.12l6.11-21.12Z"/>
    <path class="st0" d="M377.09,48.78h15.56v7.23h.56c1.18-1.63,2.63-3.11,4.33-4.45,1.48-1.11,3.32-2.13,5.5-3.06,2.18-.93,4.83-1.39,7.95-1.39,3.63,0,7.02.71,10.17,2.11,3.15,1.41,5.91,3.41,8.28,6,2.37,2.59,4.24,5.74,5.61,9.45,1.37,3.71,2.06,7.85,2.06,12.45s-.69,8.75-2.06,12.45c-1.37,3.71-3.24,6.86-5.61,9.45-2.37,2.59-5.13,4.6-8.28,6-3.15,1.41-6.54,2.11-10.17,2.11-3.11,0-5.76-.46-7.95-1.39-2.19-.93-4.02-1.95-5.5-3.06-1.71-1.33-3.15-2.81-4.33-4.45h-.56v28.34h-15.56V48.78ZM407.1,93.79c3.93,0,7.22-1.45,9.89-4.33,2.67-2.89,4-7,4-12.34s-1.33-9.45-4-12.34c-2.67-2.89-5.97-4.33-9.89-4.33-4.22,0-7.69,1.44-10.39,4.33-2.71,2.89-4.06,7-4.06,12.34s1.35,9.45,4.06,12.34c2.7,2.89,6.17,4.33,10.39,4.33Z"/>
    <path class="st0" d="M448.23,62.12h-7.23v-13.34h7.23v-12.23h15.56v12.23h16.12v13.34h-16.12v30.01h16.67v13.34h-32.23v-43.35Z"/>
    <path class="st0" d="M516.03,107.13c-4.45,0-8.58-.78-12.39-2.33-3.82-1.56-7.11-3.69-9.89-6.39-2.78-2.7-4.95-5.89-6.5-9.56-1.56-3.67-2.33-7.58-2.33-11.73s.78-8.06,2.33-11.73,3.72-6.85,6.5-9.56c2.78-2.7,6.08-4.84,9.89-6.39,3.82-1.56,7.95-2.33,12.39-2.33s8.56.78,12.34,2.33,7.06,3.69,9.84,6.39c2.78,2.71,4.96,5.89,6.56,9.56,1.59,3.67,2.39,7.58,2.39,11.73s-.8,8.06-2.39,11.73c-1.59,3.67-3.78,6.85-6.56,9.56-2.78,2.71-6.06,4.84-9.84,6.39-3.78,1.56-7.89,2.33-12.34,2.33ZM516.03,93.79c2.07,0,4.02-.41,5.84-1.22,1.81-.82,3.41-1.95,4.78-3.39,1.37-1.45,2.45-3.19,3.22-5.22.78-2.04,1.17-4.32,1.17-6.84s-.39-4.8-1.17-6.84c-.78-2.04-1.85-3.78-3.22-5.22-1.37-1.44-2.96-2.57-4.78-3.39-1.82-.81-3.76-1.22-5.84-1.22s-4.02.41-5.84,1.22c-1.82.82-3.41,1.95-4.78,3.39-1.37,1.44-2.45,3.19-3.22,5.22-.78,2.04-1.17,4.32-1.17,6.84s.39,4.8,1.17,6.84c.78,2.04,1.85,3.78,3.22,5.22,1.37,1.45,2.96,2.58,4.78,3.39,1.81.82,3.76,1.22,5.84,1.22Z"/>
    <path class="st0" d="M640.68,107.69c-6.22,0-11.97-1.06-17.23-3.17-5.26-2.11-9.78-5-13.56-8.67-3.78-3.67-6.73-8-8.84-13-2.11-5-3.17-10.43-3.17-16.28s1.06-11.28,3.17-16.28c2.11-5,5.06-9.34,8.84-13s8.3-6.56,13.56-8.67c5.26-2.11,11-3.17,17.23-3.17,4.15,0,7.91.43,11.28,1.28,3.37.85,6.37,1.98,9,3.39,2.63,1.41,4.93,2.98,6.89,4.72,1.96,1.74,3.65,3.54,5.06,5.39,3.33,4.3,5.74,9.19,7.22,14.67h-17.23c-1.04-2.59-2.52-4.89-4.45-6.89-1.71-1.7-3.98-3.3-6.84-4.78-2.85-1.48-6.5-2.22-10.95-2.22-3.63,0-6.97.63-10,1.89-3.04,1.26-5.67,3.02-7.89,5.28-2.22,2.26-3.96,4.95-5.22,8.06-1.26,3.11-1.89,6.56-1.89,10.34s.59,7.47,1.78,10.61c1.18,3.15,2.87,5.84,5.06,8.06,2.19,2.22,4.82,3.93,7.89,5.11,3.07,1.19,6.5,1.78,10.28,1.78,4.59,0,8.35-.81,11.28-2.45,2.93-1.63,5.24-3.41,6.95-5.33,2-2.3,3.52-4.89,4.56-7.78h17.23c-1.63,5.78-4.19,10.97-7.67,15.56-1.48,1.93-3.22,3.83-5.22,5.72s-4.33,3.56-7,5c-2.67,1.45-5.67,2.61-9,3.5-3.33.89-7.04,1.33-11.12,1.33Z"/>
    <path class="st0" d="M711.38,107.13c-3.63,0-7.02-.71-10.17-2.11-3.15-1.41-5.91-3.41-8.28-6-2.37-2.59-4.24-5.74-5.61-9.45-1.37-3.7-2.06-7.85-2.06-12.45s.68-8.74,2.06-12.45c1.37-3.7,3.24-6.85,5.61-9.45,2.37-2.59,5.13-4.59,8.28-6,3.15-1.41,6.54-2.11,10.17-2.11,3.11,0,5.76.46,7.95,1.39,2.19.93,4.02,1.95,5.5,3.06,1.7,1.33,3.15,2.82,4.34,4.45h.56v-7.23h15.56v56.69h-15.56v-7.22h-.56c-1.19,1.63-2.63,3.11-4.34,4.45-1.48,1.11-3.32,2.13-5.5,3.06-2.19.92-4.83,1.39-7.95,1.39ZM715.27,93.79c4.22,0,7.69-1.45,10.39-4.33,2.7-2.89,4.06-7,4.06-12.34s-1.35-9.45-4.06-12.34c-2.71-2.89-6.17-4.33-10.39-4.33-3.93,0-7.23,1.44-9.89,4.33-2.67,2.89-4,7-4,12.34s1.33,9.45,4,12.34c2.67,2.89,5.96,4.33,9.89,4.33Z"/>
    <path class="st0" d="M780.85,107.13c-3.04,0-5.78-.28-8.23-.83s-4.61-1.32-6.5-2.28c-1.89-.96-3.56-2.04-5-3.22-1.45-1.18-2.65-2.41-3.61-3.67-2.37-2.96-4.04-6.3-5-10h16.12c.59,1.41,1.41,2.63,2.45,3.67.89.89,2.11,1.71,3.67,2.45,1.56.74,3.59,1.11,6.11,1.11,3.63,0,6.11-.5,7.45-1.5,1.33-1,2-2.35,2-4.06,0-1.48-.87-2.59-2.61-3.33-1.74-.74-3.91-1.41-6.5-2-2.59-.59-5.39-1.22-8.39-1.89s-5.8-1.67-8.39-3c-2.59-1.33-4.76-3.11-6.5-5.33-1.74-2.22-2.61-5.19-2.61-8.89,0-2.22.52-4.37,1.56-6.45,1.04-2.07,2.56-3.91,4.56-5.5,2-1.59,4.48-2.87,7.45-3.83,2.96-.96,6.41-1.45,10.34-1.45,2.96,0,5.63.26,8,.78,2.37.52,4.46,1.22,6.28,2.11,1.82.89,3.39,1.89,4.72,3,1.33,1.11,2.45,2.22,3.33,3.33,2.15,2.67,3.59,5.71,4.33,9.11h-15.56c-.44-1.04-1.11-1.96-2-2.78-.82-.67-1.95-1.3-3.39-1.89-1.45-.59-3.35-.89-5.72-.89-2.82,0-4.82.46-6,1.39-1.19.93-1.78,1.95-1.78,3.06,0,1.48.87,2.59,2.61,3.33,1.74.74,3.91,1.41,6.5,2,2.59.59,5.39,1.22,8.39,1.89s5.8,1.67,8.39,3c2.59,1.33,4.76,3.11,6.5,5.34,1.74,2.22,2.61,5.19,2.61,8.89,0,2.37-.56,4.65-1.67,6.84-1.11,2.19-2.74,4.13-4.89,5.83-2.15,1.71-4.82,3.08-8,4.11-3.19,1.04-6.86,1.56-11,1.56Z"/>
    <path class="st0" d="M821.97,41.55c-2.52,0-4.63-.83-6.34-2.5-1.71-1.67-2.56-3.61-2.56-5.84s.85-4.17,2.56-5.84c1.7-1.67,3.82-2.5,6.34-2.5s4.63.83,6.34,2.5c1.7,1.67,2.56,3.61,2.56,5.84s-.85,4.17-2.56,5.84c-1.71,1.67-3.82,2.5-6.34,2.5ZM814.19,48.78h15.56v56.69h-15.56v-56.69Z"/>
    <path class="st0" d="M840.87,48.78h15.56v7.78h.56c1.04-1.78,2.41-3.33,4.11-4.67,1.48-1.18,3.32-2.28,5.5-3.28,2.18-1,4.91-1.5,8.17-1.5,6.96,0,12.41,2.02,16.34,6.06,3.93,4.04,5.89,9.99,5.89,17.84v34.46h-15.56v-32.23c0-4.22-1.04-7.41-3.11-9.56-2.08-2.15-4.93-3.22-8.56-3.22-1.78,0-3.48.37-5.11,1.11-1.63.74-3.06,1.76-4.28,3.06-1.22,1.3-2.19,2.87-2.89,4.72-.71,1.85-1.06,3.89-1.06,6.11v30.01h-15.56v-56.69Z"/>
    <path class="st0" d="M935.35,107.13c-4.45,0-8.58-.78-12.39-2.33-3.82-1.56-7.11-3.69-9.89-6.39-2.78-2.7-4.95-5.89-6.5-9.56-1.56-3.67-2.33-7.58-2.33-11.73s.78-8.06,2.33-11.73c1.56-3.67,3.72-6.85,6.5-9.56,2.78-2.7,6.08-4.84,9.89-6.39,3.82-1.56,7.95-2.33,12.39-2.33s8.56.78,12.34,2.33,7.06,3.69,9.84,6.39c2.78,2.71,4.96,5.89,6.56,9.56,1.59,3.67,2.39,7.58,2.39,11.73s-.8,8.06-2.39,11.73c-1.59,3.67-3.78,6.85-6.56,9.56-2.78,2.71-6.06,4.84-9.84,6.39-3.78,1.56-7.89,2.33-12.34,2.33ZM935.35,93.79c2.07,0,4.02-.41,5.84-1.22,1.81-.82,3.41-1.95,4.78-3.39,1.37-1.45,2.45-3.19,3.22-5.22.78-2.04,1.17-4.32,1.17-6.84s-.39-4.8-1.17-6.84c-.78-2.04-1.85-3.78-3.22-5.22-1.37-1.44-2.96-2.57-4.78-3.39-1.82-.81-3.76-1.22-5.84-1.22s-4.02.41-5.84,1.22c-1.82.82-3.41,1.95-4.78,3.39-1.37,1.44-2.45,3.19-3.22,5.22-.78,2.04-1.17,4.32-1.17,6.84s.39,4.8,1.17,6.84c.78,2.04,1.85,3.78,3.22,5.22,1.37,1.45,2.96,2.58,4.78,3.39,1.82.82,3.76,1.22,5.84,1.22Z"/>
    <path class="st0" d="M998.71,107.13c-3.04,0-5.78-.28-8.23-.83s-4.61-1.32-6.5-2.28c-1.89-.96-3.56-2.04-5-3.22-1.45-1.18-2.65-2.41-3.61-3.67-2.37-2.96-4.04-6.3-5-10h16.12c.59,1.41,1.41,2.63,2.45,3.67.89.89,2.11,1.71,3.67,2.45,1.56.74,3.59,1.11,6.11,1.11,3.63,0,6.11-.5,7.45-1.5,1.33-1,2-2.35,2-4.06,0-1.48-.87-2.59-2.61-3.33-1.74-.74-3.91-1.41-6.5-2-2.59-.59-5.39-1.22-8.39-1.89s-5.8-1.67-8.39-3c-2.59-1.33-4.76-3.11-6.5-5.33-1.74-2.22-2.61-5.19-2.61-8.89,0-2.22.52-4.37,1.56-6.45,1.04-2.07,2.56-3.91,4.56-5.5,2-1.59,4.48-2.87,7.45-3.83,2.96-.96,6.41-1.45,10.34-1.45,2.96,0,5.63.26,8,.78,2.37.52,4.46,1.22,6.28,2.11,1.82.89,3.39,1.89,4.72,3,1.33,1.11,2.45,2.22,3.33,3.33,2.15,2.67,3.59,5.71,4.33,9.11h-15.56c-.44-1.04-1.11-1.96-2-2.78-.82-.67-1.95-1.3-3.39-1.89-1.45-.59-3.35-.89-5.72-.89-2.82,0-4.82.46-6,1.39-1.19.93-1.78,1.95-1.78,3.06,0,1.48.87,2.59,2.61,3.33,1.74.74,3.91,1.41,6.5,2,2.59.59,5.39,1.22,8.39,1.89s5.8,1.67,8.39,3c2.59,1.33,4.76,3.11,6.5,5.34,1.74,2.22,2.61,5.19,2.61,8.89,0,2.37-.56,4.65-1.67,6.84-1.11,2.19-2.74,4.13-4.89,5.83-2.15,1.71-4.82,3.08-8,4.11-3.19,1.04-6.86,1.56-11,1.56Z"/>
    <g>
      <path class="st0" d="M1038.22,106.68c-2.53,0-4.64-.86-6.35-2.56-1.71-1.71-2.56-3.83-2.56-6.35s.85-4.64,2.56-6.35,3.83-2.56,6.35-2.56,4.64.85,6.35,2.56c1.71,1.71,2.56,3.83,2.56,6.35s-.85,4.64-2.56,6.35c-1.71,1.71-3.83,2.56-6.35,2.56Z"/>
      <path class="st0" d="M1082.8,107.23c-4.31,0-8.34-.78-12.09-2.34-3.75-1.56-7-3.7-9.75-6.41-2.75-2.71-4.9-5.91-6.46-9.59s-2.34-7.6-2.34-11.76.78-8.08,2.34-11.76,3.71-6.87,6.46-9.59c2.75-2.71,6-4.85,9.75-6.41,3.75-1.56,7.78-2.34,12.09-2.34,3.05,0,5.8.32,8.25.95,2.45.63,4.64,1.47,6.58,2.51,1.93,1.04,3.62,2.23,5.07,3.57s2.69,2.71,3.73,4.12c2.45,3.27,4.24,6.99,5.35,11.15h-16.16c-.67-1.63-1.56-3.12-2.67-4.46-1.04-1.11-2.36-2.14-3.96-3.07-1.6-.93-3.66-1.39-6.19-1.39-1.93,0-3.77.41-5.52,1.23-1.75.82-3.29,1.95-4.62,3.4s-2.4,3.2-3.18,5.24c-.78,2.05-1.17,4.33-1.17,6.85s.39,4.81,1.17,6.85c.78,2.04,1.84,3.79,3.18,5.24s2.88,2.58,4.62,3.4c1.75.82,3.58,1.23,5.52,1.23,2.53,0,4.59-.46,6.19-1.39,1.6-.93,2.92-1.95,3.96-3.07,1.11-1.34,2.01-2.82,2.67-4.46h16.16c-.97,4.16-2.68,7.88-5.13,11.15-1.04,1.41-2.29,2.79-3.73,4.12-1.45,1.34-3.14,2.53-5.07,3.57-1.93,1.04-4.14,1.88-6.63,2.51-2.49.63-5.29.95-8.41.95Z"/>
      <path class="st0" d="M1146.89,107.23c-4.46,0-8.6-.78-12.43-2.34-3.83-1.56-7.13-3.7-9.92-6.41-2.79-2.71-4.96-5.91-6.52-9.59s-2.34-7.6-2.34-11.76.78-8.08,2.34-11.76,3.73-6.87,6.52-9.59c2.79-2.71,6.09-4.85,9.92-6.41,3.83-1.56,7.97-2.34,12.43-2.34s8.58.78,12.37,2.34,7.08,3.7,9.86,6.41c2.79,2.71,4.98,5.91,6.58,9.59,1.6,3.68,2.4,7.6,2.4,11.76s-.8,8.08-2.4,11.76c-1.6,3.68-3.79,6.87-6.58,9.59-2.79,2.71-6.08,4.85-9.86,6.41-3.79,1.56-7.91,2.34-12.37,2.34ZM1146.89,93.86c2.08,0,4.03-.41,5.85-1.23,1.82-.82,3.42-1.95,4.79-3.4,1.37-1.45,2.45-3.19,3.23-5.24.78-2.04,1.17-4.33,1.17-6.85s-.39-4.81-1.17-6.85c-.78-2.04-1.86-3.79-3.23-5.24-1.38-1.45-2.97-2.58-4.79-3.4-1.82-.82-3.77-1.23-5.85-1.23s-4.03.41-5.85,1.23c-1.82.82-3.42,1.95-4.79,3.4-1.38,1.45-2.45,3.2-3.23,5.24-.78,2.05-1.17,4.33-1.17,6.85s.39,4.81,1.17,6.85c.78,2.04,1.86,3.79,3.23,5.24,1.37,1.45,2.97,2.58,4.79,3.4,1.82.82,3.77,1.23,5.85,1.23Z"/>
      <path class="st0" d="M1185.34,48.72h15.6v7.8h.56c.96-1.78,2.23-3.34,3.79-4.68,1.34-1.19,3.05-2.29,5.13-3.29,2.08-1,4.68-1.5,7.8-1.5,3.64,0,6.67.56,9.08,1.67,2.41,1.11,4.36,2.34,5.85,3.68,1.71,1.56,3.05,3.31,4.01,5.24h.56c.96-1.93,2.3-3.68,4.01-5.24,1.49-1.34,3.36-2.56,5.63-3.68,2.27-1.11,5.18-1.67,8.75-1.67,6.76,0,12.07,2.03,15.94,6.07,3.86,4.05,5.8,10.01,5.8,17.89v34.55h-15.6v-32.88c0-4.24-.93-7.34-2.79-9.31-1.86-1.97-4.46-2.95-7.8-2.95s-6.22,1.3-8.64,3.9c-2.42,2.6-3.62,6.13-3.62,10.59v30.65h-15.6v-32.88c0-4.24-.93-7.34-2.79-9.31-1.86-1.97-4.46-2.95-7.8-2.95s-6.22,1.3-8.64,3.9c-2.42,2.6-3.62,6.13-3.62,10.59v30.65h-15.6v-56.84Z"/>
    </g>
    <path class="st0" d="M556.22,69.28h32.57v12.89h-32.57v-12.89Z"/>
  </g>
</svg>`;

function landingPage() {
  const endpointTiles = READ_ENDPOINTS.map((endpoint) => `
    <a class="endpoint-tile" href="${endpoint.example}" aria-label="Open example for ${endpoint.name}">
      <span class="tile-path">${endpoint.path}</span>
      <strong>${endpoint.name}</strong>
      <small>${endpoint.description}</small>
      <span class="tile-cta">View example</span>
    </a>
  `).join('');

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Crypto Casinos Data API</title>
  <meta name="description" content="Read-only casino terms and crypto payment metadata API for crypto-casinos.com.">
  <link rel="icon" href="/favicon.ico" type="image/x-icon">
  <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" sizes="256x256" href="/touch-icon-256.png">
  <meta name="theme-color" content="#0f1012">
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
      width: 236px;
      max-width: 48vw;
      color: #fff;
      text-decoration: none;
    }
    .brand-logo-svg {
      display: block;
      width: 100%;
      height: auto;
      overflow: visible;
    }
    .brand-logo-svg * {
      vector-effect: non-scaling-stroke;
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
      grid-template-columns: minmax(0, 1fr);
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
    .quick-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 14px;
    }
    .endpoint-tile {
      min-height: 188px;
      padding: 28px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      text-decoration: none;
      border: 1px solid var(--line-strong);
      border-radius: var(--radius);
      background: linear-gradient(135deg, rgba(255,255,255,.045), rgba(255,255,255,.018)), #17191b;
      box-shadow: inset 0 0 0 1px rgba(0,0,0,.62);
      transition: transform .18s ease, border-color .18s ease, background-color .18s ease;
    }
    .endpoint-tile:hover {
      transform: translateY(-2px);
      border-color: rgba(255,255,255,.28);
      background-color: rgba(255,255,255,.035);
    }
    .tile-path {
      color: var(--soft);
      font: 700 12px/1.45 Inconsolata, ui-monospace, monospace;
      letter-spacing: .02em;
      word-break: break-all;
    }
    .endpoint-tile strong { margin-top: 4px; font-size: 22px; line-height: 1.18; letter-spacing: -.035em; }
    .endpoint-tile small { color: #b7b7b7; font-size: 15px; line-height: 1.5; max-width: 300px; }
    .tile-cta {
      margin-top: auto;
      color: var(--teal);
      font-size: 14px;
      font-weight: 700;
    }
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
      min-height: 188px;
      border: 1px solid var(--line-strong);
      border-radius: var(--radius);
      background: linear-gradient(135deg, rgba(255,255,255,.045), rgba(255,255,255,.018)), #17191b;
      padding: 28px;
      box-shadow: inset 0 0 0 1px rgba(0,0,0,.62);
    }
    .note h3 { margin: 0 0 14px; font-size: 24px; line-height: 1.15; letter-spacing: -.04em; }
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
      .topbar { height: auto; padding: 18px 0; align-items: flex-start; }
      nav { gap: 16px; flex-wrap: wrap; justify-content: flex-end; }
      .hero { grid-template-columns: 1fr; padding-top: 52px; }
      .quick-grid, .notes, .example-card { grid-template-columns: 1fr; }
      .example-copy { border-right: 0; border-bottom: 1px solid var(--line); }
      .section-head, .cta-strip, footer { flex-direction: column; align-items: flex-start; }
      h1 { font-size: clamp(46px, 12vw, 72px); }
    }
  </style>
</head>
<body>
  <div class="wrap">
    <header class="topbar">
      <a class="brand" href="https://crypto-casinos.com/" aria-label="Crypto Casinos home">${BRAND_LOGO_SVG}</a>
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
          <div class="trust-pill">Read-only API for verified crypto casino data</div>
          <div class="kicker">Crypto Casinos Data API</div>
          <h1>Unlock source-backed <span class="muted-word">casino terms</span> and crypto payment data.</h1>
          <p class="lead">Skip the bullshit and query normalized casino terms, payment methods, restricted countries, game counts, and approximate crypto transaction-speed metadata.</p>
          <div class="actions">
            <a class="button primary" href="/rest/v1/api_brand_values?limit=5">Explore API</a>
            <a class="button" href="#endpoints">Browse endpoints</a>
          </div>
        </div>
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
            <h3>Read-only access</h3>
            <p>Use the Supabase public API key for client-side read requests. Never expose service-role credentials in frontend code.</p>
          </article>
          <article class="note">
            <h3>Crypto speed caveat</h3>
            <p>Speed ranges are approximate on-chain confirmation or finality estimates, not exchange withdrawal times or casino settlement guarantees.</p>
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

    if (url.pathname === '/favicon.svg') {
      return faviconResponse();
    }

    if (url.pathname === '/favicon.ico') {
      return binaryResponseFromBase64(FAVICON_ICO_BASE64, 'image/x-icon');
    }

    if (url.pathname === '/touch-icon-256.png' || url.pathname === '/apple-touch-icon.png') {
      return binaryResponseFromBase64(TOUCH_ICON_256_BASE64, 'image/png');
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
