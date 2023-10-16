# clientWidth 和 offset

## offsetLeft 和 offsetTop

- 这两个都是只读属性。
- offsetLeft 从字面意思上理解，就是以父元素作为参照点（父元素的定位不能是 static），当前元素相对于父元素左边的偏移量
- offsetTop 就是以父元素为参照物，当前元素相对于父元素上边的偏移量
- 如果没有父元素那么参照点就是 body
- 如果当前定位元素本身是固定定位 (position:fixed;)，返回的是当前元素与可视窗口的距离。

## offsetWidth 和 offsetHeight

这两个也是只读属性

```txt
offsetHeight || offsetWidth = boder + padding + content（不包括margin）
```

## clientWidth 和 clientHeight

只读属性，返回当前节点的**可视宽度**和**可视高度**（不包括边框、外边距）（包括内边距）

```txt
clientHeight = padding + padding + height - scrollbar.height
```

## 参考链接

[外链 - offsetLeft、offsetWidth、clientWidth、scrollWidth、style.width···你都分清了吗？](https://juejin.cn/post/6844904133921619982)