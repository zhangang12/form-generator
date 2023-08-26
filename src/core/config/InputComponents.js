
// 输入型组件 【左面板】
const inputComponents = [
    {
      // 组件的自定义配置
      __config__: {
        label: 'tag.input.label',
        showLabel: true,
        changeTag: true,
        tag: 'a-input',
        tagIcon: 'inputIcon',
        defaultValue: undefined,
        required: true,
        layout: 'colFormItem',
        span: 24,
        document: 'tag.input.document',
        // 正则校验规则
        regList: []
      },
      __vModel__: 'field105',
      // 组件的插槽属性
      __slot__: {
        addonBefore: '',
        addonAfter: ''
      },
      // 其余的为可直接写在组件标签上的属性
      // 'default-value': 'aaaa',
      placeholder: 'base.enter',
      style: { width: '100%' },
      allowClear: true,
      maxLength: null,
      disabled: false,
      size: 'default',
      prefix: '',
      suffix: ''
    },
    {
      __config__: {
        label: 'tag.textarea.label',
        showLabel: true,
        tag: 'a-textarea',
        tagIcon: 'textareaIcon',
        defaultValue: undefined,
        required: true,
        layout: 'colFormItem',
        span: 24,
        regList: [],
        changeTag: true,
        document: 'tag.textarea.document'
      },
      placeholder: 'base.enter',
      autoSize: {
        minRows: 4,
        maxRows: 4
      },
      defaultValue: '',
      style: { width: '100%' },
      allowClear: true,
      disabled: false
    },
    {
      __config__: {
        label: 'tag.input.password.label',
        showLabel: true,
        changeTag: true,
        tag: 'a-input-password',
        tagIcon: 'passwordIcon',
        defaultValue: undefined,
        layout: 'colFormItem',
        span: 24,
        required: true,
        regList: [],
        document: 'tag.input.password.document'
      },
      __slot__: {
        addonBefore: '',
        addonAfter: ''
      },
      placeholder: 'base.enter',
      style: { width: '100%' },
      size: 'default',
      defaultValue: '',
      allowClear: true,
      maxLength: null,
      disabled: false,
      prefix: '',
      suffix: ''
    },
    {
      __config__: {
        label: 'tag.input.number.label',
        showLabel: true,
        changeTag: true,
        tag: 'a-input-number',
        tagIcon: 'numberIcon',
        defaultValue: undefined,
        span: 24,
        layout: 'colFormItem',
        required: true,
        regList: [],
        document: 'tag.input.number.document'
      },
      style: { width: '100%' },
      size: 'default',
      placeholder: '',
      min: undefined,
      max: undefined,
      step: 1,
      precision: undefined,
      disabled: false
    },
    {
      __config__: {
        label: 'tag.input.search.label',
        showLabel: true,
        changeTag: true,
        tag: 'a-input-search',
        tagIcon: 'searchIcon',
        defaultValue: undefined,
        span: 24,
        layout: 'colFormItem',
        required: true,
        regList: [],
        document: 'tag.input.search.document'
      },
      style: { width: '100%' },
      size: 'default',
      placeholder: 'base.enter',
      'enter-button': false,
      disabled: false
    },
    {
      __config__: {
        label: 'tag.auto.complete.label',
        showLabel: true,
        changeTag: true,
        tag: 'a-auto-complete',
        tagIcon: 'autoIcon',
        defaultValue: undefined,
        span: 24,
        layout: 'colFormItem',
        required: true,
        regList: [],
        document: 'tag.auto.complete.document'
      },
      style: { width: '100%' },
      size: 'default',
      'data-source': [
        {value: 'aaa', label: 'aaa'},
        {value: 'bbb', label: 'bbb'}
      ],
      'filter-option': true,
      backfill: false,
      'default-open': false,
      placeholder: 'base.enter',
      disabled: false
    },
    {
      __config__: {
        label: 'tag.mentions.label',
        showLabel: true,
        tag: 'a-mentions',
        tagIcon: 'mentionsIcon',
        layout: 'colFormItem',
        span: 24,
        required: true,
        regList: [],
        changeTag: true,
        document: 'tag.mentions.document'
      },
      __slot__: {
        options: [{
          label: 'afc163',
          value: 'afc163'
        }, {
          label: 'zombieJ',
          value: 'zombieJ'
        }, {
          label: 'yesmeck',
          value: 'yesmeck'
        }]
      },
      placeholder: 'base.enter',
      style: { width: '100%' },
      placement: 'bottom',
      prefix: '@',
      split: ' ',
      allowClear: true,
      disabled: false
    }
]

export default inputComponents