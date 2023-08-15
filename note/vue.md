##### 1、Vue组件之间通信方式有哪些？

###### 1.1、props

> ```props```是最常见的父传子的方式，子组件只需要对父组件传递的值进行渲染即可。
>
> ```javascript
> // parent.vue
> <homeList :list="listData" />
> // children.vue
> const props = defineProps(['list'])
> ```

###### 1.2、emit

> ```emit```是最常见的子传父方式，在父组件定义事件名称，子组件```emit```触发自定义事件，并将添加的值作为参数传递。
>
> ```javascript
> // parent.vue
> <inputBox @add="addList" />
> // children.vue
> <button @click="addList">添加</button>
> const emits = defineEmits(["add"])
> const addList = () => emits("add", inputValue.value)
> ```

###### 1.3、v-model

> `v-model`是Vue中一个比较出色的语法糖，在子组件中我们首先定义`props`和`emits`，然后添加完成之后`emit`指定事件。
>
> 注：`update:*`是Vue中的固定写法，`*`表示`props`中的某个属性名。
>
> ```javascript
> // parent.vue
> <inputBox v-model:list="listData" />
> <!-- <inputBox :list="listData" @update:list="list = $event" /> -->
> // children.vue
> <button @click="addList">添加</button>
> const props = defineProps(['list'])
> const emits = defineEmits(["update:list"])
> const addList = () => {
>   	const arr = props.list
>   	arr.push(inputValue.value)
>   	emits("update:list", arr)
> }
> ```

###### 1.4、ref / expose

> 在使用选项式API时，我们可以通过`this.$refs.name`的方式获取指定元素或者组件，但是组合式API中就无法使用哪种方式获取。如果我们想要通过`ref`的方式获取组件或者元素，需要定义一个同名的Ref对象，在组件挂载后就可以访问了。
>
> 注：`setup`组件默认是关闭的，也即通过模板`ref`获取到的组件的公开实例，不会暴露任何在`<script setup>`中声明的绑定。如果需要公开需要通过`defineExpose`API暴露。
>
> ```javascript
> // parent.vue
> <homeList :list="inputBoxRef?.listData" />
> <inputBox ref="inputBoxRef" />
> const inputBoxRef = ref(null)
> // children.vue
> <button @click="addList">添加</button>
> let listData = ref(["zhangsan", "lisi", "wangwu"])
> let inputValue = ref("")
> const addList = () => listData.value.push(inputValue.value)
> defineExpose({ listData })
> ```

###### 1.5、provide / inject

> `provide`和`inject`是Vue中提供的一对API，该API可以实现父组件向子组件传递数据，无论层级有多深，都可以通过这对API实现。
>
> 注：使用`provide`进行数据传递时，尽量`readonly`进行数据的包装，避免子组件修改父级传递过去的数据。
>
> ```javascript
> // parent.vue
> <homeList />
> let listData = ref(["zhangsan", "lisi", "wangwu"])
> provide("listData", listData.value)
> // children.vue
> const list = inject("listData")
> ```

###### 1.6、attrs

> 包含父作用域里除`class`和`style`外的非`props`属性集合
>
> ```javascript
> // parent.vue
> <homeList :list="listData" />
> let listData = ref(["zhangsan", "lisi", "wangwu"])
> // children.vue
> // const attrs = useAttrs()		// attrs.list
> const { list } = useAttrs()
> ```

###### 1.7、事件总线

