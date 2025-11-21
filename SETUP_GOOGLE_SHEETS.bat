@echo off
REM Guild Applications - Google Sheets Setup Script
REM This script helps you set up Google Sheets integration for guild applications

setlocal enabledelayedexpansion

echo.
echo =====================================================
echo    Is Saved By Grace - Google Sheets Setup
echo =====================================================
echo.

REM Check if user has the sheet URL
set /p SHEET_URL="Enter your Google Sheet URL (press Enter to skip): "

if not "!SHEET_URL!"=="" (
    REM Open the sheet in default browser
    start "" "!SHEET_URL!"
    echo.
    echo Opening your Google Sheet in browser...
    timeout /t 2 /nobreak
)

echo.
echo =====================================================
echo    SETUP INSTRUCTIONS
echo =====================================================
echo.
echo Follow these steps to complete the setup:
echo.
echo 1. OPEN YOUR GOOGLE SHEET
echo    URL: https://docs.google.com/spreadsheets/d/16HNTjmNQkmuDdUhiGL5iEPFee4dTk185d5vzxAWkkqk/edit
echo.
echo 2. VERIFY COLUMN HEADERS
echo    Make sure you have these columns:
echo    - A: Timestamp
echo    - B: Faith Statement
echo    - C: Battle Tag
echo    - D: Discord Username
echo    - E: Character Name
echo    - F: Class
echo    - G: Primary Spec
echo    - H: Secondary Spec
echo    - I: Activity 1
echo    - J: Activity 2
echo    - K: Activity 3
echo    - L: Activity 4
echo    - M: Activity 5
echo    - N: Status (optional - will be added by script)
echo    - O: Has been Invited to Discord (optional - will be added by script)
echo.
echo 3. OPEN APPS SCRIPT
echo    - Click Extensions → Apps Script
echo    - Delete any existing code
echo    - Copy the doPost function from GOOGLE_SHEETS_SETUP.md
echo.
echo 4. SAVE AND DEPLOY
echo    - Save the script (Ctrl+S)
echo    - Click Deploy → New deployment
echo    - Select "Web app"
echo    - Execute as: Your Google Account
echo    - Who has access: Anyone
echo    - Copy the deployment URL
echo.
echo 5. ADD COLUMNS (OPTIONAL - Use this script)
echo    - Go back to Extensions → Apps Script
echo    - Create new function: addMissingColumns()
echo    - Paste the script below
echo    - Click Run
echo.
echo =====================================================
echo    APPS SCRIPT: addMissingColumns()
echo =====================================================
echo.
echo Copy this code into your Apps Script:
echo.
echo function addMissingColumns() {
echo   const sheet = SpreadsheetApp.getActiveSheet();
echo   const range = sheet.getRange("N1:O1");
echo
echo   range.setValues([["Status", "Has been Invited to Discord"]]);
echo   range.setFontWeight("bold");
echo   range.setHorizontalAlignment("center");
echo
echo   const lastRow = sheet.getLastRow();
echo   if (lastRow ^> 1) {
echo     const statusRange = sheet.getRange(`N2:N${lastRow}`);
echo     statusRange.setValue("pending");
echo
echo     const discordRange = sheet.getRange(`O2:O${lastRow}`);
echo     discordRange.setValue(false);
echo   }
echo
echo   sheet.setColumnWidth(14, 120);
echo   sheet.setColumnWidth(15, 220);
echo
echo   const statusValidation = SpreadsheetApp.newDataValidation()
echo     .requireValueInList(["pending", "accepted", "rejected"])
echo     .setAllowInvalid(false)
echo     .build();
echo   sheet.getRange(`N2:N1000`).setDataValidation(statusValidation);
echo
echo   const checkboxValidation = SpreadsheetApp.newDataValidation()
echo     .requireCheckbox()
echo     .build();
echo   sheet.getRange(`O2:O1000`).setDataValidation(checkboxValidation);
echo
echo   Logger.log("Columns added successfully!");
echo }
echo.
echo =====================================================
echo    ENVIRONMENT VARIABLES (Vercel)
echo =====================================================
echo.
echo Set these in your Vercel project settings:
echo.
echo GMAIL_USER = your-email@gmail.com
echo GMAIL_APP_PASSWORD = your-16-char-app-password
echo ADMIN_EMAIL = your-email@gmail.com
echo GOOGLE_SHEET_SCRIPT_URL = your-apps-script-deployment-url
echo.
echo =====================================================
echo    LINKS
echo =====================================================
echo.
echo Google Sheets: https://docs.google.com/spreadsheets/d/16HNTjmNQkmuDdUhiGL5iEPFee4dTk185d5vzxAWkkqk/edit
echo Setup Guide: GOOGLE_SHEETS_SETUP.md
echo Gmail App Password: https://myaccount.google.com/apppasswords
echo.

pause
