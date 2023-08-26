


import { 
    UploadOutlined
} from '@ant-design/icons-vue'
import { resolveComponent, h } from 'vue'
export default function(options){
    const { item } = options
    return h(
        this, 
        {
            required: item.__config__.required,
            placeholder: item.placeholder,
            defaultValue: item.defaultValue,
            disabled: item.disabled,
            listType: item['list-type'],
            action: item.action,
            accept: item.accept,
            name: item.name,
            multiple: item.multiple
        },
        {
            default: () => {

                if(item['list-type'] == 'picture-card'){
                    return h(
                        'div', {},
                        [
                            h(resolveComponent('Icon'), { name: 'plus' }),
                            h('div', { class: {'ant-upload-text': true} }, 'upload')
                        ]
                    )
                }else{
                    return h(
                        resolveComponent('a-button'), 
                        {
                            type: 'default'
                        },
                        {
                            default: () => h('span', item.__config__.buttonText),
                            icon: () => h(resolveComponent('Icon'), { name: 'upload-outlined' })
                        }
                    )
                }
            }
        }
    )
}