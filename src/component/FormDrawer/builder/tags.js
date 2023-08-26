
import { titleCase } from '@/utils/index'

function attrBuilder(el){
    return {
        tag: el.__config__.tag,
        vModel: `v-model:value="data.${this.formRule.formModel}.${el.__vModel__}"`,
        allowClear: el.allowClear ? 'allow-clear' : '',
        placeholder: el.placeholder ? `placeholder="${el.placeholder}"` : '',
        width: el.style && el.style.width ? `:style="{width: '${el.style.width}'}"` : '',
        disabled: el.disabled ? ':disabled=\'true\'' : '',
        size: el.size === 'default' ? '' : `size="${el.size}"`
    }
}

function buildElInputChild(el){
    const children = []
	const slot = el.__slot__
	if (slot && slot.addonBefore) {
	  children.push(`<template #addonBefore><a-icon name="${slot.addonBefore}" /></template>`)
	}
	if (slot && slot.addonAfter) {
	  children.push(`<template #addonAfter><a-icon name="${slot.addonAfter}" /></template>`)
	}
	return children.join('\n')
}

function buildElMentionsChild(el){
    const children = []
	const slot = el.__slot__
	if (slot && slot.options && slot.options.length) {
	  children.push(`<a-mentions-option v-for="(item, index) in data.${el.__vModel__}Options"
		:key="index" :value="item.value">{{item.label}}</a-mentions-option>`)
	}
	return children.join('\n')
}

// a-select 子级
function buildElSelectChild(el){
    const children = []
    const slot = el.__slot__
    if (slot && slot.options && slot.options.length) {
        children.push(`<a-select-option v-for="(item, index) in data.${el.__vModel__}Options"
        :key="index" :value="item.value" :disabled="item.disabled">{{item.label}}</a-select-option>`)
    }
    return children.join('\n')
}

// a-buttin 子级
function buildElButtonChild(el) {

  const children = []
  const slot = el.__slot__ || {}
  if(el.icon){
      children.push(`<template #icon><a-icon name="${el.icon}" /></template>`)
  }
  if (slot.default) {
    children.push(slot.default)
  }
  return children.join('\n')
}

function buildElRadioGroupChild(el){
    const children = []
    const slot = el.__slot__
    const config = el.__config__
    if (slot && slot.options && slot.options.length) {
        const tag = config.optionType === 'button' ? 'a-radio-button' : 'a-radio'
        const buttonStyle = el.buttonStyle === 'outline' ? '' : `button-style = ${el.buttonStyle}`
        children.push(`<${tag} v-for="(item, index) in data.${el.__vModel__}Options"
        :key="index" :value="item.value" :disabled="item.disabled" ${buttonStyle}>{{item.label}}</${tag}>`)
    }
    return children.join('\n')
}

function buildElCheckboxGroupChild(el){
    const children = []
    const slot = el.__slot__
    const config = el.__config__
    if (slot && slot.options && slot.options.length) {
        children.push(`<a-checkbox v-for="(item, index) in data.${el.__vModel__}Options"
        :key="index" :value="item.value" :disabled="item.disabled">{{item.label}}</a-checkbox>`)
    }
    return children.join('\n')
}

function buildElUploadChild(el){
    const list = []
    const config = el.__config__
    if (el['list-type'] === 'picture-card') {
        list.push(`<div><a-icon name="plus" /><div class="ant-upload-text">${config.buttonText}</div></div>`)
    } else {
        list.push(`<a-button> <a-icon name="upload" /> ${config.buttonText}</a-button>`)
    }
    return list.join('\n')
}

