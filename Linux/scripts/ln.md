# ln

## 软连接

- 为 a 创建并软连接 b 
  1. 实际以a为主体 a消失b将消失
  2. 一个文件链接多个文件时 链式依赖
  3. 可链接目录
  
- ```sh
  ln -s a b
  ```

## 硬链接

- 将 a 和 b 硬链接
  1. 实际 a 和 b 都是共用同一个文件，删除其中一个不会影响到另一个
  2. 一个文件链接多个文件并有多层级时 相当于偏平化 都是同级

- ```sh
  ln a b
  ```

## 共同点

1. 都不会占用两份空间 只会占用一份空间
2. 一个文件改变都会自动同步到另一个文件
3. 一个可链接多个文件


## [菜鸟教程链接](https://www.runoob.com/linux/linux-comm-ln.html)