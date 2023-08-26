
import { h } from 'vue'
export default function(options){
    const { item } = options
    return h(
        this,
        {
            style: item.style,
            required: item.__config__.required,
            placeholder: item.placeholder,
            disabled: item.disabled,
            options: item.__slot__.options,
            value: item.__config__.defaultValue,
            onChange(value){
                item.__config__.defaultValue = value
            }
        }
    )
}