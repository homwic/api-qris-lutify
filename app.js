const express = require('express');
const axios = require('axios');
const crc = require('crc');
const app = express();
const PORT = process.env.PORT || 3000;

// ================== KONFIGURASI ==================
const defaultQRIS = "00020101021126670016COM.NOBUBANK.WWW01189360050300000879140214210379661725380303UMI51440014ID.CO.QRIS.WWW0215ID20253865385780303UMI5204541153033605802ID5922LUTIFY STORE OK23176316006BEKASI61051711162070703A0163041FF9";
const defaultAmount = 10000;
const qrSize = 300;
const qrMargin = 1;
const qrECC = 'L';

// ================== ENDPOINT ==================
app.get('/qris', async (req, res) => {
    try {
        let amount = parseInt(req.query.amount) || defaultAmount;
        if (amount < 100) throw new Error("Nominal minimal Rp100");
        if (amount > 500000) throw new Error("Nominal maksimal Rp500.000");

        // Generate QRIS string dinamis
        let base = defaultQRIS.slice(0, -8).replace("010211", "010212");
        const amountStr = amount.toString();
        const tag54 = "54" + amountStr.length.toString().padStart(2, '0') + amountStr;

        const parts = base.split("5802ID");
        if (parts.length !== 2) throw new Error("Format QRIS tidak valid");

        let qrisStr = parts[0] + tag54 + "5802ID" + parts[1];
        qrisStr += "6304" + calculateCRC(qrisStr + "6304");

        // Generate QR Image via API
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrisStr)}&margin=${qrMargin}&ecc=${qrECC}`;
        const response = await axios.get(qrUrl, { responseType: 'arraybuffer', timeout: 5000 });

        // Kirim gambar langsung sebagai response
        res.setHeader('Content-Type', 'image/png');
        res.send(response.data);

    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message,
            usage: 'Gunakan: /qris?amount=NOMINAL (contoh: ?amount=5000)',
            parameters: {
                min_amount: 100,
                max_amount: 500000,
                default_size: qrSize
            }
        });
    }
});

// ================== FUNGSI CRC ==================
function calculateCRC(data) {
    const buffer = Buffer.from(data, 'utf-8');
    return crc.crc16ccitt(buffer).toString(16).toUpperCase().padStart(4, '0');
}

// ================== START SERVER ==================
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
