# 说下 flex: 1 代表什么意思

## flex: 1

flex: flex-grow, flex-shrink 和 flex-basis 的简写

默认值:

```css
.a {
  flex: 0 1 auto
}
```

flex: 1

```css
.a {
  flex: 1 1 0%
}
```

## flex-grow: 定义项目的放大比例

```css

.item {
    flex-grow: <number>;
}

```

默认值为 0，即如果存在剩余空间，也不放大

<img src="https://pic4.zhimg.com/80/v2-5f7898c1f51fa7274a2c0b4a9dfd88c3_1440w.jpg">

当所有的项目都以 flex-basis 的值进行排列后，仍有剩余空间，那么这时候 flex-grow 就会发挥作用了。

- 如果所有项目的 flex-grow 属性都为 1，则它们将等分剩余空间。(如果有的话)
- 如果一个项目的 flex-grow 属性为 2，其他项目都为 1，则前者占据的剩余空间将比其他项多一倍。

当然如果当所有项目以 flex-basis 的值排列完后发现空间不够了，且 flex-wrap：nowrap 时，此时 flex-grow 则不起作用了，这时候就需要接下来的这个属性。

## flex-shrink: 定义了项目的缩小比例

```css

.item {
    flex-shrink: <number>;
}

```

默认值: 1，即如果空间不足，该项目将缩小，负值对该属性无效。

- 如果所有项目的 flex-shrink 属性都为 1，当空间不足时，都将等比例缩小。
- 如果一个项目的 flex-shrink 属性为 0，其他项目都为 1，则空间不足时，前者不缩小。

## flex-basis: 定义了在分配多余空间之前，项目占据的主轴空间，浏览器根据这个属性，计算主轴是否有多余空间

```css

.item {
    flex-basis: <length> | auto;
}

```

默认值：auto，即项目本来的大小, 这时候 item 的宽高取决于 width 或 height 的值。

当主轴为水平方向的时候，当设置了 flex-basis，项目的宽度设置值会失效，flex-basis 需要跟 flex-grow 和 flex-shrink 配合使用才能发挥效果。

- 当 flex-basis 值为 0 % 时，是把该项目视为零尺寸的，故即使声明该尺寸为 140px，也并没有什么用。
- 当 flex-basis 值为 auto 时，则跟根据尺寸的设定值(假如为 100px)，则这 100px 不会纳入剩余空间。

## 参考资料

[外链 - 30 分钟学会 Flex 布局](https://zhuanlan.zhihu.com/p/25303493)
