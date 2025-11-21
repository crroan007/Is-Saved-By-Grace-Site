import nodemailer from 'nodemailer';

export default async function handler(req: any, res: any) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Validate Gmail configuration
    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailAppPassword) {
        console.error('Gmail credentials not configured');
        return res.status(500).json({ error: 'Email service not configured' });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: gmailUser,
            pass: gmailAppPassword,
        },
    });

    const targetEmail = process.env.ADMIN_EMAIL || 'crroan001@gmail.com';
    const googleSheetUrl = process.env.GOOGLE_SHEET_SCRIPT_URL;

    try {
        // Build email content from form data
        const formData = req.body;
        const emailContent = Object.entries(formData)
            .filter(([key]) => !key.startsWith('_'))
            .map(([key, value]) => `<strong>${key}:</strong> ${value}`)
            .join('<br />\n');

        // Send email via Nodemailer
        let info;
        try {
            info = await transporter.sendMail({
                from: `"Is Saved By Grace" <${gmailUser}>`,
                to: targetEmail,
                subject: formData._subject || 'New Guild Application',
                html: `
                    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                        <h2 style="color: #0074e0;">New Guild Application</h2>
                        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
                            ${emailContent}
                        </div>
                        <p style="margin-top: 20px; font-size: 12px; color: #666;">
                            This is an automated email from the Is Saved By Grace guild website.
                        </p>
                    </div>
                `,
            });
            console.log('Message sent: %s', info.messageId);
        } catch (emailError: any) {
            console.error('Email sending failed:', emailError.message || emailError);
            throw new Error(`Email service error: ${emailError.message || 'Unknown error'}`);
        }

        // Send to Google Sheets if configured
        if (googleSheetUrl) {
            try {
                console.log('Sending to Google Sheets:', googleSheetUrl);
                console.log('Form data:', JSON.stringify(formData));

                const sheetResponse = await fetch(googleSheetUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });

                const responseText = await sheetResponse.text();
                console.log(`Google Sheets response status: ${sheetResponse.status}`);
                console.log(`Google Sheets response body: ${responseText}`);

                if (!sheetResponse.ok) {
                    console.error(`Google Sheets error - Status: ${sheetResponse.status}, Body: ${responseText}`);
                } else {
                    console.log('Successfully logged to Google Sheet');
                }
            } catch (sheetError: any) {
                console.error('Failed to call Google Sheets webhook:', sheetError.message || sheetError);
                console.error('Full error:', sheetError);
                // Don't fail the request if logging fails, just log the error
            }
        } else {
            console.log('Google Sheets URL not configured');
        }

        return res.status(200).json({ success: true, id: info.messageId });
    } catch (error: any) {
        console.error('Server Error:', error.message || error);
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
}
