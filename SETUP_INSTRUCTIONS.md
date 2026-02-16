# Setup Instructions for Card Payment Notifications

## Step 1: Get Free Web3Forms API Key

1. Go to https://web3forms.com/
2. Click "Get Started" or "Create Access Key"
3. Enter your email: **lesliemthomas1996@gmail.com**
4. Click "Create Access Key"
5. Copy the access key they send to your email

## Step 2: Add API Key to Vercel

1. Go to your Vercel project: https://vercel.com/
2. Select your project: **usdc-cdc**
3. Go to **Settings** → **Environment Variables**
4. Add a new variable:
   - **Name**: `WEB3FORMS_ACCESS_KEY`
   - **Value**: [paste the key from step 1]
   - **Environment**: Production, Preview, Development (select all)
5. Click **Save**

## Step 3: Update the Code

Replace `YOUR_WEB3FORMS_KEY` in `/api/card-payment-request.js` with:
```javascript
formData.append('access_key', process.env.WEB3FORMS_ACCESS_KEY);
```

## Step 4: Deploy

1. Push changes to GitHub (already done automatically)
2. Vercel will auto-deploy
3. Test the form at: https://usdc-cdc.vercel.app/payment.html

## How It Works

When someone fills out the card payment form:
1. They enter their email, amount, and case number
2. The form sends data to `/api/card-payment-request`
3. The serverless function sends an email to **lesliemthomas1996@gmail.com**
4. You receive the notification and can forward it to the payment department

## Troubleshooting

- **No email received**: Check spam folder
- **API error**: Verify the access key is correct in Vercel environment variables
- **Form not submitting**: Check browser console for errors
