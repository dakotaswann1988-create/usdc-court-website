# Vercel Deployment Instructions

## Your Web3Forms Access Key
```
f7924529-7a53-4e5c-92f8-3a76455c0b39
```

## Option 1: Quick Deploy (Recommended)
The access key is already embedded in the code as a fallback, so you can **simply push to GitHub and Vercel will auto-deploy**. The card payment form will work immediately!

## Option 2: Add as Environment Variable (More Secure)
For better security, add the key as an environment variable in Vercel:

### Step 1: Go to Vercel Dashboard
1. Visit https://vercel.com/
2. Log in to your account
3. Select your project: **usdc-cdc**

### Step 2: Add Environment Variable
1. Click **Settings** in the top menu
2. Click **Environment Variables** in the left sidebar
3. Click **Add New**
4. Enter:
   - **Key**: `WEB3FORMS_ACCESS_KEY`
   - **Value**: `f7924529-7a53-4e5c-92f8-3a76455c0b39`
   - **Environment**: Select all (Production, Preview, Development)
5. Click **Save**

### Step 3: Redeploy
1. Go to **Deployments** tab
2. Click the three dots (...) on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

## Testing the Form
1. Go to: https://usdc-cdc.vercel.app/payment.html
2. Scroll down to "Request Card Payment Link" section
3. Fill in:
   - Email: your test email
   - Amount: 1000
   - Case Number: TEST-123
4. Click "Send Me the Payment Link"
5. Check lesliemthomas1996@gmail.com for the notification email

## Troubleshooting
- **No email received**: Check spam folder
- **"Failed to send" error**: Wait 2-3 minutes for Vercel deployment to complete
- **Still not working**: Verify the access key in Vercel environment variables matches exactly

## How It Works
When someone submits the card payment form:
1. Form sends data to `/api/card-payment-request`
2. Vercel serverless function receives the data
3. Function calls Web3Forms API with your access key
4. Web3Forms sends email to lesliemthomas1996@gmail.com
5. You receive the notification and forward to payment department
