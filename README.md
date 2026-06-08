# Crypto Casinos Data API

A Cloudflare Worker-powered landing page and API proxy for the **Crypto Casinos Data API**.

This project powers the public API subdomain for [crypto-casinos.com](https://crypto-casinos.com/):

```text
https://data-api.crypto-casinos.com
```

## What this API does

The API exposes read-only casino research data and crypto payment metadata from a Supabase-backed database.

It is designed to make structured casino terms data easier to query, including:

- Casino brand metadata
- Normalized terms and conditions fields
- Payment methods by type
- Restricted countries and availability data
- Publicly sourced game-count totals where available
- Crypto payment method metadata
- Approximate on-chain crypto transaction speed ranges
- Crypto ecosystem/network labels, such as Bitcoin, Ethereum, Solana, TRON, BNB Smart Chain, Polygon, and others

The data is intended for display, comparison, compliance research, SEO workflows, and lightweight frontend integrations.

## Main endpoints

### Landing page

```text
GET /
```

Shows a simple API documentation page.

### OpenAPI metadata

```text
GET /openapi.json
```

Returns basic OpenAPI-style metadata for the public endpoints.

### Brand values

```text
GET /rest/v1/api_brand_values
```

Flat, filterable casino terms datapoints with source/provenance fields.

Example:

```text
/rest/v1/api_brand_values?domain=eq.rakebit.com
```

### Brand summary

```text
GET /rest/v1/api_brand_summary
```

One row per casino brand with normalized values aggregated as JSON.

Example:

```text
/rest/v1/api_brand_summary?domain=eq.rakebit.com
```

### Crypto transaction speeds

```text
GET /rest/v1/api_crypto_transaction_speeds
```

Approximate on-chain transaction speed ranges and ecosystem metadata for crypto assets.

Example:

```text
/rest/v1/api_crypto_transaction_speeds?symbol=eq.BTC
```

Example fields include:

```json
{
  "symbol": "BTC",
  "name": "Bitcoin",
  "ecosystem": "Bitcoin",
  "transaction_speed_range": "10 min to 1 hr",
  "min_seconds": 600,
  "max_seconds": 3600
}
```

## Authentication

The underlying Supabase PostgREST API expects the normal Supabase read headers:

```text
apikey: <publishable-key>
Authorization: Bearer <same publishable key>
```

Do **not** use or expose a Supabase service-role key in browser/client code.

## Crypto speed caveat

Crypto speed values are approximate on-chain inclusion, confirmation, or finality ranges.

They are **not** guaranteed settlement times, exchange withdrawal times, or casino processing-time promises.

## How it works

This Worker handles two jobs:

1. Serve a branded landing page at `/` and `/docs`.
2. Proxy API requests under `/rest/v1/*` to the Supabase project API.

The Worker does not store private database credentials. It only forwards requests to Supabase and keeps the public API under a branded domain.

## Project structure

```text
.
├── README.md
├── wrangler.toml
└── src/
    └── worker.js
```

## Local development

Install dependencies through Wrangler via `npx`:

```bash
npx wrangler dev --local
```

## Deploy

```bash
npx wrangler deploy
```

Then attach the Worker to the custom domain or route:

```text
data-api.crypto-casinos.com/*
```

## License

License choice depends on whether this repository is public or private. MIT is a good default for a public utility repo if you are comfortable allowing reuse with attribution.
