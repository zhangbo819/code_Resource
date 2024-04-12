# Node

## Nvm

### 在 M1/M2 上安装低版本 node 如 14 版本报错问题解决

原因是低版本的 Node 并不是基于 arm64 架构的，所以不适配 M1/M2 芯片。

解决方案

- 让 shell 运行在 Rosetta2 下

```sh
arch -x86_64 zsh
```

- 执行后可能会出现 nvm 命令没有的情况，这时候再执行一次

```sh
source .bash_profile
```

- 然后再执行后面的命令就可以了
  
```sh
nvm install v14.21.3
nvm use v14.21.3
```