export default async function handler(req: any, res: any) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Get the Discord Webhook URL from environment variables
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
        console.error('Missing DISCORD_WEBHOOK_URL environment variable');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    try {
        // Forward the request body to Discord
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Discord API Error:', errorText);
            return res.status(response.status).json({ error: 'Failed to send to Discord' });
        }

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Server Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
