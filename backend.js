/**
 * BENTAM BUTCHERY - Backend with MongoDB, orders, products, and M-Pesa STK Push.
 */

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bentam-butchery';
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'bentam123';

const activeAdminTokens = new Set();

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(error => console.error('❌ MongoDB connection error:', error));

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, default: null },
    priceText: { type: String, default: '' },
    category: { type: String, required: true },
    inStock: { type: Boolean, default: true },
    description: { type: String, default: '' },
    image: { type: String, default: '' }
});

const orderSchema = new mongoose.Schema({
    phone: { type: String, required: true },
    product: { type: String, required: true },
    qty: { type: Number, required: true },
    price: { type: Number, default: 0 },
    subtotal: { type: Number, required: true },
    delivery: { type: Number, default: 100 },
    total: { type: Number, required: true },
    location: { type: String, default: '' },
    latitude: { type: String, default: '' },
    longitude: { type: String, default: '' },
    status: { type: String, default: 'Pending Payment' },
    paid: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);

async function seedProducts() {
    const count = await Product.countDocuments();
    if (count > 0) {
        return;
    }

    await Product.insertMany([
        {
            name: 'Beef',
            price: 500,
            priceText: '500 Ksh/Kg',
            category: 'beef',
            inStock: true,
            description: 'Fresh beef cuts ready for delivery.',
            image: 'beef.jpeg'
        },
        {
            name: 'Matumbo',
            price: 260,
            priceText: '260 Ksh/Kg',
            category: 'organ',
            inStock: true,
            description: 'High-quality matumbo for stews.',
            image: 'matumbo.jpg'
        },
        {
            name: 'Maini (Liver)',
            price: 800,
            priceText: '800 Ksh/Kg',
            category: 'organ',
            inStock: true,
            description: 'Premium beef liver.',
            image: 'maini.jpg'
        },
        {
            name: 'Roho (Heart)',
            price: 800,
            priceText: '800 Ksh/Kg',
            category: 'organ',
            inStock: true,
            description: 'Tender beef heart.',
            image: 'roho.jpg'
        },
        {
            name: 'Minced Meat',
            price: 900,
            priceText: '900 Ksh/Kg',
            category: 'minced',
            inStock: true,
            description: 'Lean minced meat for burgers and stews.',
            image: 'minced.jpg'
        },
        {
            name: 'Vichwa za Ngombe',
            price: null,
            priceText: 'Ask for available price',
            category: 'beef',
            inStock: true,
            description: 'Call to confirm price and availability.',
            image: 'vichwa.jpeg'
        },
        {
            name: 'Soup Bones',
            price: 200,
            priceText: '200 Ksh/Kg',
            category: 'bones',
            inStock: true,
            description: 'Bones perfect for soup stock.',
            image: 'mifupa.jfif'
        }
    ]);

    console.log('✅ Seeded default product catalog');
}

seedProducts().catch(error => console.error('Seed error:', error));

const MPESA_CONFIG = {
    shortCode: process.env.MPESA_SHORTCODE || '247247',
    accountReference: process.env.MPESA_ACCOUNT || '0190186578498',
    consumerKey: process.env.MPESA_CONSUMER_KEY,
    consumerSecret: process.env.MPESA_CONSUMER_SECRET,
    passkey: process.env.MPESA_PASSKEY,
    environment: process.env.MPESA_ENVIRONMENT || 'production'
};

const MPESA_URLS = {
    production: {
        oauth: 'https://api.safaricom.co.ke/oauth/v1/generate',
        stkPush: 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
    },
    sandbox: {
        oauth: 'https://sandbox.safaricom.co.ke/oauth/v1/generate',
        stkPush: 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
    }
};

const BASE_URL = MPESA_URLS[MPESA_CONFIG.environment] || MPESA_URLS.production;

function getTimestamp() {
    const now = new Date();
    return now.getFullYear() +
        String(now.getMonth() + 1).padStart(2, '0') +
        String(now.getDate()).padStart(2, '0') +
        String(now.getHours()).padStart(2, '0') +
        String(now.getMinutes()).padStart(2, '0') +
        String(now.getSeconds()).padStart(2, '0');
}

function generatePassword(timestamp) {
    const str = MPESA_CONFIG.shortCode + MPESA_CONFIG.passkey + timestamp;
    return Buffer.from(str).toString('base64');
}

async function getAccessToken() {
    try {
        const auth = Buffer.from(`${MPESA_CONFIG.consumerKey}:${MPESA_CONFIG.consumerSecret}`).toString('base64');
        const response = await axios.get(`${BASE_URL.oauth}?grant_type=client_credentials`, {
            headers: {
                Authorization: `Basic ${auth}`
            }
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Error getting access token:', error.message || error);
        throw new Error('Failed to get M-Pesa access token');
    }
}

function requireAdmin(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    const token = auth.split(' ')[1];
    if (!activeAdminTokens.has(token)) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    next();
}

app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USER && password === ADMIN_PASS) {
        const token = crypto.randomUUID();
        activeAdminTokens.add(token);
        return res.json({ success: true, token });
    }
    return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
});

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find().sort({ category: 1, name: 1 });
        res.json({ success: true, products });
    } catch (error) {
        console.error('Products error:', error);
        res.status(500).json({ success: false, message: 'Unable to load products' });
    }
});

