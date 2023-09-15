---
title: ES6
date: 2020-10-27 09:20:30
---



#### 1、let

> 1、变量不能重复声明；
>
> 2、是块级作用域；
>
> 3、不存在变量提升；
>
> 4、不影响作用域链；
>
> 5、全局定义的变量不在作为属性添加到全局对象中。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>let</title>
  <style>
    #app{
      width: 500px;
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #app>div{
      flex: 1;
      margin: 20px;
      height: 80px;
      border: solid 1px #000;
    }
  </style>
</head>
<body>
  <div id="app">
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
  </div>
  <script>
    const items = document.querySelectorAll('.item')
    // for (var i = 0; i < items.length; i++) {
    for (let i = 0; i < items.length; i++) {
      items[i].onclick = function() {
        // this.style.background = 'pink'
        items[i].style.background = 'pink'
      }
    }
  </script>
</body>
</html>
```



#### 2、const

> 1、必须要赋初始值；
>
> 2、一般情况下常量大写；
>
> 3、常量的值不能修改；
>
> 4、块级作用域；
>
> 5、对于数组和对象的元素进行修改，不算做对常量的修改，不会报错（常量指向的地址没发生变化）；
>
> 6、全局定义的变量不在作为属性添加到全局对象中。

```javascript
// 声明常量
const SCHOOL = '尚硅谷';

const A;

const a = 100;

SCHOOL = 'ATGUIGU';

{
	const PLAYER = 'UZI';
}
console.log(PLAYER);

const USER = ['zhangsan', 'lisi'];
USER.push('wangwu')

```



#### 3、变量的解构赋值

>ES6允许按照一定的模式从数组和对象中提取值，对变量进行赋值，这被称为解构赋值。

```javascript
// 1、数组的解构
const F4 = ['小沈阳','刘能','赵四','宋小宝'];
console.log(F4);
let [xiao,liu,zhao,song] = F4;
console.log(xiao);
console.log(liu);
console.log(zhao);
console.log(song);

// 2、对象的解构
const zhao = {
  name: '赵本山',
  age: '不详',
  xiaopin: function() {
    console.log('我可以演小品');
  }
}

let {name, age, xiaopin} = zhao
console.log(name);
console.log(age);
console.log(xiaopin);
xiaopin()
// zhao.xiaopin()
```



#### 4、模版字符串

> 1、声明 let str = `模版字符串`;
>
> 2、内容可以直接出现换行符；
>
> 3、变量拼接 ${variable};

```javascript
let nowDate = new Date();
let str = `现在是${nowDate}`
```



#### 5、对象的简化写法

> ES6允许在大括号里面直接写入变量和函数，作为对象的属性和方法。

```javascript
let name = "尚硅谷"
let change = function() {
  console.log("我们可以改变你");
}

// const school = {
//   name: name,
//   change: change,
//   improve: function() {
//     console.log("可以提高你的技能")
//   }
// }

const school = {
  name,
  change,
  improve() {
    console.log("可以提高你的技能")
  }
}

console.log(school);
```



#### 6、箭头函数

> // ES6允许使用「箭头」（ => ）定义函数。
>
> --- 箭头函数适合与 this 无关的回调（定时器，数组方法的回调）
>
> --- 箭头函数不适合与 this 有关的回调（事件回调，对象方法）
>
> 1、this 是静态的，this 始终指向函数声明时所在作用域下的 this 的值；
>
> 2、不能作为构造实例化对象；
>
> 3、不能使用 arguments 变量；
>
> 4、箭头函数的简写：
>
> ​	当形参只有一个的时候，可以省略小括号；
>
> ​	当代码体只有一句的时候，可以省略花括号；（此时return必须省略，语句的执行结果就是函数返回值）

```javascript
// ES6允许使用「箭头」（ => ）定义函数。
// 声明一个函数
// let fn1 = function(a,b) {
//  return a + b
// }

