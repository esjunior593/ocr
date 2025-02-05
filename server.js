const express = require('express');
const Tesseract = require('tesseract.js');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

async function descargarImagen(imageUrl) {
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error("Error descargando la imagen");

    const buffer = await response.buffer();
    const tempFilePath = path.join(__dirname, 'temp.jpg');
    fs.writeFileSync(tempFilePath, buffer);
    return tempFilePath;
}

app.post('/ocr', async (req, res) => {
    const { imageUrl } = req.body;

    if (!imageUrl) {
        return res.status(400).json({ error: "Falta la URL de la imagen" });
    }

    try {
        // Descargamos la imagen y la guardamos temporalmente
        const imagePath = await descargarImagen(imageUrl);

        // Procesamos la imagen con Tesseract
        const { data: { text } } = await Tesseract.recognize(imagePath, 'spa');

        // Eliminamos la imagen temporal después de procesarla
        fs.unlinkSync(imagePath);

        res.json({ text });
    } catch (error) {
        console.error("Error en OCR:", error);
        res.status(500).json({ error: "Error en el procesamiento de OCR", details: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor OCR corriendo en el puerto ${PORT}`));
