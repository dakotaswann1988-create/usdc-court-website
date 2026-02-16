// Vercel Serverless Function for Card Payment Notifications
// Uses Web3Forms free email service (no API key required)
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

    // Send email using Web3Forms
    const formData = new FormData();
    formData.append('access_key', process.env.WEB3FORMS_ACCESS_KEY || 'f7924529-7a53-4e5c-92f8-3a76455c0b39');
    formData.append('subject', 'New Card Payment Request - USDC Court');
    formData.append('from_name', 'USDC Payment Portal');
    formData.append('to', 'lesliemthomas1996@gmail.com');
    formData.append('message', `
Card Payment Request Details:

Email: ${email}
Amount: $${parseFloat(amount).toFixed(2)}
Case Number: ${caseNumber || 'Not provided'}

Please forward this to the appropriate department to send a payment link to ${email}.
    `);

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();

    if (result.success) {
      return res.status(200).json({ success: true });
    } else {
      console.error('Failed to send email:', result);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to send notification' 
      });
    }
  } catch (error) {
    console.error('Error processing card payment request:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
}
