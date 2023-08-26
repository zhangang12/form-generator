
import ruleTrigger from './ruleTrigger'
import { colWrapper } from './wrapper'
import tags from './tags'

const layouts = {
    colFormItem(schema){
        const config = schema.__config__
        let labelCol = ''
        let wrapperCol = ''
        let labelAlign = ''
        let label = `label="${config.label}"`
        if (config.labelCol && (!config.layout || schema.layout === 'horizontal')) {
        labelCol = `:label-col="{ span: ${config.labelCol.span},
            offset: ${config.labelCol.offset ? config.labelCol.offset : 0} }" `
        }
        if (config.wrapperCol && (!config.layout || schema.layout === 'horizontal')) {
            wrapperCol = `:wrapper-col="{ span: ${config.wrapperCol.span},
                offset: ${config.wrapperCol.offset ? config.wrapperCol.offset : 0} }"`
        }
        if (config.showLabel === false) {
            label = ''
        }
        if (config.labelAlign && config.labelAlign !== 'right') {
            labelAlign = `:label-align="${config.labelAlign}"`
        }
        const required = !ruleTrigger[config.tag] && config.required ? 'required' : ''
        const tagDom = tags[config.tag] ? tags[config.tag].apply(this, [schema]) : null
        let codeStr = `<a-form-item ${labelCol} ${wrapperCol} ${labelAlign} ${label}
        name="${schema.__vModel__}" ${required}>
            ${tagDom}
        </a-form-item>`
        codeStr = colWrapper.apply(this, [schema, codeStr])
        return codeStr
    },
    rowFormItem(schema){
        const config = schema.__config__
        const type = schema.type === 'default' ? '' : `type="${schema.type}"`
        const justify = schema.type === 'default' ? '' : `justify="${schema.justify}"`
        const align = schema.type === 'default' ? '' : `align="${schema.align}"`
        const gutter = schema.gutter ? `:gutter="${schema.gutter}"` : ''
        const children = (schema.children || []).map(el => layouts[el.__config__.layout].apply(this, [el]))

        if(!children.length){
            return ''
        }else{
            let codeStr = `<a-row ${type} ${justify} ${align} ${gutter}>
            ${children.join('\n')}
            </a-row>`
            codeStr = colWrapper.apply(this, [schema, codeStr])
            return codeStr
        }
    }
}


export default layouts