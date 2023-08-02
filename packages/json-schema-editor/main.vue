<template>
  <div class="json-schema-editor">
      <a-row class="row" :gutter="10">
        <a-col :span="8" class="ant-col-name">
          <div :style="{marginLeft:`${20*deep}px`}" class="ant-col-name-c">
            <a-button v-if="pickValue.type==='object'" type="link" :icon="hidden?'caret-right':'caret-down'" style="color:rgba(0,0,0,.65)" @click="hidden = !hidden"/>
            <span v-else style="width:32px;display:inline-block"></span>
            <a-input :disabled="disabled || root" :value="pickKey" class="ant-col-name-input" @blur="onInputName"/>
          </div>
          <a-tooltip v-if="root">
            <span slot="title" v-text="local['checked_all']">全选</span>
            <a-checkbox :disabled="!isObject && !isArray"  class="ant-col-name-required" @change="onRootCheck"/>
          </a-tooltip>
          <a-tooltip v-else>
            <span slot="title" v-text="local['required']">是否必填</span>
            <a-checkbox :disabled="isItem" :checked="checked" class="ant-col-name-required" @change="onCheck"/>
          </a-tooltip>
        </a-col>
        <a-col :span="4">
          <a-select v-model="pickValue.type" :disabled="disabledType" class="ant-col-type" @change="onChangeType" :getPopupContainer="
          triggerNode => {
            return triggerNode.parentNode || document.body;
          }"
        >
            <a-select-option :key="t" v-for="t in TYPE_NAME">
              {{t}}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col>
          <a-input :value="pickValue.title" class="ant-col-title" :placeholder="local['title']" @blur="onInputTitle"/>
        </a-col>
        <a-col :span="6" class="ant-col-setting">
          <a-tooltip>
            <span slot="title" v-text="local['adv_setting']">高级设置</span>
            <a-button type="link" icon="setting" class="setting-icon" @click="onSetting"/>
          </a-tooltip>
          <a-tooltip v-if="isObject">
            <span slot="title" v-text="local['add_child_node']">添加子节点</span>
            <a-button type="link" icon="plus" class="plus-icon" @click="addChild"/>
          </a-tooltip>
          <a-tooltip v-if="!root && !isItem">
            <span slot="title" v-text="local['remove_node']">删除节点</span>
            <a-button type="link" class="close-icon ant-btn-icon-only" @click="removeNode">
              <i aria-label="icon: plus" class="anticon anticon-plus">
              <svg viewBox="64 64 896 896" data-icon="plus" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M810.666667 273.493333L750.506667 213.333333 512 451.84 273.493333 213.333333 213.333333 273.493333 451.84 512 213.333333 750.506667 273.493333 810.666667 512 572.16 750.506667 810.666667 810.666667 750.506667 572.16 512z" p-id="1142"></path></svg>
              </i>
            </a-button>
          </a-tooltip>
        </a-col>
      </a-row>
      <template v-if="!hidden&&pickValue.properties && !isArray">
        <json-schema-editor  v-for="(item,key,index) in pickValue.properties" :value="{[key]:item}" :parent="pickValue" :key="index" :deep="deep+1" :root="false" class="children" :lang="lang" :custom="custom"/>
      </template>
      <template v-if="isArray">
        <json-schema-editor  :value="{items:pickValue.items}" :deep="deep+1" disabled isItem :root="false" class="children" :lang="lang" :custom="custom"/>
      </template>
      <a-modal v-model="modalVisible" v-if="modalVisible" :title="local['adv_setting']" :maskClosable="false" :okText="local['ok']" :cancelText="local['cancel']" width="800px" @ok="handleOk" dialogClass="json-schema-editor-advanced-modal">
        <h3 v-text="local['base_setting']">基础设置</h3>
        <a-form v-model="advancedValue" class="ant-advanced-search-form">
          <a-row :gutter="6">
            <a-col :span="8" v-for="(item,key) in advancedValue" :key="key">
              <a-form-item>
                <span>{{ local[key] }}</span>
                <a-input-number v-model="advancedValue[key]" v-if="advancedAttr[key].type === 'integer' || advancedAttr[key].type === 'number'" style="width:100%" :placeholder="key"/>
                <span v-else-if="advancedAttr[key].type === 'boolean'" style="display:inline-block;width:100%">
                  <a-switch v-model="advancedValue[key]"/>
                </span>
                <a-textarea @blur="changeEnumValue" :value="enumText" :rows="2" v-else-if="key === 'enum'" :placeholder="local['enum_msg']"></a-textarea>
                <a-select v-else-if="advancedAttr[key].type === 'array'" v-model="advancedValue[key]" style="width:100%" :getPopupContainer="
                triggerNode => {
                  return triggerNode.parentNode || document.body;
                }"
                 :placeholder="local[key]"
                > 
                  <a-select-option value="">{{ local['nothing'] }}</a-select-option>
                  <a-select-option :key="t" v-for="t in advancedAttr[key].enums">
                    {{t}}
                  </a-select-option>
                </a-select>
                <a-input v-model="advancedValue[key]" v-else style="width:100%" :placeholder="key"/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <h3 v-text="local['add_custom']" v-show="custom">添加自定义属性</h3>
        <a-form class="ant-advanced-search-form" v-show="custom">
          <a-row :gutter="6">
            <a-col :span="8" v-for="item in customProps" :key="item.key">
              <a-form-item :label="item.key">
                <a-input v-model="item.value" style="width:calc(100% - 30px)"/>
                <a-button icon="close" type="link" @click="removeCustomNode(item.key)" style="width:30px"></a-button>  
              </a-form-item>
            </a-col>
            <a-col :span="8" v-show="addProp.key != undefined">
              <a-form-item>
                <a-input slot="label" v-model="addProp.key" style="width:100px"/>
                <a-input v-model="addProp.value" style="width:100%"/>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item>
                <a-button icon="check" type="link" @click="confirmAddCustomNode(null)" v-if="customing"></a-button>  
                <a-tooltip :title="local['add_custom']" v-else>
                  <a-button icon="plus" type="link" @click="addCustomNode"></a-button>  
                </a-tooltip>
              </a-form-item>
            </a-col>
          </a-row> 
        </a-form>
        <h3 v-text="local['preview']">预览</h3>
        <pre style="width:100%">{{completeNodeValue}}</pre>
      </a-modal>
  </div>
