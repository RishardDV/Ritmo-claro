# 1. Usa una imagen base ligera y oficial de Node.js
FROM node:18-alpine

# 2. Define el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# 3. Copia SOLO los archivos de dependencias primero (aprovecha la caché de Docker)
COPY package.json package-lock.json ./

# 4. Instalación reproducible (exactamente lo que hay en el lockfile)
RUN npm ci

# 5. Copia la carpeta de Prisma y genera el cliente antes del código fuente
COPY prisma ./prisma/
RUN npx prisma generate

# 6. Copia el resto del código del proyecto
COPY . .

# 7. Compila la aplicación NestJS
RUN npm run build

# 8. Expone el puerto que usará tu API
EXPOSE 3000

# 9. Comando de arranque: Aplica migraciones de producción y luego inicia la app
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main.js"]
