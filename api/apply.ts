import { Resend } from 'resend';

export default async function handler(req: any, res: any) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Validate Resend API key is configured
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
        console.error('RESEND_API_KEY environment variable not configured');
        return res.status(500).json({ error: 'Email service not configured' });
    }

    const resend = new Resend(resendApiKey);
    const targetEmail = process.env.ADMIN_EMAIL || 'crroan001@gmail.com';

    try {
        // Build email content from form data
        const formData = req.body;
        const emailContent = Object.entries(formData)
            .filter(([key]) => !key.startsWith('_'))
            .map(([key, value]) => `<strong>${key}:</strong> ${value}`)
            .join('<br />\n');

        // Send email via Resend
        const response = await resend.emails.send({
            from: 'noreply@issavedbygrace.com',
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

        if (response.error) {
            console.error('Resend Error:', response.error);
            return res.status(400).json({ error: response.error.message || 'Failed to send email' });
        }

        return res.status(200).json({ success: true, id: response.data?.id });
    } catch (error) {
        console.error('Server Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