// let fn2 = (a,b) => {
//   return a + b
// }
// 调用函数
// let result1 = fn1(1,2)
// console.log(result1);
// let result2 = fn2(1,2)
// console.log(result2);

function getName() {
  console.log(this.name)
}
let getName2 = () => {
  console.log(this.name)
}

// 设置window对象的name属性
var name = '尚硅谷'
const school = {
  name: 'atguigu'
}

// 直接调用
// getName()
// getName2()

// call方法
// getName.call(school)
// getName2.call(school)

let Person = (name,age) => {
  this.name = name
  this.age = age
}

// let me = new Person('xiao', 30)
// console.log(me);

// let fn = () => {
//   console.log(arguments);
// }
// fn(1,2,4)

// function fn3() {
//   console.log(arguments)
// }
// fn3(1,2,3)

let add = a => {
  return a + a
}
console.log(add(9));

let pow = a => a * a
console.log(pow(9));

```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>es6</title>
  <style>
    div{
      width: 200px;
      height: 200px;
      background: #58a;
    }
  </style>
</head>
<body>
  <div id="ad"></div>
  <script>
    // 需求一 点击div两秒后颜色变成粉色
    let ad = document.getElementById('ad')
    ad.addEventListener('click', function() {
      // let self = this
      setTimeout(() => {
        // self.style.background = 'pink'
        this.style.background = 'pink'
      }, 2000)
    })
    
    // 需求二 从数组中返回偶数的元素
    const arr = [1,3,5,6,8,9,10]
    // const result = arr.filter((item) => {
    //   if (item % 2 === 0) {
    //     return true
    //   } else {
    //     return false
    //   }
    // })
    const result = arr.filter( item => item % 2 === 0)
    console.log(result);

    // 箭头函数适合与 this 无关的回调（定时器，数组方法的回调）
    // 箭头函数不适合与 this 有关的回调（事件回调，对象方法）
  </script>
</body>
</html>
```



#### 7、函数参数默认值

>ES6允许给函数参数赋予默认值
>
>1、形参初始值 具有默认值的参数，一般位置要靠后；（潜规则，放中间会被顶替）
>
>2、可以与解构赋值结合使用；

```javascript
function sum(a,b,c=10) {
  return a+b+c
}

// console.log(sum(1,2));

// function connect(options) {
//   let host = options.host
//   let username = options.username
//   console.log(host);
//   console.log(username);
// }

function connect({host= '127.0.0.1', username, password, port= 8888}) {
  console.log(host);
  console.log(username);
  console.log(password);
  console.log(port);
}

connect({
  // host: 'localhost',
  username: 'admin',
  password: 'admin',
  // port: 8080
})
```



#### 8、rest参数

>ES6引入 rest 参数，用于获取函数的实参（放在函数声明的形参位置），用来代替 arguments
>
>1、rest 参数返回的是数组；
>
>2、rest 参数必须要放到最后；

```javascript
// ES5获取实参的方法
// function date() {
//   console.log(arguments);
// }
// date('张三','里斯')

// rest 参数（返回的是数组）
// function date(...args) {
//   console.log(args);
// }
// date('张三','里斯')
// date(['张三','里斯','asd'])

function fn(a,...args,b) {
  console.log(a);
  console.log(b);
  console.log(args);
  console.log(...args);
}

fn(1,2,3,4,5)
```



#### 9、拓展运算符

>拓展运算符「...」能将 数组 转换成以逗号分隔的 参数序列（放在函数实参调用位置）
>

```javascript
const users = ['张三','里斯','王五']
// => '张三','里斯','王五'

function show() {
  console.log(arguments);
}

console.log(...users);
show(users)
show(...users)    // show('张三','里斯','王五')

---------------------------------------------


// 拓展运算符的运用
// 1、数组的合并
const kuaizi = ['王太利','肖央']
const fenghuang = ['增益','零花']

// const zuixuan = kuaizi.concat(fenghuang)
const zuixuan = [...kuaizi,...fenghuang]

console.log(zuixuan);

// 2、数组的克隆
const sanzhihua = ['E','G','M']
const sanyecao = [...sanzhihua]   // ['E','G','M']   如果元素有引用类型数据那就是浅拷贝

console.log(sanyecao)

// 3、将伪数组转换成真正的数组
const divs = document.querySelectorAll('div')
const divArr = [...divs]
console.log(divs);
console.log(divArr);
```



