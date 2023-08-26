
// 布局型组件 【左面板】
const layoutComponents = [
    {
      __config__: {
        span: 24,
        layout: 'rowFormItem',
        tagIcon: 'rowIcon',
        label: 'tag.row.label',
        layoutTree: true,
        document: 'tag.row.document'
      },
      type: 'default',
      justify: 'start',
      align: 'top',
      children: [
        
      ]
    },
    {
      __config__: {
        label: 'tag.button.label',
        showLabel: true,
        changeTag: true,
        tag: 'a-button',
        tagIcon: 'buttonIcon',
        span: 24,
        layout: 'colFormItem',
        document: 'tag.button.document'
      },
      __slot__: {
        default: 'tag.button.slot.default'
      },
      type: 'default',
      icon: 'search',
      size: 'default',
      block: false,
      shape: undefined,
      disabled: false
    }
]

export default layoutComponents