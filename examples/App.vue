<template>
  <div id="app">
    <div class="title">
      Demo
    </div>
    <div class="container">
      <pre>{{tree}}</pre>
      <json-schema-editor class="schema" :value="tree" disabledType lang="zh_CN" custom/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      tree:
      {
  "root": {
    "type": "object",
    "title": "条件",
    "properties": {
      "name": {
        "type": "string",
        "title": "名称",
        "maxLength": 10,
        "minLength": 2
      },
      "appId": {
        "type": "integer",
        "title": "应用ID"
      },
      "credate": {
        "type": "string",
        "title": "创建日期",
        "format": "date"
      }
    },
    "required": [
      "name",
      "appId",
      "credate"
    ]
  }
}
    }
  }
}
</script>
<style>
*{
  padding:0;
  margin:0;
  box-sizing: border-box;
}
.title{
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  height:100px;
  line-height: 100px;
}
.container{
  display: flex;
  padding:20px;
  width:80vw;
  min-width:800px;
  justify-content:center;
  height: calc(100vh - 150px);
  margin:auto;
}
.container>pre {
  font-family: monospace;
  height: 100%;
  overflow-y: auto;
  border:1px solid rgba(0,0,0,.1);
  border-radius: 8px;
  padding: 12px;
  width:50%
}
.schema{
  margin-left: 20px;
  width:50%;
  height: 100%;
  overflow-y: auto;
  overflow-x:hidden;
  border:1px solid rgba(0,0,0,.1);
  border-radius: 8px;
  padding: 12px;
}
</style>
