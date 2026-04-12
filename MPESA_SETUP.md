# 🚀 M-Pesa STK Push Integration Setup Guide

## ✅ What's Been Added

Your website now has **real M-Pesa STK Push integration** with:
- ✅ Paybill: **247247**
- ✅ Account: **0190186578498**
- ✅ Automatic payment prompts to customers
- ✅ Payment confirmation callbacks
- ✅ Secure API integration

---

## 📋 Getting Started

### Step 1: Get Safaricom Daraja API Credentials

You need **Consumer Key**, **Consumer Secret**, and **Passkey** from Safaricom.

1. Visit: [Safaricom Daraja Portal](https://developer.safaricom.co.ke/)
2. **Sign up/Login** with your business details
3. Go to **"My Apps"** → Create New App
4. Select **"M-Pesa"** for the API type
5. Copy your:
   - **Consumer Key** ← Need this
   - **Consumer Secret** ← Need this
6. For **Passkey**: 
   - Go to [Safaricom Portal](https://www.safaricom.co.ke/)
   - Download M-Pesa API Passkey (Lipa Na M-Pesa Online)
   - Save it securely

### Step 2: Add Credentials to `.env` File

Open `.env` file in the Bentam Butchery folder and update:

```
MPESA_CONSUMER_KEY=paste_your_consumer_key_here
MPESA_CONSUMER_SECRET=paste_your_consumer_secret_here
MPESA_PASSKEY=paste_your_mpesa_passkey_here
CALLBACK_URL=https://your-website-domain.com
PORT=3000
```

**Example:**
```
MPESA_CONSUMER_KEY=abc123defGHI456jklMNO789
MPESA_CONSUMER_SECRET=xyz987uvwABC654defGHI321
MPESA_PASSKEY=bfb279f9aa9bdbcf158e97dd1a503b35590ace13453398725b4c88d88adec0e
CALLBACK_URL=https://bentambutchery.com
PORT=3000
```

---

## 🔧 Installation (Local Testing)

### Option 1: Using Windows (Recommended for you)

1. **Install Node.js** (if you haven't):
   - Download: [https://nodejs.org/](https://nodejs.org/)
   - Run installer, agree to defaults
   - Restart your computer

2. **Set up the backend**:
   ```bash
   cd "c:\Bentam Butchery"
   npm install
   ```

3. **Start the server**:
   ```bash
   npm start
   ```
   
   You should see:
   ```
   💥 BENTAM BUTCHERY M-Pesa Backend running on port 3000
   Paybill: 247247
   Account: 0190186578498
   ```

### Option 2: Testing on Phone (Same Network)

1. Get your computer IP:
   ```powershell
   ipconfig
   ```
   Look for "IPv4 Address" (e.g., `192.168.100.15`)

2. Update website config:
   - In browser, visit: `http://192.168.100.15:8000/`
   - The backend should be running on: `http://192.168.100.15:3000`

---

## ☁️ Production Deployment

### Using GitHub + Heroku (FREE)

1. **Create GitHub account** (if you don't have one): [https://github.com](https://github.com)

2. **Create Heroku account**: [https://heroku.com](https://heroku.com)

3. **Push code to GitHub**:
   ```bash
   cd "c:\Bentam Butchery"
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/bentam-butchery.git
   git branch -M main
   git push -u origin main
   ```

4. **Deploy to Heroku**:
   - Connect your GitHub repo in Heroku
   - Add `.env` variables in Heroku dashboard
   - Deploy branch

5. **Update website** to use your Heroku URL instead of localhost

---

## 🧪 Testing M-Pesa Integration

### Sandbox Testing (FREE - Recommended First)

1. Use Sandbox credentials from Safaricom
2. Test with sandbox M-Pesa numbers
3. Payments won't be real (no money charged)

### Live Testing

1. Switch to **production** credentials
2. Real M-Pesa prompts will be sent
3. **Money will be charged!** ⚠️

---

## 📊 Payment Flow

```
Customer places order
        ↓
Browser sends payment request
        ↓
Backend gets M-Pesa token
        ↓
STK Push sent to customer phone 📱
        ↓
Customer enters M-Pesa PIN
        ↓
Payment processed
        ↓
Callback received → Order confirmed ✅
```

---

## 🆘 Troubleshooting

### Problem: "npm: command not found"
**Solution:** Install Node.js from [https://nodejs.org/](https://nodejs.org/)

### Problem: "CORS error in browser"
**Solution:** Make sure backend URL in website matches where backend is running

### Problem: "Invalid Credentials"
**Solution:** Double-check Consumer Key/Secret in `.env` file - no extra spaces!

### Problem: "Callback not working"
**Solution:** 
- Make sure your server is accessible from internet
- Update `CALLBACK_URL` in `.env` to your public URL
- Check firewall isn't blocking port 3000

---

## 📞 Support

For M-Pesa API issues:
- Safaricom Support: [https://developer.safaricom.co.ke/docs](https://developer.safaricom.co.ke/docs)
- Email: [sandbox@safaricom.co.ke](mailto:sandbox@safaricom.co.ke)

---

## 💡 Next Steps

1. ✅ Get Safaricom credentials
2. ✅ Update `.env` file
3. ✅ Test in sandbox first
4. ✅ Deploy to production
5. ✅ Your customers can now pay directly! 🎉

**Your payment credentials:**
- Paybill: `247247`
- Account: `0190186578498`
- API Key: Already included in code

---

Last Updated: April 12, 2026
