
## Native module cannot be null

错误场景：外部Xcode导入 reactNative.而不是运行 react自带的 ios 项目
错误描述：当引入react-navigation并将其作为出口register 的时候会报错：Native module cannot be null
错误原因：react-navigation会生成一个原生的RCTLinkingIOS库，外部引用的需要手动导入，内部的自动链接
解决方法：在 podfile 中加入：RCTLinkingIOS

```
pod 'React', :path => '../../MathsGameRN/node_modules/react-native', :subspecs => [
'Core',
'RCTActionSheet',
'RCTGeolocation',
'RCTImage',
'RCTNetwork',
'RCTPushNotification',
'RCTSettings',
'RCTText',
'RCTVibration',
'RCTWebSocket',
'CxxBridge',
'RCTLinkingIOS'
]
```

然后需要安装CocoaPods，安装后执行 pod install 即可



## 参考链接
- (错误描述)[https://www.jianshu.com/p/ed698a95a086]
- (安装CocoaPods)[https://www.jianshu.com/p/f43b5964f582]