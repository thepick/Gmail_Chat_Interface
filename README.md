# Gmail Chat Interface

A Gmail front end with a LINE-style messaging layout.

## What it does

- Gmail conversations in a left sidebar with search
- Bubble-style chat view for selected threads
- Reply inline or compose new emails
- Image/file attachments rendered inline
- Link previews (via Google Apps Script proxy — see Setup)
- Rich text formatting (bold, italic, code), emoji picker
- Drag-and-drop file attachments
- Scheduled send and audio recording
- Light / dark / system theme toggle (top-right 🌓 button)

## Setup

1. Create a Google Cloud project
2. Enable the Gmail API (and People API for contact photos, Tasks API for task creation)
3. Create an OAuth Client ID for a web application
4. Edit `HARDCODED_CLIENT_ID` in `index.html` with your own Client ID
5. To enable link previews: deploy `link-preview-proxy.js` as a Google Apps Script web app, then paste the deployment URL into `HARDCODED_LINK_PROXY_URL` in `index.html`
6. Open `index.html` in a browser and sign in

## Notes

- Single-file app — best for personal use
- Tokens and avatar lookups stored in localStorage