#### 10、迭代器

>迭代器是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口（对象里面的一个属性：Symbol(Symbol.iterator) ），就可以完成遍历操作。（需要自定义遍历数据的时候，要想到迭代器。）
>
>1、ES6创造了一种新的遍历命令 for...of 循环，Iterator 接口主要供 for...of 调用；
>
>2、原生具备 Iterator 接口的数据（可用 for...of 遍历）
>
>​	1）Array
>
>​	2）Arguments
>
>​	3）Set
>
>​	4）Map
>
>​	5）String
>
>​	6）TypedArray
>
>​	7）NodeList
>
>3、工作原理：
>
>​	1）创建一个指针对象，指向当前数据结构的起始位置；
>
>​	2）第一次调用对象的 next 方法，指针自动指向数据结构的第一个成员
>
>​	3）接下来不断调用 next 方法，指针一直往后移动，直到指向最后一个成员
>
>​	4）每调用 next 方法返回一个包含 value 和 done 属性的对象

```javascript
// 迭代器的介绍
// 声明一个数组
const xiyou = ['孙悟空','沙僧','猪八戒','唐僧']

// 使用 for...of 遍历数组
console.log(xiyou);
for (let v of xiyou) {
  console.log(v);
}

let Iterator = xiyou[Symbol.iterator]()
console.log(Iterator);

// 调用 next 方法
console.log(Iterator.next());
console.log(Iterator.next());
console.log(Iterator.next());
console.log(Iterator.next());
console.log(Iterator.next());

---------------------------------------------


// 迭代器的应用 - 自定义遍历属性
// 声明一个对象
const banji = {
  name: '终极一班',
  stus: [
    'xiaoming',
    'xiaohong',
    'xiaotian'
  ],
  [Symbol.iterator]() {
    // 声明索引变量
    let i = 0
    return {
      next: () => {
        if (i < this.stus.length) {
          const result = {value: this.stus[i], done: false}
          i ++
          return result
        } else {
          return { value: undefined, done: true}
        }
      }
    }
  }
}

console.log(banji);
// console.log(banji[Symbol.iterator]);
// console.log(banji[Symbol.iterator]());
// 使用 for...of 遍历这个对象   获取 stus 里面的值
for (let stu of banji) {
  console.log(stu);
}
```



#### 11、生成器（看不懂，暂时放弃）



#### 12、Promise

> Promise 是 Es6 引入的异步编程新解决方案。语法上 Promise 是一个构造函数，用来封装异步操作并可以获取其成功或失败的结果。
>
> 1、Promise 构造函数：Promise(excutor) {}
>
> 2、Promise.prototype.then 方法
>
> 3、Promise.prototype.catch 方法
>
> 特点：1、Promise 构造函数是同步执行的，promise.then中的函数是异步执行；
>
> ​			2、Promise 有 pending fulfilled rejected 三种状态，且状态一旦改变就会固化，不会再变；
>
> ​			3、构造函数中的 resolve 或 reject 只有第一次执行有效，多次调用没有任何作用，呼应代码二结论：				  promise 状态一旦改变则不能再变；
>
> ​			4、Promise 的链式调用是通过每次调用返回一个新的 promise 实现的；
>
> ​			5、.then 或者 .catch 中 return 一个 error 对象并不会抛出错误，所以不会被后续的 .catch 捕获，需				  要改成 return Promise.reject 或者 throw new Error 其中一种；
>
> ​			6、.then 或 .catch 返回的值不能是 promise 本身，否则会造成死循环；
>
> ​			7、.then 或者 .catch 的参数期望是函数，传入非函数则会发生值穿透；

