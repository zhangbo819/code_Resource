# nginx访问文件 403

### 权限问题
    如果nginx没有web目录的操作权限，也会出现403错误。
### 解决
```sh
chmod -R 777 [/Users/zzb/work/...](目标文件)

chmod -R 777 /Users/zzb/work/txbstyle/RN_chinese/ReactNative/sheet/audio

chmod -R 777 /Users/zzb/work/txbstyle/assets/common

```