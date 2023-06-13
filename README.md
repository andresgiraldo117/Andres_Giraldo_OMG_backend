
# Despliegue con Dockerfile
- docker build -t omg/api_node 
- docker run --name nodejs-image-api -p 3001:3001 -d omg/api_node

# Instalacion
- crear archivo .env
- cofigurar variables de entorno
- instalar dependencias (recomiendo yarn) - NODE V16.18.1
- ejecutar npm run start

# Repositorio
- https://github.com/andresgiraldo117/Andres_Giraldo_OMG_backend.git

# Pre-requisitos 📋
Para el correcto funcionamiento de la api se debe crear un archivo .env con los siguientes datos:

.env
- PORT="3001"
- NODE_ENV="production"
- DB="omg"
- DB_USER=""
- DB_PASSWORD=""
- SECRET=""
- APIKEY=""
