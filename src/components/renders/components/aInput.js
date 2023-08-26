
import { h, resolveComponent } from 'vue'

const addon = (name) => {
    return name ? h(resolveComponent('Icon'), {name}): null
}


export default function(options){
    
    const { item } = options
    
    let slot = {}
    let addonBefore = addon(item.__slot__.addonBefore)
    let addonAfter = addon(item.__slot__.addonAfter)

    if(addonBefore){
        slot.addonBefore = () => addonBefore
    }

    if(addonAfter){
        slot.addonAfter = () => addonAfter
    }

    return h(this, {
            style: item.style,
            required: item.__config__.required,
            placeholder: item.placeholder,
            allowClear: item.allowClear,
            size: item.size,
            disabled: item.disabled,
            prefix: item.prefix,
            suffix: item.suffix,
            value: item.__config__.defaultValue,
            maxlength: item.maxLength,
            onChange(e){
                item.__config__.defaultValue = e.target.value
            }
        },
        slot
    )
}