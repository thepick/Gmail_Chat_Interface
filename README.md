# Gmail Chat Interface

A Gmail front end with a LINE-style messaging layout.

## What it does

- Shows Gmail conversations in a left sidebar with search
- Displays threads as bubble-style chat on the right
- Reply inline or compose new emails
- Renders image/file attachments inline in the chat view
- Link previews via Google Apps Script proxy
- Rich text formatting (bold, italic, code) and emoji picker
- Drag-and-drop file attachments
- Scheduled send support
- Audio recording for messages
- Light / dark / system theme toggle

## Setup

1. Create a Google Cloud project
2. Enable the Gmail API (and People API for contact photos, Tasks API for task creation)
3. Create an OAuth Client ID for a web application
4. The Client ID is hardcoded in `index.html` — update `HARDCODED_CLIENT_ID` with your own
5. For link previews: deploy `link-preview-proxy.js` as a Google Apps Script web app, then update `HARDCODED_LINK_PROXY_URL` in `index.html`
6. Open `index.html` in a browser and sign in

## Notes

- Single-file app — best for personal use
- Tokens and avatar lookup results stored in localStorage
