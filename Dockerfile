# Usa una imagen oficial de Node.js
FROM node:18

# Instalar Tesseract OCR manualmente
RUN apt-get update && apt-get install -y tesseract-ocr

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos de la aplicación
COPY package.json ./
RUN npm install

COPY . .

# Exponer el puerto de la API
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["node", "server.js"]
