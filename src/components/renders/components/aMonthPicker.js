
import { h } from 'vue'
export default function(options){
    const { item } = options
    return h(
        this, 
        {
            picker: 'month',
            style: item.style,
            required: item.__config__.required,
            placeholder: item.placeholder,
            value: item.__config__.defaultValue,
            disabled: item.disabled,
            allowClear: item.allowClear,
            size: item.size,
            format: item.format,
            valueFormat: item['value-format'],
            inputReadOnly: item['input-read-only'],
            onChange(value){
                item.__config__.defaultValue = value
            }
        }
    )
}