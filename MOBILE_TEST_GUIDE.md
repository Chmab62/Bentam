# 📱 BENTAM BUTCHERY - Mobile Testing Guide

## Quick Start

### Option 1: Using the Batch File (Easiest for Windows)
1. Double-click `START_SERVER.bat` in the Bentam Butchery folder
2. A terminal will open with your local IP address
3. Copy the URL and use it on your mobile phone

### Option 2: Manual Command Line

**Requirements:**
- Node.js installed on your computer ([Download here](https://nodejs.org/))

**Steps:**
1. Open Command Prompt (Win + R, type `cmd`, press Enter)
2. Navigate to this folder:
   ```
   cd c:\Bentam Butchery
   ```
3. Start the server:
   ```
   npx http-server -p 8000
   ```

### Option 3: Using Python
1. Open Command Prompt
2. Navigate to folder:
   ```
   cd c:\Bentam Butchery
   ```
3. Run:
   ```
   python -m http.server 8000
   ```

## Testing on Mobile Phone

### Step 1: Find Your Computer's IP Address
Open Command Prompt and run:
```
ipconfig
```
Look for "IPv4 Address" (usually looks like: 192.168.x.x)

### Step 2: Access Website on Mobile
On your mobile phone browser, enter:
```
http://YOUR_IP_ADDRESS:8000/index%20(2).html
```

Example:
```
http://192.168.1.100:8000/index%20(2).html
```

### Step 3: Generate QR Code
Once on the website (desktop or mobile), click the **"📱 Access on Mobile"** button to:
- View a QR code other devices can scan
- Copy the URL to clipboard
- Share with others

## If Server Doesn't Start

### Problem: "http-server not found"
**Solution:** Install globally first:
```
npm install -g http-server
```

### Problem: Port 8000 in use
**Solution:** Use a different port:
```
npx http-server -p 3000
```
Then visit: `http://YOUR_IP:3000/index%20(2).html`

### Problem: Can't connect from mobile
**Solution:** 
1. Make sure mobile and computer are on same WiFi network
2. Check firewall isn't blocking port 8000
3. Try `ipconfig` and use the exact IP shown

## Features on Mobile

✅ Fully responsive design  
✅ Large touch-friendly buttons  
✅ Form validation  
✅ M-Pesa payment integration (simulated)  
✅ Delivery countdown timer  

## Useful URLs

- **Home:** `http://192.168.x.x:8000/index%20(2).html`
- **Auto-refresh:** Add `?v=1` to bypass cache: `http://192.168.x.x:8000/index%20(2).html?v=1`

## Tips

- If you modify the HTML file, refresh mobile browser (F5 or pull down and refresh)
- For faster testing, keep terminal window visible to see any errors
- Share the QR code with others to test on their phones

---

**Need Help?** Check browser console (F12) for any JavaScript errors.
