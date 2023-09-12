##### Event Loop (事件轮询)

> ###### 总结：
>
> 1、JavaScript 是单线程的语言，Chrome 通过引入事件循环机制来处理在线程运行过程中产生的新任务，通过消息队列来处理其他线程发过来的任务，渲染进程通过 IO 线程来接受整理其他进程传进来的信息；
>
> 2、浏览器通过在宏任务中维护一个微任务队列来执行高优先级的任务，通过回调功能来解决单个任务执行	时间过长导致阻塞的问题；
>
> 3、Event Loop就是主线程从消息队列中循环不断的读取事件去执行的过程。

> ###### 事件轮询的执行顺序如下：
>
> 1、首先执行执行栈中的 **同步代码** ，这属于宏任务；
>
> 2、当执行完所有同步代码后， **执行栈为空**， 查询是否有 **异步代码** 需要执行；
>
> 3、之后执行所有 **微任务** ；
>
> 4、当执行完所有微任务后，如有必要会渲染页面；
>
> 5、然后开始下一轮 Event Loop，执行宏任务中的异步代码，也就是 `setTimeout` 中的回调函数

> 在这里很多人会有个误区，认为微任务快于宏任务，其实是错误的。因为宏任务中包括了 `script`，浏览器会先执行一个宏任务，接下来有异步代码的话才会先执行微任务。
>
> 微任务:  `process.nextTick`，`promise`，`MutationObserver`，其中 `process.nextTick` 为 Node.js 独有。
>
> 宏任务:  `<script>`，`setTimeout`，`setInterval`，`setImmediate`，I/O ，`UI rendering`。



##### Promise / async /await

>是否resolve，没有就一直pending不再执行
>
>`.then`函数中的参数期待的是函数，如果不是函数的话会发生透传(类似题`3.8` )







原型、原型链

作用域、作用域链

闭包





##### 浅拷贝、深拷贝

