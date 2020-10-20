
<p align="center">
  <img width="60" src="https://gitee.com/hz8866/json-schema-editor-vue/raw/master/examples/assets/logo.png">
</p>
<h1 align="center">
  <a href="http://json-schema.sviip.com/" target="_blank">json-schema-editor-vue</a>
</h1>

[![Start](https://img.shields.io/github/stars/zyqwst/json-schema-editor-vue?style=social)](https://github.com/zyqwst/json-schema-editor-vue/stargazers)
[![Fork](https://img.shields.io/github/forks/zyqwst/json-schema-editor-vue?style=social)](https://github.com/zyqwst/json-schema-editor-vue/fork)
[![GitHub open issues](https://img.shields.io/github/issues/zyqwst/json-schema-editor-vue.svg)](https://github.com/zyqwst/json-schema-editor-vue/issues?q=is%3Aopen+is%3Aissue)
[![npm download](https://img.shields.io/npm/dt/json-schema-editor-vue.svg?maxAge=30)](https://www.npmjs.com/package/json-schema-editor-vue)
[![npm download per month](https://img.shields.io/npm/dm/json-schema-editor-vue.svg)](https://www.npmjs.com/package/json-schema-editor-vue)
[![npm version](https://img.shields.io/npm/v/json-schema-editor-vue.svg)](https://www.npmjs.com/package/json-schema-editor-vue)
[![MIT License](https://img.shields.io/github/license/zyqwst/json-schema-editor-vue.svg)](https://github.com/zyqwst/json-schema-editor-vue/blob/master/LICENSE)

A json-schema editor of high efficient and easy-to-use, base on Vue
<p align="center">
  <img width="100%" src="https://gitee.com/hz8866/json-schema-editor-vue/raw/master/examples/assets/capture.png">
</p>

**支持自定义属性，满足特殊的需求**
<p align="center">
  <img width="100%" src="https://gitee.com/hz8866/json-schema-editor-vue/raw/master/examples/assets/custom.png">
</p>

### Example
**Demo** [http://json-schema.sviip.com](http://json-schema.sviip.com) 

**[国内Demo](http://json-schema-editor.sviip.com)**
### Usage

```bash
npm install json-schema-editor-vue
```

```vue
import JsonSchemaEditor from 'json-schema-editor-vue'
import 'json-schema-editor-vue/lib/json-schema-editor-vue.css'
Vue.use(JsonSchemaEditor)
```

```vue
<template>
  <div id="app">
    ...
    <json-schema-editor :value="tree"/>
    ...
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      tree:
      {
        root: {
          type: "object"
        }
      }
    }
  }
}
</script>
```
### json-schema-editor-vue属性说明如下：

|属性|说明|类型|是否必须|默认值|
:-|:-|:-|:-|:-
|value|传入一个默认的树节点，用来接收编辑后的json schema结果|Object|是||
|disabled|节点名称不可编辑|Boolean||`false`|
|disabledType|节点类型不可选择|Boolean||`false`|
|root|是否是根节点|Boolean||`true`|
|custom|是否允许添加自定义属性|Boolean||`false`|
|lang|国际化(可选zh_CN和en_US)|String||`zh_CN`|

Don't forget to star if it helped!
如果对您有帮助，别忘记给个星哦

### Links

- [json-schema-editor-visual](https://github.com/YMFE/json-schema-editor-visual)
- [vue-json-schema-editor-visual](https://github.com/giscafer/vue-json-schema-editor-visual)