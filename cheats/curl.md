---
tags: [curl, rest, api, http]
---
# curl
## get
```bash
curl localhost/usuarios
``` 
## post-minimal
```bash
curl -X POST localhost/usuarios -H "Content-Type: application/json" -H "Accept: application/json" -d "{\"nombre\": \"nombre\", \"pass\": \"pass\"}"
```
## post-multiple
```bash
namepass=$(openssl rand -hex 5)
curl -X POST localhost:3000/usuarios \
-H "Content-Type: application/json" \
-H "Accept: application/json" \
-d "{\"nombre\": \"$namepass\", \"pass\": \"$namepass\"}"
```