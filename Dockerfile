FROM node:18

# Instalar Tesseract OCR
RUN apt-get update && apt-get install -y tesseract-ocr

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos de la aplicación
COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Exponer puerto
EXPOSE 3000

# Comando de inicio
CMD ["node", "server.js"]