```javascript
// Promise 的介绍与基本使用
// 实例化 Promise 对象
let result = new Promise((resolve, reject) => {
  setTimeout(() => {
    // let res = '数据读取成功！'
    // resolve(res)

    let err = '读取失败！'
    reject(err)
  }, 1000)
})

console.log(result);

// 调用 Promise 对象的 then 方法
result.then(function(res) {
  console.log(res);
}, function(err) {
  console.error(err);
})


---------------------------------------------
  
  
// Promise 封装读取文件
// 1、引入 fs 文件模块
const fs = require('fs')

// 2、调用方法读取文件
// fs.readFile('./枫桥夜泊.txt',(err, data) => {
//   if (err) throw err
//   console.log(data.toString());
// })

// 3、使用 Promise 封装
let result = new Promise((resovle, reject) => {
  fs.readFile('./枫桥夜泊.txt',(err, data) => {
    if (err) {
      reject(err)
    } else {
      resovle(data)
    }
  })
})

result.then((res) => {
  console.log(res.toString());
}, (err) => {
  console.error(err);
})


---------------------------------------------
  
  
// Promise 封装 Ajax 请求
// // 1、创建对象
// let xhr = new XMLHttpRequest()
// // 2、初始化
// xhr.open('GET', 'http://jsonplaceholder.typicode.com/users')
// // 3、发送
// xhr.send()
// // 4、处理相应结果
// xhr.onreadystatechange = function() {
//   // 判断
//   if (xhr.readyState == 4) {
//     // 判断相应状态码
//     if (xhr.status >= 200 && xhr.status < 300) {
//       console.log(xhr.response);
//     } else {
//       console.error(xhr.status);
//     }
//   }
// }

let result = new Promise((resovle, reject) => {
  let xhr = new XMLHttpRequest()
  xhr.open('GET', 'http://jsonplaceholder.typicode.com/user')
  xhr.send()
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        resovle(xhr.response);
      } else {
        reject(xhr.status);
      }
    }
  }
})

result.then((res) => {
  console.log(res);
}, (err) => {
  console.error(err);
})


---------------------------------------------


// Promise.prototype.then 方法
let result = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('获取成功！')
    // reject('出错啦')
  })
})

// 调用 then 方法，then 方法的返回结果是 Promise 对象，对象状态由回调函数的执行结果决定
// 1、如果回调函数中返回的结果是非 Promise 类型的属性，状态为成功，返回值为对象的成功的值
const p = result.then((res) => {
  console.log(res);
  // 1、非 Promise 类型的属性
  // return '123'
  // 2、是 Promise 对象
  // return new Promise((resolve, reject) => { 
  //   resolve('hahaha') 
  //   // reject('err') 
  // })
  // 3、抛出错误
    // throw new Error('出错啦！')
    throw ('出错啦！')
}, (err) => {
  console.error(err);
  // return '123'
})

// 链式调用（解决回调地狱）
result.then((res) => { 
  console.log('then1: ',res);
  return 'hahaha'
}, (err) => {
  console.log('then1: ',err);
}).then((res) => {
  console.log('then2: ',res);
}, (err) => {
  console.log('then2: ',err);
})

console.log(p);


---------------------------------------------


// Promise 实践练习-多个文件内容读取（.then.then.then 链式调用）
const fs = require('fs')

// fs.readFile('./天气.md',(err, data1) => {
//   fs.readFile('./枫桥夜泊.txt',(err, data2) => {
//     fs.readFile('./hhh.md',(err, data3) => {
//       let result = data1 + '\r\n' +data2 + '\r\n' +data3
//       console.log(result);
//     })
//   })
// })


// 使用 Promise 实现
let result = new Promise((resolve, reject) => {
  fs.readFile('./天气.md',(err, data) => {
    resolve(data)
  })
})

result.then(res=> {
  return new Promise((resolve, reject) => {
    fs.readFile('./枫桥夜泊.txt',(err, data) => {
      resolve([res, data])
    })
  })
})
.then(res => {
  return new Promise((resolve, reject) => {
    fs.readFile('./hhh.md',(err, data) => {
      res.push(data)
      resolve(res)
    })
  })
})
.then(res => {
  console.log(res.join());
  // let a = res.join()
  // console.log(a.replace(/,/g, '').replace(/。/g, '。\r\n'));
})


---------------------------------------------


// Promise 对象 catch 方法
let result = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('出错了！')
  }, 1000)
})

// result.then(res => {
//   console.log(res);
// },err => {
//   console.error(err);
// })

result.catch(err => {
  console.warn(err);
})
    
```







