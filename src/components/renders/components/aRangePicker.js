

import { h } from 'vue'
export default function(options){
    
    const { item } = options
    return h(
        this, 
        {
            style: item.style,
            required: item.__config__.required,
            placeholder: item.placeholder,
            defaultValue: item.__config__.defaultValue,
            disabled: item.disabled,
            allowClear: item.allowClear,
            size: item.size,
            separator: item.separator,
            showTime: item['show-time'],
            format: item.format,
            valueFormat: item['value-format'],
            inputReadOnly: item['input-read-only'],
            onChange(value){
                item.__config__.defaultValue = value
            }
        }
    )
}