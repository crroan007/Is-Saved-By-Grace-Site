# Deployment Guide: Vercel & Discord Integration

This guide will help you host your website for **free** on Vercel and securely connect it to your Discord server.

## Prerequisites

1.  **GitHub Account**: You need a GitHub account to host your code.
2.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com) using your GitHub account.
3.  **Discord Webhook URL**: You should already have this from your Discord server settings.

## Step 1: Push Code to GitHub

If you haven't already, push your project to a new GitHub repository.

1.  Create a new repository on GitHub.
2.  Run these commands in your terminal (replace `YOUR_REPO_URL` with your actual repository URL):

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_REPO_URL
git push -u origin main
```

## Step 2: Deploy to Vercel

1.  Log in to your **Vercel Dashboard**.
2.  Click **"Add New..."** -> **"Project"**.
3.  Select your GitHub repository (`Is-Saved-By-Grace-Website` or whatever you named it) and click **Import**.
4.  **Configure Project**:
    *   **Framework Preset**: Vercel should automatically detect `Vite`. If not, select it.
    *   **Root Directory**: `./` (default)
    *   **Build Command**: `npm run build` (default)
    *   **Output Directory**: `dist` (default)

## Step 3: Configure Environment Variables (CRITICAL)

This is where we securely store your Discord Webhook URL so it's not exposed to the public.

1.  In the "Configure Project" screen, look for the **"Environment Variables"** section.
2.  Add a new variable:
    *   **Key**: `DISCORD_WEBHOOK_URL`
    *   **Value**: Paste your actual Discord Webhook URL here (e.g., `https://discord.com/api/webhooks/...`).
3.  Click **Add**.

## Step 4: Deploy

1.  Click **Deploy**.
2.  Vercel will build your site and deploy it. This usually takes about a minute.
3.  Once done, you'll get a live URL (e.g., `is-saved-by-grace.vercel.app`).

## Step 5: Verify Integration

1.  Go to your new live URL.
2.  Fill out a test application in the recruitment funnel.
3.  Submit it.
4.  Check your Discord server. You should see the notification appear instantly!

## Troubleshooting

*   **405 Method Not Allowed**: Ensure you are sending a POST request.
*   **500 Server Error**: Check your Vercel Project Settings -> Logs. It usually means the `DISCORD_WEBHOOK_URL` is missing or invalid.
*   **CORS Errors**: Vercel handles this automatically for internal API routes, so you shouldn't see this.

## Making Changes

Whenever you want to update the site:
1.  Make changes locally.
2.  Commit and push to GitHub (`git push`).
3.  Vercel will **automatically** detect the change and redeploy your site within minutes!
