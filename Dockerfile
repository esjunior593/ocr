# Usa una imagen de Node.js con Tesseract preinstalado
FROM ghcr.io/tesseract-ocr/tesseract4:latest

# Instalar Node.js manualmente
RUN apt-get update && apt-get install -y nodejs npm

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
