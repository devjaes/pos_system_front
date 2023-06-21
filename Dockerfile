# Establecer la imagen base para desarrollo
FROM node:16

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el código fuente
COPY . ./app

# Instalar las dependencias del proyecto
RUN yarn

# Exponer el puerto en el que se ejecuta la aplicación (ajústalo según tus necesidades)
EXPOSE 3000

# Comando para iniciar la aplicación en modo de desarrollo
CMD ["yarn", "dev"]
