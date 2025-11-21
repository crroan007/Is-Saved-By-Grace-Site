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
4. Add column headers in the first row. **These can be in ANY order** - the script finds them by name:
   ```
   Required Headers (can be in any column, any order):
   - Timestamp
   - Faith Statement
   - Battle Tag
   - Discord Username
   - Character Name
   - Class
   - Primary Spec
   - Secondary Spec
   - Activity 1
   - Activity 2
   - Activity 3
   - Activity 4
   - Activity 5
   - Status
   - Has been Invited to Discord
   ```

   Example arrangement (you can rearrange freely):
   ```
   Timestamp | Faith Statement | Status | Has been Invited to Discord | Battle Tag | Discord Username | Character Name | Class | Primary Spec | Secondary Spec | Activity 1 | Activity 2 | Activity 3 | Activity 4 | Activity 5
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

    // STEP 0: Get the spreadsheet and sheet
    Logger.log('--- Getting Sheet Reference ---');
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();
    Logger.log('Sheet name: ' + sheet.getName());

    // STEP 1: Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    Logger.log('Parsed data keys: ' + Object.keys(data).join(', '));

    // STEP 2: Get header row and build a column mapping (case-insensitive)
    Logger.log('--- Building Column Map ---');
    const headerRow = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const columnMap = {};

    for (let i = 0; i < headerRow.length; i++) {
      const headerName = String(headerRow[i]).trim().toLowerCase();
      columnMap[headerName] = i + 1; // Column numbers are 1-indexed
      Logger.log(`Column ${i + 1}: "${headerRow[i]}" (key: "${headerName}")`);
    }
    Logger.log('Column map created: ' + JSON.stringify(columnMap));

    // STEP 3: Helper function to get value by column header name
    const getValue = (fieldName, defaultValue = '') => {
      const value = data[fieldName] !== undefined ? data[fieldName] : defaultValue;
      return value;
    };

    // STEP 4: Parse activity priorities
    const activitiesText = getValue('Activity Priorities', '');
    Logger.log('Activities text: "' + activitiesText + '"');

    const activityLines = activitiesText.split('\n').filter(line => line.trim());
    const activities = activityLines.map((line, index) => {
      const cleaned = line.replace(/^#\d+\s+/, '').trim();
      return cleaned;
    });
    Logger.log('Final activities array: ' + JSON.stringify(activities));

    // STEP 5: Build the row dynamically based on column headers
    Logger.log('--- Building Dynamic Row ---');
    const lastRowBefore = sheet.getLastRow();
    const nextRow = lastRowBefore + 1;
    const newRowData = {};

    // Map data to columns based on header names
    newRowData['timestamp'] = new Date();
    newRowData['faith statement'] = getValue('Faith Statement', '');
    newRowData['battle tag'] = getValue('Battle.net Tag', '');
    newRowData['discord username'] = getValue('Discord Username', '');
    newRowData['character name'] = getValue('Character Name', '');
    newRowData['class'] = getValue('Class', '');
    newRowData['primary spec'] = getValue('Primary Spec', '');
    newRowData['secondary spec'] = getValue('Secondary Spec', 'None');
    newRowData['activity 1'] = activities[0] || '';
    newRowData['activity 2'] = activities[1] || '';
    newRowData['activity 3'] = activities[2] || '';
    newRowData['activity 4'] = activities[3] || '';
    newRowData['activity 5'] = activities[4] || '';
    newRowData['status'] = 'pending';
    newRowData['has been invited to discord'] = false;

    // Create object mapping column positions to values
    const rowValues = {};
    for (const [headerKey, columnNum] of Object.entries(columnMap)) {
      const matchingKey = Object.keys(newRowData).find(k => k.toLowerCase() === headerKey);
      if (matchingKey) {
        rowValues[columnNum] = newRowData[matchingKey];
        Logger.log(`Mapping column ${columnNum} ("${headerKey}") <- "${matchingKey}": ${newRowData[matchingKey]}`);
      }
    }

    // STEP 6: Insert the row using column positions
    Logger.log('--- Inserting Row at row ' + nextRow + ' ---');
    const range = sheet.getRange(nextRow, 1, 1, sheet.getLastColumn());
    const rowArray = [];
    for (let col = 1; col <= sheet.getLastColumn(); col++) {
      rowArray.push(rowValues[col] !== undefined ? rowValues[col] : '');
    }
    range.setValues([rowArray]);

    // Force flush to ensure the change is committed
    SpreadsheetApp.flush();
    Logger.log('Data inserted successfully');

    // Return success response
    Logger.log('=== SUCCESS ===');
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      rowNumber: nextRow,
      columnCount: sheet.getLastColumn()
    }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Error handling
    Logger.log('=== ERROR ===');
    Logger.log('Error: ' + error.toString());
    Logger.log('Stack: ' + error.stack);

    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString(),
      message: error.message
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
     - Column mapping (how headers are matched)
     - Whether the row was appended successfully
3. **Check the logs for:**
   - `Raw payload:` - Does it contain your form data?
   - `Building Column Map` - This shows what headers were detected
   - `Mapping column X` - Shows how each header was matched to a column
   - `Data inserted successfully` - Confirms the row was added
4. **Verify column headers**:
   - The script finds columns by header name (case-insensitive)
   - Make sure your headers match the required names (see Step 1)
   - Headers can be in ANY order - no need to match specific columns
   - Common mistakes: extra spaces in headers, different capitalization

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

### Request Flow
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

### Smart Column Mapping
The Google Apps Script uses **intelligent column header matching**:

1. **Reads the first row** of your sheet to find all column headers
2. **Builds a map** of header names → column positions (case-insensitive)
3. **Matches incoming data** to columns by header name, not position
4. **Inserts data** into the correct columns regardless of order

This means:
- ✅ You can reorder columns anytime without breaking the script
- ✅ You can add new columns - they're ignored if not in the data
- ✅ Headers are case-insensitive ("Activity 1" = "activity 1" = "ACTIVITY 1")
- ✅ Extra spaces in headers are trimmed automatically
- ✅ No need to update the script when you rearrange columns

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