#### 13、Set（类数组集合）

>Es6提供了新的数据结构 Set（集合）。它类似于数组，但成员的值都是唯一的，集合实现了 iterator 接口，所以可以使用「 拓展运算符 」和「 for...of... 」进行遍历，Set 的属性和方法：
>
>1、size		返回集合的元素个数
>
>2、add		增加一个新元素，返回当前集合
>
>3、delete		删除元素，返回 boolean 值
>
>4、has		检测集合中是否包含某个元素，返回 boolean 值
>
>5、clear		清空 Set ，返回 undefined

```javascript
// 集合介绍与api
// 声明一个Set
let set = new Set()
let set2 = new Set(['大事儿','小事儿','好事儿','坏事儿','小事儿'])

// console.log(set, typeof set);

// 元素个数
// console.log(set2.size);
// 增加一个新的
// console.log(set2.add('糟心事儿'));
// 删除一个
// console.log(set2.delete('糟心事儿'));
// 检测
// console.log(set2.has('hahah'));
// 清空
// set2.clear();

// console.log(set2);

for(let s of set2) {
  console.log(s);
}


---------------------------------------------


// 集合实践
let arr = [1,2,3,4,5,4,3,2,1]

let arr2 = [4,5,6,5,6]

// 1、数组去重
// let result = [...new Set(arr)]
// console.log(result);
// 2、交集
// let result = [...new Set(arr)].filter(item => new Set(arr2).has(item) )
// console.log(result);
// 3、并集
// let result = [...new Set(arr.concat(arr2))]
// let result = [...new Set([...arr,...arr2])]
// console.log(result);
// 4、差集
let result = [...new Set(arr)].filter(item => !new Set(arr2).has(item))
console.log(result);
```



#### 14、Map（类对象集合）

>Es6提供了 Map 数据结构，它类似于对象，也是键值对的集合。但是键的返回不限于字符串，各种类型的值（包括对象）都可以当作键。Map 也实现了 iterator 接口，所以可以使用「 拓展运算符 」和「 for...of... 」进行遍历，Set 的属性和方法：
>
>1、size		返回 Map 的元素个数
>
>2、set		增加一个新元素，并返回当前 Map
>
>3、get		返回键名对象的键值
>
>4、has		检测 Map 中是否包含某个元素，返回 boolean 值
>
>5、clear		清空 Map ，返回 undefined

```javascript
let map = new Map()

// 设置
map.set('name','张三')
map.set('change',function(){
  console.log('可以改变');
})
let key = {
  school: 'guigu'
}
map.set(key, ['zhangsan', 'lisi'])

// 个数
// console.log(map.size);

// 获取
// console.log(map.get('name'));
// console.log(map.get('change'));
// let aa = map.get('change')
// aa()
// console.log(map.get(key));

// 清空
// map.clear()

// 遍历
for (let v of map) {
  console.log(v);
}

console.log(map);
```



#### 15、Class 类

