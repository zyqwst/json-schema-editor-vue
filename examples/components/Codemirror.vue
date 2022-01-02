<template>
  <codemirror v-model="content" :options="cmOptions" />
</template>
<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/idea.css'
import 'codemirror/theme/duotone-light.css'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/sql/sql.js'
export default {
  components: { codemirror },
  props: {
    readOnly: {
      type: Boolean,
      default: true
    },
    mode: {
      type: String,
      default: 'text/javascript'
    },
    value: {
      type: String,
      required: true
    },
    theme: {
      type: String,
      default: 'idea'
    },
    lineNumbers: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    value: {
      handler: function (newVal) {
        this.content = newVal
      }
    },
    content: function (newVal) {
      this.$emit('input', newVal)
    }
  },
  data () {
    return {
      content: this.value,
      cmOptions: {
        tabSize: 2,
        mode: this.mode,
        theme: this.theme,
        lineNumbers: this.lineNumbers,
        readOnly: this.readOnly
      }
    }
  }
}
</script>
