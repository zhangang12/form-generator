<template>
    <a-layout id="components-layout-demo-fixed-sider">
        <a-layout-sider
            :collapsed-width="0"
            :width="250"
            theme="light"
            :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
        >
            <div class="left-header">
                <img src="~@/assets/logo.png" alt="logo">
                <h3>Form Generator Antdv</h3>
            </div>
            <left-side 
                ref="leftSlide"
                @addComponent="addComponent"
            ></left-side>
        </a-layout-sider>
        <a-layout :style="{ marginLeft: '250px', marginRight: '350px' }">
            <center-top 
                @cleanComponent="cleanComponent"
                @showJsonDrawer="showJsonDrawer"
                @showCodeTypeModal="showCodeTypeModal"
            ></center-top>
            <div class="center-main">
                <a-layout-content>
                    <div class="center-board-row">
                        <center-stage
                            ref="stage"
                            :formRule="formRule"
                            :activeItem="activeItem"
                            :drawingList="drawingList"
                            @addComponent="addComponent"
                            @sortComponent="sortComponent"
                            @copyComponent="copyComponent"
                            @moveComponent="moveComponent"
                            @selectComponent="selectComponent"
                            @deleteComponent="deleteComponent"
                        ></center-stage>
                    </div>
                    
                </a-layout-content>
                <a-layout-footer :style="{ textAlign: 'center' }">
                    ©2022 <a href="https://github.com/fuzui/form-generator-antdv" target="_blank">Form Generator Antdv</a>
                </a-layout-footer>
            </div>
        </a-layout>
        <a-layout-sider
            :style="{ overflow: 'auto', height: '100vh', position: 'fixed', right: 0 }"
            :collapsed-width="0"
            :width="350"
            theme="light"
        >
            <right-panel 
                :formRule="formRule"
                :activeItem="activeItem"
                @updateFormRule="updateFormRule"
                @replaceComponent="replaceComponent"
                @showIconSelect="showIconSelect"
            />
        </a-layout-sider>
        <code-type-modal ref="codeTypeModal" @confirm="codeTypeModalConfirm" />
        <json-drawer ref="jsonDrawer" @updateConf="updateConf" />
        <form-drawer ref="formDrawer" />
    </a-layout>
    <input id="copyNode" type="hidden">
</template>
<script>
import leftSide from '@/component/leftSide'
import centerTop from '@/component/centerTop'
import centerStage from '@/component/centerStage'
import rightPanel from '@/component/rightPanel'
import formDrawer from '@/component/FormDrawer'
import codeTypeModal from '@/component/codeTypeModal'
import ClipboardJS from 'clipboard'
import { saveAs } from 'file-saver'
import { FormRule } from '@/core/config'
import JsonDrawer from '@/component/jsonDrawer'

