# BENTAM BUTCHERY - Quick Reference Card

## 💳 Your Payment Details
```
Paybill Number: 247247
Account Number: 0190186578498
API Key: lgNmonKbMbGnfHVawpfRrbRpmcdiqcidknKBSbh70oQkQtDmRx3/xMbOA4VYegXeDBHLaW+e/CiFU5rqYftiqFMeG7zdyppoSHU0lIlEVkU1xbtGBjIvf0lGa+w7/bv7f/WGh9XDNInktJJaUYqf9lJqWFQ9Dfr4iIj1dFMZfDndJsBxRtiyhmguvm1/DhPNZQvnbJCh4CWCXKp2CNaBr6rJmwrZyMgBC5i+JmCpWREcE9aA/NCCHrXH8xprpw/vmYoKHksKzHvOW7VpEEraOpfIcXTO8gaPLme8gFqCiYwPO+Mz2zHprkj8TL7fofQOeItLU+le7OZXlEN3rxwvqQ==
```

## 🌐 URLs

### Local Development
- Website: http://192.168.100.15:8000/
- Backend: http://192.168.100.15:3000/
- Health Check: http://192.168.100.15:3000/health

### Getting Your IP Address
```powershell
ipconfig
# Look for "IPv4 Address" (usually 192.168.x.x)
```

## 🚀 Start Commands

### Start Website (File Browser)
1. Navigate to: `c:\Bentam Butchery\index (2).html`
2. Double-click to open in browser

### Start Backend Server
1. Double-click: `c:\Bentam Butchery\START_BACKEND.bat`
2. Wait for: "Backend running on port 3000"
3. Keep window open while testing

### Start Website Server (Manual)
```powershell
cd "c:\Bentam Butchery"
npx http-server -p 8000 -c-1
```

## 🧪 Testing M-Pesa

### Safaricom Sandbox
- Portal: https://developer.safaricom.co.ke/
- Test Credentials Available
- No real money charged

### Test Phone Numbers (Sandbox)
```
254708374149
254710000001
254720000001
254730000001
```

### Test Payment Amount
```
Amount: 1 KSH (check if connection works)
Amount: 100 KSH (test full flow)
Amount: 1000 KSH (test larger amount)
```

## 📁 Important Files

| File | Purpose |
|------|---------|
| `index (2).html` | Main website |
| `backend.js` | M-Pesa server |
| `.env` | Your credentials (SECRET!) |
| `package.json` | Dependencies |
| `MPESA_SETUP.md` | Detailed guide |
| `START_BACKEND.bat` | Start backend easily |

## 🔧 Configuration

### Update `.env` File
```env
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_PASSKEY=your_passkey_from_safaricom
CALLBACK_URL=https://your-domain.com
PORT=3000
```

### Update Backend URL (if needed)
In `index (2).html`, find this line:
```javascript
fetch('https://your-backend-api.com/api/mpesa/stk-push', {
```

Change to your actual server:
```javascript
fetch('http://192.168.100.15:3000/api/mpesa/stk-push', {
```

## 📱 Products & Prices
```
Beef: 500 Ksh/Kg
Matumbo: 260 Ksh/Kg  
Maini: 800 Ksh/Kg
Roho: 800 Ksh/Kg
Minced Meat: 900 Ksh/Kg
Vichwa: 500 Ksh/Kg

Delivery Fee (Embu Town): 100 Ksh
Outside Embu: FREE
```

## 🆘 Quick Troubleshooting

**Website won't load:**
```powershell
# Check if website server is running
# Try: http://localhost:8000/index%20(2).html
```

**Payment not sending:**
```powershell
# Check backend is running on port 3000
# Check .env has correct credentials
# Check browser console (F12) for errors
```

**Backend crashes:**
```powershell
# Check .env file syntax
# Run: npm install
# Restart: START_BACKEND.bat
```

## 📊 Monitor Payments

### Check in Real-Time
1. Open your M-Pesa app
2. Look for "Paybill: 247247"
3. Check balance of account: 0190186578498

### Check Payment History
```
M-Pesa App > My Account > Statements
Look for: "Paybill deposit 247247"
```

### Safaricom Portal
- Dashboard: https://www.safaricom.co.ke/business/mpesa
- See all transactions
- Download reports

## 🎯 Success Checklist

- [ ] Website opens in browser
- [ ] All products show with prices
- [ ] Phone number validation works
- [ ] Can place order in form
- [ ] Order confirmation modal appears
- [ ] M-Pesa prompt sent to test number
- [ ] Payments appear in your account
- [ ] Backend logs show transaction

## 💡 Tips

✅ Always keep backend running while testing  
✅ Use test numbers from Safaricom first  
✅ Check `.env` file after editing backend.js  
✅ Clear browser cache if changes don't show (Ctrl+Shift+Del)  
✅ Keep terminal window visible to see errors  
✅ Save your M-Pesa credentials somewhere safe  

## 📞 Contacts

**Safaricom Support:**
- Website: https://developer.safaricom.co.ke/
- Help: sandbox@safaricom.co.ke
- Phone: +254 722 100 200

**Your Business Contact:**
- Phone: 0794612206
- WhatsApp: https://wa.me/254794612206
- Location: Dallas near Snacks Kona, Embu

---

**Last Updated:** April 12, 2026  
**Status:** ✅ READY FOR TESTING
