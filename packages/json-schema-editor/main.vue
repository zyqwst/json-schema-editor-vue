<template>
  <div class="json-schema-editor">
      json-schema-editor
      <a-input/>
      <a-button type="primary">测试按钮</a-button>
      <a-icon type="step-backward" />
  </div>
</template>
<script>
import { Button, Input, Icon } from 'ant-design-vue'
export default {
  name: 'JsonSchemaEditor',
  components: {
    AButton: Button,
    AInput: Input,
    AIcon:Icon
  }
}
</script>