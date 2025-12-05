# Deploying Live Poll to Vercel

This guide explains how to deploy your Live Poll feature with your portfolio on Vercel.

## Architecture Overview

Your Live Poll deployment consists of two parts:

- **Frontend (Next.js)**: Deployed on Vercel ✅ (already done)
- **Backend (PartyKit)**: Needs to be deployed to PartyKit's platform

## Deployment Steps

### Part 1: Deploy PartyKit Server

#### 1. Login to PartyKit

If you haven't already, you'll need to authenticate with PartyKit:

```bash
npx partykit login
```

This will:

- Open a browser window for authentication
- Link your GitHub account
- Create a PartyKit account if you don't have one

#### 2. Deploy to PartyKit

Run the deployment command:

```bash
npx partykit deploy
```

This will:

- Bundle your `partykit/polls.ts` server
- Deploy it to PartyKit's edge network
- Give you a production URL

**Expected Output:**

```
🎈 Deploying to PartyKit...
✅ Successfully deployed!
📍 Your server is live at: https://portfolio-polls.[your-username].partykit.dev
```

#### 3. Copy Your PartyKit URL

After deployment, you'll get a URL like:

```
https://portfolio-polls.[your-username].partykit.dev
```

**Save this URL - you'll need it for the next step!**

### Part 2: Configure Vercel Environment Variables

#### Option A: Via Vercel Dashboard (Recommended)

1. Go to https://vercel.com/dashboard
2. Select your **portfolio-david** project
3. Go to **Settings** → **Environment Variables**
4. Add a new variable:
   - **Key**: `NEXT_PUBLIC_PARTYKIT_HOST`
   - **Value**: Your PartyKit URL (without `https://`)
     - Example: `portfolio-polls.[your-username].partykit.dev`
   - **Environment**: Select all (Production, Preview, Development)
5. Click **Save**
6. **Important**: Redeploy your site for changes to take effect

#### Option B: Via Vercel CLI

If you have Vercel CLI installed:

```bash
# Add environment variable
vercel env add NEXT_PUBLIC_PARTYKIT_HOST production

# When prompted, enter your PartyKit URL (without https://)
# Example: portfolio-polls.yourname.partykit.dev
```

### Part 3: Update Local Environment

Update your local `.env.local` file for local development:

```env
NEXT_PUBLIC_PARTYKIT_HOST=127.0.0.1:1999
```

For production testing, you can temporarily change it to:

```env
NEXT_PUBLIC_PARTYKIT_HOST=portfolio-polls.[your-username].partykit.dev
```

### Part 4: Deploy to Vercel

Your portfolio is already connected to Vercel, so deployment is automatic:

#### If using Git:

```bash
# Commit your changes
git add .
git commit -m "Add Live Poll feature with PartyKit integration"
git push origin main
```

Vercel will automatically:

- Detect the push
- Build your Next.js app
- Deploy with the new environment variable

#### Manual Deployment:

If you need to manually deploy:

```bash
vercel --prod
```

### Part 5: Verify Deployment

1. Wait for Vercel deployment to complete
2. Visit your production site: `https://your-portfolio.vercel.app/tools/live-poll`
3. Test the functionality:
   - Create a new poll
   - Vote on it
   - Open in another browser/incognito to verify real-time sync

## Environment Variables Summary

| Environment             | Variable                    | Value                                     |
| ----------------------- | --------------------------- | ----------------------------------------- |
| **Local Development**   | `NEXT_PUBLIC_PARTYKIT_HOST` | `127.0.0.1:1999`                          |
| **Production (Vercel)** | `NEXT_PUBLIC_PARTYKIT_HOST` | `portfolio-polls.[username].partykit.dev` |

## Troubleshooting

### Issue: "Cannot connect to PartyKit"

**Solution:**

1. Verify your PartyKit server is deployed: Visit your PartyKit URL in browser
2. Check Vercel environment variables are set correctly
3. Ensure you redeployed after adding environment variables
4. Check browser console for CORS or WebSocket errors

### Issue: "Polls not syncing in real-time"

**Solution:**

1. Verify WebSocket connection in browser DevTools → Network → WS tab
2. Check that `NEXT_PUBLIC_PARTYKIT_HOST` is set (without `https://`)
3. Test PartyKit server directly: `https://[your-partykit-url]`

### Issue: "Environment variable not found"

**Solution:**

1. Make sure variable name is exactly: `NEXT_PUBLIC_PARTYKIT_HOST`
2. In Vercel, ensure it's set for all environments
3. Redeploy your Vercel project after adding the variable

## Managing Your PartyKit Deployment

### View Deployment Info

```bash
npx partykit list
```

### View Logs

```bash
npx partykit tail
```

### Update PartyKit Server

After making changes to `partykit/polls.ts`:

```bash
npx partykit deploy
```

## Cost & Limits

### PartyKit Free Tier includes:

- 100,000 requests/month
- Unlimited WebSocket connections
- Edge deployment globally
- Persistent storage

This is more than enough for a portfolio project!

### Vercel Free Tier includes:

- Unlimited deployments
- 100GB bandwidth/month
- Automatic SSL
- Preview deployments

## Quick Reference Commands

```bash
# Local Development
npm run dev          # Start Next.js (Terminal 1)
npm run partykit     # Start PartyKit locally (Terminal 2)

# Deployment
npx partykit login   # Authenticate (one-time)
npx partykit deploy  # Deploy PartyKit server
git push             # Deploy to Vercel (auto)

# Monitoring
npx partykit list    # List deployments
npx partykit tail    # View real-time logs
vercel logs          # View Vercel logs
```

## Security Notes

1. **Environment Variables**:

   - `NEXT_PUBLIC_*` variables are exposed to the browser
   - This is safe for PartyKit host URLs
   - Never put secrets in `NEXT_PUBLIC_*` variables

2. **Rate Limiting**:

   - PartyKit handles rate limiting automatically
   - For additional security, implement vote throttling in your client

3. **CORS**:
   - PartyKit automatically handles CORS for WebSocket connections
   - No additional configuration needed

## Next Steps

After successful deployment:

1. ✅ Test poll creation on production
2. ✅ Test multi-device real-time sync
3. ✅ Share your Live Poll tool with others!
4. 📊 Monitor usage via PartyKit dashboard
5. 🎉 Enjoy your real-time polling system!

## Support

- **PartyKit Docs**: https://docs.partykit.io
- **Vercel Docs**: https://vercel.com/docs
- **PartyKit Discord**: https://discord.gg/partykit
