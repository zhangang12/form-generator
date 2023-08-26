

import { h } from 'vue'
export default function(options){
    const { item } = options
    return h(
        this,
        {
            style: item.style,
            required: item.__config__.required,
            disabled: item.disabled,
            allowClear: item.allowClear,
            allowHalf: item['allow-half'],
            character: item.character,
            count: item.count,
            value: item.__config__.defaultValue,
            onChange(value){
                item.__config__.defaultValue = value
            }
        }
    )
}