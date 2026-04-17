# mac手动清理储存空间

## 命令

简单版

```sh
du -d 1 -h

```

升级版

```sh
sudo du -h -d 1 /System/Volumes/Data | sort -hr | head -20
```

常见的 Caches，可直接删

```sh
sudo rm -rf /Library/Caches/*
```

ios 模拟器，删了可以用的时候再下

```sh
sudo rm -rf /Library/Developer/CoreSimulator
```

## 参考

[Mac系统清理、占用空间大、空间不够、查看系统文件大小分布](https://www.cnblogs.com/yajunLi/p/7008578.html)
