# ⚠️ IMPORTANT: Setup Your M-Pesa Credentials

Your website has been significantly improved, but there's **ONE CRITICAL STEP** you need to do manually:

## Create the .env File

**This file is ESSENTIAL for M-Pesa payments to work!**

### Steps:

1. **Open a text editor** (Notepad, VS Code, etc.)
2. **Copy this template**:
```
MPESA_SHORT_CODE=247247
MPESA_ACCOUNT_REF=0190186578498
MPESA_CONSUMER_KEY=paste_your_actual_consumer_key_here
MPESA_CONSUMER_SECRET=paste_your_actual_consumer_secret_here
MPESA_PASSKEY=paste_your_actual_passkey_here
MPESA_ENV=sandbox
PORT=3000
CALLBACK_URL=https://your-actual-domain.com
```

3. **Replace placeholders** with your ACTUAL M-Pesa credentials from Safaricom Daraja
4. **Save as `.env`** in the root folder (same level as backend.js)
5. **Start/restart your Node server**

---

### Where to Get M-Pesa Credentials?

1. Go to: https://developer.safaricom.co.ke/
2. Sign up or log in
3. Create a new app under **Daraja API**
4. Get your:
   - Consumer Key
   - Consumer Secret  
   - STK Push Pass Key

---

## ⚠️ SECURITY WARNING

**NEVER:**
- Share your .env file with anyone
- Commit .env to Git/GitHub
- Post credentials in public places
- Use hardcoded credentials in HTML/JS

**DO:**
- Keep .env file private  
- Add `.env` to `.gitignore` if using Git
- Use `.env.example` as reference only

---

## Test the Setup

### In Sandbox Mode (Recommended First):
1. Set `MPESA_ENV=sandbox` in .env
2. Use test phone number: 254708374149
3. Test amount: 1

### Switch to Production:
1. Change `MPESA_ENV=production` in .env
2. Request production approval from Safaricom
3. Your code will automatically use production endpoints

---

## What's Been Improved?

✅ **Security**: API key moved out of code  
✅ **Design**: Better header, product search, promotions  
✅ **Features**: Stock status, testimonials, WhatsApp button  
✅ **Mobile**: Fully responsive layout  
✅ **Trust**: Security badges, verified reviews  

---

**Need Help?** 
- Check IMPROVEMENTS_IMPLEMENTED.md for detailed changes
- Verify .env file syntax (no quotes needed)
- Restart backend.js after creating .env

**Status**: Website ready except for M-Pesa credentials setup 🚀
