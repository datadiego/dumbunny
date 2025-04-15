---
tags: ["nmap", "scan"]
inputs: ["ip","ports"]
---
# Nmap

## Busqueda básica
```bash
nmap -sS -p- <ip>
```
## Escaneo de puertos
```bash
nmap -sS -p <ports> <ip>
```