>Es6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过 Class 关键字，可以定义类。基本上，Es6 的 Class 可以看作是一个语法糖，它的绝大部分功能，Es5 都可以做到，新的 Class 写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。
>
>知识点：
>
>1、class 声明类
>
>2、constructor 定义构造函数初始化
>
>3、extends 继承父类
>
>4、super 调用父级构造方法（子类构造器先调用super()就先执行父类的构造器，后调用就先执行子类的构造器）
>
>5、static 定义静态属性和方法（不会被实例继承，可以被子类继承。直接通过类来调用）
>
>6、# 定义私有属性和方法（只能在类的内部使用）
>
>7、父类方法可以重写
>
>##### 私有属性和静态属性的区别？？
>
>1、私有属性和方法只能在类的内部使用，实例不能使用，子类不能继承。这样就不需要使用闭包来隐藏不想暴露给外界的私有变量（达到闭包的效果）；
>2、静态属性和方法实例不能使用，但是能被子类继承，可以直接用类来调用。

```javascript
// class的介绍和初体验

// Es5  手机
// function Phone(brand, price) {
//   this.brand = brand
//   this.price = price
// }

// // 添加方法
// Phone.prototype.call = function() {
//   console.log('我可以打电话！');
// }

// let xiaomi = new Phone('小米', 3999)
// console.log(xiaomi)

// Es6  class
class Phone{
  // 构造方法 名字不能修改
  constructor(brand, price) {
    this.brand = brand
    this.price = price
  }

  // 方法必须使用改语法，不能使用 Es5 的对象完整形式
  call() {
    console.log('我可以打电话！');
  }
}

let huawei = new Phone('华为', 5999)
huawei.call()
console.log(huawei);

---------------------------------------------

// class 静态成员
// function Phone() {

// }

// Phone.name = 'xiaomi'
// Phone.call = function() {
//   console.log('我可以打电话！');
// }
// Phone.prototype.size = '5.5inch'

// let xiaomi = new Phone()
// console.log(xiaomi.size);

// console.log(xiaomi.name);   // undefined
// xiaomi.call()   // let.js:12 Uncaught TypeError: xiaomi.call is not a function

// name 和 call 是静态成员
// 实例对象身上是没有构造函数对象上面的属性；
// 实例对象和构造函数对象的属性不相通；
// 实例对象和构造函数原型对象属性相通。

class Phone{
  // static 静态属性
  static name = '手机'
  static call() {
    console.log('我可以打电话！');
  }
}

let huawei = new Phone()
console.log(huawei.name);   // undefined
huawei.call()   // let.js:31 Uncaught TypeError: huawei.call is not a function


---------------------------------------------

  
// Es5 构造函数继承

// 手机
function Phone(brand, price) {
  this.brand = brand
  this.price = price
}

Phone.prototype.call = function() {
  console.log('我可以打电话！');
}

// 智能手机
function SmartPhone(brand, price, color, size) {
  Phone.call(this, brand, price)
  this.color = color
  this.size = size
}

// 设置子级构造函数的原型
SmartPhone.prototype = new Phone    // 实例对象上面有父级的方法
SmartPhone.prototype.constructor = SmartPhone   // 校正，加不加都行

// 声明子类的方法
SmartPhone.prototype.photo = function() {
  console.log('我可以拍照');
}
SmartPhone.prototype.play = function() {
  console.log('我可以玩游戏');
}

let chuizi = new SmartPhone('锤子', 2999, 'white', '5.0inch')
chuizi.photo()
chuizi.call()
console.log(chuizi);


---------------------------------------------


// Es6 class的类继承
class Phone{
  // 构造方法
  constructor(brand, price) {
    this.brand = brand
    this.price = price
  }

  // 父类的成员属性
  call() {
    console.log('我可以打电话！');
  }
}

class SmartPhone extends Phone{
  // 构造方法
  constructor(brand, price, color, size) {
    super(brand, price)   // super就是父类的constructor方法  和 Phone.call(this, brand, price) 类似
    this.color = color
    this.size = size
  }

  photo() {
    console.log('我可以拍照');
  }
  play() {
    console.log('我可以玩游戏');
  }
}

let xiaomi = new SmartPhone('小米', 2499, '白色', '6.5inch')
xiaomi.call()
xiaomi.photo()
xiaomi.play()
console.log(xiaomi);


---------------------------------------------


// 子类对父类方法的重写（可以在子类写同名方法直接覆盖，可以通过 super.XXX() 调用父类方法）
class Phone{
  // 父类的成员属性
  call() {
    console.log('我可以打电话！');
  }
}

class SmartPhone extends Phone{
  call() {
    console.log('我可以视频通话！！！');
  }

  hhh() {
    super.call()
  }
}

let xiaomi = new SmartPhone()
xiaomi.hhh()
xiaomi.call()


---------------------------------------------


// getter 和 setter
class Phone{
  get price() {
    console.log('价格被读取了。。。');
    return '我是 get 返回值'
  }
  set price(newVal) {
    console.log('设置价格了。。。');
  }
}

let xiaomi = new Phone()
console.log(xiaomi.price);
xiaomi.price = 'free'

```



