
import { h } from 'vue'
export default function(options){
    const { item } = options
    return h(
        this,
        {
            style: item.style,
            required: item.__config__.required,
            disabled: item.disabled,
            size: item.size,
            checked: item.__config__.defaultValue,
            checkedChildren: item['checked-children'],
            unCheckedChildren: item['un-checked-children'],
            onChange(value){
                item.__config__.defaultValue = value
            }
        }
    )
}