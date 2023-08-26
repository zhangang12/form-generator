<template>
    <a-drawer
        v-model:visible="visible"
        :closable="false"
        width="100%"
        :body-style="{ padding: '0px' }"
    >
        <div style="height:100vh">
            <a-row style="height:100vh; overflow:auto">
                <a-col :md="24" :lg="12" class="left-editor">
                    <a-tabs v-model:activeKey="activeTab" size="large" type="card" class="editor-tabs">
                        <a-tab-pane key="html">
                            <template #tab>
                            <span>
                                <Icon name="edit" v-if="activeTab=='html'" style="color:#f1fa8c" />
                                <Icon name="code" v-else style="color:#a95812" />
                                template
                            </span>
                            </template>
                        </a-tab-pane>
                        <a-tab-pane key="js">
                            <template #tab>
                            <span>
                                <Icon name="edit" v-if="activeTab=='js'" style="color:#f1fa8c" />
                                <Icon name="code" v-else style="color:#a95812" />
                                script
                            </span>
                            </template>
                        </a-tab-pane>
                        <a-tab-pane key="css">
                            <template #tab>
                            <span>
                                <Icon name="edit" v-if="activeTab=='css'" style="color:#f1fa8c" />
                                <Icon name="code" v-else style="color:#a95812" />
                                css
                            </span>
                            </template>
                        </a-tab-pane>
                    </a-tabs>
                    <div v-show="activeTab==='html'" id="editorHtml" class="tab-editor" />
                    <div v-show="activeTab==='js'" id="editorJs" class="tab-editor" />
                    <div v-show="activeTab==='css'" id="editorCss" class="tab-editor" />
                </a-col>
                <a-col :md="24" :lg="12" class="right-preview">
                    <div class="action-bar" :style="{'text-align': 'left'}">
                        <a-button type="link" size="small" @click="runCode">
                            <Icon name="reload" />
                            {{ $t('base.refresh') }}
                        </a-button>
                        <a-divider type="vertical" />
                        <a-button type="link" size="small" @click="showExportModal">
                            <Icon name="cloud-download" />
                            {{ $t('base.export.vue.file') }}
                        </a-button>
                        <a-divider type="vertical" />
                        <a-button id="innerCopy" class="copy-btn" size="small" type="link">
                            <Icon name="copy" />
                            {{ $t('base.copy.code') }}
                        </a-button>
                        <a-divider type="vertical" />
                        <a-button size="small" type="link" @click="onClose">
                            <Icon name="close-circle" />
                            {{ $t('base.close') }}
                        </a-button>
                    </div>
                    <iframe
                        v-show="isIframeLoaded"
                        ref="previewPage"
                        class="result-wrapper"
                        frameborder="0"
                        :src="iframeSrc"
                        @load="iframeLoad"
                    />
                </a-col>
            </a-row>
        </div>
    </a-drawer>
    <export-modal ref="exportModal" @confirm="exportModalConfirm" />
