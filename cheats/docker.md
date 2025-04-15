# Docker
## Instalación
```bash
firefox https://docs.docker.com/engine/install/ubuntu/
```
## Configuracion
```bash
sudo systemctl start docker;sudo systemctl enable docker;sudo usermod -aG docker $USER
```
## Hello World
```bash
sudo docker run hello-world
```
## Crear imagen con Dockerfile
```bash
docker build -t <image-name> .
```
## Ejecutar contenedor
```bash
docker run -d -p 8080:80 <image-name>
```
## Ejecutar comando en contenedor
```bash
docker exec -it <container-id> <command>
```
## Ver logs del contenedor
```bash
docker logs <container-id>
```
## Detalles de contenedor
```bash
docker inspect <container-id>
```
## Obtener IP de contenedor
```bash
docker inspect <container-id> | jq '.[0].NetworkSettings.IPAddress'
```
## Subir a dockerhub
```bash
docker login;docker build -t example-container .;docker tag example-container usuario-docker-hub/example-container;docker push usuario-docker-hub/example-container
```
