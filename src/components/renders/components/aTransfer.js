

import { h } from 'vue'
export default function(options){
    const { item } = options
    return h(this, {
        style: item.style,
        required: item.__config__.required,
        disabled: item.disabled,
        titles: item.titles,
        showSearch: item.showSearch,
        dataSource: item['data-source'],
        targetKeys: item['target-keys'],
        modelSelectedKeys: [],
        render(item){
            return item.title
        },
        onChange(targetKeys, direction, moveKeys){
            item['target-keys'] = targetKeys
        }
    })
}