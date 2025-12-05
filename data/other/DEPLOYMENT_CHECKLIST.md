# Live Poll - Quick Deployment Checklist

## ✅ Pre-Deployment Checklist

- [ ] PartyKit server code ready (`partykit/polls.ts`)
- [ ] LivePoll component implemented
- [ ] Local testing completed
- [ ] Git repository is clean and committed

---

## 🚀 Deployment Steps

### Step 1: Deploy PartyKit (One-time setup)

```bash
# 1. Login to PartyKit (opens browser)
npx partykit login

# 2. Deploy your PartyKit server
npx partykit deploy
```

**Expected Output:**

```
✅ Successfully deployed!
📍 https://portfolio-polls.[your-username].partykit.dev
```

**📝 Copy your PartyKit URL!**

---

### Step 2: Add Environment Variable to Vercel

**Via Vercel Dashboard:**

1. Go to: https://vercel.com/dashboard
2. Select: **portfolio-david** project
3. Navigate: **Settings** → **Environment Variables**
4. Add new variable:
   ```
   Key:   NEXT_PUBLIC_PARTYKIT_HOST
   Value: portfolio-polls.[your-username].partykit.dev
   ```
   (Note: Remove `https://` from the URL)
5. Select: **All environments** (Production, Preview, Development)
6. Click: **Save**

---

### Step 3: Redeploy Vercel

**Option A: Git Push (Recommended)**

```bash
git add .
git commit -m "Add Live Poll with PartyKit"
git push origin main
```

**Option B: Manual Redeploy**

- Go to Vercel Dashboard
- Click **Deployments**
- Click **⋯** on latest deployment
- Click **Redeploy**

---

### Step 4: Verify

1. Wait for deployment (usually 1-2 minutes)
2. Visit: `https://[your-domain].vercel.app/tools/live-poll`
3. Test:
   - [ ] Create a poll
   - [ ] Vote on it
   - [ ] Open in incognito/another device
   - [ ] Verify real-time sync works

---

## 📊 Your URLs

| Service       | URL                                             | Purpose           |
| ------------- | ----------------------------------------------- | ----------------- |
| **Portfolio** | https://[yours].vercel.app                      | Main website      |
| **Live Poll** | https://[yours].vercel.app/tools/live-poll      | Poll tool         |
| **PartyKit**  | https://portfolio-polls.[username].partykit.dev | Real-time backend |

---

## 🔧 Common Commands

```bash
# Check PartyKit deployment status
npx partykit list

# View PartyKit logs
npx partykit tail

# Redeploy PartyKit after changes
npx partykit deploy

# View Vercel logs
vercel logs

# Test locally
npm run dev          # Terminal 1: Next.js
npm run partykit     # Terminal 2: PartyKit
```

---

## ⚠️ Troubleshooting

| Issue                     | Solution                                                    |
| ------------------------- | ----------------------------------------------------------- |
| Can't connect to PartyKit | Check environment variable is set correctly (no `https://`) |
| Real-time not working     | Verify WebSocket connection in DevTools → Network → WS      |
| 404 on poll page          | Ensure changes are committed and deployed                   |
| Environment var not found | Redeploy Vercel after adding the variable                   |

---

## 💰 Free Tier Limits

**PartyKit Free Tier:**

- ✅ 100,000 requests/month
- ✅ Unlimited WebSocket connections
- ✅ Global edge deployment

**Vercel Free Tier:**

- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic SSL

**Both are FREE for your portfolio!** 🎉

---

## 📚 Resources

- **PartyKit Docs**: https://docs.partykit.io
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Deployment Guide**: See `DEPLOYMENT_GUIDE.md` for detailed instructions

---

## ✨ After Successful Deployment

Your Live Poll is now:

- 🌍 Accessible worldwide
- ⚡ Real-time enabled
- 🔒 Secure (HTTPS + WSS)
- 📱 Mobile friendly
- 🎨 Beautifully animated
- 🆓 Free to host!

**Share your Live Poll tool with the world!** 🚀
