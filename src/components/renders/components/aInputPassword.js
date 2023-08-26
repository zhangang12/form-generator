
import { h, resolveComponent } from 'vue'
export default function(options){
    const { item } = options
    const slot = {}

    if(item.__slot__.addonBefore){
        slot.addonBefore = () => {
            return h(resolveComponent('Icon'), {
                name: item.__slot__.addonBefore
            })
        }
    }

    if(item.__slot__.addonAfter){
        slot.addonAfter = () => {
            return h(resolveComponent('Icon'), {
                name: item.__slot__.addonAfter
            })
        }
    }

    return h(this, {
        style: item.style,
        required: item.__config__.required,
        placeholder: item.placeholder,
        value: item.__config__.defaultValue,
        allowClear: item.allowClear,
        size: item.size,
        disabled: item.disabled,
        prefix: item.prefix,
        maxLength: item.maxLength,
        onChange(e){
            item.__config__.defaultValue = e.target.value
        }
    }, slot)
}