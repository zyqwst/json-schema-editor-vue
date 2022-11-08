<template>
  <div id="app">
    <div class="title">   
      <a href="https://github.com/zyqwst/json-schema-editor-vue" target="_blank">json-schema-editor-vue</a>
      <span class="version"> version：{{ version }}</span>
    </div>
    <div class="desc">
      <div>A json-schema editor of high efficient and easy-to-use, base on Vue.
        <a @click="visible = true">import json</a>
      </div>
    </div>
    <div class="container">
      <codemirror class="code" v-model="jsonStr" :readOnly="false"/>
      <json-schema-editor class="schema" :value="tree" disabledType lang="zh_CN" custom/>
    </div>
    <a-modal v-model="visible" title="import json" width="800px" height="600x" @ok="handleImportJson">
      <div class="code-container">
        <codemirror class="code" v-model="importJson" :readOnly="false"/>
      </div>
    </a-modal>
  </div>
</template>

<script>
var app = require("../package.json");
import Codemirror  from './components/Codemirror.vue'
import GenerateSchema from 'generate-schema'
export default {
  name: 'App',
  components: { Codemirror },
  computed: {
    jsonStr: {
      get: function () {
        return JSON.stringify(this.tree, null, 2)
      },
      set: function (newVal) {
        this.tree = JSON.parse(newVal)
      }
    }
  },
  data() {
    return {
      version: app.version,
      importJson: '',
      visible: false,
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
  },
  methods: {
    handleImportJson () {
      const  t = GenerateSchema.json(JSON.parse(this.importJson))
      delete t.$schema
      this.tree.root = t
      this.visible = false
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
.version{
  font-size: 16px;
}
.desc{
  padding:20px;
  width:80vw;
  min-width:800px;
  margin:auto;
  padding: 0 3em;
  font-size: 1.2em;
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
.code-container{
  max-height: 600px;
  overflow: auto;
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
.CodeMirror {
  height: 100% !important;
}
.vue-codemirror{
  flex:1;
  margin: 0 24px;
  border: 1px solid rgba(0,0,0,.1);
  min-height:300px;
  overflow: auto;
  border-radius: 6px;
}
</style>
