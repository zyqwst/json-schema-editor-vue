
<p align="center">
  <img width="60" src="https://github.com/zyqwst/json-schema-editor-vue/blob/master/examples/assets/logo.png">
</p>
<h1 align="center">json-schema-editor-vue</h1>
<p align="center">A json-schema editor of high efficient and easy-to-use, base on Vue</p>
<p align="center">
  <img width="100%" src="https://raw.githubusercontent.com/zyqwst/json-schema-editor-vue/master/examples/assets/capture.png">
</p>

### Usage

```
npm install json-schema-editor-vue
```

```vue
import JsonSchemaEditor from '../packages/index'
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

Don't forget to star if it helped!

如果对您有帮助，别忘记给个星哦
