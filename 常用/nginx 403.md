# nginx 访问文件 403

### 权限问题
    如果 nginx 没有 web 目录的操作权限，也会出现 403 错误。
    
### 解决

```sh
chmod -R 777 [/Users/zzb/work/...](目标文件)

chmod -R 777 /Users/zzb/work/txbstyle/RN_chinese/ReactNative/sheet/audio

chmod -R 777 /Users/zzb/work/txbstyle/assets/common

chmod -R 777 /Users/zzb/work/RN语文资料

```