---
tags: [dd, disk, backup]
---
# dd
## Copiar a SD
```bash
sudo dd if=some.img of=/dev/sda bs=64M status=progress oflag=sync
```
## Copiar particion vps:
```bash
dd if=/dev/sda bs=64M | gzip -1 - | ssh user@host "cat > backup.img.gz"
```
 