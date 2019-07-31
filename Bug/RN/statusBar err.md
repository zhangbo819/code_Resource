# RN笔记-报错处理：RCTStatusBarManager module requires that the UIViewControllerBasedStatusBarAppearance key in the Info.plist is set to NO

## rn插件化开发中，可能会遇到如下报错：

```
RCTStatusBarManager module requires that the UIViewControllerBasedStatusBarAppearance key in the Info.plist is set to NO
```

## 报错分析：

设置app的状态栏样式的使用使用了旧的方式，在info.plist里面设置了View controller-based status bar appearance为NO，默认为YES，一般式iOS6的时候使用这种方式，iOS7，8也兼容，但是到了iOS9就报了警告。

## 解决方案：

在info.plist中，add row添加View controller-based status bar appearance并设置为NO即可

[原链接](https://www.jianshu.com/p/2fbc9329bb43)