export default {
  'a-button': function(el) {
      const {
        tag, disabled, size
      } = attrBuilder.apply(this, [el])
      const type = el.type ? `type="${el.type}"` : ''
      const block = el.block ? 'block' : ''
      const shape = el.shape ? `shape="${el.shape}"` : ''
      let child = buildElButtonChild.apply(this, [el])

      if (child) child = `\n${child}\n` // 换行
      return `<${tag} ${type} ${size} ${block} ${disabled} ${shape}>${child}</${tag}>`
    },
  'a-input': function(el) {
        const {
            tag, disabled, vModel, allowClear, placeholder, width, size
        } = attrBuilder.apply(this, [el])
        const maxLength = el.maxLength ? `:maxLength="${el.maxLength}"` : ''
		const prefix = el.prefix ? `prefix='${el.prefix}'` : ''
		const suffix = el.suffix ? `suffix='${el.suffix}'` : ''
		const type = el.type ? `type="${el.type}"` : ''
		const autoSize = el.autoSize && el.autoSize.minRows
		  ? `:auto-size="{minRows: ${el.autoSize.minRows}, maxRows: ${el.autoSize.maxRows}}"`
		  : ''
		let child = buildElInputChild.apply(this, [el])
	
		if (child) child = `\n${child}\n` // 换行
		return `<${tag} ${vModel} ${type} ${placeholder} ${maxLength} ${prefix} ${suffix} ${autoSize}
		  ${width} ${allowClear} ${disabled} ${size}>${child}</${tag}>`
    },
  'a-textarea': function(el){
		const {
		  tag, disabled, vModel, allowClear, placeholder, width
		} = attrBuilder.apply(this, [el])
		const autoSize = el.autoSize && el.autoSize.minRows
		  ? `:auto-size="{minRows: ${el.autoSize.minRows}, maxRows: ${el.autoSize.maxRows}}"`
		  : ''
		return `<${tag} ${vModel} ${placeholder} ${autoSize} ${width} ${allowClear} ${disabled} />`
	},
  'a-input-password': function(el) {
		const {
			tag, disabled, vModel, allowClear, placeholder, width
		} = attrBuilder.apply(this, [el])
		const maxLength = el.maxLength ? `:maxLength="${el.maxLength}"` : ''
		const prefix = el.prefix ? `prefix='${el.prefix}'` : ''
		const suffix = el.suffix ? `suffix='${el.suffix}'` : ''

		let child = buildElInputChild.apply(this, [el])

		if (child) child = `\n${child}\n` // 换行
		return `<${tag} ${vModel} ${placeholder} ${maxLength} ${prefix} ${suffix} ${width}
			${disabled} ${allowClear}>${child}</${tag}>`
	},
  'a-input-number': function(el) {
		const {
		  tag, disabled, vModel, placeholder, width
		} = attrBuilder.apply(this, [el])
		const min = el.min ? `:min='${el.min}'` : ''
		const max = el.max ? `:max='${el.max}'` : ''
		const step = el.step && el.step !== 1 ? `:step='${el.step}'` : ''
		const precision = el.precision ? `:precision='${el.precision}'` : ''
	
		return `<${tag} ${vModel} ${placeholder} ${step} ${precision} ${min} ${max} ${width} ${disabled} />`
	},
  'a-input-search': function(el) {
		const {
		  tag, disabled, vModel, placeholder, width
		} = attrBuilder.apply(this, [el])
		const enterButton = el['enter-button'] ? 'enter-button' : ''
	
		return `<${tag} ${vModel} ${placeholder} ${width} ${enterButton} ${disabled} />`
	},
  'a-auto-complete': function(el) {
		const {
		  tag, disabled, vModel, allowClear, placeholder
		} = attrBuilder.apply(this, [el])
		const dataSource = el['data-source'] ? `:options="data.${el.__vModel__}DataSource"` : ''
		const filterOption = el['filter-option'] ? 'filter-option' : ''
		const backfill = el.backfill ? 'backfill' : ''
		const defaultOpen = el['default-open'] ? 'default-open' : ''
		return `<${tag} ${vModel} ${placeholder} ${dataSource} ${filterOption} ${backfill}
		  ${defaultOpen} ${allowClear} ${disabled} />`
	},
    'a-mentions': function(el) {
		const {
		  tag, disabled, vModel, allowClear, placeholder, width
		} = attrBuilder.apply(this, [el])
	
		const placement = el.placement !== 'bottom' ? `placement='${el.placement}'` : ''
		const prefix = el.prefix !== '@' ? `prefix='${el.prefix}'` : ''
		const split = el.split !== ' ' ? `split='${el.split}'` : ''
		let child = buildElMentionsChild(el)
	
		if (child) child = `\n${child}\n` // 换行
		return `<${tag} ${vModel} ${placeholder} ${placement} ${prefix} ${split}
		  ${disabled} ${allowClear} ${width}>${child}</${tag}>`
	},
    'a-transfer': function(el){
        const {
          tag, disabled
        } = attrBuilder.apply(this, [el])
        const showSearch = el.showSearch ? 'show-search' : ''
        const dataSource = el['data-source'] ? `:data-source="data.${el.__vModel__}DataSource"` : ''
        const render = ':render="item => item.title"'
        const targetKeys = `:target-keys="data.formData.${el.__vModel__}"`
        const titles = el.titles ? `:titles="['${el.titles[0]}', '${el.titles[1]}']"` : ''
        const changeTargetKeys = `@change="change${titleCase(el.__vModel__)}TargetKeys"`
        return `<${tag} ${dataSource} ${render} ${targetKeys} ${titles} ${showSearch}
          ${disabled} ${changeTargetKeys} />`
    },
    'a-select': function(el){
        const {
          tag, disabled, vModel, allowClear, placeholder, width
        } = attrBuilder.apply(this, [el])
        const showSearch = el.showSearch ? 'show-search' : ''
        const mode = el.mode === 'default' ? '' : `mode='${el.mode}'`
        let child = buildElSelectChild(el)
    
        if (child) child = `\n${child}\n` // 换行
        return `<${tag} ${vModel} ${placeholder} ${disabled} ${mode} ${showSearch} ${allowClear} ${width}>${child}</${tag}>`
    },
    'a-radio-group': function(el) {
        const {
          tag, disabled, vModel, size
        } = attrBuilder.apply(this, [el])
        const buttonStyle = el.buttonStyle === 'outline' ? '' : `button-style="${el.buttonStyle}"`
        let child = buildElRadioGroupChild(el)
    
        if (child) child = `\n${child}\n` // 换行
        return `<${tag} ${vModel} ${size} ${buttonStyle} ${disabled}>${child}</${tag}>`
    },
    'a-checkbox-group': function(el){
        const { tag, disabled, vModel } = attrBuilder.apply(this, [el])
        const min = el.min ? `:min="${el.min}"` : ''
        const max = el.max ? `:max="${el.max}"` : ''
        let child = buildElCheckboxGroupChild(el)
    
        if (child) child = `\n${child}\n` // 换行
        return `<${tag} ${vModel} ${min} ${max} ${disabled}>${child}</${tag}>`
    },
    'a-switch': function(el){
        const {
          tag, disabled, vModel, size
        } = attrBuilder.apply(this, [el])
        const checkedChildren = el['checked-children'] ? `checked-children="${el['checked-children']}"` : ''
        const unCheckedChildren = el['un-checked-children'] ? `un-checked-children="${el['un-checked-children']}"` : ''
    
        return `<${tag} ${vModel} ${checkedChildren} ${unCheckedChildren} ${size} ${disabled} />`
    },
    'a-cascader': function(el) {
        const {
          tag, disabled, vModel, allowClear, placeholder, width
        } = attrBuilder.apply(this, [el])
        const options = el.options ? `:options="data.${el.__vModel__}Options"` : ''
        const props = el.props ? `:props="data.${el.__vModel__}Props"` : ''
        const changeOnSelect = el['change-on-select'] ? 'change-on-select' : ''
        const showSearch = el.showSearch ? 'show-search' : ''
        const expandTrigger = el['expand-trigger'] === 'click' ? '' : `expand-trigger="${el['expand-trigger']}"`
    
        return `<${tag} ${vModel} ${options} ${props} ${width} ${changeOnSelect} ${placeholder}
          ${expandTrigger} ${showSearch} ${allowClear} ${disabled} />`
    },
    'a-tree-select': function(el) {
        const {
          tag, disabled, vModel, allowClear, placeholder, width, size
        } = attrBuilder.apply(this, [el])
        const treeData = el['tree-data'] ? `:tree-data="data.${el.__vModel__}TreeData"` : ''
        const replaceFields = el['replace-fields'] ? `:field-names="data.${el.__vModel__}ReplaceFields"` : ''
        const showSearch = el.showSearch && !el.multiple ? 'show-search' : ''
        const dropdownMatchSelectWidth = el['dropdown-matc-select-width'] ? 'dropdown-matc-select-width' : ''
        // treeCheckStrictly会使得labelInValue强制为true
        const labelInValue = el['label-in-value'] && !el['tree-check-strictly'] ? 'label-in-value' : ''
        const treeDefaultExpandAll = el['tree-default-expand-all'] ? 'tree-default-expand-all' : ''
        const multiple = el.multiple && !el['tree-checkable'] ? 'multiple' : ''
        const treeCheckable = el['tree-checkable'] ? 'tree-checkable' : ''
        const treeCheckStrictly = el['tree-check-strictly'] && el['tree-checkable'] ? 'tree-check-strictly' : ''
    
        return `<${tag} ${vModel} ${treeData} ${replaceFields} ${width} ${size} ${placeholder}
          ${dropdownMatchSelectWidth} ${labelInValue} ${treeDefaultExpandAll} ${multiple} ${treeCheckable}
          ${treeCheckStrictly} ${showSearch} ${allowClear} ${disabled} />`
    },
    'a-slider': function(el) {
        const { tag, disabled, vModel } = attrBuilder.apply(this, [el])
        const min = el.min ? `:min='${el.min}'` : ''
        const max = el.max ? `:max='${el.max}'` : ''
        const step = el.step && el.step !== 1 ? `:step='${el.step}'` : ''
        const range = el.range ? 'range' : ''
        const reverse = el.reverse ? 'reverse' : ''
    
        return `<${tag} ${min} ${max} ${step} ${vModel} ${range} ${reverse} ${disabled} />`
    },
    'a-time-picker': function(el) {
        const {
          tag, disabled, vModel, allowClear, placeholder, width, size
        } = attrBuilder.apply(this, [el])
        const format = el.format ? `format="${el.format}"` : ''
        const valueFormat = el['value-format'] ? `value-format="${el['value-format']}"` : ''
        const use12Hours = el['use12-hours'] ? 'use12-hours' : ''
    
        return `<${tag} ${vModel} ${format} ${valueFormat} ${use12Hours} ${width} ${size}
          ${placeholder} ${allowClear} ${disabled} />`
    },
    'a-date-picker': function(el) {
        const {
          tag, disabled, vModel, allowClear, placeholder, width, size
        } = attrBuilder.apply(this, [el])
        const format = el.format ? `format="${el.format}"` : ''
        const valueFormat = el['value-format'] ? `value-format="${el['value-format']}"` : ''
        const inputReadOnly = el['input-read-only'] ? 'input-read-only' : ''
        const showToday = el['show-today'] ? '' : `show-today="${el['show-today']}"`
        const showTime = el['show-time'] ? `show-time="${el['show-time']}"` : ''
    
        return `<${tag} ${vModel} ${format} ${valueFormat} ${showToday} ${showTime} ${width}
          ${size} ${placeholder} ${allowClear} ${inputReadOnly} ${disabled} />`
    },
    'a-month-picker': function(el) {
        const {
          tag, disabled, vModel, allowClear, placeholder, width, size
        } = attrBuilder.apply(this, [el])
        const format = el.format ? `format="${el.format}"` : ''
        const valueFormat = el['value-format'] ? `value-format="${el['value-format']}"` : ''
        const inputReadOnly = el['input-read-only'] ? 'input-read-only' : ''
    
        return `<${tag} ${vModel} ${format} ${valueFormat} ${width} ${size} ${placeholder}
          ${allowClear} ${inputReadOnly} ${disabled} />`
    },
    'a-week-picker': function(el) {
        const {
          tag, disabled, vModel, allowClear, placeholder, width, size
        } = attrBuilder.apply(this, [el])
        const format = el.format ? `format="${el.format}"` : ''
        const valueFormat = el['value-format'] ? `value-format="${el['value-format']}"` : ''
        const inputReadOnly = el['input-read-only'] ? 'input-read-only' : ''
    
        return `<${tag} ${vModel} ${format} ${valueFormat} ${width} ${size} ${placeholder}
          ${allowClear} ${inputReadOnly} ${disabled} />`
    },
    'a-range-picker': function(el) {
        const {
          tag, disabled, vModel, allowClear, width, size
        } = attrBuilder.apply(this, [el])
        const format = el.format ? `format="${el.format}"` : ''
        const valueFormat = el['value-format'] ? `value-format="${el['value-format']}"` : ''
        const inputReadOnly = el['input-read-only'] ? 'input-read-only' : ''
        const placeholders = (`${el.placeholder}`).split(',')
        const placeholder = el.placeholder ? `:placeholder="['${placeholders[0]}', '${placeholders[1]}']"` : ''
        const separator = el.separator === '~' ? '' : `separator="${el.separator}"`
        const showTime = el['show-time'] ? `show-time="${el['show-time']}"` : ''
    
        return `<${tag} ${vModel} ${format} ${valueFormat} ${separator} ${showTime}
          ${width} ${size} ${placeholder} ${allowClear} ${inputReadOnly} ${disabled} />`
    },
    'a-rate': function(el) {
        const {
          tag, disabled, allowClear, vModel
        } = attrBuilder.apply(this, [el])
        const count = el.count ? `:max='${el.count}'` : ''
        const allowHalf = el['allow-half'] ? 'allow-half' : ''
        const character = el.character ? `character="${el.character}"` : ''
    
        return `<${tag} ${vModel} ${count} ${allowHalf} ${character} ${allowClear} ${disabled} />`
    },
    'a-upload': function(el) {
        const { tag } = el.__config__
        const disabled = el.disabled ? ':disabled=\'true\'' : ''
        const action = el.action ? `:action="data.${el.__vModel__}Action"` : ''
        const multiple = el.multiple ? 'multiple' : ''
        const listType = el['list-type'] !== 'text' ? `list-type="${el['list-type']}"` : ''
        const accept = el.accept ? `accept="data.${el.accept}"` : ''
        const name = el.name !== 'file' ? `name="${el.name}"` : ''
        const beforeUpload = `:before-upload="${el.__vModel__}BeforeUpload"`
        const fileList = `:file-list="data.${el.__vModel__}fileList"`
        const ref = `ref="data.${el.__vModel__}"`
        let child = buildElUploadChild(el)
    
        if (child) child = `\n${child}\n` // 换行
        return `<${tag} ${ref} ${fileList} ${action} ${multiple} ${beforeUpload}
          ${listType} ${accept} ${name} ${disabled}>${child}</${tag}>`
    }
}