</template>
<script>
import Vue from 'vue'
import { isNull, renamePropertyAndKeepKeyPrecedence } from './util'
import {TYPE_NAME, TYPE} from './type/type'
import { Row,Col,Button,Input,InputNumber, Icon,Checkbox,Select,Tooltip,Modal,Form,Switch} from 'ant-design-vue'
import LocalProvider from './LocalProvider'
Modal.install(Vue)
export default {
  name:'JsonSchemaEditor',
  components: {
    ARow:Row,ACol:Col,
    AButton: Button,
    // eslint-disable-next-line vue/no-unused-components
    AIcon: Icon,
    AInput: Input,AInputNumber:InputNumber,ATextarea: Input.TextArea,
    ACheckbox: Checkbox,
    ASelect: Select,
    ASelectOption:Select.Option,
    ATooltip: Tooltip,
    AModal:Modal,
    AForm:Form,
    AFormItem: Form.Item,
    ASwitch: Switch
  },
  props:{
    value: {
      type: Object,
      required:true
    },
    disabled: { //name不可编辑，根节点name不可编辑,数组元素name不可编辑
      type: Boolean,
      default: false
    },
    disabledType: { //禁用类型选择
      type: Boolean,
      default: false
    },
    isItem: { //是否数组元素
      type: Boolean,
      default: false
    },
    deep:{ // 节点深度，根节点deep=0
      type:Number,
      default: 0
    },
    root:{ //是否root节点
      type:Boolean,
      default:true
    },
    parent: { //父节点
      type: Object,
      default: null
    },
    custom: { //enable custom properties
      type: Boolean,
      default: false
    },
    lang: { // i18n language
      type: String,
      default: 'zh_CN'
    }
  },
  computed: {
    pickValue(){
      return  Object.values(this.value)[0]
    },
    pickKey(){
      return  Object.keys(this.value)[0]
    },
    isObject(){
      return this.pickValue.type === 'object'
    },
    isArray(){
      return this.pickValue.type === 'array'
    },
    checked(){
      return this.parent && this.parent.required && this.parent.required.indexOf(this.pickKey) >= 0
    },
    advanced(){
      return TYPE[this.pickValue.type]
    },
    advancedAttr(){
      return TYPE[this.pickValue.type].attr
    },
    ownProps () {
      return [ 'type', 'title', 'properties', 'items','required', ...Object.keys(this.advancedAttr)]
    },
    advancedNotEmptyValue(){
      const jsonNode = Object.assign({},this.advancedValue);
      for(let key in jsonNode){
        isNull(jsonNode[key]) && delete jsonNode[key]
      }
      return jsonNode
    },
    completeNodeValue(){
      const t = {}
      const basicValue = { ...this.pickValue }
      for(const item of this.customProps){
        t[item.key] = item.value
      }
      this._pickDiffKey().forEach(key => delete basicValue[key])
      return Object.assign({}, basicValue, t,this.advancedNotEmptyValue)
    },
    enumText () {
      const t = this.advancedValue['enum']
      if (!t) return ''
      if (!t.length) return ''
      return t.join('\n')
    }
  },
  data(){
    return {
      TYPE_NAME,
      hidden:false,
      countAdd: 1,
      modalVisible: false,
      advancedValue:{},
      addProp:{},// 自定义属性
      customProps: [],
      customing: false,
      local: LocalProvider(this.lang)
    }
  },
  methods: {
    onInputName(e){
      const oldKey = this.pickKey
      const newKey = e.target.value
      if(oldKey === newKey) return

      // const nodeValue = this.parent.properties[oldKey]

      // // 替换key名
      // this.$delete(this.parent.properties, oldKey)
      // this.$set(this.parent.properties, newKey, nodeValue)
      const _this = this
      renamePropertyAndKeepKeyPrecedence(_this, this.parent.properties,[ oldKey, newKey ])

      // required重新设置
      const requireds = this.parent.required || []
      const oldIndex = requireds.indexOf(oldKey)
      if(requireds.length > 0 && oldIndex > -1) {
        requireds.splice(oldIndex, 1)
        requireds.push(newKey)
        this.$set(this.parent,'required', [...new Set(requireds)])
      }
    },
    onInputTitle(e) {
      this.$set(this.pickValue, 'title', e.target.value)
    },
    onChangeType() {
      this.parseCustomProps()
      // 删除自定义属性
      this.customProps.forEach(item => {
        this.$delete(this.pickValue, item.key)
      });
      this.customProps = [];

      this.$delete(this.pickValue,'properties')
      this.$delete(this.pickValue,'items')
      this.$delete(this.pickValue,'required')
      this.$delete(this.pickValue,'format')
      this.$delete(this.pickValue,'enum')

      if(this.isArray){
        this.$set(this.pickValue,'items',{type:'string'})
      }
    },
    onCheck(e){
      this._checked(e.target.checked,this.parent)
    },
    onRootCheck(e){
     this._deepCheck( e.target.checked,this.pickValue)
    },
    changeEnumValue (e) {
      const pickType = this.pickValue.type
      const value = e.target.value

      if(!value || value===''){
        this.advancedValue.enum = null
        return
      }
      var arr = value.split('\n')

      if (pickType === 'string') {
        this.advancedValue.enum = arr.map(item => item);
      } else {
        if(arr.length ===0 || (arr.length === 1 && arr[0]=='')) {
          this.advancedValue.enum = null
        }else {
          this.advancedValue.enum = arr.map(item => +item);
        }
      }
    },
    _deepCheck(checked,node){
      if(node.type === 'object' && node.properties){
        checked ? this.$set(node,'required',Object.keys(node.properties)) : this.$delete(node,'required')
        Object.keys(node.properties).forEach(key => this._deepCheck(checked,node.properties[key]))
      } else if(node.type === 'array' && node.items.type === 'object'){
        checked ? this.$set(node.items,'required',Object.keys(node.items.properties)) : this.$delete(node.items,'required')
        Object.keys(node.items.properties).forEach(key => this._deepCheck(checked,node.items.properties[key]))
      }
    },
    _checked(checked,parent){
      let required = parent.required
      if(checked){
        required || this.$set(this.parent,'required',[])

        required = this.parent.required
        required.indexOf(this.pickKey) === -1 && required.push(this.pickKey)
      }else{
        const pos = required.indexOf(this.pickKey)
        pos >=0 && required.splice(pos,1)
      }
      required.length === 0 && this.$delete(parent,'required')
    },
    addChild(){
      const name = this._joinName()
      const type = 'string'
      const node = this.pickValue
      node.properties || this.$set(node,'properties',{})
      const props = node.properties
      this.$set(props,name,{type: type, title: ''})
    },
    parseCustomProps () {
      const ownProps = this.ownProps
      Object.keys(this.pickValue).forEach(key => {
        if (ownProps.indexOf(key) === -1) {
          this.confirmAddCustomNode({ key: key, value: this.pickValue[key] })
          // this.$delete(this.pickValue,key)
        }
      })
    },
    addCustomNode(){
      this.$set(this.addProp,'key',this._joinName())
      this.$set(this.addProp,'value','')
      this.customing = true
    },
    removeCustomNode(key) {
      this.customProps.forEach((item,index) => {
        if (item.key === key) {
          this.customProps.splice(index,1)
          return
        }
      })
    },
    confirmAddCustomNode(prop) {
      const p = prop || this.addProp
      let existKey = false
      this.customProps.forEach(item => {
        if (item.key === p.key) {
          existKey = true
        }
      })
      if (existKey) return
      this.customProps.push(p)
      this.addProp = {}
      this.customing = false
    },
    removeNode(){
      const { properties,required } = this.parent 
      this.$delete(properties,this.pickKey)
      if(required){
        const pos = required.indexOf(this.pickKey)
        pos >=0 && required.splice(pos,1)
        required.length === 0 && this.$delete(this.parent,'required')
      }      
    },
    _joinName(){
      return  `field_${this.deep}_${this.countAdd++}`
    },
    onSetting(){
      this.modalVisible = true
      this.advancedValue = { ...this.advanced.value }
      for(const k in this.advancedValue) {
        if(this.pickValue[k]) {
          this.advancedValue[k] = this.pickValue[k]
        }
      }
      this.parseCustomProps()
    },

    handleOk(){
      this.modalVisible = false
      for(const key in this.advancedValue){
        if(isNull(this.advancedValue[key])){
          this.$delete(this.pickValue,key)
        }else {
          this.$set(this.pickValue,key,this.advancedValue[key])
        }
      }
      const diffKey = this._pickDiffKey()
      diffKey.forEach(key => this.$delete(this.pickValue,key))
      for(const item of this.customProps){
        this.$set(this.pickValue,item.key,item.value)
      }
    },
    _pickDiffKey () {
      const keys = Object.keys(this.pickValue)
      return keys.filter(item => this.ownProps.indexOf(item) === -1)
    }
  }
}
</script>
<style scoped>
.json-schema-editor .row {
  display: flex;
  margin: 12px;
}
.json-schema-editor .row .ant-col-name {
  display: flex;
  align-items: center;
}
.json-schema-editor .row .ant-col-name .ant-col-name-c {
  display: flex;
  align-items: center;
}
.json-schema-editor .row .ant-col-name .ant-col-name-required {
  flex: 0 0 24px;
  text-align: center;
}
.json-schema-editor .row .ant-col-type {
  width: 100%;
}
.json-schema-editor .row .ant-col-setting {
  display: inline-block;
}
.json-schema-editor .row .setting-icon {
  color: rgba(0, 0, 0, 0.45);
  border: none;
}
.json-schema-editor .row .plus-icon {
  border: none;
}
.json-schema-editor .row .close-icon {
  color: #888;
  border: none;
}
</style>
<style>
.json-schema-editor-advanced-modal {
  color: rgba(0, 0, 0, 0.65);
  min-width: 600px;
}
.json-schema-editor-advanced-modal pre {
  font-family: monospace;
  height: 100%;
  overflow-y: auto;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 12px;
  width: 50%;
}
.json-schema-editor-advanced-modal h3 {
  display: block;
  border-left: 3px solid #1890ff;
  padding: 0 8px;
}
.json-schema-editor-advanced-modal .ant-advanced-search-form .ant-form-item {
  display: flex;
}
.json-schema-editor-advanced-modal .ant-advanced-search-form .ant-form-item .ant-form-item-control-wrapper {
  flex: 1;
}

</style>