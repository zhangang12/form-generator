
import { h } from 'vue'

export default function(options){
    const { item } = options
    return h(this, {
        style: item.style,
        required: item.__config__.required,
        placeholder: item.placeholder,
        allowClear: item.allowClear,
        autoSize: item.autoSize,
        disabled: item.disabled,
        value: item.__config__.defaultValue,
        onChange(e){
            item.__config__.defaultValue = e.target.value
        }
    })
}