
import { exportDefault, titleCase, deepClone } from '@/utils/index'
import ruleTrigger from './ruleTrigger'


const units = {
    KB: '1024',
    MB: '1024 / 1024',
    GB: '1024 / 1024 / 1024'
}

const visibleType = {
    file: '',
    modal: 'visible: true,'
}

function buildMethods(schema, methodsList, type){
    const methods = Object.create(null)
    if(type == 'modal'){
        methods.onOpen = `const onOpen = () => {
            data.visible = true
        }`
        methods.colse = `const close = () => {
            ${schema.formRef}.value.resetFields()
            data.visible = false
        }`
        methods.handelConfirm = `const handelConfirm = () => {
            ${schema.formRef}.value.validate().then(valid => {
                if(!valid) return
                close()
            })
        }`
    }else if(schema.formBtns){
        methods.submitForm = `const submitForm = () => {
            ${schema.formRef}.value.validate().then(valid => {
                if(!valid) return
            })
        }`
        methods.resetForm = `const resetForm = () => {
            ${schema.formRef}.value.resetFields()
        }`
    }

    methodsList.push(methods)
}


function buildData(schema, { dataList }){
    const config = schema.__config__
    if (schema.__vModel__ === undefined) return
    const defaultValue = JSON.stringify(config.defaultValue)
    if(schema.__config__.tag == 'a-upload'){
        return dataList.push(`${schema.__vModel__}: 'a-upload',`)
    }
    dataList.push(`${schema.__vModel__}: ${defaultValue},`)
}

function buildRules(schema, { ruleList }){
    const config = schema.__config__
    if (schema.__vModel__ === undefined) return
    const rules = []
    if (ruleTrigger[config.tag]) {
        if(config.required){
            const type = Array.isArray(config.defaultValue) ? 'type: \'array\',' : ''
            let message = Array.isArray(config.defaultValue) ? 
            `${this.$t('base.select.least.one')}${config.label}` : schema.placeholder
            if (message === undefined) message = `${config.label}${this.$t('base.not.null')}`
            rules.push(`{ required: true, ${type} message: '${message}', trigger: '${ruleTrigger[config.tag]}' }`)
        }
        if(config.regList && Array.isArray(config.regList)){
            config.regList.forEach(item => {
                rules.push(
                    `{ pattern: ${eval(item.pattern)}, message: '${item.message}', trigger: '${ruleTrigger[config.tag]}' }`
                )
            })
        }
        ruleList.push(`${schema.__vModel__}: [${rules.join(',')}],`)
    }
}

// 构建options
function buildOptions(schema, { optionsList }){
    if (schema.__vModel__ === undefined) return
    // a-cascader直接有options属性，其他组件都是定义在slot中，所以有两处判断
    let { options } = schema
    if (!options) options = schema.__slot__.options
    if (schema.__config__.dataType === 'dynamic') { options = [] }
    const code = `${schema.__vModel__}Options: ${JSON.stringify(options)},`
    optionsList.push(code)
}

function buildTreeData(schema, { treeDataList }){
    if (schema.__vModel__ === undefined) return
    let treeData = schema['tree-data']
    if (schema.__config__.dataType === 'dynamic') { treeData = [] }
    const code = `${schema.__vModel__}TreeData: ${JSON.stringify(treeData)},`
    treeDataList.push(code)
}

function buildOptionMethod(schema, model, { methodsList, mountedList }){
    const config = schema.__config__
    const options = titleCase(model)
    const methodName = `get${options}`
    const code = `const ${methodName} = () => {
        proxy.$axios({
            url: '${config.url}',
            method: '${config.method}'
        }).then(res => {
            data.${model} = res.data.${config.dataPath}
        })
    }`
    methodsList.push({
        [methodName]: code
    })
    callInMounted(methodName, mountedList)
}

function callInMounted(methodName, mountedList){
    mountedList.push(`${methodName}();`)
}

function buildProps(schema, { propsList }){
    const code = `${schema.__vModel__}Props: ${JSON.stringify(schema.props.props)},`
    propsList.push(code)
}

function buildDataSource(schema, { dataSourceList }){
    if (schema.__vModel__ === undefined) return
    // a-cascader直接有options属性，其他组件都是定义在slot中，所以有两处判断
    const dataSource = schema['data-source']
    const code = `${schema.__vModel__}DataSource: ${JSON.stringify(dataSource)},`
    dataSourceList.push(code)
}

function buildTargetMethod(schema, { methodsList }){
    const model = `${schema.__vModel__}`
    const options = titleCase(`${model}TargetKeys`)
    const methodName = `change${options}`
    const code = `const ${methodName} = (nextTargetKeys, direction, moveKeys) => {
        data.formData.${model} = nextTargetKeys
      }`
    methodsList.push({
        [methodName]: code
    })
}