</template>
<script>
import { exportDefault, beautifierConf, titleCase } from '@/utils/index'
import { reactive, toRefs, getCurrentInstance, nextTick, onMounted } from 'vue'
import MakeUp from './makeUp'
import exportModal from '../jsonDrawer/exportModal'
import ClipboardJS from 'clipboard'
import { saveAs } from 'file-saver'
export default {
    components: {
        exportModal
    },
    setup(props, ctx){

        const { proxy } = getCurrentInstance()

        let editorObj = {
            html: null,
            js: null,
            css: null
        }

        const data = reactive({
            isIframeLoaded: false,
            visible: false,
            activeTab: 'html',
            iframeSrc: '/antdv/preview.html'
            // iframeSrc: '/preview.html'
        })

        const onClose = () => {
            data.visible = false
        }

        const getEditor = (type) => {
            if(editorObj[type]){
                return editorObj[type]
            }
            let id
            let mode
            switch (type) {
                case 'html':
                    id = 'editorHtml'
                    mode = 'html'
                    break;
                case 'js':
                    id = 'editorJs'
                    mode = 'javascript'
                    break
                default:
                    id = 'editorCss'
                    mode = 'css'
                    break;
            }
            editorObj[type] = monaco.editor.create(document.getElementById(id), {
                theme: 'vs-dark',
                language: mode,
                automaticLayout: true
            })
            return editorObj[type]
        }

        const setEditorValue = (type, codeStr) => {
            let editor = getEditor(type)
            editor.setValue(codeStr)
        }

        const generateCode = (formData, codeTypeData, copy) => {
            let makeUp = MakeUp(formData, codeTypeData, proxy)
            if(copy){
                makeUp.html = `<template>${makeUp.html}</template>`
                // makeUp.js = `<script>${makeUp.js}<\/script>`
                // makeUp.css = `<style>\n${makeUp.css}</style>`
            }
            return {
                btfHtmlCode: beautifier.html(makeUp.html, beautifierConf.html),
                btfJsCode: beautifier.js(makeUp.js, beautifierConf.js),
                bftCssCode: beautifier.css(makeUp.css, beautifierConf.html)
            }
        }

        const onOpen = (formData, codeTypeData) => {
            data.visible = true
            let { btfHtmlCode, btfJsCode, bftCssCode } = generateCode(formData, codeTypeData)
            nextTick(() => {
                setEditorValue('html', btfHtmlCode)
                setEditorValue('js', btfJsCode)
                setEditorValue('css', bftCssCode)
                if(data.isIframeLoaded){
                    runCode()
                }
            })
        }

        const showExportModal = () => {
            proxy.$refs.exportModal.onOpen('vue')
        }

        const exportCode = () => {
            let html = editorObj.html.getValue()
            let js = editorObj.js.getValue()
            let css = editorObj.css.getValue()
            let htmlCode = beautifier.html(`<template>${html}</template>`)
            return `${htmlCode}\n<script setup>\n${js}<\/script>\n<style>\n${css}<style>`
        }

        const exportModalConfirm = (fileName) => {
            if (!fileName) fileName = `${+new Date()}.vue`
            let code = exportCode()
            let blob = new Blob([code], { type: 'text/plain;charset=utf-8' })
            saveAs(blob, fileName)
        }

        const iframeLoad = () => {
            data.isIframeLoaded = true
            runCode()
        }

        const runCode = () => {
            let html = editorObj.html.getValue()
            let js = editorObj.js.getValue()
            let css = editorObj.css.getValue()
            proxy.$refs.previewPage.contentWindow.postMessage({html,js,css})

        }

        onMounted(() => {
            const clipboard = new ClipboardJS('#innerCopy', {
                text: trigger => {
                    let code = exportCode()
                    proxy.$notification.success({
                        message: proxy.$t('base.successfully'),
                        description: proxy.$t('base.code.copy.successfully')
                    })
                    return code
                }
            })
            clipboard.on('error', e => {
                proxy.$message.error(proxy.$t('base.code.copy.failed'))
            })
        })

        return {
            onClose,
            onOpen,
            iframeLoad,
            runCode,
            generateCode,
            showExportModal,
            exportModalConfirm,
            ...toRefs(data)
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/styles/mixin.scss';

.tab-editor {
  position: absolute;
  top: 40px;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 14px;
}
.left-editor {
  position: relative;
  height: 100%;
  background: #1e1e1e;
  overflow: hidden;
}
.setting{
  position: absolute;
  right: 15px;
  top: 3px;
  color: #a9f122;
  font-size: 18px;
  cursor: pointer;
  z-index: 1;
}
.right-preview {
  height: 100%;
  .result-wrapper {
    height: calc(100vh - 40px);
    width: 100%;
    overflow: auto;
    padding: 12px;
    box-sizing: border-box;
  }
}
@include action-bar;
</style>