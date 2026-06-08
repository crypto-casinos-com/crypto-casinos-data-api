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
