const express = require('express');
const Tesseract = require('tesseract.js');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(bodyParser.json()); // 🔹 Agrega esta línea
app.use(cors());

app.post('/ocr', async (req, res) => {
    const { imageUrl } = req.body;

    if (!imageUrl) {
        return res.status(400).json({ error: "Falta la URL de la imagen" });
    }

    try {
        const { data: { text } } = await Tesseract.recognize(imageUrl, 'spa');
        res.json({ text });
    } catch (error) {
        res.status(500).json({ error: "Error en el procesamiento de OCR", details: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor OCR corriendo en el puerto ${PORT}`));
