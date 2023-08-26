
import { h } from 'vue'
export default function(options){
    const { item } = options
    return h(this, {
        style: item.style,
        required: item.__config__.required,
        placeholder: item.placeholder,
        size: item.size,
        value: item.__config__.defaultValue,
        disabled: item.disabled,
        step: item.step,
        min: item.min,
        max: item.max,
        onChange(value){
            item.__config__.defaultValue = value
        }
    })
}