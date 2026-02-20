# Fixing 404 on Enquiry Form when site is at a subpath (e.g. pas-india.com/en)

If the site is deployed at **https://pas-india.com/en** and the Enquiry form shows "Server error (404)", do the following.

## 1. Server (Node.js)

Set the base path in your `.env` on the server:

```env
BASE_PATH=/en
```

Restart the Node server so it also responds to `/en/api/enquiry/...` (and other API routes under `/en/api/`).

## 2. Frontend (already handled)

The frontend detects when the app is at `/en` (from the browser URL) and calls `/en/api/...` automatically. No code change is needed.

If you build with a fixed base path, add to `package.json` before building:

```json
"homepage": "https://pas-india.com/en"
```

Then run `npm run build` so asset paths use `/en`.

## 3. Proxy / hosting

Ensure requests to **both** `/api/*` and `/en/api/*` reach your Node server (e.g. proxy or reverse proxy forwards them to the port where `node server.js` runs). If only static files are served and `/api` is not proxied to Node, the Enquiry API will keep returning 404.

## Summary

- **Server:** `BASE_PATH=/en` in `.env`, restart Node.
- **Frontend:** Uses `/en` as API base when URL path starts with `/en`.
- **Hosting:** Proxy or routing must send `/api` and `/en/api` to the Node app.
