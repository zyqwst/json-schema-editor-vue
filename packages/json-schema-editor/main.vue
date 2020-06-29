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
            <span slot="title">全选</span>
            <a-checkbox :disabled="!isObject && !isArray"  class="ant-col-name-required" @change="onRootCheck"/>
          </a-tooltip>
          <a-tooltip v-else>
            <span slot="title">是否必填</span>
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
          <a-input v-model="pickValue.title" class="ant-col-title" placeholder="标题"/>
        </a-col>
        <a-col :span="6" class="ant-col-setting">
          <a-tooltip>
            <span slot="title">设置属性</span>
            <a-button type="link" icon="setting" class="setting-icon" @click="onSetting"/>
          </a-tooltip>
          <a-tooltip v-if="isObject">
            <span slot="title">添加子节点</span>
            <a-button type="link" icon="plus" class="plus-icon" @click="addChild"/>
          </a-tooltip>
          <a-tooltip v-if="!root && !isItem">
            <span slot="title">删除节点</span>
            <a-button type="link" class="close-icon ant-btn-icon-only" @click="removeNode">
              <i aria-label="icon: plus" class="anticon anticon-plus">
              <svg viewBox="64 64 896 896" data-icon="plus" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M810.666667 273.493333L750.506667 213.333333 512 451.84 273.493333 213.333333 213.333333 273.493333 451.84 512 213.333333 750.506667 273.493333 810.666667 512 572.16 750.506667 810.666667 810.666667 750.506667 572.16 512z" p-id="1142"></path></svg>
              </i>
            </a-button>
          </a-tooltip>
        </a-col>
      </a-row>
      <template v-if="!hidden&&pickValue.properties && !isArray">
        <json-schema-editor  v-for="(item,key,index) in pickValue.properties" :value="{[key]:item}" :parent="pickValue" :key="index" :deep="deep+1" :root="false" class="children"/>
      </template>
      <template v-if="isArray">
        <json-schema-editor  :value="{items:pickValue.items}" :deep="deep+1" disabled isItem :root="false" class="children"/>
      </template>
      <a-modal v-model="modalVisible" title="高级设置" :maskClosable="false" okText="确认" cancelText="取消" width="700px" @ok="handleOk" dialogClass="json-schema-editor-advanced-modal">
        <h3>基础设置</h3>
        <a-form-model :model="advancedValue" layout="inline">
          <a-form-model-item :label="advancedAttr[key].name" v-for="(item,key) in advancedValue" :key="key">
            <a-input-number v-model="advancedValue[key]" v-if="advancedAttr[key].type === 'integer'"/>
            <a-input-number v-model="advancedValue[key]" v-else-if="advancedAttr[key].type === 'number'"/>
            <a-switch  v-else-if="advancedAttr[key].type === 'boolean'" v-model="advancedValue[key]" checked-children="是" un-checked-children="否" />
            <a-select v-else-if="advancedAttr[key].type === 'array'" style="width:120px" v-model="advancedValue[key]" :getPopupContainer="
            triggerNode => {
              return triggerNode.parentNode || document.body;
            }"
            > 
              <a-select-option value="">无</a-select-option>
              <a-select-option :key="t" v-for="t in advancedAttr[key].enums">
                {{t}}
              </a-select-option>
            </a-select>
            
            <a-input v-model="advancedValue[key]" allowClear v-else/>
          </a-form-model-item>
        </a-form-model>
        <h3>预览</h3>
        <pre style="width:100%">{{completeNodeValue}}</pre>
      </a-modal>
  </div>
</template>
<script>
import { isNull } from './util'
import {TYPE_NAME, TYPE} from './type/type'
import { Row,Col,Button,Input,InputNumber, Icon,Checkbox,Select,Tooltip,Modal,FormModel,Switch} from 'ant-design-vue'
export default {
  name:'JsonSchemaEditor',
  components: {
    ARow:Row,ACol:Col,
    AButton: Button,
    // eslint-disable-next-line vue/no-unused-components
    AIcon: Icon,
    AInput: Input,AInputNumber:InputNumber,
    ACheckbox: Checkbox,
    ASelect: Select,
    ASelectOption:Select.Option,
    ATooltip: Tooltip,
    AModal:Modal,
    AFormModel:FormModel,
    AFormModelItem: FormModel.Item,
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
    advancedNotEmptyValue(){
      const jsonNode = Object.assign({},this.advancedValue);
      for(let key in jsonNode){
        isNull(jsonNode[key]) && delete jsonNode[key]
      }
      return jsonNode
    },
    completeNodeValue(){
      return Object.assign({},this.pickValue,this.advancedNotEmptyValue)
    }
  },
  data(){
    return {
      TYPE_NAME,
      hidden:false,
      countAdd: 1,
      modalVisible: false,
      advancedValue:{}
    }
  },
  methods: {
    onInputName(e){
      const val = e.target.value
      const p = {};
      for(let key in this.parent.properties){
        if(key != this.pickKey){
          p[key] = this.parent.properties[key]
        }else{
          p[val] = this.parent.properties[key]
          delete this.parent.properties[key]
        }
      }
      this.$set(this.parent,'properties',p)
    },
    onChangeType() {
      this.$delete(this.pickValue,'properties')
      this.$delete(this.pickValue,'items')
      this.$delete(this.pickValue,'required')
      if(this.isArray){
        this.$set(this.pickValue,'items',{type:'string'})
      }
    },
    onCheck(e){
      this._checked(e.target.checked,this.parent)
    },
    onRootCheck(e){
     const checked = e.target.checked
     this._deepCheck(checked,this.pickValue)
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
      this.$set(props,name,{type: type})
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
      return  `feild_${this.deep}_${this.countAdd++}`
    },
    onSetting(){
      this.modalVisible = true
      this.advancedValue = this.advanced.value
    },

    handleOk(){
      this.modalVisible = false
      for(let key in this.advancedValue){
        if(isNull(this.advancedValue[key])){
          this.$delete(this.pickValue,key)
        }else {
          this.$set(this.pickValue,key,this.advancedValue[key])
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.json-schema-editor{
  .row{
    display: flex;
    margin:12px;
    .ant-col-name{
      display:flex;
      align-items:center;
       .ant-col-name-c{
         display: flex;
         align-items: center;
       }
      .ant-col-name-required{
      flex:0 0 24px;
      text-align:center;
      }
    }
    .ant-col-type{
      width: 100%;
    }
    .ant-col-setting{
      display: inline-block;
    }
    .setting-icon{
      color:rgba(0,0,0,.45);
    }
    .plus-icon{
      color:#5B8FF9;
    }
    .close-icon{
      color:#E8684A
    }
  }
  
}
</style>
<style lang="less">
.json-schema-editor-advanced-modal{
    color: rgba(0,0,0,.65);
    min-width:600px;
    pre {
      font-family: monospace;
      height: 100%;
      overflow-y: auto;
      border:1px solid rgba(0,0,0,.1);
      border-radius: 4px;
      padding: 12px;
      width:50%
    }
    h3{
      display: block;
      border-left: 3px solid #1890ff;
      padding:0 8px;
    }
  }
</style>