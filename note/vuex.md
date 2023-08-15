---
title: Vuex
date: 2021-05-10 11:13:30
---

##### 什么是Vuex？

>Vuex 是专门为 Vue 应用程序开发的**状态管理模式**，它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

##### 开始

> 每一个 Vuex 应用的核心就是 store (仓库) 。store 基本上就是一个容器，它包含着你的应用中大部分**状态 (state)** 。Vuex 和单纯的全局对象有以下两点不同：
>
> ​	1、Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，	那么相应的组件也会相应地得到高效更新；
>
> ​	2、不能直接更改 store 中的状态。改变 store 中的状态唯一途径就是显式地**提交 (commit) mutation**。	这样使得我们可以方便的跟踪每一个状态变化，从而让我们能够实现一些工具让我们更好地了解我们的应	用。(vue-devtools)

##### 核心概念

##### State (状态)

> Vuex 使用**单一状态树**。(用一个对象包含了全部应用层级状态，至此它便作为一个“唯一数据源(SSOT)”而存在，也就意味着，每个应用仅仅包含一个 store 实例。)

```javascript
// Vuex（定义）
import Vue from 'vue'
import Vuex from 'vuex'
import { getTodoList } from '@/api'
import { TimeUtil } from '@/utils'
Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    count: 0,
    todoList: [],
  },
})

// Vue（使用）
<template>
  <div class="about-box">
    <h3>vuexDemo</h3>
    count: {{count}}
    <div class="todos">
      <h4>todoList:</h4>
      <p v-for="item in todoList" :key=item.paramsId>{{item.todo}}<br/><br/></p>
    </div>
    <button type="primary" @click="getTodos">getTodos</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'vuex-demo',
  computed: {
    // ...mapState(['count', 'todoList']),
    count() {
      return this.$store.state.count
    },
    todoList() {
      return this.$store.state.todoList
    },
  },
}
</script>
```

##### Getter (可以认为是store的computed)

> 有时候需要从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数，如果多个组件需要用到此属性，我们需要复制这个函数或者提取到一个共享函数然后需要的地方导入它——无论哪一种方式都不理想。
>
> Vuex 允许我们在 store 中定义 “getter”，(可以认为是 store 的计算属性)。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

```javascript
// Getter 接受 state 作为其第一个参数：
// Vuex定义
import Vue from 'vue'
import Vuex from 'vuex'
import { getTodoList } from '@/api'
import { TimeUtil } from '@/utils'
Vue.use(Vuex)
let timeUtil = new TimeUtil()
export const store = new Vuex.Store({
  state: {
    todoList: [],
  },
  getters: {
    getTodayTodoList: state => {
      return state.todoList.filter(item => timeUtil.isToday(item.time))
    }
  },
  mutations: {
    updateTodoList: (state, payload) => {
      state.todoList = payload.todos
    },
  },
  actions: {
    getTodoList(context) {
      getTodoList()
        .then(res => {
          const {data} = res
          let todos = []
          for(let [key, value] of Object.entries(data)) {
            value.paramsId = key
            todos.push(value)
          }
          context.commit({type: 'updateTodoList', todos})
        })
    }
  },
})

// Vue使用
<template>
  <div class="about-box">
    <h3>vuexDemo</h3>
    <div class="todos">
      <h4>todoList:</h4>
      <p v-for="item in todoList" :key=item.paramsId>{{item.todo}}<br/><br/></p>
    </div>
    <div class="todos">
      <h4>getTodayTodoList:</h4>
      <p v-for="item in getTodayTodoList" :key=item.paramsId>{{item.todo}}<br/><br/></p>
    </div>
    <br/>
    <button type="primary" @click="getTodos">getTodos</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'vuex-demo',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['getTodayTodoList']),
    // getTodayTodoList() {
    //   return this.$store.getters.getTodayTodoList
    // }
  },
  methods: {
    getTodos() {
      this.$store.dispatch('getTodoList')
    }
  },
}
</script>
```

##### Mutation

