export default async function handler(req: any, res: any) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Use env var or fallback to the user's email
    const targetEmail = process.env.ADMIN_EMAIL || 'crroan001@gmail.com';
    const formSubmitUrl = `https://formsubmit.co/ajax/${targetEmail}`;

    try {
        // Forward the request body to FormSubmit
        const response = await fetch(formSubmitUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(req.body),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('FormSubmit Error:', errorText);
            return res.status(response.status).json({ error: 'Failed to send email' });
        }

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Server Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
