
import { resolveComponent, h } from 'vue'
export default function(options){
    const { item } = options
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
            prefix: item.prefix,
            split: item.split,
            onChange(value){
                item.__config__.defaultValue = value
            }
        },
        {
            default: () => {
                return item.__slot__.options.map(opt => {
                    return h(
                        resolveComponent('a-mentions-option'),
                        {
                            value: opt.value
                        },
                        {
                            default: () => opt.label
                        }
                    )
                })
            }
        }
    )
}