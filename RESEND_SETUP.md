# Resend Email Setup

This project now uses **Resend** for guild application emails instead of FormSubmit.co. Resend is a modern, reliable email service that integrates directly with your backend, avoiding Cloudflare proxy issues.

## Why Resend?

- ✅ No Cloudflare blocking (direct server-to-Resend connection)
- ✅ Professional email templates and tracking
- ✅ Full control over sender domain (noreply@issavedbygrace.com)
- ✅ Better deliverability and compliance
- ✅ Easy to configure and monitor

## Setup Instructions

### 1. Get a Resend API Key

1. Go to [Resend.com](https://resend.com)
2. Sign up for a free account
3. Navigate to **API Keys** section
4. Create a new API key
5. Copy the API key (it starts with `re_`)

### 2. Configure Environment Variables

**For Local Development:**
1. Create a `.env.local` file in the project root:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
   ADMIN_EMAIL=crroan001@gmail.com
   ```

**For Production (Vercel):**
1. Go to your Vercel dashboard
2. Select your project → Settings → Environment Variables
3. Add two variables:
   - Key: `RESEND_API_KEY` → Value: Your Resend API key
   - Key: `ADMIN_EMAIL` → Value: Your email address (e.g., crroan001@gmail.com)
4. Deploy to apply the changes

### 3. Verify Sender Domain (Optional but Recommended)

To use `noreply@issavedbygrace.com` as the sender:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter `issavedbygrace.com`
4. Follow the DNS configuration steps (Resend will guide you)
5. Once verified, emails will be sent from `noreply@issavedbygrace.com`

Without domain verification, emails will be sent from a Resend domain instead, but will still work fine.

## Files Modified

- **`/api/apply.ts`** - Updated to use Resend instead of FormSubmit
- **`/src/components/RecruitmentFunnel.tsx`** - Removed FormSubmit fallback, now always uses `/api/apply`
- **`.env.example`** - Template for required environment variables

## Testing

### Local Testing
1. Set up `.env.local` with your Resend API key
2. Run `npm run dev`
3. Fill out and submit the application form
4. Check your email inbox for the application

### Production Testing
1. Ensure environment variables are set in Vercel
2. Deploy to Vercel
3. Fill out and submit the application form
4. Verify you receive the email

## Troubleshooting

### Issue: "Email service not configured"
- **Solution**: Ensure `RESEND_API_KEY` is set in your environment variables
- Check that you're using the correct API key format (starts with `re_`)

### Issue: Email not received
1. Check spam/junk folder
2. Verify the `ADMIN_EMAIL` is correctly set
3. Check Resend dashboard for send status and errors
4. Ensure domain is verified (if using custom domain)

### Issue: 403 Error
- This should now be resolved since we're not using FormSubmit proxy anymore
- If still occurring, check that the API endpoint is properly configured

## API Endpoint Reference

**Endpoint:** `POST /api/apply`

**Request Body:**
```json
{
  "_subject": "New Application: Character Name",
  "Character Name": "Your Character",
  "Battle.net Tag": "YourTag#1234",
  "Class": "Warrior",
  "Primary Spec": "Protection",
  "Secondary Spec": "Arms",
  "Discord Username": "yourname#1234",
  "Server": "Area 52",
  "Activity Priorities": "#1 AOTC Racing (The Vanguard)\n#2 PvP (The Gladiator)",
  "Faith Statement": "Your faith statement..."
}
```

**Success Response:**
```json
{
  "success": true,
  "id": "email_id_from_resend"
}
```

**Error Response:**
```json
{
  "error": "Error message describing what went wrong"
}
```
