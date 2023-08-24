Event Loop
#### Event Loop (事件轮询)

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



Promise

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

防抖、截流

call、apply、bind



##### WebSocket和Http

> websocket：
>
> - 单个tcp连接，很好的节省服务器资源和带宽；
> - 全双工通信，更及时。
