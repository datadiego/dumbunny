# Crunch
## a > zzzz
```bash
crunch 1 4
```
## a > zzzz con salida a archivo
```bash
crunch 1 4 -o salida.txt
```
## gato > pajaro
```bash
crunch 4 5 gato perro pajaro
```
## aaa0 > zzz9
```bash
crunch 4 4 -t @@@%
```
## Combinaciones de 5 numeros
```bash
crunch 5 5 0123456789
```
## Combinaciones de 5 letras
```bash
crunch 5 5 abcdefghijklmnopqrstuvwxyz -o resultado.txt
```
## aaaa > zzzz a un archivo
```bash
crunch 4 4 -o crunch.txt
```
## Limitar tamaño
```bash
crunch 4 4 -b 1M # tamaño máximo de 1MB
```
## Solo numeros
```bash
crunch 4 4 -c 1 # solo números
```
## Solo letras
```bash
crunch 4 4 -d 1 # solo letras
```


