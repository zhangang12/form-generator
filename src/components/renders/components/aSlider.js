


import { h } from 'vue'
export default function(options){
    const { item } = options
    return h(
        this,
        {
            style: item.style,
            required: item.__config__.required,
            disabled: item.disabled,
            min: item.min,
            max: item.max,
            step: item.step,
            reverse: item.reverse,
            step: item.step,
            range: item.range,
            value: item.__config__.defaultValue,
            onChange(value){
                item.__config__.defaultValue = value
            }
        }
    )
}