#### 16、数值拓展

> 1、Number.EPSILON 是 javascript 表示的最小精度
>
> 2、二进制和八进制
>
> 3、Number.isFinite 		检测一个数值是否为有限数
>
> 4、Number.isNaN		检测一个数值是否为NaN
>
> 5、 Number.parseInt	Number.parseFloat		字符串转整数
>
> 6、Number.isInteger		判断一个数是否为整数
>
> 7、Math.trunc		将数字的小数部分抹掉
>
> 8、Math.sign		判断一个数到底为正数 负数 还是零

```javascript
// 1、Number.EPSILON 是 javascript 表示的最小精度
// function equal(a, b) {
//   if (Math.abs(a - b) < Number.EPSILON) {
//     return true
//   } else {
//     return false
//   }
// }
// console.log(0.1 + 0.2 === 0.3);
// console.log(equal(0.1+0.2,0.3));

// 2、二进制和八进制

// 3、Number.isFinite 		检测一个数值是否为有限数
// console.log(Number.isFinite(100));
// console.log(Number.isFinite(100/0));
// console.log(Number.isFinite(Infinity));

// 4、Number.isNaN		检测一个数值是否为NaN
// console.log(Number.isNaN(123));
// console.log(Number.isNaN(123+'h'));

// 5、 Number.parseInt	Number.parseFloat		字符串转整数
// console.log(Number.parseFloat('5201314loveyou'));
// console.log(Number.parseFloat('3.1415926神奇'));

// 6、Number.isInteger		判断一个数是否为整数
// console.log(Number.isInteger(5));
// console.log(Number.isInteger(2.5));

// 7、Math.trunc		将数字的小数部分抹掉
// console.log(Math.trunc(3.5));

// 8、Math.sign		判断一个数到底为正数1 负数0 还是零-1
// console.log(Math.sign(3.5));
// console.log(Math.sign(0));
// console.log(Math.sign(-3.5));
```



#### 17、对象方法拓展

> 1、Object.is		判断两个值是否完全相等
>
> 2、Object.assign		对象的合并
>
> 3、Object.setPrototypeOf		Object.getPrototypeOf

```javascript
// 1、Object.is		判断两个值是否完全相等
// console.log(Object.is(120, 120));
// console.log(Object.is(NaN, NaN));
// console.log(NaN === NaN);

// 2、Object.assign		对象的合并
// let config1 = {
//   host: 'localhost',
//   port: 8080,
//   name: 'user',
//   password: 'user',
//   test1: 'test1'
// }
// let config2 = {
//   host: 'http://10.1.28.204',
//   port: 3306,
//   name: 'wrectou',
//   password: 'wrectou',
//   test2: 'test2'
// }
// console.log(Object.assign(config1, config2));

// 3、Object.setPrototypeOf 设置原型对象    Object.getPrototypeOf
let school = {
  name: '尚硅谷'
}
let cictys = {
  xiaoqu: ['北京', '上海', '深圳']
}
Object.setPrototypeOf(school, cictys);
console.log(Object.getPrototypeOf(school));
console.log(school);
```



