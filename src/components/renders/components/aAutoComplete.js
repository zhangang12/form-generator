
import { h } from 'vue'

export default function(options){
    const { item } = options
    return h(this, {
        style: item.style,
        required: item.__config__.required,
        placeholder: item.placeholder,
        size: item.size,
        disabled: item.disabled,
        allowClear: item.allowClear,
        backfill: item.backfill,
        defaultOpen: item['default-open'],
        options: item['data-source'],
        value: item.__config__.defaultValue,
        filterOption: item['filter-option'],
        onChange(value){
            item.__config__.defaultValue = value
        }
    })
}