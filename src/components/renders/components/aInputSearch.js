
import { h } from 'vue'
export default function(options){
    const { item } = options
    return h(this, {
        style: item.style,
        required: item.__config__.required,
        placeholder: item.placeholder,
        value: item.__config__.defaultValue,
        size: item.size,
        disabled: item.disabled,
        'enter-button': item['enter-button'],
        onChange(e){
            item.__config__.defaultValue = e.target.value
        }
    })
}