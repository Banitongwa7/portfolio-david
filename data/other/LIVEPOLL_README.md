# Live Poll - PartyKit Setup

This Live Poll tool uses PartyKit for real-time, multi-user polling.

## Development Setup

### 1. Install Dependencies

All dependencies should already be installed. If not, run:

```bash
npm install
```

### 2. Configure Environment

Create a `.env.local` file in the root directory and add:

```env
NEXT_PUBLIC_PARTYKIT_HOST=127.0.0.1:1999
```

For production, replace with your deployed PartyKit host URL.

### 3. Run the PartyKit Server

In a separate terminal, start the PartyKit development server:

```bash
npm run partykit
```

This will start the PartyKit server on `http://127.0.0.1:1999`

### 4. Run Next.js Development Server

In your main terminal, run:

```bash
npm run dev
```

### 5. Access the Live Poll

Navigate to `http://localhost:3000/tools/live-poll`

## Features

- **Create Polls**: Create custom polls with multiple options
- **Real-time Voting**: See votes update instantly across all participants
- **Share Polls**: Generate shareable URLs for your polls
- **Join Polls**: Participate in polls using a poll ID
- **Anonymous Voting**: Privacy-first approach
- **Persistent Storage**: Votes are stored on the PartyKit server

## How It Works

1. **Poll Creation**: When you create a poll, the client generates a unique hash from the question and options
2. **Real-time Sync**: PartyKit maintains a WebSocket connection between all participants
3. **Vote Tracking**: Votes are sent to the PartyKit server and broadcast to all connected clients
4. **Persistence**: PartyKit stores votes in server-side storage

## Deployment

### Deploy PartyKit Server

```bash
npx partykit deploy
```

This will give you a production URL (e.g., `your-project.username.partykit.dev`)

### Update Environment Variable

Update your production environment variable:

```env
NEXT_PUBLIC_PARTYKIT_HOST=your-project.username.partykit.dev
```

## Architecture

```
Client (Browser)
    ↓
Next.js App
    ↓
PartySocket (WebSocket)
    ↓
PartyKit Server
    ↓
Persistent Storage
```

## File Structure

- `components/tools/LivePoll.tsx` - Main React component
- `partykit/polls.ts` - PartyKit server implementation
- `partykit.json` - PartyKit configuration

## Troubleshooting

**Can't connect to PartyKit?**

- Make sure the PartyKit server is running (`npm run partykit`)
- Check that the `NEXT_PUBLIC_PARTYKIT_HOST` environment variable is set correctly
- Verify there are no firewall issues blocking WebSocket connections

**Votes not syncing?**

- Check the browser console for WebSocket errors
- Ensure all clients are connected to the same poll ID
- Verify the PartyKit server is running and accessible
