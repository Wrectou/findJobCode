### less学习记录

##### 1、什么是less？

> Less是CSS的向后兼容语言扩展，只对CSS语言做了一些方便的补充。
>
> - 无法直接被浏览器识别需要先转换成CSS代码。

##### 2、使用方式

###### 2.1、npm方式

```javascript
// 全局安装 / 使用
npm install less -g
lessc index.less index.css

// 项目安装 / 使用
npm install less -D
// 项目安装的命令在node_modules .bin文件夹里面，需通过npx调用
npx lessc index.less index.css
// 便捷方式 package.json里面配置命令xxx 通过npm run xxx调用
"scripts": {
	"less": "lessc index.less index.css"
}
npm run less
```

###### 2.2、vscode方式

```javascript
1、插件市场安装Easy Less插件
2、每次保存会自动转换
```

##### 3、语法

###### 3.1、变量

```less
// index.less
@ganger: #f40;
@width: 10px;
@height: @width + 20px;

.container{
  display: flex;
  align-items: center;
  justify-content: center;
  background: skyblue;
  .item{
    background: @ganger;
    margin: 10px;
    width: @width;
    height: @height;
  }
}

// index.css
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  background: skyblue;
}
.container .item {
  background: #f40;
  margin: 10px;
  padding: 20px;
  width: 10px;
  height: 30px;
}

```

###### 3.2、嵌套

```less
// index.less
.item{
    background: @ganger;
    &.active{
      background: black;
    }
}

// index.css
.item {
  background: #f40;
}
.item.active {
  background: black;
}
```

###### 3.3、混入

```less
// index.less
// 定义
.content-center() {
  display: flex;
  align-items: center;
  justify-content: center;
}
// @r 变量 可设置默认值
.round(@r: 5px) {
  border-radius: @r;
}
// 使用
.item1 {
  .round();
}
.item2 {
  .content-center()；
  .round(20px);
}

// index.css
.item1 {
  border-radius: 5px;
}
.item2 {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
}
```

###### 3.4、循环

> range：范围，`end`必传,`start`可选
>
> - `start`-（可选）起始值，例如 1 或 1px
> - `end`- 最终值，例如 5 或 5px
> - `step`- （可选）要增加的金额

```less
// index.less
each(range(0, 3), {
  .col-@{value} {
    height: (@value * 50px);
  }
});

// index.css
.col-0 {
  height: 0px;
}
.col-1 {
  height: 50px;
}
.col-2 {
  height: 100px;
}
.col-3 {
  height: 150px;
}
```

###### 3.5、注释

```less
// index.less
// 不编译到css
/* 编译到css */

// index.css
/* 编译到css */
```

