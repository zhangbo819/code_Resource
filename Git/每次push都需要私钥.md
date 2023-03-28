# 每次 push 都需要私钥

```sh
eval `ssh-agent` 
ssh-add
```

## mac

```sh
ssh-add ~/.ssh/id_rsa 
```

## 永久保存 (Mac 保存至 keychain)

```sh
ssh-add -K
```
