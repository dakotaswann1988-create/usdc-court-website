// Vercel Serverless Function for Card Payment Notifications
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, amount, caseNumber } = req.body;

    // Validate input
    if (!email || !amount) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email and amount are required' 
      });
    }

    // Send notification to Manus
    const notificationPayload = {
      title: 'New Card Payment Request',
      content: `Card Payment Request Details:

Email: ${email}
Amount: $${parseFloat(amount).toFixed(2)}
Case Number: ${caseNumber || 'Not provided'}

Please forward this to the appropriate department to send a payment link to ${email}.`
    };

    const response = await fetch(process.env.BUILT_IN_FORGE_API_URL + '/notification/owner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.BUILT_IN_FORGE_API_KEY}`
      },
      body: JSON.stringify(notificationPayload)
    });

    if (!response.ok) {
      console.error('Failed to send notification:', await response.text());
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to send notification' 
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error processing card payment request:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
}
