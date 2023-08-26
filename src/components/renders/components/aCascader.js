
import { h } from 'vue'

export default function(options){
    const { item } = options
    const { multiple, ...other } = item.props.props

    return h(
        this, 
        {
            style: item.style,
            required: item.__config__.required,
            placeholder: item.placeholder,
            value: item.__config__.defaultValue,
            size: item.size,
            disabled: item.disabled,
            allowClear: item.allowClear,
            showSearch: item.showSearch,
            expandTrigger: item['expand-trigger'],
            changeOnSelect: item['change-on-select'],
            multiple: multiple,
            fieldNames: other,
            options: item.options,
            onChange(value, selectedOptions){
                item.__config__.defaultValue = value
            }
        }
    )
}