> ##### 深拷贝：
>
> 创建一个 `新对象`, 拷贝对象的所有属性, 如果属性是 `基本数据`, 拷贝的就是 `基本数据` 的值; 如果是 `引用数据`, 则需要重新分配一块内存, 拷贝该 `引用数据` 的所有属性, 然后将 `引用地址` 赋值给对应的属性, 如果该 `引用数据` 中某个属性也是 `引用数据` 则需要继续一层层递归拷贝……
>
> 简单来说: `深拷贝` 就是完整的拷贝了一份一模一样结构的数据, 拷贝后的数据和源数据是没有任何关联的, 修改原数据不会修改到拷贝后的数据
>
> 1. 手写深拷贝
>
>    ```javascript
>    function deepClone(origin, target = {}) {
>          if (typeof origin === "object" && origin !== null) {
>            for (let key in origin) {
>              if (origin.hasOwnProperty(key)) {
>                if (typeof origin[key] === "object") {
>                  target[key] = deepClone(origin[key], Array.isArray(origin[key]) ? [] : {})
>                } else {
>                  target[key] = origin[key]
>                }
>              }
>            }
>          }
>          return target
>        }
>    ```
>
> 2. ###### JSON.parse(JSON.stringify())
>
>    有缺点：
>
>    1. `NaN` `Infinity` `-Infinity` 会被序列化为 `null`
>    2. `Symbol` `undefined` `function` 会被忽略(对应属性会丢失)
>    3. `Date` 将得到的是一个字符串
>    4. 拷贝 `RegExp` `Error` 对象，得到的是空对象 `{}`
>
> 3. 第三方库
>
> ##### 浅拷贝：
>
>  会新建一个对象, 拷贝对象的所有属性值, 对于 `基本数据` 来说就是拷贝一份对应的值, 但是对于 `引用数据` 则是拷贝一份 `引用数据` 的引用地址。
>
> 1. 手写浅拷贝
>
>    ```javascript
>     const clone = (target) => {
>      // 1. 对于基本数据类型(string、number、boolean……), 直接返回
>      if (typeof target !== 'object' || target === null) {
>        return target
>      }
>    
>      // 2. 创建新对象
>      const cloneTarget = Array.isArray(target) ? [] : {}
>    
>      // 3. 循环 + 递归处理
>      Object.keys(target).forEach(key => {
>        cloneTarget[key] = target[key];
>      })
>    
>      return cloneTarget
>    }
>    const res= clone({ name: 1, user: { age: 18 } }) 
>    ```
>
> 2. Object.assign()
>
>    `Object.assign(target, ...sources)`
>
>    target：需要应用源对象属性的目标对象，修改后将作为返回值。
>
>    sources：一个或多个包含要应用的属性的源对象。后面覆盖前面。
>
> 3. 展开运算符
>
> ##### 总结
>
> | 操作   | 基本类型   | 引用数据               | 结果                               |
> | ------ | ---------- | ---------------------- | ---------------------------------- |
> | 赋值   | 重新创建值 | 复制引用地址           | 具有相同的变量、属性值             |
> | 深拷贝 | 重新创建值 | 递归遍历, 拷贝所以属性 | 拷贝对象和源对象完成隔离           |
> | 浅拷贝 | 重新创建值 | 复制引用地址           | 拷贝对象和源对象存在共同的引用对象 |
>
> 
>
> 参考地址：[八股文: 讲讲什么是浅拷贝、深拷贝?](https://juejin.cn/post/7207090090101866557)



柯里化







##### 防抖和截流

> 防抖函数：
>
> - 函数防抖指的是在一段时间内频繁触发某个事件时，只执行最后一次触发的函数。
> - 常用于输入框，窗口大小调整，窗口滚动等事件的处理。
>
> ```javascript
> // 防抖函数
> function debounce(fn, delay = 300) {
>     let timer;
>     return function() {
>         let args = arguments;
>         let context = this;
>         clearTimeout(timer);
>         timer = setTimeout(function() {
>            fn.call(context, ...args); 
>         }, delay);
>     }
> }
> ```
>
> 节流函数：
>
> - 函数节流指的是频繁触发某个事件时，每隔一段时间，只执行一次函数。
> - 经典的应用场景是在用户滚动页面时触发的事件，比如无限滚动加载数据。
>
> ```javascript
> function throttle(fn, wait) {
>     let lastTime = 0;
>     return function() {
>         let args = arguments;
>         let context = this;
>         let currentTime = Date.now();
>         if (currentTime - lastTime >= wait) {
>            fn.call(context, ...args); 
>            lastTime = currentTime;
>         }
>     }
> }
> ```









call、apply、bind



##### WebSocket和Http

> websocket：
>
> - 单个tcp连接，很好的节省服务器资源和带宽；
> - 全双工通信，更及时。



##### Math

> `Math.floor()` 函数总是返回小于等于一个给定数字的最大整数。
>
> `Math.random()` 函数返回一个浮点数，伪随机数在范围从**0 到**小于**1**，也就是说，从 0（包括 0）往上，但是不包括 1（排除 1），然后你可以缩放到所需的范围。实现将初始种子选择到随机数生成算法;它不能被用户选择或重置。







##### 纯函数

> 不依赖于除参数外的其他外部作用域变量，也不修改其作用域外的其他变量的函数。
>
> - 确定性：相同的入参一定有相同的输出；
> - 无副作用：除返回函数值之外不产生附加影响。（如发起网络请求，修改全局变量或者改变外部存储等）
>
> ```javascript
> var arr1 = [1, 2, 3, 4, 5, 6, 7];
> console.log(arr1.slice(0, 2));		// [1, 2]
> console.log(arr1.slice(0, 2));		// [1, 2]
> console.log(arr1.slice(0, 2));		// [1, 2]
> console.log(arr1);		// [1, 2, 3, 4, 5, 6, 7]
> 
> var arr2 = [1, 2, 3, 4, 5, 6, 7];
> console.log(arr2.splice(0, 2));		// [1, 2]
> console.log(arr2.splice(0, 2));		// [3, 4]
> console.log(arr2.splice(0, 2));		// [5, 6]
> console.log(arr2);		// [7]
> 
> // 对比之下slice不改变原始数组，且相同的输入对应相同的输出，所以clice是纯函数，而splice不是。
> ```























##### [Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)

###### 1、伪数组转数组

```javascript
Array.prototype.slice.call(伪数组)
[].slice.call(伪数组)
Array.from(伪数组)
[...伪数组]
```

###### 2、slice方法

> 返回一个新的数组对象，由start和end决定对原始数组的浅拷贝（包括start，不包括end），不改变原始数组。
>
> `slice(start, end)`

###### 2、splice方法

> 通过移除或者替换已存在的元素或添加新元素就地变一个数组的内容。会改变原始数组。
>
> `splice(start, deleteCount, item1, item2, itemN)`
>
> - 插入数据在`start`之前；
> - 移除数据从`start`自身开始；
> - `start`为负数时实际`start`为`start + arr.length`;
> - `deleteCount`为可选参数，不写代表从`start`开始删除后续所有元素；

###### 3、toSpliced方法

> 和splice方法用法相同，但不改变原始数组。





















##### 为什么0.1+0.2不等于0.3？

> 1. js用二进制处理数据，用IEEE754双精度浮点数标准储存Number类型；
> 2. 精度丢失不是js的问题，二十IEEE754标准存储位数有限；
> 3. 计算过程中有两次精度丢失，一次在存储，一次在相加；