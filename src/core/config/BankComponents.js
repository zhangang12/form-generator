

// 网银组件 【左面板】
const bankComponents = [
    {
      __config__: {
        label: '表格',
        showLabel: false,
        tag: 'a-table',
        tagIcon: 'textareaIcon',
        defaultValue: undefined,
        required: true,
        layout: 'colFormItem',
        span: 24,
        regList: [],
        changeTag: true,
        document: 'tag.textarea.document'
      },
      columns: [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '年龄',
          dataIndex: 'age',
          key: 'age'
        },
        {
          title: '住址',
          dataIndex: 'address',
          key: 'address'
        }
      ],
      dataSource: [],
      bordered: true,
      tableLayout: 'auto'
    }
]

export default bankComponents