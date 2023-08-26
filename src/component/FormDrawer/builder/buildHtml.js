
import layouts from './layouts'
import { modalWrapper } from './wrapper'

function buildForm(schema, child, type){
    let labelCol = ''
	let wrapperCol = ''
	let labelAlign = ''
	if (schema.labelCol && (!schema.layout || schema.layout === 'horizontal')) {
	  labelCol = `:label-col="{ span: ${schema.labelCol.span},
		offset: ${schema.labelCol.offset ? schema.labelCol.offset : 0} }" `
	}
	if (schema.wrapperCol && (!schema.layout || schema.layout === 'horizontal')) {
	  wrapperCol = `:wrapper-col="{ span: ${schema.wrapperCol.span},
		offset: ${schema.wrapperCol.offset ? schema.wrapperCol.offset : 0} }"`
	}
	if (schema.labelAlign && schema.labelAlign !== 'right') {
	  labelAlign = `label-align="${schema.labelAlign}"`
	}
	let layout = ''
	if (schema.layout) {
	  layout = `layout="${schema.layout}"`
	}
	const disabled = schema.disabled ? `:disabled="data.${schema.disabled}"` : ''
	let formCode = `<a-form
		ref="${schema.formRef}"
		:model="data.${schema.formModel}"
		:rules="data.${schema.formRules}"
		${labelCol}
		${wrapperCol}
		${disabled}
		${layout}
		${labelAlign}
	  >
		${ this.someSpanIsNot24 ? `<a-row>${child}</a-row>`: child }
		${buildFormBtn.apply(this, [schema, type])}
	  </a-form>`
	return formCode
}

function buildFormBtn(schema, type){
    let codeStr = ''
    let wrapperCol = ''
    if (schema.labelCol && schema.wrapperCol && (!schema.layout || schema.layout === 'horizontal')) {
        // wrapperCol = `:wrapper-col="{ span: ${schema.wrapperCol.span}, offset: ${schema.labelCol.span} }" `
        wrapperCol = `:wrapper-col="{ span: 24, offset: 0 }"`
    }

    if (schema.formBtns && type === 'file') {
        
        codeStr = `
          <a-space>
          <a-button type="primary" @click="submitForm">${(this.$t('base.submit'))}</a-button>
          <a-button @click="resetForm">${(this.$t('base.reset'))}</a-button>
          </a-space>
        `

        if(this.formRule.layout != 'inline'){
          codeStr = `<a-row flex="auto" justify="center">${codeStr}</a-row>`
        }

        codeStr = `<a-form-item ${wrapperCol}>
              ${codeStr}
            </a-form-item>`
    }
    return codeStr
}

export default function(formData, type){
    let codeArr = []
    formData.fields.forEach(el => {
        let func = layouts[el.__config__.layout]
        if(func){
            codeArr.push(func.apply(this, [el]))
        }
    })
    let codeStr = buildForm.apply(this, [formData.formRule, codeArr.join('\n'), type])
    if(type == 'modal'){
        return modalWrapper.apply(this, [codeStr])
    }
    return codeStr
}