> 更改 Vuex 的 store 中状态的唯一方法就是提交 mutation。mutation 类似于事件：每一个 mutation 都有一个字符串的 **事件类型 (type)** 和一个 **回调函数 (handler)**。 
>
> mutation 操作接受 state 做为第一个参数
>
> mutation 通过 commit 触发，可以传入额外的参数，即提交载荷 (payload)
>
> mutation 需要遵循 Vue 的响应规则
>
> mutation 必须是同步函数

```javascript
// Vuex 定义
import Vue from 'vue'
import Vuex from 'vuex'
import { getTodoList } from '@/api'
import { TimeUtil } from '@/utils'
Vue.use(Vuex)
let timeUtil = new TimeUtil()
export const store = new Vuex.Store({
  state: {
    count: 0,
    todoList: [],
  },
  mutations: {
    increment(state) {
      state.count ++
    },
    decrement: state => {
      state.count --
    },
    incrementNum: (state, payload) => {
      state.count += payload
    },
    decrementNum: (state, payload) => {
      state.count -= payload.amount
    },
  },
})

// Vue 使用
<template>
  <div class="about-box">
    <h3>vuexDemo</h3>
    count: {{count}}
    <br/>
    <button type="primary" @click="increment">+</button>&emsp;
    <button type="primary" @click="incrementNum">+10</button>&emsp;
    <button type="primary" @click="decrement">-</button>&emsp;
    <button type="primary" @click="decrementNum(10)">-10</button>&emsp;
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'vuex-demo',
  computed: {
    // ...mapState(['count']),
    count() {
      return this.$store.state.count
    },
  },
  methods: {
    ...mapMutations(['increment', 'decrement']),
    incrementNum() {
      this.$store.commit('incrementNum', 10)
    },
    decrementNum(num) {
      // this.$store.commit('decrementNum',{amount: num})
      this.$store.commit({type:'decrementNum', amount: num})
    },
  },
}
</script>
```

##### Action

> action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此可以调用 context.commit 提交一个mutation， 或者 context.state 和 context.getters 来获取 state 和 getters。
>
> action 通过 dispatch 触发，支持同样的载荷方式和对象方式进行分发
>
> action 类似于 mutation，不同在于：
>
> ​	1、action 提交的是 mutation，而不是直接变更状态；
>
> ​	2、action 可以包含任意异步操作。

```javascript
// Vuex 定义
import Vue from 'vue'
import Vuex from 'vuex'
import { getTodoList } from '@/api'
import { TimeUtil } from '@/utils'
Vue.use(Vuex)
let timeUtil = new TimeUtil()
export const store = new Vuex.Store({
  state: {
    todoList: [],
  },
  getters: {
    getTodayTodoList: state => {
      return state.todoList.filter(item => timeUtil.isToday(item.time))
    }
  },
  mutations: {
    updateTodoList: (state, payload) => {
      state.todoList = payload.todos
    },
  },
  actions: {
    getTodoList(context) {
      getTodoList()
        .then(res => {
          const {data} = res
          let todos = []
          for(let [key, value] of Object.entries(data)) {
            value.paramsId = key
            todos.push(value)
          }
          context.commit({type: 'updateTodoList', todos})
        })
    }
  },
})

// Vue 使用
<template>
  <div class="about-box">
    <h3>vuexDemo</h3>
    <div class="todos">
      <h4>todoList:</h4>
      <br/>
      <p v-for="item in todoList" :key=item.paramsId>{{item.todo}}<br/><br/></p>
    </div>
    <div class="todos">
      <h4>getTodayTodoList:</h4>
      <br/>
      <p v-for="item in getTodayTodoList" :key=item.paramsId>{{item.todo}}<br/><br/></p>
    </div>
    <br/>
    <br/>
    <button type="primary" @click="getTodos">getTodos</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'vuex-demo',
  computed: {
    ...mapGetters(['getTodayTodoList']),
    // getTodayTodoList() {
    //   return this.$store.getters.getTodayTodoList
    // }
  },
  methods: {
    getTodos() {
      this.$store.dispatch('getTodoList')
    }
  },
}
</script>
```

