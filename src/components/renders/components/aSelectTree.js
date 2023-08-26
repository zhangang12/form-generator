


import { h } from 'vue'
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
            showSearch: item.showSearch,
            multiple: item.multiple,
            labelInValue: item['label-in-value'],
            replaceFields: item.replaceFields,
            treeData: item['tree-data'],
            dropdownMatchSelectWidth: item['dropdown-matc-select-width'],
            treeDefaultExpandAll: item['tree-default-expand-all'],
            treeCheckable: item['tree-checkable'],
            treeCheckStrictly: item['tree-check-strictly'],
            onChange(value, label, extra){
                item.__config__.defaultValue = value = Array.isArray(value) ? value : (value || '')
            }
        }
    )
}