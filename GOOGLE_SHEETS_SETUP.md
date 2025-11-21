# Google Sheets Integration Setup

This guide walks you through setting up Google Sheets to automatically log all guild application submissions.

## Overview

When a user submits an application through the website:
1. The application data is sent to your Gmail inbox (via nodemailer)
2. The application data is **also** logged to your Google Sheet (via Apps Script)
3. You can manage and review all applications in one spreadsheet

## Prerequisites

- A Google Account
- A Gmail account (for sending emails)
- Access to Google Sheets and Google Apps Script

---

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **+ Create** → **Blank spreadsheet**
3. Name it: `Guild Applications`
4. Add column headers in the first row:
   ```
   A: Timestamp
   B: Character Name
   C: Battle.net Tag
   D: Class
   E: Primary Spec
   F: Secondary Spec
   G: Discord Username
   H: Server
   I: Faith Statement
   J: Activity 1 (First Priority)
   K: Activity 2 (Second Priority)
   L: Activity 3 (Third Priority)
   M: Activity 4 (Fourth Priority)
   N: Activity 5 (Fifth Priority)
   ```

5. **Save the spreadsheet** (Ctrl+S)

---

## Step 2: Create an Apps Script

1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. A new tab will open with the Apps Script editor
3. **Delete the default code** and paste this:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSheet();

  // Parse the JSON data from the request
  const data = JSON.parse(e.postData.contents);

  // Parse activity priorities from the Activity Priorities field
  // Format: "#1 Activity Name\n#2 Activity Name\n..."
  const activitiesText = data['Activity Priorities'] || '';
  const activityLines = activitiesText.split('\n').filter(line => line.trim());

  // Extract activities into an array, removing the "#X " prefix
  const activities = activityLines.map(line => {
    return line.replace(/^#\d+\s+/, '').trim();
  });

  // Create a row with the form data
  const row = [
    new Date(),
    data['Character Name'],
    data['Battle.net Tag'],
    data['Class'],
    data['Primary Spec'],
    data['Secondary Spec'],
    data['Discord Username'],
    data['Server'],
    data['Faith Statement'],
    activities[0] || '',  // Activity 1
    activities[1] || '',  // Activity 2
    activities[2] || '',  // Activity 3
    activities[3] || '',  // Activity 4
    activities[4] || ''   // Activity 5
  ];

  // Add the row to the sheet
  sheet.appendRow(row);

  // Return success response
  return ContentService.createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. **Save the script** (Ctrl+S)
   - Name it: `Guild Applications Logger`
   - Click **Save**

---

## Step 3: Deploy the Apps Script

1. Click the **Deploy** button (top right)
2. Select **New deployment**
3. Click the dropdown and select **Web app**
4. Configure:
   - **Execute as**: Your Google Account
   - **Who has access**: **Anyone**
5. Click **Deploy**
6. Click **Authorize access** and grant permissions
7. Copy the **deployment URL** (it will look like: `https://script.google.com/macros/d/SCRIPT_ID/useweb...`)
8. **Keep this URL safe** - you'll need it in the next step

---

## Step 4: Add Google App Password for Gmail

To send emails via Gmail from your application, you need to create an App Password:

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Look for **App passwords** (you may need to enable 2-Factor Authentication first)
3. Create an app password for "Mail" on "Windows Computer"
4. Copy the generated password (it's a 16-character string)
5. **Keep this password safe** - you'll use it in environment variables

---

## Step 5: Configure Environment Variables

### For Local Development

Create a `.env.local` file in your project root:

```env
# Gmail Configuration
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password

# Admin email to receive applications
ADMIN_EMAIL=your-email@gmail.com

# Google Sheets Integration
GOOGLE_SHEET_SCRIPT_URL=https://script.google.com/macros/d/YOUR_SCRIPT_ID/useweb...
```

### For Production (Vercel)

1. Go to your Vercel dashboard
2. Select your project → **Settings** → **Environment Variables**
3. Add these variables:
   - `GMAIL_USER` → Your Gmail address
   - `GMAIL_APP_PASSWORD` → Your 16-character app password
   - `ADMIN_EMAIL` → Email to receive applications
   - `GOOGLE_SHEET_SCRIPT_URL` → Your Apps Script deployment URL
4. **Redeploy** your application

---

## Step 6: Test the Integration

1. Go to your website
2. Fill out and submit a guild application
3. Check:
   - **Your Gmail inbox** - You should receive an email with the application
   - **Your Google Sheet** - A new row should appear with the application data
4. If both work, you're done! 🎉

---

## Troubleshooting

### Issue: "Email service not configured"
**Solution**: Ensure `GMAIL_USER` and `GMAIL_APP_PASSWORD` are set in your environment variables.

### Issue: Email received but Google Sheet not updated
**Solution**:
1. Check that `GOOGLE_SHEET_SCRIPT_URL` is set correctly
2. Open your Apps Script and check the **Executions** tab for errors
3. Verify the sheet has the correct column headers

### Issue: "Invalid recipient" error
**Solution**: Make sure the `ADMIN_EMAIL` is a valid email address.

### Issue: Gmail auth failed
**Solution**:
1. Verify you're using an App Password, not your regular Gmail password
2. Make sure 2-Factor Authentication is enabled on your Google Account
3. Regenerate the app password if needed

### Issue: Apps Script won't accept POST requests
**Solution**:
1. Re-deploy the Apps Script
2. Make sure "Who has access" is set to "Anyone"
3. Use the latest deployment URL

---

## How It Works

```
User submits form
        ↓
POST /api/apply
        ↓
    ├─→ Sends email via Gmail (nodemailer)
    └─→ Sends data to Google Sheets (Apps Script webhook)
        ↓
Returns success response
```

---

## API Endpoint Reference

**Endpoint**: `POST /api/apply`

**Request Body**:
```json
{
  "_subject": "New Application: Character Name",
  "Character Name": "Thrall",
  "Battle.net Tag": "Thrall#1234",
  "Class": "Shaman",
  "Primary Spec": "Elemental",
  "Secondary Spec": "Enhancement",
  "Discord Username": "thrall#9876",
  "Server": "Area 52",
  "Activity Priorities": "#1 AOTC Racing",
  "Faith Statement": "I believe in Jesus Christ..."
}
```

**Success Response**:
```json
{
  "success": true,
  "id": "email-message-id"
}
```

**Error Response**:
```json
{
  "error": "Email service not configured"
}
```

---

## Environment Variables Summary

| Variable | Required | Example |
|----------|----------|---------|
| `GMAIL_USER` | Yes | `guild-admin@gmail.com` |
| `GMAIL_APP_PASSWORD` | Yes | `abcd efgh ijkl mnop` |
| `ADMIN_EMAIL` | No | `crroan001@gmail.com` |
| `GOOGLE_SHEET_SCRIPT_URL` | No | `https://script.google.com/macros/d/...` |

---

## Security Notes

- **Never commit `.env.local` to git** - it's listed in `.gitignore`
- **Use App Passwords for Gmail**, not your regular password
- **Keep your Apps Script URL secret** - it can be accessed by anyone with the URL
- **Google Sheets should be private** - only you should have access to it

---

## Next Steps

Once everything is working:

1. **Customize your sheet** with additional columns or formatting
2. **Add filters** to your Google Sheet to sort applications
3. **Create a summary dashboard** in Google Sheets to track statistics
4. **Set up email notifications** in Google Sheets (optional)

Enjoy managing your guild applications! ⚔️
