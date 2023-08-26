/**
 * num 小于0，左缩进num*2个空格； 大于0，右缩进num*2个空格。
 * @param {string} str 代码
 * @param {number} num 缩进次数
 * @param {number} len 【可选】缩进单位，空格数
 */
export function indent(str, num, len = 2) {
  if (num === 0) return str
  const isLeft = num < 0; const result = []; let reg; let
    spaces = ''
  if (isLeft) {
    num *= -1
    reg = new RegExp(`(^\\s{0,${num * len}})`, 'g')
  } else {
    for (let i = 0; i < num * len; i++) spaces += ' '
  }

  str.split('\n').forEach(line => {
    line = isLeft ? line.replace(reg, '') : spaces + line
    result.push(line)
  })
  return result.join('\n')
}

// 首字母大小
export function titleCase(str) {
  return str.replace(/( |^)[a-z]/g, L => L.toUpperCase())
}

// 下划转驼峰
export function camelCase(str) {
  return str.replace(/-[a-z]/g, str1 => str1.substr(-1).toUpperCase())
}

export function isNumberStr(str) {
  return /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(str)
}

export const exportDefault = 'export default '

export const beautifierConf = {
  html: {
    indent_size: '2',
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'separate',
    brace_style: 'end-expand',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: true,
    wrap_line_length: '110',
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true
  },
  js: {
    indent_size: '2',
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'normal',
    brace_style: 'end-expand',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: true,
    end_with_newline: true,
    wrap_line_length: '110',
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true
  }
}

export function stringify(obj) {
  return JSON.stringify(obj, (key, val) => {
    if (typeof val === 'function') {
      return `${val}`
    }
    return val
  })
}

export function jsonParse(str) {
  return JSON.parse(str, (k, v) => {
    if (v.indexOf && v.indexOf('function') > -1) {
      return eval(`(${v})`)
    }
    return v
  })
}

export function parse(str) {
  JSON.parse(str, (k, v) => {
    if (v.indexOf && v.indexOf('function') > -1) {
      return eval(`(${v})`)
    }
    return v
  })
}

export function jsonClone(obj) {
  return parse(stringify(obj))
}

// 深拷贝对象
export function deepClone(obj) {
  const _toString = Object.prototype.toString
  if (typeof obj === 'function') {
    // eslint-disable-next-line no-new-func
    return obj
  }
  // null, undefined, non-object, function
  if (!obj || typeof obj !== 'object') {
    return obj
  }

  // DOM Node
  if (obj.nodeType && 'cloneNode' in obj) {
    return obj.cloneNode(true)
  }

  // Date
  if (_toString.call(obj) === '[object Date]') {
    return new Date(obj.getTime())
  }

  // RegExp
  if (_toString.call(obj) === '[object RegExp]') {
    const flags = []
    if (obj.global) { flags.push('g') }
    if (obj.multiline) { flags.push('m') }
    if (obj.ignoreCase) { flags.push('i') }

    return new RegExp(obj.source, flags.join(''))
  }

  let result
  if (Array.isArray(obj)) {
    result = []
  } else if (obj.constructor) {
    result = new obj.constructor()
  } else {
    result = {}
  }

  Object.keys(obj).forEach(key => {
    result[key] = deepClone(obj[key])
  })

  return result
}

const toStr = Function.prototype.call.bind(Object.prototype.toString)
export function isObjectObject(t) {
  return toStr(t) === '[object Object]'
}
export function isObjectArray(t) {
  return toStr(t) === '[object Array]'
}
export function isObjectNull(t) {
  return toStr(t) === '[object Null]'
}
export function isObjectUnde(t) {
  return toStr(t) === '[object Undefined]'
}

//创建随机数
export const randomKey = () => {
  let str = Math.random().toString(36).substring(2)
  return str.substring(0, 8)
}

//国际化
export const international = (t, config) => {
  const clone = config
  if(clone.__config__){
    if(clone.__config__.label){
        clone.__config__.label = t(clone.__config__.label)
    }
    if(clone.__config__.document){
        clone.__config__.document = t(clone.__config__.document)
    }
  }
  if(clone.placeholder){
      clone.placeholder = t(clone.placeholder)
  }
  if(clone.__config__.tag === 'a-button'){
      clone.__slot__.default = t(clone.__slot__.default)
  }
  if(clone.__config__.tag === 'a-upload'){
      clone.__config__.buttonText = t(clone.__config__.buttonText)
  }
  return clone
}

export const transfer = (config) => {
    if(config.layout == 'colFormItem'){
        config.__vModel__ = `field${config.formId}`
    }else if(config.layout == 'rowFormItem'){
        config.componentName = `row${config.formId}`
        delete config.label
        if(!Array.isArray(config.children)){
            config.children = []
        }else{
            config.children = config.children.map(item => {
              return transfer(item)
            })
        }
    }
}

//创建唯一id
let uniqueIdFormId = 99
export const uniqueId = () => {
    uniqueIdFormId++
    return uniqueIdFormId
}

export const formatConfig = (proxy, config) => {
    let clone = deepClone(config)
    // clone.formId = uniqueId()
    international(proxy.$t, clone)
    transfer(clone)
    return clone
}

export const rendomKey = () => {
    let str = Math.random().toString(36).substring(2)
    return str.substring(0, 8)
}

export const preAction = () => {
  let fn = null
  return {
    set(f){ fn = f},
    get(){
      const result = fn()
      fn = null
      return result
    }
  }
}
