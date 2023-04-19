# TS 面试题

## class 和 interface

Typescript 中声明 class，实际上，除了会创建一个类之外，同时也会创建一个同名的 interface（同名的 interface 只包含其中的实例属性和实例方法）
所以 class 既可以当作类来使用，也可以当作 interface 来使用。

## 高级类型

- Partial
- Readonly
- Pick
- Record
- Exclude
- Extract
- Omit
- NonNullable

## 泛型

### 定义 Array.prototype.map 的类型

```ts

interface Array<T> {
  map<U>(callbackfn: (value: T, index: number, array: T[]) => U): U[]
}

```