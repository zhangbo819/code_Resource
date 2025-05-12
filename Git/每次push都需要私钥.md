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

## 对于使用 ssh 时远程库需要设置成 git 而非 https

1. 查看远程仓库信息

```sh
git remote -v
```

2. 删除远程仓库地址

```sh
git remote rm origin
```

3. 添加新仓库地址

```sh
git remote add origin git@github.com:xxxx.git
```