import { reactive, toRefs, watch, getCurrentInstance, provide, onMounted } from 'vue'
import { deepClone, rendomKey } from '@/utils/index'
export default {
    components: {
        leftSide,
        centerTop,
        centerStage,
        rightPanel,
        codeTypeModal,
        formDrawer,
        JsonDrawer,
    },
    setup(props, context){

        const { proxy } = getCurrentInstance()

        const preAction = (() => {
            let fn = null
            return {
                set(f){ fn = f },
                get(){
                    let result = fn()
                    fn = null
                    return result
                }
            }
        })()

        provide('preAction', preAction)
        
        const data = reactive({
            formId: 99,
            formRule: FormRule,
            activeItem: undefined,
            drawingList: [],
            action: null,
            codeTypeData: null
        })

        const updateFormId = (clone) => {
            data.formId++
            clone.formId = data.formId
            return clone 
        }

        const international = (clone) => {
            if(clone.__config__){
                if(clone.__config__.label){
                    clone.__config__.label = proxy.$t(clone.__config__.label)
                }
                if(clone.__config__.document){
                    clone.__config__.document = proxy.$t(clone.__config__.document)
                }
            }
            if(clone.placeholder){
                if(Array.isArray(clone.placeholder)){
                    clone.placeholder.forEach(p => {
                        proxy.$t(p)
                    })
                }else{
                    clone.placeholder = proxy.$t(clone.placeholder)
                }
            }
            if(clone.__config__.tag === 'a-button'){
                clone.__slot__.default = proxy.$t(clone.__slot__.default)
            }
            if(clone.__config__.tag === 'a-upload'){
                clone.__config__.buttonText = proxy.$t(clone.__config__.buttonText)
            }
        }

        const transfer = clone => {
            if(clone.__config__.layout == 'colFormItem'){
                clone.__vModel__ = `field${clone.formId}`
            }else if(clone.__config__.layout == 'rowFormItem'){
                clone.componentName = `row${clone.formId}`
                delete clone.label
                if(!Array.isArray(clone.children)){
                    clone.children = []
                }else{
                    clone.children = clone.children.map(item => transfer(item))
                }
            }
        }

        const adjustConfig = (options, keepId) => {
            let clone = deepClone(options)
            clone.id = rendomKey()
            updateFormId(clone, keepId)
            international(clone)
            transfer(clone)
            return clone
        }

        const addComponent = (options = {}) => {
            let item = preAction.get()
            item = adjustConfig(item)
            let { origin = data.drawingList, index } = options
            if(index !== undefined){
                origin.splice(index, 0, item)
            }else{
                origin.push(item)
            }
            data.activeItem = item
        }

        const selectComponent = (options) => {
            let { item } = options
            data.activeItem = item
        }

        const dropComponent = (options) => {
            let item = preAction.get()
            item = adjustConfig(item)
            let { origin = data.drawingList, index = 0 } = options
            origin.splice(index, 0, item)
        }

        const sortComponent = (options) => {
            let { origin = data.drawingList, oldIndex, newIndex } = options
            let [item] = origin.splice(oldIndex, 1)
            origin.splice(newIndex, 0, item)
        }

        const copyComponent = (options) => {
            let item = adjustConfig(options.item)
            data.drawingList.push(item)
        }

        const deleteComponent = (options) => {
            let origin
            let { formId } = options.item
            let find = (source, formId ,parent) => {
                return source.find((value, index, arr) => {
                    if(value.formId == formId){
                        origin = parent || source
                        return arr.splice(index, 1)
                    }

                    if(Array.isArray(value.children)){
                        return find(value.children, formId, value)
                    }
                })
            }
            find(data.drawingList, formId)
            if(formId == data.activeItem.formId){
                if(Array.isArray(origin)){
                    if(origin.length){
                        data.activeItem = origin[origin.length - 1]
                    }else{
                        data.activeItem = undefined
                    }
                }else if(Array.isArray(origin.children)){
                    if(origin.children.length){
                        data.activeItem = origin.children[origin.children.length - 1]
                    }else{
                        data.activeItem = origin
                    }
                }
            }
        }

        const replaceComponent = (options) => {
            let { item } = options
            let {formId} = data.activeItem
            item = adjustConfig(item)
            let find = (source, id) => {
                return source.find((value,index) => {
                    if(value.formId == id){
                        source.splice(index, 1, item)
                        return true
                    }

                    if(Array.isArray(value.children)){
                        return find(value.children, id)
                    }
                })
            }
            find(data.drawingList, formId)
            data.activeItem = item
        }

        const moveComponent = (options) => {
            let item = preAction.get()
            let { origin = data.drawingList, index } = options
            origin.splice(index, 0, item)
        }

        const updateFormRule = (options) => {
            data.formRule = options
        }

        const updateConf = (options) => {
            let { fields, formRule } = options
            data.drawingList = fields
            updateFormRule(formRule)
        }

        const cleanComponent = () => {
            data.drawingList = []
            data.activeItem = undefined
        }

        const showJsonDrawer = () => {
            proxy.$refs.jsonDrawer.open(data.drawingList, data.formRule)
        }

        const showCodeTypeModal = (action, isFile) => {
            data.action = action
            proxy.$refs.codeTypeModal.onOpen(isFile)
        }

        const codeTypeModalConfirm = (codeTypeData) => {
            data.codeTypeData = codeTypeData
            let opt = deepClone({
                formRule: data.formRule,
                fields: data.drawingList,
            })

            if(data.action == 'run'){
                proxy.$refs.formDrawer.onOpen(opt, codeTypeData)
            }

            if(data.action == 'copy'){
                document.getElementById('copyNode').click()
            }

            if(data.action == 'download'){
                
                let { fileName } = codeTypeData
                let codeStr = proxy.$refs.formDrawer.generateCode(opt, codeTypeData, true)
                let blob = new Blob([
                    `${codeStr.btfHtmlCode}<script setup>\n${codeStr.btfJsCode}<\/script>\n<style>\n${codeStr.bftCssCode}<style>`
                ], { type: 'text/plain;charset=utf-8' })
                saveAs(blob, fileName)
            }
        }

        onMounted(() => {
            const clipboard = new ClipboardJS('#copyNode', {
                text: trigger => {
                    let opt = deepClone({
                        formRule: data.formRule,
                        fields: data.drawingList,
                    })
                    const codeStr = proxy.$refs.formDrawer.generateCode(opt, data.codeTypeData, true)
                    proxy.$notification.success({
                    message: proxy.$t('base.successfully'),
                    description:
                        proxy.$t('base.code.copy.successfully')
                    })
                    return `${codeStr.btfHtmlCode}<script setup>\n${codeStr.btfJsCode}<\/script>\n<style>\n${codeStr.bftCssCode}<style>`
                }
            })
            clipboard.on('error', e => {
                proxy.$message.error(proxy.$t('base.code.copy.failed'))
            })
        })

        return {
            addComponent,
            dropComponent,
            sortComponent,
            copyComponent,
            deleteComponent,
            replaceComponent,
            moveComponent,
            selectComponent,
            cleanComponent,
            updateFormRule,
            showJsonDrawer,
            showCodeTypeModal,
            codeTypeModalConfirm,
            updateConf,
            ...toRefs(data)
        }
    }
}
</script>
<style lang='scss'>
@import '@/styles/home';
</style>