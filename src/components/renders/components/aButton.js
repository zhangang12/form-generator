
import { resolveComponent, h } from 'vue'
export default function(options){
    const { item } = options
    return h(
        this, 
        {
            style: item.style,
            required: item.__config__.required,
            disabled: item.disabled,
            size: item.size,
            type: item.type,
            block: item.block,
            shape: item.shape
        },
        {
            default: () => h('span', item.__slot__.default),
            icon: () => {
                if(item.icon){
                    return h(resolveComponent('Icon'), { name: item.icon})
                }
            }
        }
    )
}