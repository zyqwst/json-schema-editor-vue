export function clearAttr(obj) {
  for(let key in obj){
    delete obj[key]
  }
}