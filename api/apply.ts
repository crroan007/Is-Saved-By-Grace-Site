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
        const info = await transporter.sendMail({
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

        // Send to Google Sheets if configured
        if (googleSheetUrl) {
            try {
                await fetch(googleSheetUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
                console.log('Logged to Google Sheet');
            } catch (sheetError) {
                console.error('Failed to log to Google Sheet:', sheetError);
                // Don't fail the request if logging fails, just log the error
            }
        }

        return res.status(200).json({ success: true, id: info.messageId });
    } catch (error) {
        console.error('Server Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