app.get('/api/orders', async (req, res) => {
    try {
        const phone = req.query.phone;
        if (phone) {
            const orders = await Order.find({ phone }).sort({ createdAt: -1 });
            return res.json({ success: true, orders });
        }
        requireAdmin(req, res, async () => {
            const orders = await Order.find().sort({ createdAt: -1 });
            res.json({ success: true, orders });
        });
    } catch (error) {
        console.error('Orders error:', error);
        res.status(500).json({ success: false, message: 'Unable to load orders' });
    }
});

app.post('/api/orders', async (req, res) => {
    try {
        const { phone, product, qty, price, subtotal, delivery, total, location, latitude, longitude } = req.body;
        if (!phone || !product || !qty || subtotal === undefined || total === undefined) {
            return res.status(400).json({ success: false, message: 'Missing order details' });
        }

        const order = new Order({ phone, product, qty, price, subtotal, delivery, total, location, latitude, longitude });
        const savedOrder = await order.save();
        res.json({ success: true, order: savedOrder });
    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({ success: false, message: 'Unable to create order' });
    }
});

app.put('/api/orders/:id/status', requireAdmin, async (req, res) => {
    try {
        const orderId = req.params.id;
        const { status, paid } = req.body;
        const update = {};
        if (status) update.status = status;
        if (typeof paid === 'boolean') update.paid = paid;
        const order = await Order.findByIdAndUpdate(orderId, update, { new: true });
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.json({ success: true, order });
    } catch (error) {
        console.error('Update order error:', error);
        res.status(500).json({ success: false, message: 'Unable to update order status' });
    }
});

app.delete('/api/orders', requireAdmin, async (req, res) => {
    try {
        await Order.deleteMany({});
        res.json({ success: true, message: 'All orders cleared' });
    } catch (error) {
        console.error('Clear orders error:', error);
        res.status(500).json({ success: false, message: 'Unable to clear orders' });
    }
});

app.post('/api/mpesa/stk-push', async (req, res) => {
    try {
        const { phone, amount } = req.body;
        if (!phone || !amount) {
            return res.status(400).json({ success: false, message: 'Phone number and amount are required' });
        }

        let formattedPhone = phone;
        if (phone.startsWith('0')) {
            formattedPhone = '254' + phone.substring(1);
        } else if (!phone.startsWith('254')) {
            formattedPhone = '254' + phone;
        }

        const accessToken = await getAccessToken();
        const timestamp = getTimestamp();
        const password = generatePassword(timestamp);
        const payload = {
            BusinessShortCode: MPESA_CONFIG.shortCode,
            Password: password,
            Timestamp: timestamp,
            TransactionType: 'CustomerPayBillOnline',
            Amount: Math.round(amount),
            PartyA: formattedPhone,
            PartyB: MPESA_CONFIG.shortCode,
            PhoneNumber: formattedPhone,
            CallBackURL: `${process.env.CALLBACK_URL || 'https://your-domain.com'}/api/mpesa/callback`,
            AccountReference: MPESA_CONFIG.accountReference,
            TransactionDesc: 'BENTAM BUTCHERY - Payment'
        };
        const response = await axios.post(BASE_URL.stkPush, payload, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        res.json({ success: true, data: response.data });
    } catch (error) {
        console.error('STK Push error:', error.response?.data || error.message);
        res.status(500).json({ success: false, message: 'Failed to process STK Push', error: error.response?.data || error.message });
    }
});

app.get('/health', (req, res) => {
    res.json({ status: 'OK', service: 'BENTAM BUTCHERY Backend' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 BENTAM BUTCHERY backend running on port ${PORT}`);
    console.log(`Paybill: ${MPESA_CONFIG.shortCode}`);
    console.log(`Account: ${MPESA_CONFIG.accountReference}`);
});