> Vue3中移除了事件总线，但是可以借助于第三方工具来完成，Vue官方推荐[mitt](https://www.npmjs.com/package/mitt)或[tiny-emitter](https://www.npmjs.com/package/tiny-emitter)；
>
> 在大多数情况下不推荐使用全局事件总线的方式来实现组件通信，虽然比较简单粗暴，但是长久来说维护事件总线是一个大难题。

###### 1.8、状态管理工具

> [Vuex](https://vuex.vuejs.org/zh/)和[Pinia](https://pinia.vuejs.org/)是Vue3中的状态管理工具，使用这两个工具可以轻松实现组件通信。

###### 1.9、vue2中其他方式

> 1. sync
>
>    ```javascript
>    // Parent.vue
>    <child :page.sync="page"></child>
>    // children.vue
>    this.$emit("update:page", newVal)
>    ```
>
> 2. $children / $parent
>
>    `$children`：获取到一个包含所有子组件(不包含孙组件)的 VueComponent 对象数组，可以直接拿到子组件中所有数据和方法等
>
>    `$parent`：获取到一个父节点的 VueComponent 对象，同样包含父节点中所有数据和方法等
>
>    ```javascript
>    // Parent.vue
>    this.$children[0].someMethod() // 调用第一个子组件的方法
>    this.$children[0].name // 获取第一个子组件中的属性
>    // Child.vue
>    this.$parent.someMethod() // 调用父组件的方法
>    this.$parent.name // 获取父组件中的属性
>    ```
>
> 3. slot
>
>    就是把子组件的数据通过插槽的方式传给父组件使用，然后再插回来
>
>    ```javascript
>    // Child.vue
>    <slot :name="name"></slot>
>    // Parent.vue
>    <child v-slot="slotProps">{{ slotProps.name }}</child>
>    ```

参考文章：

- [总结了Vue3的七种组件通信方式，别再说不会组件通信了](https://juejin.cn/post/7062740057018335245?searchId=2023080116373808AB47FD60C840007DB5#comment) 
-  [Vue3的8种和Vue2的12种组件通信，值得收藏](https://juejin.cn/post/6999687348120190983?searchId=2023080116373808AB47FD60C840007DB5)



##### 2、v-if和v-for哪个优先级更高？

> 1. 不要把v-for和v-if写在一个DOM元素上；
>
> 2. vue2中v-for的优先级高于v-if，先执行for循环渲染整个数组再判断条件比较消耗资源，建议使用计算属性；
>
> 3. vue3中v-if的优先级高于v-for，调用v-if时变量不存在导致报错；
>
> 4. 通常做法：
>
>    ```vue
>    <template>
>      <!-- 报错 -->
>      <div class="name" v-for="item in data" v-if="item.isActive">
>        {{ item.name }}
>      </div>
>      <!-- 分开写 -->
>      <template v-for="item in data">
>        <div class="name" v-if="item.isActive">{{ item.name }}</div>
>      </template>
>      <!-- 计算属性 -->
>      <div class="name" v-for="item in activeUsers">{{ item.name }}</div>
>    </template>
>                
>    <script setup>
>      import { reactive, computed } from "vue"
>      let data = reactive([
>        {name: "zhangsan", isActive: true},
>        {name: "lisi", isActive: false},
>        {name: "wanger", isActive: true},
>      ])
>      let activeUsers = computed(() => data.filter(i => i.isActive))
>    </script>
>    ```

##### 3、简述Vue的生命周期

> 

##### 4、 Vue双向绑定使用和原理

> `v-model = :value + @input`
>
> `Object.defineProperty`
>
> `Proxy`

##### 5、 Vue中如何拓展一个组件

> `mixins extends Composables组合式函数 插槽` 

##### 6、子组件可以直接改变父组件的数据么？

> 单向数据流原则：
>
> 所有 prop 都使得父子之间形成了一个**单向下行绑定**：父级 prop 的更新会向下流动到子组件中，但是反过来则不行
>
> 如果prop只是传递初始值，子组件可以定义一个值接收，想要修改调用emit

##### 7、Vue的权限管理

> - 页面级 按钮级
>
> - 前后端方案：
>
>   - 前端：路由配置信息放在前端，根据登录用户角色过滤出路由表 meta标签 roles字段，**`router.addRoutes`**动态添加
>
>   - 后端：路由信息存在数据库，根据登录用户角色把其能访问路由信息返回前端
>
>   - 优缺点：前端实现简单，有新的页面和角色需求就要重新打包；
>
>     ​				后端可以专门设置一个配置页面，一劳永逸。
>
> - 按钮控制使用自定义指令，将按钮要求角色通过值传给v-permission指令，在指令的`moutned`钩子中可以判断当前用户角色和按钮是否存在交集，有则保留按钮，无则移除按钮。

##### 11、Vue3有哪些新特性

> 1. Composition API、script setup语法糖、Teleport传送门、Fragments 片段、Emits选项、自定义渲染器、SFC CSS变量 >>> /deep/ ::v-deep()、`v-bind()`在CSS中、Suspense
>
> 2. 另外，Vue3.0在框架层面也有很多亮眼的改进：
>
>    - 更快：虚拟DOM重写、编译器优化：静态提升、patchFlags、block等、基于Proxy的响应式系统
>
>    - 更小：更好的摇树优化
>
>    - 更容易维护：TypeScript + 模块化
>
>    - 更容易扩展：独立的响应化模块、自定义渲染器

##### 动态路由

> 将给定匹配模式的路由映射到同一个组件需要定义动态路由，如用户信息
>
> 动态路由支持多个，参数都会拼在`route.params`对象里面
>
> ```vue
> // routes.js
> {
>   path: "/dynamics:userId",
>   component: () => import("@/pages/dynamics/index.vue")
> }
> <template>
>   <div class="dynamics">
>       userId: {{ route.params.userId }}
>   </div>
> </template>
> 
> <script setup>
>   import { useRoute } from "vue-router"
>   const route = useRoute()
>   console.log(route.params);
> </script>
> ```

##### nextTick

> 等待下一次 DOM 更新刷新的工具方法。
>
> Vue有个异步更新策略，如果响应式数据变化，Vue不会立刻更新DOM，而是开启一个队列，直到下一个“tick”才一起执行。这一策略导致我们对数据的修改不会立刻体现在DOM上，减少DOM操作消耗。
>
> 开发时，有两个场景我们会用到nextTick：
>
> - created中想要获取DOM时；
> - 响应式数据变化后获取DOM更新后的状态，比如希望获取列表更新后的高度。
>
> ```vue
> <template>
>   <button id="counter" @click="increment">{{ count }}</button>
> </template>
> <script setup>
> import { ref, nextTick } from 'vue'
> const count = ref(0)
> async function increment() {
>   count.value++
>   // DOM 还未更新
>   console.log(document.getElementById('counter').textContent) // 0
>   await nextTick()
>   // DOM 此时已经更新
>   console.log(document.getElementById('counter').textContent) // 1
> }
> </script>
> ```

##### watch和computed的区别以及使用

> 相同：都是用来观察数据变化的
>
> 不同：computed 有缓存，它依赖的值变了才会重新计算，watch 没有；
>
> ​			computed 不支持异步，watch 支持异步；
>
> ​			computed会立即执行，watch不会；
>
> ​			computed 是多对一（监听属性依赖于其他属性）watch 是一对多（监听某一个值变化，执行对应操作）；

##### watch和methods的区别以及使用

> - `computed` 内定义的视为一个变量；而 `methods` 内定义的是函数，必须加`括号()`；
> - 在依赖数据不变的情况下，`computed` 内的值只在初始化的时候计算一次，之后就直接返回结果；而 `methods` 内调用的每次都会重写计算。

##### 子组件和父组件创建和挂载顺序

> 创建过程自上而下，挂载过程自下而上
>
> - 加载渲染过程
>
> 父 `beforeCreate`- > 父 `created `-> 父 `beforeMount` -> 子 `beforeCreate` -> 子 `created` -> 子 `beforeMount` -> 子 `mounted` -> 父 `mounted`
>
> - 子组件更新过程
>
> 父 `beforeUpdate` -> 子 `beforeUpdate`-> 子`updated `-> 父 `updated`
>
> - 父组件更新过程
>
> 父 `beforeUpdate`-> 父 `updated`
>
> - 销毁过程
>
> 父 `beforeDestroy`->子 `beforeDestroy`->子 `destroyed`->父 `destroyed`

##### 组件缓存 keep-alive

> 一个抽象组件，自身不渲染成DOM，包裹组件时，会缓存不活动的组件实例，而不是销毁。
>
> 三个属性：
>
> - include：白名单缓存
> - exclude：黑名单不缓存，exclude优先级更高
> - max：组件缓存上限，超出后先进先出
>
> 两个生命周期：
>
> - activated：组件激活时，插入DOM时调用
>
> - deactivated：组件移除DOM时调用
>
> 缓存后想更新数据：
>
> ```javascript
> beforeRouteEnter(to, from, next){
>   next(vm=>{
>     console.log(vm)
>     // 每次进入路由执行
>     vm.getData()  // 获取数据
>   })
> },
> 
> activated(){
> 	  this.getData() // 获取数据
> },
> ```

##### 对Vuex的理解

> 为Vue开发的状态管理模式+库，它采用集中式存储，管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。
>
> 单向数据流管理应用，多个组件共享状态容易破坏单向数据流且代码复杂化，因此我们有必要把组件的共享状态抽取出来，以一个全局单例模式管理。
>
> 几个概念：
>
> - state：存放响应式数据
> - getter：对state进行计算操作，类似computed
> - mutation：用来更改state状态
> - action：类似mutation，用来提交mutation，而不是直接修改state，支持异步
> - module：复杂应用管理状态过多时可以分模块管理
>
> mutation 和 action 的区别：
>
> - 修改`state`顺序，先触发`Action`，`Action`再触发`Mutation`；
> - `mutation` 专注于 `state`，理论上是修改 `state` 唯一途径，`action`可以处理业务代码和异步请求等；
> - `mutation` 必须同步执行，而 `action` 可以异步；

















#### Vue底层知识

##### 对vue响应式理解？

> 

##### 虚拟DOM是什么？

> 

##### diff算法怎么操作？

> 

#####  Vue双向绑定使用和原理

> 

##### key的作用

> 

##### Vue实例挂载的过程中发生了什么

> 挂载过程指的是app.mount()过程，这个过程中整体上做了两件事：**初始化**和**建立更新机制**
>
> 初始化会创建组件实例、初始化组件状态，创建各种响应式数据
>
> 建立更新机制这一步会立即执行一次组件更新函数，这会首次执行组件渲染函数并执行patch将前面获得vnode转换为dom；同时首次执行渲染函数会创建它内部响应式数据之间和组件更新函数之间的依赖关系，这使得以后数据变化时会执行对应的更新函数。







[历时一个月，2.6W字！50+Vue经典面试题源码级详解，你值得收藏！](https://juejin.cn/post/7097067108663558151?searchId=202308011616456423F0F90C827600DFD1#comment)

[【Vue面试专题】金三银四必备！56道经典Vue面试题详解！](https://www.bilibili.com/video/BV11i4y1Q7H2/?vd_source=941f9ecf111722715feda364e69d1949)

