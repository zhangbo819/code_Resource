# 按文件夹设置git信息

1. 编辑~下的 ```~/.gitconfig```
```sh
vim ~/.gitconfig
```
2. 在最后加入 `includeIf` 设置

```txt
[includeIf "gitdir:~/WEB/"]
    path = ~/WEB/.gitconfig-WEB
```

3. 在对应目录下创建 ~/WEB/.gitconfig-WEB 文件
```sh
vim ~/WEB/.gitconfig-WEB
```

```txt
[user]
	name=xxx
	email=xxx.com
```

4. 最后查看是否成功

```sh
git config --show-origin --get user.email
```

参考链接

[Git 根据目录文件夹配置用户名和邮箱](https://liubing.me/article/git/git-config-width-directory.html#includeif)