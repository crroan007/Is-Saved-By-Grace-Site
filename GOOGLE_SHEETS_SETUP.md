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
   B: Faith Statement
   C: Battle Tag
   D: Discord Username
   E: Character Name
   F: Class
   G: Primary Spec
   H: Secondary Spec
   I: Activity 1 (First Priority)
   J: Activity 2 (Second Priority)
   K: Activity 3 (Third Priority)
   L: Activity 4 (Fourth Priority)
   M: Activity 5 (Fifth Priority)
   N: Status
   O: Has been Invited to Discord
   ```

5. **Save the spreadsheet** (Ctrl+S)

---

## Step 2: Create an Apps Script

1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. A new tab will open with the Apps Script editor
3. **Delete the default code** and paste this:

```javascript
function doPost(e) {
  try {
    Logger.log('=== GOOGLE SHEETS WEBHOOK DEBUG ===');
    Logger.log('Received POST request');
    Logger.log('Raw payload: ' + e.postData.contents);

    // STEP 0: Get the spreadsheet and sheet with more debugging
    Logger.log('--- Getting Sheet Reference ---');
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    Logger.log('Spreadsheet name: ' + ss.getName());
    Logger.log('Spreadsheet ID: ' + ss.getId());

    const sheet = ss.getActiveSheet();
    Logger.log('Active sheet name: ' + sheet.getName());
    Logger.log('Sheet ID: ' + sheet.getSheetId());

    const lastRowBefore = sheet.getLastRow();
    Logger.log('Rows in sheet before append: ' + lastRowBefore);

    // STEP 1: Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    Logger.log('Parsed data keys: ' + Object.keys(data).join(', '));
    Logger.log('Full data object: ' + JSON.stringify(data, null, 2));

    // STEP 2: Log all individual fields
    Logger.log('--- Field Values ---');
    Logger.log('Character Name: ' + data['Character Name']);
    Logger.log('Battle.net Tag: ' + data['Battle.net Tag']);
    Logger.log('Class: ' + data['Class']);
    Logger.log('Primary Spec: ' + data['Primary Spec']);
    Logger.log('Secondary Spec: ' + data['Secondary Spec']);
    Logger.log('Discord Username: ' + data['Discord Username']);
    Logger.log('Faith Statement: ' + data['Faith Statement']);
    Logger.log('Activity Priorities (raw): ' + JSON.stringify(data['Activity Priorities']));

    // STEP 3: Parse activity priorities
    const activitiesText = data['Activity Priorities'] || '';
    Logger.log('Activities text: "' + activitiesText + '"');
    Logger.log('Activities text length: ' + activitiesText.length);

    const activityLines = activitiesText.split('\n').filter(line => line.trim());
    Logger.log('Activity lines after split: ' + JSON.stringify(activityLines));
    Logger.log('Number of activities: ' + activityLines.length);

    // Extract activities into an array, removing the "#X " prefix
    const activities = activityLines.map((line, index) => {
      const cleaned = line.replace(/^#\d+\s+/, '').trim();
      Logger.log(`Activity ${index}: "${line}" -> "${cleaned}"`);
      return cleaned;
    });

    Logger.log('Final activities array: ' + JSON.stringify(activities));

    // STEP 4: Create the row
    Logger.log('--- Creating Row ---');
    const row = [
      new Date(),                        // A: Timestamp
      data['Faith Statement'] || '',     // B: Faith Statement
      data['Battle.net Tag'] || '',      // C: Battle Tag
      data['Discord Username'] || '',    // D: Discord Username
      data['Character Name'] || '',      // E: Character Name
      data['Class'] || '',               // F: Class
      data['Primary Spec'] || '',        // G: Primary Spec
      data['Secondary Spec'] || 'None',  // H: Secondary Spec
      activities[0] || '',               // I: Activity 1
      activities[1] || '',               // J: Activity 2
      activities[2] || '',               // K: Activity 3
      activities[3] || '',               // L: Activity 4
      activities[4] || '',               // M: Activity 5
      'pending',                         // N: Status (default: pending)
      false                              // O: Has been Invited to Discord (default: false)
    ];

    Logger.log('Row to append: ' + JSON.stringify(row));
    Logger.log('Row length: ' + row.length);

    // STEP 5: Insert row at the next position (not using appendRow which looks for empty rows)
    Logger.log('--- Inserting Row ---');
    const nextRow = lastRowBefore + 1;
    Logger.log('Inserting at row: ' + nextRow);

    // Insert the row at the specific position
    sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);

    // Force flush to ensure the change is committed
    SpreadsheetApp.flush();
    Logger.log('SpreadsheetApp.flush() called');

    // STEP 6: Verify the row was added
    Logger.log('--- Verification ---');
    const lastRowAfter = sheet.getLastRow();
    Logger.log('Rows in sheet after insert: ' + lastRowAfter);
    Logger.log('Row difference: ' + (lastRowAfter - lastRowBefore));

    if (lastRowAfter > lastRowBefore) {
      Logger.log('SUCCESS: Row was appended!');
    } else {
      Logger.log('WARNING: Row count did not increase');
    }

    // Get the data that was just written
    const lastRowData = sheet.getRange(lastRowAfter, 1, 1, 15).getValues();
    Logger.log('Last row data: ' + JSON.stringify(lastRowData));

    // Return success response
    Logger.log('=== SUCCESS ===');
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      rowNumber: lastRowAfter,
      rowsBefore: lastRowBefore,
      rowsAfter: lastRowAfter,
      sheetName: sheet.getName()
    }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // STEP 7: Error handling
    Logger.log('=== ERROR ===');
    Logger.log('Error type: ' + error.name);
    Logger.log('Error message: ' + error.message);
    Logger.log('Error: ' + error.toString());
    Logger.log('Stack: ' + error.stack);

    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString(),
      message: error.message,
      stack: error.stack
    }))
      .setMimeType(ContentService.MimeType.JSON);
  }
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
1. Check that `GOOGLE_SHEET_SCRIPT_URL` is set correctly in Vercel environment variables
2. **View Apps Script Logs**:
   - Open your Google Sheet
   - Go to **Extensions** → **Apps Script**
   - Click **Executions** tab (left sidebar) to see recent runs
   - Click on a failed execution to see detailed error logs
   - Look for the detailed debug logs that show:
     - Whether the POST request was received
     - Exact field values being parsed
     - How activities are being split and cleaned
     - Whether the row was appended successfully
3. **Check the logs for:**
   - `Raw payload:` - Does it contain your form data?
   - `Activity Priorities (raw):` - What does this field look like? Is it newline-separated?
   - `Activity lines after split:` - How many activities were found?
   - `Row to append:` - Does this have all the right data?
   - `Row appended successfully!` - Did this line appear?
4. Verify the sheet has the correct column headers (A-O as specified)

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
