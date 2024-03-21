export function clearAttr(obj) {
  for(let key in obj){
    delete obj[key]
  }
}
/**
 * 快速拷贝两个对象的属性值
 * @param {*} source 
 * @param {*} target 
 */
export function copyAttr(source, target){
  Object.keys(target).forEach(key=>{target[key]=source[key]})
}

export function isNull(ele){
  if(typeof ele==='undefined'){
    return true;
  }else if(ele===null){
    return true;
  }else if(ele===''){
    return true;
  }
  return false;
}
export function renamePropertyAndKeepKeyPrecedence(_this, obj, [oldKey, newKey]) {
  const descriptors = Object.getOwnPropertyDescriptors(obj)
  if (Object.prototype.hasOwnProperty.call(descriptors, oldKey)) {
    Object.entries(descriptors)
      .reduce((target, [key, descriptor]) => {
        if(key === '__ob__') return target
        // Reflect.deleteProperty(target, key)
        _this.$delete(target, key)
        if (key === oldKey) {
          key = newKey
        }
        // // Reflect.defineProperty(target, key, descriptor)
        _this.$set(target, key, descriptor.get())
        return target;
      }, obj)
  }
  return obj
}
/**过滤数组元素 */
export function arrayDifference(basicArr, arr) {
  return arr.filter(item => !basicArr.includes(item));
}