##### 1、Vue3自定义环境变量（Hbuilderx自定义发行）

> 1、配置package.json文件
>
> ​	  环境变量配置在package.json里面，不是vite.config.js
>
> ```json
> {
>   "name": "testvue3",
>   "version": "1.0.0",
>   "description": "",
>   "main": "index.js",
>   "uni-app": {
>       "scripts": {
>         "h5-dev": {
>           "title":"摩经纪-dev",
>           "browser":"chrome",
>           "env": {
>             "UNI_PLATFORM": "h5",
>             "ENV_NAME": "摩经纪-开发测试环境",
>             "BASE_URL": "https://gateway-test.moerlong.com/mjj/mjj/"
>           }
>         },
>         "h5-prod": {
>           "title":"摩经纪-prod",
>           "browser":"chrome",
>           "env": {
>             "UNI_PLATFORM": "h5",
>             "ENV_NAME": "摩经纪-生产环境",
>             "BASE_URL": "https://gateway.moerlong.com/mjj/mjj/"
>           }
>         }
>       }    
>   },
>   "author": "",
>   "license": "ISC"
> }
> ```
>
> 2、在项目中获取配置信息
>
> ```vue
> <template>
> 	<view class="content">
>     <view class="env">{{envObj.ENV_NAME}}</view>
>     <view class="env">{{envObj.BASE_URL}}</view>
> 	</view>
> </template>
> <script setup>
> 	import { ref } from "vue"
> 	const envObj = ref({})
>   envObj.value = process.env
> </script>
> ```
>
> 3、发行测试或者生产时候，发行 -> 自定义发行 找到对应环境选项