#### 18、Es7新特性

> 1、Array.prototype.includes	includes方法用来检测数组中是否包含某个元素，返回值是布尔类型（也可以检测字符串）
>
> 2、指数操作符	Es7 引入 ** 用来实现幂运算，功能与 Math.pow 结果相同
>
> 3、Object.setPrototypeOf		Object.getPrototypeOf

```javascript
// includes     indexOf
// let mingzu = ['西游记','三国演义','水浒传','红楼梦']
// console.log(mingzu.includes('西游记'));
// console.log(mingzu.includes('金瓶梅'));

// **   Math.pow
console.log(2 ** 10);
console.log(Math.pow(2, 10));
```



#### 19、async 和 await (es8新特性)

> async 和 await 两种语法结合可以让异步代码和同步代码一样
>
> 1、async 函数
>
> ​	1)	async 函数的返回值为 promise 对象；
>
> ​	2)	promise 对象的结果由 async 函数执行的返回值决定。
>
> 2、await 表达式
>
> ​	1)	await 必须写在 async 函数中；
>
> ​	2)	await 右侧的表达式一般为 promise 对象；
>
> ​	3)	await 返回值是 promise 成功的值；
>
> ​	4)	await 的 promise 失败了，就会抛出异常，需要通过 try...catch... 捕获处理。

```javascript
// async 函数
async function fn() {
  // 返回一个字符串
  // return 'false'

  // 返回的结果不是一个 promise 类型的对象，返回的结果就是成功 promise 对象
  // return

  // 抛出错误，返回的结果是一个失败的 promise
  // throw new Error('出错啦!')

  // 返回的结果如果是一个 promise 对象
  return new Promise((resolve, reject) => {
    // resolve('成功！')
    reject('失败！')
  })
}

let result = fn();
console.log(result);
result.then(res => {
  console.log(res);
}, err => {
  console.warn(err);
})


---------------------------------------------


// await 表达式
// 创建 promise 对象
let result = new Promise((resolve, reject) => {
  // resolve('成功了！')
  reject('失败！')
})
// await 要放在 async 函数中
async function main() { 
  try {
    let res = await result;
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}
// 调用函数
main()


---------------------------------------------


// async 与 await 结合读取文件
let fs = require('fs')

function readFengQiaoYeBo() {
  return new Promise((resolve, reject) => {
    fs.readFile('./枫桥夜泊.txt',(err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}
function readTianQi() {
  return new Promise((resolve, reject) => {
    fs.readFile('./天气.md',(err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}
function readHHH() {
  return new Promise((resolve, reject) => {
    fs.readFile('./hhh.md',(err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

async function main() {
  try {
    let fengqiaoyebo = await readFengQiaoYeBo()
    let tianqi = await readTianQi()
    let hhh = await readHHH()
    console.log(fengqiaoyebo.toString());
    console.log(tianqi.toString());
    console.log(hhh.toString());
  } catch (err) {
    console.error(err);
  }
}

main()


---------------------------------------------


// async 与 await 结合发送 Ajax 请求
function sendAjax(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.send()
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response)
        } else {
          reject(xhr.status)
        }
      }
    }
  })
}

// Promise then 方法实现
// let result = sendAjax('http://jsonplaceholder.typicode.com/users')
// result.then(res => {
//   console.log(res);
// }, err => {
//   console.error(err);
// })

// async await 实现
async function main() {
  try {
    let result = await sendAjax('http://jsonplaceholder.typicode.com/users')
    let result2 = await sendAjax('http://jsonplaceholder.typicode.com/posts')
    console.log(result);
    console.log('\r\n');
    console.log(result2);
  } catch (err) {
    console.error(err);
  }
}
main()
```

