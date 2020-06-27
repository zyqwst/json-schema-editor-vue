# json-schema-editor-vue

A json-schema editor of high efficient and easy-to-use, base on Vue
### Usage
```
npm install json-schema-editor-vue
```

```
import JsonSchemaEditor from '../packages/index'
Vue.use(JsonSchemaEditor)
```
```
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