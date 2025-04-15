# Docker
## Instalación
```bash
firefox https://docs.docker.com/engine/install/ubuntu/
```
## Configuracion
```bash
sudo systemctl start docker;sudo systemctl enable docker;sudo usermod -aG docker $USER
```
## Hello World:
```bash
sudo docker run hello-world
```
## Crear imagen con Dockerfile
```bash
docker build -t <image-name> .
```
## Ejecutar contenedor
```bash
docker run -d -p 8080:80 <image-name> # Mapea host:8080 a docker:80
```
## Ejecutar comando en contenedor
```bash
docker exec -it <container-id> /bin/bash
```
## Ver logs del contenedor
```bash
docker logs <container-id>               # Muestra los logs de un contenedor
```
## Detalles de contenedor
```bash
docker inspect <container-id>
```
## Obtener IP de contenedor
```bash
docker inspect <container-id> | jq '.[0].NetworkSettings.IPAddress'
```

```bash
docker pull <image-name> # Descarga una imagen
```

## Contenedores

```bash
docker exec -it <container-id> /bin/bash        # Abrir una terminal en un contenedor en ejecución
docker logs <container-id>                      # Muestra los logs de un contenedor
docker inspect <container-id>                   # Muestra información detallada de un contenedor
docker cp <container-id>:/path/to/file .        # Copia un archivo desde un contenedor a la máquina host
docker cp file.txt <container-id>:/path/to/file # Copia un archivo desde la máquina host a un contenedor
docker inspect -f '{{.NetworkSettings.IPAddress}}' <container-id> # Muestra la IP de un contenedor
docker inspect <container-id> | grep IPAddress  # Muestra la IP de un contenedor
```

## Dockerfile

```Dockerfile
docker build -t <image-name> . # Construye una imagen a partir de un Dockerfile
docker-compose up -d           # Levanta los servicios definidos en el archivo docker-compose.yml en segundo plano
docker-compose down            # Detiene y elimina los servicios definidos en el archivo docker-compose.yml
```

### Sintaxis

```plaintext
FROM      # Establece la imagen base
WORKDIR   # Establece el directorio de trabajo
COPY      # Copia archivos o directorios al contenedor
RUN       # Ejecuta comandos en el contenedor
CMD       # Ejecuta comandos al iniciar el contenedor
EXPOSE    # Expone un puerto del contenedor al host
```

```Dockerfile
FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## Subir a dockerhub

```bash
docker login
docker build -t example-container .
docker tag example-container usuario-docker-hub/example-container
docker push usuario-docker-hub/example-container
```

## Contenedores

```bash
docker run -it --name ubuntu_test ubuntu bash
```
