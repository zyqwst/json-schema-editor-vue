const value = {
    description: null,
    maxLength: null,
    minLength: null,
    pattern: null
}
const attr = {
    description: {
      name: '描述',
      type: 'string',
    },
    maxLength:{
        name:'最大字符数',
        type:'integer'
    },
    minLength:{
        name:'最小字符数',
        type:'integer'
    },
    pattern: {
        name: '正则表达式',
        type:'string'
    }
}
const wrapper = {value, attr}
export default wrapper