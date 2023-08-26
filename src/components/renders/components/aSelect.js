
import { h } from 'vue'
export default function(options){
    const { item } = options
    return h(
        this, 
        {
            style: item.style,
            required: item.__config__.required,
            placeholder: item.placeholder,
            size: item.size,
            disabled: item.disabled,
            allowClear: item.allowClear,
            showSearch: item.showSearch,
            mode: item.mode,
            options: item.__slot__.options,
            value: item.__config__.defaultValue,
            onChange(value){
                item.__config__.defaultValue = value
            }
        }
    )
}