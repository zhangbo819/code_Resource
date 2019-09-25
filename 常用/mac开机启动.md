## [原链接](https://www.zhihu.com/question/28268529)

## Mac上有些软件无法禁止开机启动怎么办？在“登陆项”里面没有它的选项，无法删去，比如Junos Pulse。

### macOS 系统的启动项会以 .plist 的文件存在于以下目录中：

- /Library/LaunchDaemons：系统启动时运行，用户不登录也会运行。
- /Library/LaunchAgents：用户登录后运行。
- ~/Library/LaunchAgents：用户自定义的用户启动项
- /System/Library/LaunchDaemons：系统自带的启动项
- /System/Library/LaunchAgents：系统自带的启动项

### 每个 .plist 文件中，有 3 个属性控制着是否会开机自动启动。
- KeepAlive：决定程序是否需要一直运行，如果是 false 则需要时才启动。默认 false
- RunAtLoad：开机时是否运行。默认 false。
- SuccessfulExit：此项为 true 时，程序正常退出时重启（即退出码为 0）；为 false 时，程序非正常退出时重启。此项设置时会隐含默认 RunAtLoad = true，因为程序需要至少运行一次才能获得退出状态。

### 所以其实针对这三项，不同的值有不同的表现：
```
1. 找到对应程序的 .plist 文件 
2. 删除 SuccessfulExit 属性。
3. 将 RunAtLoad / KeepAlive 均设为 <false/>
```


## 开机自动启动sh
- [http://makaiqian.com/setting-boot/](http://makaiqian.com/setting-boot/)
- [示例](./start.sh)
