# SSH
## Conexión SSH
```bash
ssh username@hostname
```
### Especificar puerto
```bash
ssh username@hostname -p port
```
## Claves RSA
```bash
ssh-keygen -t rsa;chmod 600 ~/.ssh/id_rsa;ssh-copy-id username@hostname
```