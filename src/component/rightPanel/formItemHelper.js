import request from './request'
import { computed, reactive, toRefs, nextTick, getCurrentInstance, inject } from 'vue'
import patternSource from './patternSource'
import { isNumberStr } from '@/utils'
export default function(props, ctx){
    const { proxy } = getCurrentInstance()

    const data = reactive({
        visible: false,
        justifyOptions: [
            {
                label: 'start',
                value: 'start'
            },
            {
                label: 'end',
                value: 'end'
            },
            {
                label: 'center',
                value: 'center'
            },
            {
                label: 'space-around',
                value: 'space-around'
            },
            {
                label: 'space-between',
                value: 'space-between'
            }
        ],
        inputAutoDataSourceVisible: false,
        inputAutoDataSourceValue: '',
        patternSource: patternSource(proxy.$t)
    })

    const defaultValue = computed(() => {
        let val = props.activeItem.__config__.defaultValue
        if (Array.isArray(val)) {
            return val.join(',')
        }
        if (['string', 'number'].indexOf(typeof val) > -1) {
            return val
        }
        if (typeof val === 'boolean') {
            return `${val}`
        }
        return val
    })

    const onDefaultValueInput = (event) => {
        let str = event.target.value
        if(Array.isArray(props.activeItem.__config__.defaultValue)){
            str = str.split(',').map(val => (isNumberStr(val) ? +val : val))
        }else if(['true', 'false'].indexOf(str) > -1){
            str = JSON.parse(str)
        }
        props.activeItem.__config__.defaultValue = str
    }

    const onItemChange = (item) => {
        ctx.emit('replaceComponent', item)
    }


    const onSetTimeValue = (event) => {
        props.activeItem.__config__.defaultValue = ''
        props.activeItem['value-format'] = event.target.value
        props.activeItem['format'] = event.target.value
    }

    const selectedIcon = computed(() => {
        if(props.activeItem && props.activeItem.__slot__){
            return props.activeItem.__slot__[data.position]
        }
        return ''
    })

    const addReg = () => {
        props.activeItem.__config__.regList.push({
            pattern: '',
            message: ''
        })
    }

    const filterOption = (input, option) => {
        return true
    }


    const handleInputAutoDataSourceConfirm = () => {
        const inputAutoDataSourceValue = data.inputAutoDataSourceValue
        let dataSource = props.activeItem['data-source']
        if (inputAutoDataSourceValue && !dataSource.find(d => d.value == inputAutoDataSourceValue )) {
          dataSource.push({label:inputAutoDataSourceValue,value:inputAutoDataSourceValue})
        }
        // props.activeItem['data-source'] = dataSource
        data.inputAutoDataSourceVisible = false
        data.inputAutoDataSourceValue = ''
    }

    // 自动完成数据源
    const handleAutoDataSourceClose = (removedTag) => {
        const dataSource = props.activeItem['data-source'].filter(tag => tag !== removedTag)
        props.activeItem['data-source'] = dataSource
    }

    const showAutoDataSourceInput = () => {
        data.inputAutoDataSourceVisible = true
    }

    //options
    const addOptionItem = () => {
        props.activeItem.__slot__.options.push({ label:'', value: '' })
    }

    //选择icon
    const showIconSelectModal = inject('showIconSelectModal')
    //清理图标
    const toCleanIcon = (position) => {
        props.activeItem.__slot__[position] = ''
    }

    //静态树
    const showTreeNodeModal = (item) => {
        return proxy.$refs.treeNodeModal.open(item)
    }

    const addTreeItem = () => {
        let key = props.activeItem.__config__.tag == 'a-cascader' ? 'options': 'tree-data'
        proxy.$refs.treeNodeModal.open().then(res => {
            props.activeItem[key].push({...res, children: []})
        })
    }

    const appendTreeItem = (item) => {
        let key = props.activeItem.__config__.tag == 'a-cascader' ? 'options': 'tree-data'
        proxy.$refs.treeNodeModal.open().then(res => {
            item.children.push({...res, children: []})
            props.activeItem[key] = [...props.activeItem[key]]
        })
    }

    const removeTreeItem = (id) => {
        let key = props.activeItem.__config__.tag == 'a-cascader' ? 'options': 'tree-data'
        let spliceItem = (origin) => {
            for(let i = 0, len = origin.length; i < len; i++){
                if(origin[i].id == id){
                    origin.splice(i, 1)
                    break
                }
                spliceItem(origin[i].children || [])
            }
        }
        spliceItem(props.activeItem[key])
        props.activeItem.__config__.defaultValue = []
    }

    const isShowMin = computed(() => {
        return ['a-input-number', 'a-slider'].indexOf(props.activeItem.activeTag) > -1
    })
    const isShowMax = computed(() => {
        return ['a-input-number', 'a-slider'].indexOf(props.activeItem.activeTag) > -1
    })
    const isShowStep = computed(() => {
        return ['a-input-number', 'a-slider'].indexOf(props.activeItem.activeTag) > -1
    })

    const fetchData = async (item) => {
        let result = await request(item)
        if(item.__config__.tag == 'a-cascader'){
            let { label, value, children } = item.props.props
            let data = result.map(res => {
                return {
                    id: res.id,
                    label: res[label],
                    value: res[value],
                    children: res[children]
                }
            })
            item.options = data
        }else{
            item['tree-data'] = data
        }
        
    }

    return {
        defaultValue,
        onItemChange,
        onDefaultValueInput,
        onSetTimeValue,
        selectedIcon,
        isShowMin,
        isShowMax,
        isShowStep,
        handleAutoDataSourceClose,
        handleInputAutoDataSourceConfirm,
        showAutoDataSourceInput,
        addOptionItem,
        addReg,
        filterOption,
        toCleanIcon,
        showIconSelectModal,
        fetchData,
        showTreeNodeModal,
        addTreeItem,
        appendTreeItem,
        removeTreeItem,
        ...toRefs(data)
    }
}
