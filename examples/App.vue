<template>
  <div id="app">
    <json-schema-editor :disabled="true" :value="tree" :root="true" style="width:600px"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      tree:{
        root: {
          type: "object",
          title: "title",
          properties: {
            field_1: {
              type: "string"
            },
          },
          required: ["field_1"]
        }
      }
    }
  }
}
</script>