function buildReplaceFields(schema, { replaceFieldsList }){
    const code = `${schema.__vModel__}ReplaceFields: ${JSON.stringify(schema['replace-fields'])},`
    replaceFieldsList.push(code)
}

// a-upload的BeforeUpload
function buildBeforeUpload(schema, { methodsList }){
    const config = schema.__config__
    const unitNum = units[config.sizeUnit]; let rightSizeCode = ''; let acceptCode = ''; const returnList = []
    if (config.fileSize) {
        rightSizeCode = `let isRightSize = file.size / ${unitNum} < ${config.fileSize}
            if(!isRightSize){
                proxy.$message.error('${this.$t('base.file.size.overflow')} ${config.fileSize}${config.sizeUnit}')
            }
        `
        returnList.push('isRightSize')
    }
    if (schema.accept) {
        acceptCode = `let isAccept = new RegExp('${schema.accept}').test(file.type)
        if(!isAccept){
        proxy.$message.error('${this.$t('base.file.should.choose.type')}${schema.accept}')
        }`
        returnList.push('isAccept')
    }
    const methodName = `${schema.__vModel__}BeforeUpload`
    const code = `const ${schema.__vModel__}BeforeUpload = (file) => {
            ${rightSizeCode}
            ${acceptCode}
            return ${returnList.join('&&')}
    }`

    if(returnList.length){
        methodsList.push({
            [methodName]: code
        })
    }
}

// 构建组件属性
function buildAttributes(schema, list){
    const config = schema.__config__
    const slot = schema.__slot__
    buildData(schema, list)
    buildRules.apply(this, [schema, list])

    // 特殊处理options属性
    if(schema.options || (slot && slot.options && slot.options.length)){
        buildOptions(schema, list)
        if (config.dataType === 'dynamic') {
            const model = `${schema.__vModel__}Options`
            buildOptionMethod(schema, model, list)
        }
    }

    // 处理props
    if (schema.props && schema.props.props) {
        buildProps(schema, list)
    }

    if (config.tag == 'a-transfer') {
        buildTargetMethod(schema, list)
    }

    // 处理dataSource
    if (schema['tree-data'] && config.tag === 'a-tree-select') {
        buildTreeData(schema, list)
        if (config.dataType === 'dynamic') {
            const model = `${schema.__vModel__}TreeData`
            buildOptionMethod(schema, model, list)
        }
    }

    // 处理dataSource
    if (schema['data-source'] && (config.tag === 'a-auto-complete' || config.tag === 'a-transfer')) {
        buildDataSource(schema, list)
    }

    // 处理replaceFields
    if (schema['replace-fields']) {
        buildReplaceFields(schema, list)
    }

    // 处理a-upload的action
    if (schema.action && config.tag === 'a-upload') {
        list.uploadVarList.push(
            `${schema.__vModel__}Action: '${schema.action}',
            ${schema.__vModel__}fileList: [],`
        )
        buildBeforeUpload.apply(this, [schema, list])
    }
    
    if (schema.children) {
        schema.children.forEach(item => {
            buildAttributes.apply(this, [item, list])
        })
    }
    // 构建子级组件属性
}



export default function(formData, type){
    const mountedList = []
    const dataList = []
    const ruleList = []
    const optionsList = []
    const uploadVarList = []
    const propsList = []
    const dataSourceList = []
    const treeDataList = []
    const replaceFieldsList = []
    const methodsList = []
    const methodsKey = []
    const methodsValue = []
    buildMethods(formData.formRule, methodsList, type)
    formData.fields.forEach(el => {
        buildAttributes.apply(this, [el, 
            {
                mountedList,
                dataList, 
                ruleList, 
                optionsList,
                uploadVarList,
                treeDataList,
                propsList,
                dataSourceList,
                replaceFieldsList,
                methodsList
            }
        ])
    })

    methodsList.forEach(m => {
        let keys = Object.keys(m)
        let values = Object.values(m)
        keys.forEach(key => methodsKey.push(`${key}`))
        values.forEach(value => methodsValue.push(`${value}`))
    })
    
    return `
    import { ref, reactive, onMounted, getCurrentInstance } from 'vue'
    const { proxy } = getCurrentInstance()
    const ${formData.formRule.formRef} = ref(null)
    const data = reactive({
        ${visibleType[type]}
        ${formData.formRule.formModel}:{
            ${dataList.join('\n')}
        },
        ${formData.formRule.formRules}:{
            ${ruleList.join('\n')}
        },
        ${uploadVarList.join('\n')}
        ${dataSourceList.join('\n')}
        ${treeDataList.join('\n')}
        ${replaceFieldsList.join('\n')}
        ${optionsList.join('\n')}
    })

    ${methodsValue.join(';')}

    ;onMounted(() => {
        ${mountedList.join('\n')}
    })
    `
}